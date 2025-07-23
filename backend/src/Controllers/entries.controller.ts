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
    return res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const getEntries = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const entries = await prisma.entry.findMany({
      where: { AND: [{ userId: id }, { isDeleted: false }] },
      include: { user: true },
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

export const getBookmarkedEntries = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
      select: {
        bookmarks: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookmarkedEntries = await prisma.entry.findMany({
      where: {
        id: {
          in: user.bookmarks,
        },
      },
      include: { user: true },
    });
    return res.status(200).json({ entries: bookmarkedEntries });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export const bookmarkEntry = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const Bookmarknote = await prisma.entry.findUnique({
      where: { id: id },
    });
    if (Bookmarknote?.userId == userId) {
      await prisma.entry.update({
        where: { id: id },
        data: { isBookmarked: true },
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { bookmarks: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.bookmarks.includes(id)) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: {
          set: [...user.bookmarks, id],
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Bookmark added", bookmarks: updatedUser.bookmarks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const unbookmarkEntry = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const Bookmarknote = await prisma.entry.findUnique({
      where: { id: id },
    });
    if (Bookmarknote?.userId == userId) {
      await prisma.entry.update({
        where: { id: id },
        data: { isBookmarked: false },
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { bookmarks: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.bookmarks.includes(id)) {
      return res.status(400).json({ message: "Note is not bookmarked" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: {
          set: user.bookmarks.filter((Id) => Id !== id),
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Bookmark added", bookmarks: updatedUser.bookmarks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
