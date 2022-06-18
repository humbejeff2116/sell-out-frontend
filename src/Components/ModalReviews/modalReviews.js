
import React from 'react';
import { RiCloseFill } from "react-icons/ri";
import { DisplayedProduct } from '../Product/product';
import { ReviewsBox } from './ReviewsBox/reviewsBox';
import styles from './ModalReviews.module.css';

export default function ModalReviews({ handleClose, show, ...props }) {
    return(
        <div className={ styles.reviewsContainer }>
            <div className={ styles.bttnWrapper }>
                <RiCloseFill className="nav-icon"  onClick={ handleClose }/>
            </div> 
            <div className={ styles.wrapper }>
                <div className={ styles.panel }>                   
                    <DisplayedProduct 
                    product = { props.product }
                    dontShowModal
                    dontShowReviews
                    // panelClassName = { styles.productPanel }
                    />
                    <ReviewsBox
                    product = { props.product }
                    closeReviewsBox = { props.closeReviewBox }
                    reviewsBoxPanelClassName = { styles.reviewsPanel }
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
                <div className={ styles.bttnWrapper }>
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