import { Router } from "express";
import { validateUser } from "../Middlewares/entries.middleware";
import { getUserDetails } from "../Controllers/user.controller";
const route = Router();

route.get("/", validateUser, getUserDetails);

export default route;
