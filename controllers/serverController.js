import Server from "../models/Server.js";
import User from "../models/User.js";

// create random string function
const randomString = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 6
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
        const rnum = Math.floor(Math.random() * chars.length)
        randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
}

// Create server
export const createServer = async (req, res) => {
    const {
        session: {
            user: { email }
        }
    } = req; // find user email
    const members = [email]; // append email at member list

    //create random server code of 6 digit

    let serverCode = randomString();
    while (!(await Server.find({ serverCode }))) {
        serverCode = randomString();
    }

    // save the server data
    await Server.create({
        code: serverCode,
        members,
        level: 0,
        click: 0,
        premium: false,
    });

    const serverCodeValue = { server: serverCode };
    await User.findOneAndUpdate({ email }, serverCodeValue); // find user and update

    return res.send("Success create server"); // return success message
}

// Delete server
export const deleteServer = async (req, res) => {
    const { body: { serverCode }, session: { user: { email } } } = req; // user entered server code in client

    const serverExists = await Server.exists({ code: serverCode }); // Find server data
    if (!serverExists) return res.send("Server is not found");

    const server = await Server.findOne({ code: serverCode });
    if (server.members.length !== 0) return res.send("Server is in use"); // If the member is in the server, the server must not be deleted
    if (server.members.indexOf(email) === -1) return res.send("This is not your server");

    await Server.findOneAndDelete(serverCode);
    return res.send("server is successfully delete");
}

export const enterServer = async (req, res) => {
    const { body: { serverCode }, session: { user: { email } } } = req;
    const server = await Server.find({ code: serverCode });

    if (!server) return res.send("Not found server"); // server is undefined

    await User.findOneAndUpdate({ email }, { server: serverCode }); // update user data
    await Server.findOneAndUpdate({ code: serverCode }, { $push: { members: email } }); // update Server data

    return res.send("successfully enter the server"); // return success message
}

export const leaveServer = async (req, res) => {
    const { body: { serverCode }, session: { user: { email } } } = req;
    await User.findOneAndUpdate({ email }, { server: null }); // update user data 
    await Server.findOneAndUpdate({ code: serverCode }, { $pullAll: { members: [email] } }); // update Server data


    return res.send("successfully leave the server");
}