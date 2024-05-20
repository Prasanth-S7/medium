import { NextFunction, Router,Request,Response } from "express";
import { createPost, createUser, getUserPosts, isUserExists } from "../db";
import { PostObjects, User } from "../types/types";
import { PrismaClient } from "@prisma/client";
import errorMap from "zod/lib/locales/en";
export const userRouter = Router();
const prisma = new PrismaClient()

const userExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            msg: "Bad Request: email is required"
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            email:email
        }
    });

    res.locals.userId= user?.id;
    next();
};

userRouter.post('/signup', userExists,async (req, res) => {
    try {
        if(res.locals.userId){
            res.json({
                msg:"User already exists"
            })
        }
        const usernameTaken = await prisma.user.findFirst({
            where:{
                username:req.body.username
            }
        })
        if(usernameTaken){
            res.status(200).json({
                msg:`${req.body.username} is already taken.`
            })
            return;
        }
        const body: User = req.body;
        const createuser = await createUser(body);
        if(createuser){
            res.status(200).json({
                msg: "User created successfully"
            })
        }
    }
    catch (error) {
        console.log(error);
    }
})

userRouter.post('/createPost',userExists,async (req,res)=>{
    try{
        const body:PostObjects = req.body;
        const post = await createPost(body);
        if(post){
            res.json({
                msg:"Post created successfully"
            })
            return;
        }
    }
    catch(error){
        console.log(error);
        return;
    }
})

userRouter.get('/posts',async(req,res)=>{
    try{
        const username:string = req.body.username;
        const posts = await getUserPosts(username)
        if(posts){
            res.json({
                posts
            })
        }
    }
    catch(error){
        res.json({
            msg:"Internal Server Error"
        })
        console.log(error);
    }
})






