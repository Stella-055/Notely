import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import zxcvbn from "zxcvbn";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const registerDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstname, lastname, useremail, username, password } = req.body;

    if (!firstname || !lastname || !useremail || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const validateEmailUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useremail, username } = req.body;

    const existingEmail = await prisma.user.findUnique({
      where: { useremail },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const validatePasswordStrength = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;

    const passwordStrength = zxcvbn(password);

    if (passwordStrength.score < 3) {
      return res.status(400).json({ message: "Password is too weak" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const validatesigninDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { usercredential, password } = req.body;
    if (!usercredential) {
      return res
        .status(400)
        .json({ message: "Please provide a username or email" });
    }

    if (!password) {
      return res.status(400).json({ message: "Please provide a password" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const validateEmailorUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { usercredential, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ useremail: usercredential }, { username: usercredential }],
      },
    });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    if (!user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotpasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { useremail } = req.body;

    if (!useremail) {
      return res.status(400).json({ message: "Please provide an email" });
    }
    const user = await prisma.user.findUnique({
      where: { useremail },
    });

    if (!user) {
      return res.status(404).json({ message: "Provide a valid email" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updatePasswordValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { oldpassword, newpassword } = req.body;
  const { id } = req.user;
  try {
    if (!oldpassword) {
      return res.status(400).json({ message: "Old password is required" });
    }
    if (!newpassword) {
      return res.status(400).json({ message: "New password is required" });
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user || !user.password) {
      return res.status(404).json({ message: "User not found" });
    }
    const isOldPasswordValid = bcrypt.compare(oldpassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
