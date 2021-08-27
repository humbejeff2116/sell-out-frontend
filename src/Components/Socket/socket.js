


import socketIOClient from "socket.io-client";
const APIENDPOINT = "http://localhost:4000";


 const socket  = socketIOClient(APIENDPOINT,{reconnection: true, reconnectionDelay: 10000});
 socket.on('connect', function() {
    socket.sendBuffer = [];
    console.log("conneted now")

 });
 socket.on('disconnect', function(){
     console.log("socket has disconnected");
 })

 export default socket;