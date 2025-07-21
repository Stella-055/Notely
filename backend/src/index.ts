import express, { Request, Response, Express } from "express";
import cookie from "cookie-parser";
import authRoute from "./Routes/auth.route";
import cors from "cors";
const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookie());
app.get("/", (_req: Request, res: Response) => {
  res.send("welcome to Notely");
});
app.use("/api/auth", authRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
