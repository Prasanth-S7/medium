import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../types/types";
import { PostObjects } from "../types/types";
const prisma = new PrismaClient();
export const createUser = async (userCredentials: User) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: userCredentials.username,
                email: userCredentials.email,
                password: userCredentials.password,
            }
        })
        return user;
    }
    catch (error) {
        console.log(error)
    }
}

export const isUserExists = async (email: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
        })
        return user;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

export const createPost = async (postObjects: PostObjects)=>{
    try {
        const createPost = await prisma.posts.create({
            data: {
                title: postObjects.title,
                description: postObjects.description,
                authorId: postObjects.authorId
            }
        })
        return createPost;
    }
    catch (error) {
        console.log(error)
        return;
    }
}

export const getPostbyId = async(id:string)=>{
    try{
        const getPost = await prisma.posts.findFirst({
            where:{
                postId:id
            }
        })
        if(getPost){
            return getPost;
        }
        return null;
    }
    catch(error){
        console.log(error)
    }
}

export const getAllPosts = async()=>{
    try{
        const allPosts = await prisma.posts.findMany();
        console.log("hi")
        console.log(allPosts)
        return allPosts;
    }
    catch(error){
        console.log(error)
        return null;
    }
}

export const deletePost = async(id:string)=>{
    try{
        const isDeleted = await prisma.posts.delete({
            where:{
                postId:id
            }
        })
        return isDeleted;
    }
    catch(error){
        console.log(error)
        return null;
    }
}

export const getUserPosts =async(username:string)=>{
    try{
        const posts = await prisma.user.findFirst({
            where:{
                username:username
            }
        })     
        return posts;   
    }
    catch(error){
        console.log(error);
        return;
    }
}