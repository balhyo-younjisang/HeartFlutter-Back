import express from "express";
import { postHome } from "../controllers/globalController.js";
import { protectorMiddleware } from "../middlewares/middleware.js";

const globalRouter = express.Router();

globalRouter.route("/").all(protectorMiddleware).post(postHome); // return data needed for home display

export default globalRouter;