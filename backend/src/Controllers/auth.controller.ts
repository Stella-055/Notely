import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import { transporter } from "../Nodemailer/transpoter";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, useremail, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        firstname,
        lastname,
        useremail,
        username,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  const { usercredential } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ useremail: usercredential }, { username: usercredential }],
      },
    });
    const { id, username } = user!;
    const accessToken = jwt.sign(
      { id, username },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" },
    );
    const refreshToken = jwt.sign(
      { id, username },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    await prisma.user.update({
      where: { id },
      data: { refreshToken: refreshToken },
    });
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 15,
        path: "/",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
      })
      .status(200)
      .json({ message: "Logged in", username: username });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshuserToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(403).json({ message: "forbidden1" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      async function (
        err: VerifyErrors | null,
        decoded: JwtPayload | String | undefined,
      ) {
        if (err) {
          return res.status(403).json({ message: "forbidden12" });
        }
        const user = await prisma.user.findFirst({
          where: { id: (decoded as JwtPayload).id },
        });

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({ message: "forbidden123" });
        }
        const accessToken = jwt.sign(
          { id: user.id, username: user.username },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "15m" },
        );
        const newrefreshToken = jwt.sign(
          { id: user.id, username: user.username },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: "7d" },
        );

        await prisma.user.update({
          where: { id: user.id },
          data: { refreshToken: newrefreshToken },
        });
        return res
          .clearCookie("accesscookie")
          .clearCookie("refreshToken")
          .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 15,
            path: "/",
          })
          .cookie("refreshToken", newrefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
          })
          .status(200)
          .json({ message: "Token refreshed successfully" });
      },
    );
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const { useremail } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiryOtp = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await prisma.user.update({
      where: { useremail },
      data: { otp: otp, otpExpiresAt: expiryOtp },
    });

    await transporter.sendMail({
      from: `"Notely Support" <${process.env.SENDER_EMAIL}>`,
      to: useremail,
      subject: "Account Verification Otp",
      text: `Hello ${user.username},Your Otp is ${otp}.Use this to verify this account as yours.If you did not request an Otp please ignore it. We got it under control`,
    });
    return res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    console.error("OTP Send Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { useremail, otp } = req.body;
    if (!useremail || !otp) {
      return res.status(400).json({ message: " OTP is required" });
    }
    const user = await prisma.user.findUnique({
      where: { useremail },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
      res.status(400).json({ message: "Otp expired" });
      return;
    }
    const tempToken = jwt.sign({ useremail }, process.env.ACCESS_TOKEN_SECRET!);
    res.status(200).json({ message: "Otp verified successfully", tempToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const update_Password = async (req: Request, res: Response) => {
  try {
    const { tempToken, newPassword } = req.body;
    if (!tempToken || !newPassword) {
      return res.status(400).json({ message: " password is required" });
    }
    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        tempToken,
        process.env.ACCESS_TOKEN_SECRET!,
      ) as JwtPayload;
    } catch (err) {
      return res.status(401).json({ message: " You are Unauthorized" });
    }

    const useremail = decoded.useremail;

    const passwordStrength = zxcvbn(newPassword);

    if (passwordStrength.score < 3) {
      return res.status(400).json({ message: "Password is too weak" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { useremail },
      data: { password: hashedPassword, otp: null, otpExpiresAt: null },
    });
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    await prisma.user.update({
      where: { id: id },
      data: { refreshToken: null },
    });

    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { newpassword } = req.body;
  const { id } = req.user;
  try {
    const passwordstrength = zxcvbn(newpassword);

    if (passwordstrength.score < 3) {
      return res.status(400).json({ message: "Password is too weak" });
    }

    const hashedpassword = await bcrypt.hash(newpassword, 10);
    await prisma.user.update({
      where: { id: id },
      data: { password: hashedpassword },
    });
    return res.status(200).json({ message: "updated pasword successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser= async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) return res.status(404);
    res.status(200).json({
   
      username: user.username,
     
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}