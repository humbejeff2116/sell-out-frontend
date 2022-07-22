import React from 'react';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
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

function Star({ 
    starCount, 
    starSeller, 
    product, 
    user, 
    starsUserRecieved, 
    starIconClassName,
    iconWrapperClassName,
    setStarsUserRecieved,
    setStarCount,
    ...props 
}) {
    let starIcon;
    let starsLength = starsUserRecieved.length; 

    if (starCount) {
        starIcon = <AiFillStar className={ starIconClassName || "nav-icon" }/>
    } else {
        starIcon = < AiOutlineStar className={ starIconClassName || "nav-icon" }/> 
    }

    return (
        <div 
        className= { iconWrapperClassName || "index-product-profile-star" } 
        onClick = { ()=> starSeller(product, user, starCount, setStarsUserRecieved, setStarCount) }
        >
            { starIcon } { starsUserRecieved && starsLength > 0  && starsLength }
        </div>
    )
}

function Heart({ 
    likeCount, 
    likeProduct, 
    product, 
    user, 
    likesProductRecieved, 
    iconWrapperClassName,
    heartIconClassName,
    setLikesProductRecieved, 
    setLikeCount,
    showLikes, 
    ...props 
}) {
    let heartIcon;
    const likes = likesProductRecieved.length

    if (likeCount) {
        heartIcon = <AiFillHeart className={ heartIconClassName || "nav-icon" }/>
    } else {
        heartIcon = < AiOutlineHeart className={ heartIconClassName || "nav-icon" }/>
    }

    return (
        <div 
        className= { iconWrapperClassName || "index-product-heart-bttn" } 
        onClick = { ()=> likeProduct(product, user, likeCount, setLikesProductRecieved, setLikeCount) }
        >
        { heartIcon } { showLikes ? (likesProductRecieved && likes > 0  && likes) : "" }  
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
    Star,
    ProfileAvatar,
    Heart,
}