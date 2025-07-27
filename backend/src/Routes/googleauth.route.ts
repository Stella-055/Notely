import { Router } from "express";
import passport from "passport";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const route = Router();
route.get("/",
    passport.authenticate("google", { scope: ["profile","email"], session: false })
  );
route.get(
    "/callback",
    passport.authenticate("google", {scope: ["profile", "email"], session: false, failureRedirect: `${process.env.FRONTEND_URL}/signin` }),
  async  (req:Request, res:Response) => {
      const user = req.user;
      try {
        
     
  const accessToken = jwt.sign(
        { id: user.id, username:user.username },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { id: user.id, username:user.username },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" },
      );
  
      await prisma.user.update({
        where: { id:user.id },
        data: { refreshToken: refreshToken },
      });
     
      
   
       res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,

        maxAge: 1000 * 60 * 15,
        path: "/",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,

        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
      })
      .cookie("username", user.username, {
        maxAge: 1000 * 60 * 15,
        path: "/",
        secure: true,
      })
      
   .redirect(`${process.env.FRONTEND_URL}/oauth-success`);
    } catch (error) {
         return res.redirect(`${process.env.FRONTEND_URL}/signin`); 
    }
    }
  );
  export default route