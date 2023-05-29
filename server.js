import "./db.js"
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import globalRouter from "./routers/globalRouter.js";
import serverRouter from "./routers/serverRouter.js";
import { webSocket } from "./socket.js";
import { authJwt } from "./middlewares/authJwt.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const logger = morgan("dev");

app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/server", authJwt, serverRouter);
app.use((req, res) => {
    return res.send("404"); // 404 error
});

const server = app.listen(PORT, () => {
    console.log(`Server is listening http://localhost:${PORT} 🚀`);
})


webSocket(server); // connect webSocket and express server

export default app;