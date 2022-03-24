import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import profileAvatar from '../../../Images/avatar4.png';


function OpenComment({ openCommentBox }) {

    return (
        
        <div className="index-product-reaction-comments">
           < BiMessageSquareEdit onClick = { openCommentBox } className="nav-icon"/>Reviews
        </div>

    )

}

// star
function Star({ 
    starCount, 
    starSeller, 
    product, 
    user, 
    starsUserRecieved, 
    starIconClassName,
    iconWrapperClassName,
    setStarsUserRecieved,
     setStarCount 
}) {

    let starIcon;

    if (starCount) {

        starIcon = <AiFillStar className={ starIconClassName || "nav-icon" }  />

    } else {

        starIcon = < AiOutlineStar className={ starIconClassName || "nav-icon" }  /> 

    }

    return (

        <div className= { iconWrapperClassName || "index-product-profile-star"} onClick = { ()=> starSeller(product, user, starCount, setStarsUserRecieved, setStarCount) }>
          {starIcon}
            { 
                (starsUserRecieved && starsUserRecieved.length) ? 
                starsUserRecieved.length : ''
            }
        </div>

    )

}

// Heart
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
    ...props 
}) {

    let heartIcon;

    if (likeCount) {

        heartIcon = <AiFillHeart className={ heartIconClassName || "nav-icon" } />

    } else {

        heartIcon = < AiOutlineHeart className={ heartIconClassName || "nav-icon" } />

    }

    return (

        <div className= {iconWrapperClassName || "index-product-heart-bttn"} onClick = { ()=> likeProduct(product, user, likeCount, setLikesProductRecieved, setLikeCount) }>
          { heartIcon }
            { 
                (likesProductRecieved && likesProductRecieved.length) ? 
                likesProductRecieved.length : ''
            }
        </div>

    )

}

function ProfileAvatar({ product, brandName, imageWrapperClassName }) {

    const sellerBrandName = product?.brandName ?? product?.userName ?? brandName;

    const viewSeller = (product) => {
        // TODO... call view context function to save view id and redirect to view page
        // const { userId } = product;
    }

    const imageSrc = (product?.userProfileImage === "no-image" || !product?.userProfileImage ) ? null : product?.userProfileImage 

    return (

        <div className={ imageWrapperClassName || "index-product-profile" }>
            <img src={ imageSrc || profileAvatar } alt="seller" width="100%" height="auto" />
            <span onClick = { viewSeller(product) }> { sellerBrandName } </span>
        </div>
        
    )
   
}

export {
    OpenComment,
    Star,
    ProfileAvatar,
    Heart,
}