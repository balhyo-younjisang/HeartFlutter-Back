import { Server } from "socket.io"
import { createServer } from "http"; // for socket server

export const webSocket = (server) => {
    //create http socket.io server
    const httpServer = createServer();
    const io = new Server(httpServer);

    const coupleServer = io.of("/serverRoom"); // create namespace

    coupleServer.on("connection", (socket) => {
        socket.on("join", (params) => {
            socket.join(params.serverCode);
        })

        socket.on("getLocation", (params) => {
            coupleServer.in(params.serverCode).emit("location", params);
        })

        socket.on("leave", (params) => {
            socket.leave(params.serverCode);
        })
    });

    httpServer.listen(8005, () => {
        console.log("httpServer is listening on 8005 port");
    });
}