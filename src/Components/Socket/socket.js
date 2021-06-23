


import socketIOClient from "socket.io-client";
const APIENDPOINT = "http://localhost:4000";


 const socket  = socketIOClient(APIENDPOINT, {'forceNew': true })
 export default socket;