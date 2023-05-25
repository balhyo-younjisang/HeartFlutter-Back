import express from "express";
import { createServer, deleteServer, enterServer, leaveServer } from "../controllers/serverController.js";

const serverRouter = express.Router();

serverRouter.route("/create").get(createServer); // create Server
serverRouter.route("/delete").get(deleteServer); // delete Server
serverRouter.route("/enter").post(enterServer); // enter Server
serverRouter.route("/leave").get(leaveServer); // leave Server

export default serverRouter;