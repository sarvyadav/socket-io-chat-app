const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
//all above packages for running the server using socket.io smoothly
// cors is used for configuring the connection related issues

app.use(cors());
 
const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET", "POST"],
    },
});

//for connecting and disconnecting to the server using socket.io
io.on("connection", (socket) =>{
    console.log(`user connected : ${socket.id}`);

    //joining the room with room id(data) received from client
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user with id : ${socket.id} joined room : ${data}`);
    });

socket.on("send_message", (data) =>{
    //sending the message to other person in the room that was received on the 
    //backend by the firs person
    socket.to(data.room).emit("receive_message",data);
});

    socket.on("disconnect", () =>{
        console.log("user disconnected : ", socket.id);
    });
});

server.listen(3001, () =>{
    console.log("server running perfectly");
})