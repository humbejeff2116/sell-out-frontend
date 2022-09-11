
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyState.module.css';
import { AiOutlineReload } from 'react-icons/ai';


export function ErrorState({ 
    imageSrc, 
    imageAlt, 
    heading, 
    writeUp,
    dontShowReloadButton,
    reloadContent,
    reloadButtonText
}) {
    return (
        <EmptyState
        imageSrc = { imageSrc }
        imageAlt = { imageAlt }
        heading = { heading }
        writeUp = { writeUp }
        >
        {dontShowReloadButton ? "" : (
            <ReloadButton
            handleClick = { reloadContent }
            reloadButtonText ={ reloadButtonText }
            />
        )}
        </EmptyState>
    )
}

export default function EmptyState({ 
    imageSrc, 
    imageAlt, 
    heading, 
    writeUp,
    emptyContainerClassName,
    emptyContentWrapperClassName,
    emptyImageWrapperClassName,
    emptyHeaderclassName,
    emptyBodyClassName, 
    children 
}) {
    return (
        <div className={ emptyContainerClassName || styles.emptyContainer }>
            <div className={ emptyContentWrapperClassName || styles.emptyContentWrapper }>
                <div className={ emptyImageWrapperClassName || styles.emptyImageWrapper }>
                    <img src ={ imageSrc } alt ={imageAlt || ""} />
                </div>
                <div className={ emptyHeaderclassName || styles.emptyHeader }>
                    { heading }
                </div>
                <div className={ emptyBodyClassName || styles.emptyBody }>
                    { writeUp } 
                </div>
                { children }
            </div>
        </div> 
    )
}


export function ReloadButton({ 
    handleClick, 
    reloadButtonText
}) {
    return (
        <div className={ styles.reloadButtonWrapper }>
            <button className={ styles.reloadButton } onClick={ handleClick }>
                <AiOutlineReload className={ styles.reloadButtonIcon }/>
                { reloadButtonText || "Reload" }
            </button>
        </div>
    )
}

export function EmptyStateButton({ 
    handleClick, 
    useLinkButton,
    emptyStateButtonText,
    buttonIcon,
    href 
}) {
    if (useLinkButton) {
        return (
            <div className={ styles.reloadButtonWrapper }>
                <Link className={ styles.reloadButton } to={ href }>
                { buttonIcon }
                { emptyStateButtonText }
                </Link>
            </div>
        )
    }
    return (
        <div className={ styles.reloadButtonWrapper }>
            <button className={ styles.reloadButton } onClick={ handleClick }>
            { buttonIcon }
            { emptyStateButtonText }
            </button>
        </div>
    )
}