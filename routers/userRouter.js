import express from "express";
import { postJoin, postLogin, logout, deleteUser } from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares/middleware.js";

const userRouter = express.Router();

userRouter.route("/login").all(protectorMiddleware).post(postLogin); // login
userRouter.route("/join").all(protectorMiddleware).post(postJoin); // join
userRouter.route("/delete").all(publicOnlyMiddleware).get(deleteUser); // delete user data
userRouter.route("/logout").all(publicOnlyMiddleware).get(logout); // logout

export default userRouter;