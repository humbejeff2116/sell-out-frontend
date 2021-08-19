


import socketIOClient from "socket.io-client";
const APIENDPOINT = "http://localhost:4000";


 const socket  = socketIOClient(APIENDPOINT,{forceNew: true, reconnectionDelay: 10000});
 socket.on('connect', function() {
    socket.sendBuffer = [];
    console.log("conneted now")

 });

 export default socket;