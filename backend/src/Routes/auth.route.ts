import { Router } from "express";
import { forgotpasswordEmail, registerDetails,validateEmailorUsername,validateEmailUsername,validatePasswordStrength, validatesigninDetails } from "../Middlewares/auth.middleware";
import { refreshuserToken, registerUser, sendOtp, signinUser, verifyOtp } from "../Controllers/auth.controller";
const route= Router();

route.post( "/register",registerDetails,validateEmailUsername,validatePasswordStrength,registerUser)
route.post("/login",validatesigninDetails,validateEmailorUsername,signinUser)
route.post("/refresh", refreshuserToken)
route.post("/forgotpassword",forgotpasswordEmail,sendOtp )
route.post("/verifyotp",verifyOtp)
export default route;