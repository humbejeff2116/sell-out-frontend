
import React from 'react';
import PropTypes from 'prop-types'
import { RiCloseFill } from "react-icons/ri";
import styles from './ModalBox.module.css'

export function ErrorModal({ 
    errorContainerClassName,
    errorContainerShowClassName,
    panelClassName,
    closeClassName,
    closeIconClassName, 
    message,
    closePopUp,
    showPopUp,
    ...props 
}) {
    return (
        <div className={ 
            showPopUp ? (
                `${styles.popupContainer} ${styles.showPopUp}`
            ) :(
                `${styles.popupContainer}`
            )
        }>
            <div className={ panelClassName || styles.popupTextWrapper }>
                { message }
            </div>
            <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
            </div>
        </div> 
    )
}

ErrorModal.propTypes = {
    errorContainerClassName: PropTypes.string,
    errorContainerShowClassName: PropTypes.string,
    panelClassName: PropTypes.string,
    closeClassName: PropTypes.string,
    closeIconClassName: PropTypes.string,
    message: PropTypes.string,
    closePopUp: PropTypes.func,
    showPopUp: PropTypes.bool,
    props: PropTypes.object
}
