import express from "express";
import { postHome } from "../controllers/globalController.js";
import { authJwt } from "../middlewares/authJwt.js";

const globalRouter = express.Router();

globalRouter.route("/").all(authJwt).post(postHome); // return data needed for home display

export default globalRouter;