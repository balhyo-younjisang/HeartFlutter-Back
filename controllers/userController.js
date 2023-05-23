import User from "../models/User.js";
import bcrypt from "bcrypt";

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
    if (!user) return res.send("An account with this username does not exists"); // return error message when user is undefined

    const confirm = await bcrypt.compare(password, user.password); // check password
    if (!confirm) return res.send("Wrong password"); // return error message when password is incorrect

    req.session.user = user; // save the user data in session
    req.session.loggedIn = true; // logged in
    return res.send("Login success");
}

export const logout = async (req, res) => {
    req.session.destroy(); // delete session
    return res.send("logout");
}

export const deleteUser = async (req, res) => {
    const { _id } = req.session.user; // find user _id in session
    await User.findByIdAndDelete(_id); // find and delete user data at DB
    return res.send("delete User account");
}