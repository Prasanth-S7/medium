import { Router } from "express";
import { deletePost, getAllPosts, getPostbyId } from "../db";

export const postRouter = Router();

postRouter.get('/bulk',async (req,res)=>{
    console.log("hi there")

    try{
        const post = await getAllPosts();
        console.log(post)
        res.status(200).json({
            msg:post
        })
        return;
    }
    catch(error){
        res.status(500).json({
            msg:"Internal Server Error"
        })
        return;
    }
})

postRouter.get('/:id', (req, res) => {
    try {
        const body = req.body;
        const post = getPostbyId(body.postId);
        res.status(200).json({
            post: post
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

postRouter.delete('/:id',async(req,res)=>{
    try{
        const postId = req.params.id;
        const post = await deletePost(postId)
        res.status(200).json({
            msg:post
        })
        return
    }
    catch(error){
        console.log(error);
        res.json({
            msg:error
        })
        return;
    }
})