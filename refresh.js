import { sign, verify, refreshVerify } from "./jwt-utils.js";
import jwt from "jsonwebtoken";

export const refresh = async (req, res) => {
    if (req.headers.authorization && req.headers.refresh) { // check access token and refresh token
        const authToken = req.headers.authorization.split('Bearer ')[1];
        const refreshToken = req.headers.refresh;

        const authResult = verify(authToken); // access token verification 
        const decoded = jwt.decode(authToken); // Decoding access token and get user data

        if (decoded === null) { // not allowed
            res.status(401).send({
                ok: false,
                message: "Not allowed",
            })
        }

        // refresh token verification
        const refreshResult = refreshVerify(refreshToken, decoded.email);

        // access token expiration
        if (!authResult.ok && authResult.message === 'jwt expired') {
            if (!refreshResult.ok) { // access token and refresh token both expired
                res.status(401).send({
                    ok: false,
                    message: "Not allowed",
                });
            } else {
                // Issued new access token
                const newAccessToken = sign(user);

                res.status(200).send({
                    ok: true,
                    data: {
                        accessToken: newAccessToken,
                        refreshToken,
                    }
                });
            }
        }
    } else { // not expired access token
        res.status(400).send({
            ok: false,
            message: 'Access token and refresh token are need for refresh!',
        });
    }
}