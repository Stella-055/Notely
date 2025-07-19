import express, { Request, Response, Express } from "express";
const app:Express=express();
app.use(express.json());


app.get("/", (_req: Request, res: Response) => {
    res.send("welcome to Notely");
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})