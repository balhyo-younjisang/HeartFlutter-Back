import { verify } from "../jwt-utils.js";

export const authJwt = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1]; // get access token at the headers
        const result = verify(token); // verify tokeb
        if (result.ok) { // go to callback
            req.email = result.email;
            next();
        } else { // if failed, return
            res.status(401).send({
                ok: false,
                message: result.message, //  If jwt has expired, the message is 'jwt expired'
            });
        }
    }
}