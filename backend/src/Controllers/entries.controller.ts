import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEntry = async (req: Request, res: Response) => {
  const { genre, title, synopsis, content, publish } = req.body;
  const { id } = req.user;
  try {
    await prisma.entry.create({
      data: {
        userId: id,
        genre,
        title,
        synopsis,
        content,
        isPublished: publish,
      },
    });
    res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const entries = await prisma.entry.findMany({
      where: { AND: [{ userId: id }, { isDeleted: false }] },
    });
    return res.status(200).json({ entries });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getDeletedEntries = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const entries = await prisma.entry.findMany({
      where: { AND: [{ userId: id }, { isDeleted: true }] },
    });
    return res.status(200).json({ entries });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
