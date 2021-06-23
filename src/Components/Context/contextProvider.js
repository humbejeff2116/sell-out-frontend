






import React, { useEffect } from 'react';
import MyContext from './context';
import socket from '../Socket/socket';




export default function ContextProvider(props) {
   

    useEffect(()=>{
        setStateOnload();

    },[])

    const setStateOnload = ( )=> {
     
    }

    return(
        <MyContext.Provider
            value={{
                socket
                
            }}
        >
            {props.children}
        </MyContext.Provider>
    )
}
