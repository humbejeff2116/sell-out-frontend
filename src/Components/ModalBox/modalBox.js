
import React from 'react';
import PropTypes from 'prop-types'
import { RiCloseFill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import styles from './ModalBox.module.css';


export const useBottomPopUpFor = {
    success: "success",
    error: "error"
}
export function BottomPopUpBox({ 
    usedFor, 
    errorContainerClassName,
    messageWrapperClassName,
    closeClassName,
    closeIconClassName, 
    message,
    closePopUp,
    showPopUp,
    ...props 
}) {
    const { success, error } = useBottomPopUpFor;

    if (usedFor === success) {
        return (
            <div className={ 
                showPopUp ? (
                    `${styles.popupContainer} ${styles.success} ${styles.showPopUp}`
                ) : (
                    `${styles.popupContainer} ${styles.success}`
                )
            }>
                <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                    <IoMdCheckmarkCircleOutline className={
                        `${styles.icon} ${styles.successIcon}`
                    }/>
                    { message }
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                    <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
                </div>
            </div> 
        )
    }

    if (usedFor === error) {
        return (
            <div className={ 
                showPopUp ? (
                    `${styles.popupContainer} ${styles.error} ${styles.showPopUp}`
                ) :(
                     `${styles.popupContainer} ${styles.error}`
                )
            }>
                <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                <IoMdCheckmarkCircleOutline className={
                    `${styles.icon} ${styles.erroIcon}`
                }/>
                    { message }
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                    <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
                </div>
            </div> 
        )
    }

    return (
        <div className={ 
            showPopUp ? (
                `${styles.popupContainer} ${styles.showPopUp}`
            ) : (
                `${styles.popupContainer}`
            )
        }>
            <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                { message }
            </div>
            <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
            </div>
        </div> 
    )  
}

BottomPopUpBox.propTypes = {
    usedFor: PropTypes.string, 
    errorContainerClassName: PropTypes.string,
    messageWrapperClassName: PropTypes.string,
    closeClassName: PropTypes.string,
    closeIconClassName: PropTypes.string, 
    message: PropTypes.string,
    closePopUp: PropTypes.func,
    showPopUp: PropTypes.bool,
    props: PropTypes.object
}

export function BottomErrorPopUpBox({ 
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
                `${styles.popupContainer} ${styles.error} ${styles.showPopUp}`
            ) :(
                `${styles.popupContainer} ${styles.error}`
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

BottomErrorPopUpBox.propTypes = {
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


export function TopPopUpBox({ 
    usedFor, 
    errorContainerClassName,
    messageWrapperClassName,
    closeClassName,
    closeIconClassName, 
    message,
    closePopUp,
    showPopUp,
    ...props 
}) {
    const { success, error } = useBottomPopUpFor;

    if (usedFor === success) {
        return (
            <div className={ 
                showPopUp ? (
                    `${styles.popupContainer} ${styles.popupContainerTop} ${styles.success} ${styles.showPopUp}`
                ) : (
                    `${styles.popupContainer} ${styles.popupContainerTop} ${styles.success}`
                )
            }>
                <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                    <IoMdCheckmarkCircleOutline className={
                        `${styles.icon} ${styles.successIcon}`
                    }/>
                    { message }
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                    <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
                </div>
            </div> 
        )
    }

    if (usedFor === error) {
        return (
            <div className={ 
                showPopUp ? (
                    `${styles.popupContainer} ${styles.error} ${styles.showPopUp}`
                ) :(
                     `${styles.popupContainer} ${styles.error}`
                )
            }>
                <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                <IoMdCheckmarkCircleOutline className={
                    `${styles.icon} ${styles.erroIcon}`
                }/>
                    { message }
                </div>
                <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                    <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
                </div>
            </div> 
        )
    }

    return (
        <div className={ 
            showPopUp ? (
                `${styles.popupContainer} ${styles.showPopUp}`
            ) : (
                `${styles.popupContainer}`
            )
        }>
            <div className={ messageWrapperClassName || styles.popupTextWrapper }>
                { message }
            </div>
            <div className={ closeClassName || styles.closeContainer } onClick={ closePopUp } >
                <RiCloseFill className={ closeIconClassName || styles.closeIconWrapper }/>
            </div>
        </div> 
    )  
}