import { Request, Response, NextFunction } from "express";

export const validateUserDetailsUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstname, lastname, useremail, username } = req.body;

    if (!firstname) {
      return res.status(400).json({ message: " First name is required" });
    }
    if (!lastname) {
      return res.status(400).json({ message: "last name is required" });
    }
    if (!useremail) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!username) {
      return res.status(400).json({ message: "User name is required" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
