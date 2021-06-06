






import React, { useEffect, useState } from 'react';
import MyContext from './context';




export default function ContextProvider(props) {
   

    useEffect(()=>{
        setStateOnload();

    },[])

    const setStateOnload = ( )=> {
     
    }

    return(
        <MyContext.Provider
            value={{
                
            }}
        >
            {props.children}
        </MyContext.Provider>
    )
}
