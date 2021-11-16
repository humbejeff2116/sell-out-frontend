import React from 'react';
import image from '../../../Images/avatar.jpg';
import {  AiOutlineStar, AiFillStar,} from 'react-icons/ai';
import {  BsStar, BsStarFill} from 'react-icons/bs';
import {  BiMessageAltEdit, BiMessageSquareEdit} from 'react-icons/bi';
import {  AiOutlineHeart, AiFillHeart} from 'react-icons/ai';





function OpenComment(props) {
    const {openCommentBox} =props;
    return (
        <div className="index-product-reaction-comments">
           < BiMessageSquareEdit onClick={ openCommentBox } className="nav-icon"/>Reviews
        </div>
    )
}
// star
function Star(props) {
    const { starCount, starSeller, product, user, starsUserRecieved } = props;
    const className =  starCount ? "index-product-profile-star filled" : "index-product-profile-star";
    let starIcon;
    if(starCount) {
        starIcon = <AiFillStar className="nav-icon" />
    }else {
        starIcon = < AiOutlineStar className="nav-icon" /> 
    }

   
    return (
        <div className={className} onClick={()=> starSeller(product, user, starCount)}>
          {starIcon}
            { 
                (starsUserRecieved && starsUserRecieved.length) ? 
                starsUserRecieved.length : ''
            }
        </div>
    )
}

// Heart
function Heart({ userLikedProduct, likeProduct, product, user, likesProductRecieved }) {
    const likeIconClassName = userLikedProduct ? "product-heart-bttn fill" : "product-heart-bttn"
    let heartIcon;
    if (userLikedProduct) {
        heartIcon = <AiFillHeart className="nav-icon" />
    } else {
        heartIcon = < AiOutlineHeart className="nav-icon" /> 
    }

    return (
        <div className={likeIconClassName} onClick={()=> likeProduct(product, user)}>
          {heartIcon}
            { 
                (likesProductRecieved && likesProductRecieved.length) ? 
                likesProductRecieved.length : ''
            }
        </div>
    )
}

function ProfileAvatar(props) {
    const { product } = props;
    const viewSeller = (product) => {
        // TODO... call view context function to save view id and redirect to view page
        const { userId } = product;
    }

    return (
        <div className="index-product-profile">
            <img src={image} alt="seller" width="100%" height="auto" />
            <span onClick={viewSeller(product)}>{product.userName}</span>
        </div>
    )
}

export {
    OpenComment,
    Star,
    ProfileAvatar,
    Heart,
}