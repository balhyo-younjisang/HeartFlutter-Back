import { promisify } from "util";
import jwt from "jsonwebtoken";
import redisClient from "./redis.js";
const secret = process.env.JWT_KEY;

export const sign = (email) => {
    const payload = {
        email: email
    };

    return jwt.sign(payload, secret, { // sign at secret and return
        algorithm: "HS256", // encryption algorithm
        expiresIn: '1h', // expiration period
    });
};

export const verify = (token) => { // verification access token
    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
        return {
            type: true,
            email: decoded.email,
        };
    } catch (err) {
        return {
            type: false,
            message: err.message,
        }
    }
};

export const refresh = () => { // Issued refresh token
    return jwt.sign({}, secret, { // Issued refresh token without payload 
        algorithm: 'HS256',
        expiresIn: "1h",
    })
};

export const refreshVerify = async (token, userId) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);

    try {
        const data = await getAsync(userId); // get refresh token
        if (token === data) {
            try {
                jwt.verify(token, secret);
                return true;
            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

