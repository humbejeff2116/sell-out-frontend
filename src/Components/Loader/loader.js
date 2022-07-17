
import React from 'react';
import PropTypes from 'prop-types'
import styles from './Loader.module.css';
import './loader.css';


export function Loader({loaderContainer, loader, ...props}) {
    return (
        <div className={loaderContainer} >
            <div className={loader}> </div>
        </div>
    ) 
}

export function BottomSPinner({ 
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

BottomSPinner.propTypes = {
    showLoader: PropTypes.bool, 
    loaderContainerClass: PropTypes.string, 
    spinnerContainerClass: PropTypes.string, 
    spinnerClass: PropTypes.string,
    children: PropTypes.any
}