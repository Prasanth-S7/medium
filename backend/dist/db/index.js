"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.deletePost = exports.getAllPosts = exports.getPostbyId = exports.createPost = exports.isUserExists = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (userCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.create({
            data: {
                username: userCredentials.username,
                email: userCredentials.email,
                password: userCredentials.password,
            }
        });
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const isUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: {
                email: email
            },
        });
        return user;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.isUserExists = isUserExists;
const createPost = (postObjects) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createPost = yield prisma.posts.create({
            data: {
                title: postObjects.title,
                description: postObjects.description,
                authorId: postObjects.authorId
            }
        });
        return createPost;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.createPost = createPost;
const getPostbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPost = yield prisma.posts.findFirst({
            where: {
                postId: id
            }
        });
        if (getPost) {
            return getPost;
        }
        return null;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPostbyId = getPostbyId;
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield prisma.posts.findMany();
        console.log("hi");
        console.log(allPosts);
        return allPosts;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllPosts = getAllPosts;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield prisma.posts.delete({
            where: {
                postId: id
            }
        });
        return isDeleted;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.deletePost = deletePost;
const getUserPosts = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        return posts;
    }
    catch (error) {
        console.log(error);
        return;
    }
});
exports.getUserPosts = getUserPosts;
