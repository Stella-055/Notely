import { Router } from "express";
import { registerDetails,validateEmailorUsername,validateEmailUsername,validatePasswordStrength, validatesigninDetails } from "../Middlewares/auth.middleware";
import { registerUser } from "../Controllers/auth.controller";
const route= Router();

route.post( "/register",registerDetails,validateEmailUsername,validatePasswordStrength,registerUser)
route.post("/login",validatesigninDetails,validateEmailorUsername)
export default route;