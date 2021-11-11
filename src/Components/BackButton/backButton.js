
import React from 'react'
import { useHistory } from 'react-router-dom'





export default function BackButton({ buttonWrapperClassName, buttonIcon }) {
    const history = useHistory();
    return(
        <div className={buttonWrapperClassName} >
            <i>{ buttonIcon || '' }</i><button onClick={()=>history.goBack()} > go back </button>
        </div>      
    )
}