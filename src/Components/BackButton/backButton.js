
import React from 'react'
import { useHistory } from 'react-router-dom'





export default function BackButton({ buttonWrapperClassName, buttonIcon, clearSessionStorageWithKey }) {
    const history = useHistory();
    const goBack = (history, clearSessionStorageWithKey) => {
        if (clearSessionStorageWithKey) {
            sessionStorage.removeItem(clearSessionStorageWithKey);
            return history.goBack();
        }
        return history.goBack();
    }
    return(
        <div className={buttonWrapperClassName} >
            <i>{ buttonIcon || '' }</i><button onClick={()=> goBack(history, clearSessionStorageWithKey ) } > go back </button>
        </div>      
    )
}