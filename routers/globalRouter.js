import express from "express";
import { getHome } from "../controllers/globalController.js";

const globalRouter = express.Router();

globalRouter.route("/").get(getHome); // return data needed for home display

export default globalRouter;