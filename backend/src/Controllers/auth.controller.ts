import {Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    try {
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}