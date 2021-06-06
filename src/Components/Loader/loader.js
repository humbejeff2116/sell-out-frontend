


import React from 'react';
import './loader.css';


export function Loader(props) {
    return (
        <div className={props.loaderContainer} >
            <div className={props.loader}> </div>
        </div>
    )
}