"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const postRouter_1 = require("./routes/postRouter");
const adminRouter_1 = require("./routes/adminRouter");
const userRouter_1 = require("./routes/userRouter");
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/post", postRouter_1.postRouter);
app.use("/admin", adminRouter_1.adminRouter);
app.use("/user", userRouter_1.userRouter);
app.get('/check', (req, res) => {
    res.json({
        msg: "Server is Healthy"
    });
});
app.listen(3000, () => {
    console.log("Server started Successfully");
});
