import User from "../models/User.js";

export const protectorMiddleware = (req, res, next) => { // only logged in user
    if (req.session.loggedIn) {
        next();
    } else {
        return res.send("Not authorized");
    }
}

export const publicOnlyMiddleware = (req, res, next) => { // only unknown user
    if (!req.session.loggedIn) next();
    else return res.send("Not authorized");
}