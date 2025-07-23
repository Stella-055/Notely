import { Router } from "express";
import { validateUser } from "../Middlewares/entries.middleware";
import {
  getUserDetails,
  updateUserPrimaryInfo,
  updateUserProfile,
} from "../Controllers/user.controller";
import { validateUserDetailsUpdate } from "../Middlewares/user.middleware";
const route = Router();

route.get("/", validateUser, getUserDetails);
route.patch(
  "/",
  validateUser,
  validateUserDetailsUpdate,
  updateUserPrimaryInfo,
);
route.patch("/profileimage", validateUser, updateUserProfile);
export default route;
