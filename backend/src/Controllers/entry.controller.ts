import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const entry = await prisma.entry.findFirst({
      where: { AND: [{ id: id }, { isDeleted: false }] },
      include: { user: true },
    });
    if (!entry) {
      return res.status(404).json({ message: "entry not found" });
    }
    return res.status(200).json({ entry });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const entry = await prisma.entry.update({
      where: { id: id },
      data: { isDeleted: true, isPinned: false, isBookmarked: false },
      include: {
        user: true,
      },
    });

    if (!entry) {
      return res.status(404).json({ message: "entry not found" });
    }
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const restoreEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const entry = await prisma.entry.update({
      where: { id: id },
      data: { isDeleted: false },
    });

    if (!entry) {
      return res.status(404).json({ message: "entry not found" });
    }
    return res.status(200).json({ message: "Note restored successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { genre, title, synopsis, content, isPublished } = req.body;
  try {
    const entry = await prisma.entry.update({
      where: { id: id },
      data: { genre, title, synopsis, content, isPublished },
    });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    return res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
