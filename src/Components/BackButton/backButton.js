
import React from 'react'
import { useHistory } from 'react-router-dom';
// import { TiArrowBack, TiArrowBackOutline } from 'react-icons/ti'
import { RiArrowGoBackFill } from 'react-icons/ri'


export default function BackButton({ 
    buttonWrapperClassName, 
    buttonIcon, 
    buttonIconClassName, 
    sessionStorageKey 
}) {
    const history = useHistory();

    const goBack = (history, sessionStorageKey) => {
        if (sessionStorageKey) {
            sessionStorage.removeItem(sessionStorageKey);
            return history.goBack();
        }
        return history.goBack();
    }

    return(
        <div className={buttonWrapperClassName} >
            <button onClick={ ()=> goBack(history, sessionStorageKey) } >
                { buttonIcon  || <RiArrowGoBackFill className={ buttonIconClassName || "index-search-filter-icon" }/> }
            </button>
        </div>      
    )
}