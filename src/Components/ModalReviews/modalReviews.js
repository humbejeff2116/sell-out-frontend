
import React, { useState, useEffect } from 'react';
import { RiCloseFill } from "react-icons/ri";
import { DisplayedProduct } from '../Product/product';
import { ReviewsBox } from './ReviewsBox/reviewsBox';
import styles from './ModalReviews.module.css';

export default function ModalReviews({ 
    handleClose, 
    showModalChild, 
    product, 
    closeReviewBox,
    ...props 
}) {
    const [getReviews, setGetReviews] = useState(false);

    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => setGetReviews(true), 2000);
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [getReviews]);

    const modalChilldClassName = showModalChild ? (
        `${styles.wrapper} ${styles.show}`
    ) :(
        `${styles.wrapper}`
    )

    return(
        <div className={ styles.reviewsContainer }>
            <div className={ styles.bttnWrapper }>
                <RiCloseFill className="nav-icon"  onClick={ handleClose }/>
            </div> 
            <div className={ modalChilldClassName }>
                <div className={ styles.panel }> 
                    <div className={ styles.productWrapper }>
                        <DisplayedProduct 
                        product = { product }
                        dontShowModal
                        dontShowReviews
                        // panelClassName = { styles.productPanel }
                        /> 
                    </div>                                 
                    <ReviewsBox
                    product = { product }
                    closeReviewsBox = { closeReviewBox }
                    reviewsBoxPanelClassName = { styles.reviewsPanel }
                    getReviews = { getReviews }
                    />
                </div>
            </div>
        </div> 
    )
}


export function ModalBox({ 
    modalContainerWrapperName, 
    handleModal, 
    dontUseDefaultModalChildContainer,
    dontShowCloseButton, 
    modalContainer, 
    children,
    ...props 
}) {  
    return(
        <div className={ modalContainerWrapperName || styles.reviewsContainer }>  
        {
            dontShowCloseButton  ? children : (
                <div className={ styles.modalBoxBttnWrapper }>
                    <RiCloseFill className="nav-icon"  onClick={ handleModal }/>
                </div>
            )
        }
        {
            dontUseDefaultModalChildContainer  ? children : (
                <div className={ modalContainer || styles.modalBoxContainer }>
                    { children }
                </div> 
            )
        }
        </div>
    )
}