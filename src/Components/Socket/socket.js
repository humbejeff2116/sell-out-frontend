import socketIOClient from "socket.io-client";
import { API_DOMAIN } from '../../Config/config';

const APIENDPOINT = `https://${API_DOMAIN}`;
const socket  = socketIOClient(APIENDPOINT, {
    // reconnection: true,
    reconnectionAttempts: 5, 
    reconnectionDelay: 10000,
    rejectUnauthorized: false
});

socket.on('connect', function () {
    socket.sendBuffer = [];
    console.log("socket connection status: SUCCESS");
});

socket.on('disconnect', function () {
    console.log("socket connection status: DISCONNECTED");
})

export default socket;