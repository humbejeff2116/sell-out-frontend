
import React, { useState, useEffect } from 'react';
import ModalReviews from '../ModalReviews/modalReviews';
import { SingleImageComponent } from './ImageComp/imageComp';
import { ReviewsIconWrapper, ProfileAvatar } from './Fragments/productFragments';
import StarGiver from '../StarGiver/starGiver';
import HeartGiver from '../HeartGiver/heartGiver';
import './product.css';


export  function DisplayedProduct({ 
    product,
    panelClassName,
    dontShowModal,
    dontShowReviews,
    showLikes,
    productUsedOutsideLogin,
    ...props
}) {
    const [showReviews, setShowReviews] = useState(false);
    const [showReviewsChild, setShowReviewsChild] = useState(false);
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    },[timer])

    const openReviewBox = () => {
        setShowReviews(true);
        timer = setTimeout(() => {
            setShowReviewsChild(true);
        }, 300);
    }

    const closeReviewBox = () => {
        setShowReviewsChild(false);
        timer = setTimeout(() => {
            setShowReviews(false);
        }, 800);
    }  

    return ( 
        <>
            {dontShowModal ? "" : showReviews && (
                <ModalReviews 
                product = { product }
                closeReviewBox = { closeReviewBox }
                handleClose = { closeReviewBox }
                showModalChild = { showReviewsChild }
                />
            )}
            <div className = { panelClassName || "index-product-panel" }>
                <div className="index-product-profile-panel">
                    <ProfileAvatar product = { product } />
                    <StarGiver
                    product = { product }
                    />
                </div>
                <div className="index-product-image-wrapper">
                    <SingleImageComponent 
                    product = { product } 
                    image = { product.productImages[0] }
                    usedOutsideLogin = { productUsedOutsideLogin }
                    />
                    <div className="index-product-image-details">
                        <div className="index-product-details-name">
                            <span>{ product.productName }</span>
                        </div>
                        <Price { ...product }/>
                    </div>
                </div>
                <div className="index-product-bottom-panel">
                    <ReviewsIconWrapper 
                    openReviews = { openReviewBox }
                    dontShowReviews = { dontShowReviews }
                    /> 
                    <div className="index-product-likes-container">
                        <HeartGiver
                        product = { product }
                        showLikes = { showLikes }
                        />
                    </div> 
                </div>
            </div>
        </>
    )
}


export function Price({ percentageOff, productPrice, className, showPriceTag }) {
    const priceContainerClass = className ? className : "index-product-details-price";

    if (percentageOff) {
        const percentOffPrice = (percentageOff / 100) * parseFloat(productPrice)
        const newPrice = (parseFloat(productPrice) - percentOffPrice).toFixed(2, 10);

        if (!showPriceTag) {
            return (
                <div className={ priceContainerClass }>
                    <div> 
                        <span className="price"> £{ newPrice } {`(${ percentageOff }% OFF)` }</span> <span className="original-price">£{ parseFloat( productPrice).toFixed(2, 10) }</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={ priceContainerClass }>
                    <div>
                        Price: <span className="price"> £{ newPrice } {`(${ percentageOff }% OFF)` }</span> <span className="original-price">£{ parseFloat( productPrice).toFixed(2, 10) }</span>
                    </div>
                </div>
            )
        }
    }

    if (!percentageOff) {
        if (showPriceTag) {
             return (
                <div className={ priceContainerClass }>
                    <div>
                        Price: <span className="price"> £{parseFloat(productPrice).toFixed(2, 10)}</span> 
                    </div>
                </div>
            )
        } else {
            return (
                <div className={ priceContainerClass }>
                    <div> 
                        <span className="price"> £{parseFloat(productPrice).toFixed(2, 10)}</span>
                    </div>
                </div>
            )
        }
    }
}