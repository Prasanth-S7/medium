import { Router } from "express";
import { createPost, createUser, getUserPosts } from "../db";
import { PostObjects, User } from "../types/types";
import { isUserExists } from "../db";
import { Prisma } from "@prisma/client";
export const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const body: User = req.body;
        const existingUser = await isUserExists(body.email);
        if(existingUser){
            res.status(201).json({
                msg:"User already exists"
            })
        }
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

userRouter.post('/createPost',async (req,res)=>{
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






