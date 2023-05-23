import express from "express";
import { postJoin, postLogin, logout, deleteUser } from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares/middleware.js";

const userRouter = express.Router();

userRouter.route("/login").all(publicOnlyMiddleware).post(postLogin); // login
userRouter.route("/join").all(publicOnlyMiddleware).post(postJoin); // join
userRouter.route("/delete").all(protectorMiddleware).get(deleteUser); // delete user data
userRouter.route("/logout").all(protectorMiddleware).get(logout); // logout

export default userRouter;