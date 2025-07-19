import {Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { userdetails } from '../types/type.d';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    try {
        const{firstname ,lastname,useremail,username,password}=req.body;
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

        res.status(200).json({ message: 'User registered successfully'});

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}


export const signinUser =async (req: Request, res: Response) => {
const{usercredential}=req.body
    try {
        const user= await prisma.user.findFirst({
            where: {OR: [{ useremail:usercredential }, { username:usercredential }] }
        });
        const { id,  username } = user!;
const accessToken = jwt.sign({id, username }, process.env.ACCESS_TOKEN_SECRET!,{expiresIn: "15m"})
const refreshToken = jwt.sign({id, username }, process.env.REFRESH_TOKEN_SECRET!,{ expiresIn: "7d" });

await prisma.user.update({
            where: { id },
            data: {  refreshToken :refreshToken },
        });
        res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true, 
          sameSite: "strict",
          maxAge: 1000 * 60 * 15, 
          path: "/", 
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 7, 
          path: "/api/auth/refresh", 
        })
        .status(200)
        .json({ message: "Logged in" });
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const refreshuserToken= async (req: Request, res: Response) => {
   
    try {
        const { refreshToken } = req.cookies;
       
       
        if (!refreshToken) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async function(err: VerifyErrors | null,
        decoded: JwtPayload | String | undefined,) {
            if (err) {
                res.status(403).json({ message: "forbidden" });
              }
              const user = await prisma.user.findFirst({
                where: { id: (decoded as JwtPayload).id },
              });
          
              if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: "forbidden" });
              } 
              const accessToken = jwt.sign(
                { id: user.id, username: user.username },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: "15m" }
              );
              const newrefreshToken = jwt.sign(
                { id: user.id, username: user.username },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: "7d" }
              );
          
              await prisma.user.update({
                where: { id:user.id },
                data: {  refreshToken :newrefreshToken },
            });
            res
            .cookie("accessToken", accessToken, {
              httpOnly: true,
              secure: true, 
              sameSite: "strict",
              maxAge: 1000 * 60 * 15, 
              path: "/", 
            })
            .cookie("refreshToken", newrefreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 1000 * 60 * 60 * 24 * 7, 
              path: "/api/auth/refresh", 
            })
            .status(200)
            .json({ message: "Token refreshed successfully" });

            });


     
     
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}