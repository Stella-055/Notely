import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import main from "../Gemini";

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
  const userId = req.user.id;
  try {
    const entryOwner = await prisma.entry.findUnique({
      where: { id },
    });

    if (!(userId === entryOwner!.userId)) {
      return res.status(400).json({ message: "You are not the owner" });
    }
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
  const userid = req.user.id;
  const { genre, title, synopsis, content, isPublished } = req.body;
  try {
    const entryOwner = await prisma.entry.findFirst({
      where: { id },
    });

    if (!(userid == entryOwner?.userId)) {
      return res.status(400).json({ message: "You are not the owner" });
    }
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

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { title, synopsis } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: "Please provide a title for the note" });
    }
    if (!synopsis) {
      return res
        .status(400)
        .json({ message: "Please provide a synopsis for the note" });
    }
    const content = await main(
      `Generate a note content for a topic with this synopsis :${synopsis} and this topic:${title} in markdown format`,
    );
    return res.status(200).json({ content });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const summarizeContent = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const { id } = req.user;
    if (!content) {
      return res.status(400).json({ message: "content is required" });
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user || user.package == "Free Tier") {
      return res
        .status(400)
        .json({ message: "This feature is not available in your package" });
    }

    const newContent = await main(
      `Summarize this :${content} and return it in markdown format`,
    );
    return res.status(200).json({ newContent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
