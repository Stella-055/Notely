import express, { Request, Response, Express } from "express";

import authRoute from "./Routes/auth.route";
const app:Express=express();
app.use(express.json());


app.get("/", (_req: Request, res: Response) => {
    res.send("welcome to Notely");
  });
app.use ("/api/auth", authRoute); 
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})