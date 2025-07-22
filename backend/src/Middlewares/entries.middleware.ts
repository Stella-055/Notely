import { Request, Response, NextFunction } from "express";
import { userdetails } from "../types/type";

import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({ message: "unauthorized user" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | String | undefined) => {
      if (err) {
        return res.status(401).json({ message: "unauthorized" });
      }
      req.user = decoded as userdetails;
    },
  );
  next();
};
export const validateEntryDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { genre, title, synopsis, content, publish } = req.body;

  if (!genre) {
    return res.status(400).json({ message: "Genre is required" });
  }
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!synopsis) {
    return res.status(400).json({ message: " A synopsis is required" });
  }
  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }
  if (publish === undefined) {
    return res.status(400).json({ message: "Publish status is required" });
  }

  next();
};
