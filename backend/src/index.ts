import express, { Request, Response, Express } from "express";
import cookie from "cookie-parser";
import authRoute from "./Routes/auth.route";
import entriesRoute from "./Routes/entries.route";
import entryRoute from "./Routes/entry.route";
import userRoute from "./Routes/user.route";
import googleAuth from "./Routes/googleauth.route";
import subscriptionRoute from "./Routes/subsription.route";
import cors from "cors";
import passport from "passport";
import "./passport";

const app: Express = express();

app.use(passport.initialize());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL!, "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(cookie());
app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to Notely");
});

app.use("/api/auth", authRoute);
app.use("/api/entries", entriesRoute);
app.use("/api/entry", entryRoute);
app.use("/api/user", userRoute);
app.use("/auth/google", googleAuth);
app.use("/api/subscription", subscriptionRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
