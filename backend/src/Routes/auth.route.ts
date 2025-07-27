import { Router } from "express";
import {
  forgotpasswordEmail,
  registerDetails,
  validateEmailorUsername,
  validateEmailUsername,
  validatePasswordStrength,
  validatesigninDetails,
  updatePasswordValidation,
} from "../Middlewares/auth.middleware";
import {
  logoutUser,
  refreshuserToken,
  registerUser,
  sendOtp,
  signinUser,
  update_Password,
  updateUserPassword,
  verifyOtp,
} from "../Controllers/auth.controller";
import { validateUser } from "../Middlewares/entries.middleware";
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
route.post("/logout", validateUser, logoutUser);
route.post(
  "/password",
  validateUser,
  updatePasswordValidation,
  updateUserPassword,
);
export default route;
