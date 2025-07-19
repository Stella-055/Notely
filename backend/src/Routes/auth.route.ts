import { Router } from "express";
import {
  forgotpasswordEmail,
  registerDetails,
  validateEmailorUsername,
  validateEmailUsername,
  validatePasswordStrength,
  validatesigninDetails,
} from "../Middlewares/auth.middleware";
import {
  logoutUser,
  refreshuserToken,
  registerUser,
  sendOtp,
  signinUser,
  update_Password,
  verifyOtp,
} from "../Controllers/auth.controller";
const route = Router();

route.post(
  "/register",
  registerDetails,
  validateEmailUsername,
  validatePasswordStrength,
  registerUser,
);
route.post(
  "/login",
  validatesigninDetails,
  validateEmailorUsername,
  signinUser,
);
route.post("/refresh", refreshuserToken);
route.post("/forgotpassword", forgotpasswordEmail, sendOtp);
route.post("/verifyotp", verifyOtp);
route.post("/update-password", update_Password);
route.post("/logout", logoutUser);
export default route;
