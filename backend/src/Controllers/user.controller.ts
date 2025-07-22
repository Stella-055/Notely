import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserDetails = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateUserPrimaryInfo =async(req: Request, res: Response)=>{
const{firstname,lastname,username,useremail,bio}=req.body
const{id}=req.user
try {
  await prisma.user.update({
    where:{id:id},
    data:{firstname,lastname,username,useremail,bio}
  })
 return res.status(200).json({message:"updated Details successfully"})
} catch (error) {
  return res.status(500).json({ message: "internal server error" });
}
}

export const updateUserProfile =async(req: Request, res: Response)=>{

  const {profileImg}=req.body
  const{id}=req.user

  if(!profileImg){
    return res.status(400).json({message:"Image is required"})
  }
  try {
    await prisma.user.update({
      where:{id:id},
      data:{profileImg:profileImg}
    })
   return res.status(200).json({message:"updated Details successfully"})
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
}
