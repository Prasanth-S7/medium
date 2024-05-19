import express from "express";
import { Router } from "express";
import cors from "cors"
import { postRouter } from "./routes/postRouter";
import { adminRouter } from "./routes/adminRouter";
import { userRouter } from "./routes/userRouter";
const app = express();
const router = Router()
app.use(express.json())
app.use(cors())
app.use("/post",postRouter);
app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.get('/check',(req,res)=>{
    res.json({
        msg:"Server is Healthy"
    })
})
app.listen(3000,()=>{
    console.log("Server started Successfully")
})


