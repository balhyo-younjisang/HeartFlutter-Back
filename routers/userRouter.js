import express from "express";
import { postJoin, postLogin, logout, deleteUser } from "../controllers/userController.js";
import { authJwt } from "../middlewares/authJwt.js";
import { refresh } from "../refresh.js";

const userRouter = express.Router();

userRouter.route("/login").post(postLogin); // login
userRouter.route("/join").post(postJoin); // join
userRouter.route("/refresh").get(refresh);
// userRouter.route("/delete").all(protectorMiddleware).get(deleteUser); // delete user data
// userRouter.route("/logout").all(protectorMiddleware).get(logout); // logout

export default userRouter;