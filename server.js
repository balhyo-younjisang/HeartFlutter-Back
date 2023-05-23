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
dotenv.config();

const app = express();
const PORT = 3000;

const logger = morgan("dev");

app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 1000 // 1000 hours
    }
}))
app.use("/", globalRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening http://localhost:${PORT} 🚀`);
})

app.use((req, res) => {
    return res.send("404"); // 404 error
})

export default app;