
import React from 'react';
import { Link } from 'react-router-dom';
import { RiGitRepositoryLine } from 'react-icons/ri';
import styles from './EmptyState.module.css';


export function ErrorState({ 
    imageSrc, 
    imageAlt, 
    heading, 
    writeUp,
    dontShowReloadButton,
    reloadContent,
    reloadButtonText, 
    ...props 
}) {
    return (
        <EmptyState
        imageSrc = { imageSrc }
        imageAlt = { imageAlt }
        heading = { heading }
        writeUp = { writeUp }
        >
        {
            dontShowReloadButton ? "" : (
                <ReloadButton
                reloadContent = { reloadContent }
                reloadButtonText ={ reloadButtonText }
                />
            )
        }
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
    children, 
    ...props 
}) {
    return (
        <div className={ emptyContainerClassName || styles.emptyContainer }>
            <div className={ emptyContentWrapperClassName || styles.emptyContentWrapper }>
                <div className={ styles.emptyImageWrapper }>
                    <img src ={ imageSrc } alt ={imageAlt || ""} />
                </div>
                <div className={ styles.emptyHeader }>
                    { heading }
                </div>
                <div className={ styles.emptyBody }>
                    { writeUp } 
                </div>
                { children }
            </div>
        </div> 
    )
}


export function ReloadButton({ 
    reloadContent, 
    reloadButtonText, 
    ...props 
}) {
    return (
        <div className={ styles.reloadButtonWrapper }>
            <button className={ styles.reloadButton } onClick={ reloadContent }>
                < RiGitRepositoryLine className={ styles.reloadButtonIcon }/>
                { reloadButtonText || "Reload" }
            </button>
        </div>
    )
}

export function EmptyStateButton({ 
    reloadContent, 
    useLinkButton,
    emptyStateButtonText,
    href,
    ...props 
}) {
    if (useLinkButton) {
        return (
            <div className={ styles.reloadButtonWrapper }>
                <Link className={ styles.reloadButton } to={ href }>
                    < RiGitRepositoryLine className={ styles.reloadButtonIcon }/>
                    { emptyStateButtonText }
                </Link>
            </div>
        )
    }
    return (
        <div className={ styles.reloadButtonWrapper }>
            <button className={ styles.reloadButton } onClick={ reloadContent }>
                < RiGitRepositoryLine className={ styles.reloadButtonIcon }/>
                { emptyStateButtonText || "Reload" }
            </button>
        </div>
    )
}