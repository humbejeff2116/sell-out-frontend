
import React from 'react';
import PropTypes from 'prop-types'
import styles from './Loader.module.css';
import './loader.css';


export function Loader({
    loaderContainer, 
    loader, 
    ...props
}) {
    return (
        <div className={loaderContainer} >
            <div className={loader}> </div>
        </div>
    ) 
}

export function LoaderSmall({
    loaderContainer, 
    loader, 
    unsetMarginTop, 
    ...props
}) {
    return (
        <div className={`loader-small-container ${unsetMarginTop ? "unsetMarginTop" : ""}`} >
            <div className={"loader-small"}> </div>
        </div>
    ) 
}

export function LoaderSmallWithText({
    loaderContainer, 
    loader, 
    unsetMarginTop,
    loadingText
}) {
    return (
        <div className= { styles.loaderSmallWrapper }>
            <LoaderSmall
            loaderContainer = { loaderContainer }
            loader = { loader }
            unsetMarginTop = { unsetMarginTop }
            />
            <div className= { styles.loaderSmallTextWrapper }>
            { loadingText }
            </div>
        </div>
    ) 
}
export function BottomSpinner({ 
    showLoader, 
    loaderContainerClass, 
    spinnerContainerClass, 
    spinnerClass, 
    children
}) {
    return (
        <div className={ 
            showLoader ? (
                `${ loaderContainerClass || styles.loaderContainer} ${styles.showloader}` 
            ) : ( 
                `${ loaderContainerClass || styles.loaderContainer}`
            )
        }>
        <Loader
        loaderContainer={ spinnerContainerClass || styles.spinnerContainer }
        loader ={ spinnerClass || styles.spinner }
        />
        { children }
      </div>
    )
}

BottomSpinner.propTypes = {
    showLoader: PropTypes.bool, 
    loaderContainerClass: PropTypes.string, 
    spinnerContainerClass: PropTypes.string, 
    spinnerClass: PropTypes.string,
    children: PropTypes.any
}