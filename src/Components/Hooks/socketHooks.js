
import {useState, useEffect } from 'react';
import socket from '../Socket/socket';


export default function useSocketIsConnected() {
    const [socketIsConnected, setSocketIsConnected] = useState(false);

    useEffect(()=> {
        if (socket.connected) {
            setSocketIsConnected(true);      
        } else {
            socket.on('connect', ()=> {
                setSocketIsConnected(true)    
            });
        }
    }, [socketIsConnected]);

    return socketIsConnected; 
}