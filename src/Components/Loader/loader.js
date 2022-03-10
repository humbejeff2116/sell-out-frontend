
import React from 'react';
import './loader.css';


export function Loader({loaderContainer, loader, ...props}) {

    return (

        <div className={loaderContainer} >
            <div className={loader}> </div>
        </div>

    )
    
}