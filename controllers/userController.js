import User from "../models/User.js";
import bcrypt from "bcrypt";
import redisClient from "../redis.js";
import { sign, verify, refresh, refreshVerify } from "../jwt-utils.js";

export const postJoin = async (req, res) => {
    const { username, password, confirmPassword, email } = req.body; // get join request data
    const emailExists = await User.exists({ email }); // find email

    if (password !== confirmPassword) return res.send("Not match"); // password confirmation does not match
    if (emailExists) return res.send("This Email is already taken"); // email is already taken

    // create User data at DB
    await User.create({
        username,
        password,
        email
    });
    return res.send("Join success"); // return message
}

export const postLogin = async (req, res) => {
    const { email, password } = req.body; // get login request data
    const user = await User.findOne({ email }); // find user data at DB using email
    if (!user) return res.send({
        ok: false,
        message: "An account with this username does not exists"
    }); // return==-= error message when user is undefined

    const confirm = await bcrypt.compare(password, user.password); // check password
    if (!confirm) return res.send(ok: false, message : "Wrong password"); // return error message when password is incorrect

    // Issued token and refresh token
    const accessToken = sign(user);
    const refreshToken = refresh();

    redisClient.set(user.email, refreshToken); // Save the refresh token

    return res.status(200).send({ // return client
        ok: true,
        data: {
            accessToken,
            refreshToken,
        }
    });
}

export const logout = async (req, res) => {
    // req.session.destroy(); // delete session
    // return res.send("logout");
}

export const deleteUser = async (req, res) => {
    // const { _id } = req.session.user; // find user _id in session
    // req.session.destroy(); // delete session
    await User.findByIdAndDelete(_id); // find and delete user data at DB
    return res.send("delete User account");
}