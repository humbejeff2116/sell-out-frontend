




import React from 'react';



export function ErrorModal(props) {
    return (
        <div className={props.errorContainerClassName}>
            <div className={props.panelClassName}>
            <span>
                {props.errorMessage}
            </span>
            </div>
        </div> 
    )
}