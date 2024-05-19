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
exports.postRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
exports.postRouter = (0, express_1.Router)();
exports.postRouter.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi there");
    try {
        const post = yield (0, db_1.getAllPosts)();
        console.log(post);
        res.status(200).json({
            msg: post
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
}));
exports.postRouter.get('/:id', (req, res) => {
    try {
        const body = req.body;
        const post = (0, db_1.getPostbyId)(body.postId);
        res.status(200).json({
            post: post
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});
exports.postRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const post = yield (0, db_1.deletePost)(postId);
        res.status(200).json({
            msg: post
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: error
        });
        return;
    }
}));
