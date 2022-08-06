import React from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import profileAvatar from '../../../Images/avatar4.png';


function ReviewsIconWrapper({ openReviews, dontShowReviews }) {
    const reviewsIconContainerClassName = dontShowReviews ? (
        "index-product-reviews-icon-container dont-show" 
    ) : (
        "index-product-reviews-icon-container"
    )

    const reviewsIconClassName = dontShowReviews ? (
        "index-product-reviews-icon" 
    ) : (
        "index-product-reviews-icon"
    )
    return (
        <div 
        className={ reviewsIconContainerClassName } 
        disabled = { dontShowReviews ? true : false } 
        onClick = { openReviews  }
        >
           < BiMessageSquareEdit  className={ reviewsIconClassName }/>Reviews
        </div>
    )
}

function ProfileAvatar({ product, brandName, imageWrapperClassName }) {
    const sellerBrandName = product?.brandName ?? product?.userName ?? brandName;
    const viewSeller = (product) => {}
    const imageSrc = (product?.userProfileImage === "no-image" || !product?.userProfileImage) ? null : product?.userProfileImage 

    return (
        <div className={ imageWrapperClassName || "index-product-profile" }>
            <img src={ imageSrc || profileAvatar } alt="seller" width="100%" height="auto" />
            <span onClick = { viewSeller(product) }>{ sellerBrandName }</span>
        </div>   
    )  
}

export {
    ReviewsIconWrapper,
    ProfileAvatar,
}