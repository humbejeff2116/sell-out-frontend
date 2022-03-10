import React from 'react';
import image from '../../../Images/avatar.jpg';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


function OpenComment({ openCommentBox }) {

    return (
        
        <div className="index-product-reaction-comments">
           < BiMessageSquareEdit onClick = { openCommentBox } className="nav-icon"/>Reviews
        </div>

    )

}

// star
function Star({ starCount, starSeller, product, user, starsUserRecieved }) {

    const className =  starCount ? "index-product-profile-star" : "index-product-profile-star";

    let starIcon;

    if (starCount) {

        starIcon = <AiFillStar className="nav-icon" />

    } else {

        starIcon = < AiOutlineStar className="nav-icon" /> 

    }

    return (

        <div className={className} onClick = { ()=> starSeller(product, user, starCount) }>
          {starIcon}
            { 
                (starsUserRecieved && starsUserRecieved.length) ? 
                starsUserRecieved.length : ''
            }
        </div>

    )

}

// Heart
function Heart({ likeCount, likeProduct, product, user, likesProductRecieved }) {

    // const likeIconClassName = likeCount ? "index-product-heart-bttn filled" : "index-product-heart-bttn"

    let heartIcon;

    if (likeCount) {

        heartIcon = <AiFillHeart className="nav-icon" />

    } else {

        heartIcon = < AiOutlineHeart className="nav-icon" />

    }

    return (

        <div className= "index-product-heart-bttn" onClick = { ()=> likeProduct(product, user, likeCount) }>
          { heartIcon }
            { 
                (likesProductRecieved && likesProductRecieved.length) ? 
                likesProductRecieved.length : ''
            }
        </div>

    )

}

function ProfileAvatar({ product }) {

    const viewSeller = (product) => {
        // TODO... call view context function to save view id and redirect to view page
        // const { userId } = product;
    }

    return (

        <div className="index-product-profile">
            <img src={ image } alt="seller" width="100%" height="auto" />
            <span onClick = { viewSeller(product) }> { product.userName } </span>
        </div>
        
    )

}

export {
    OpenComment,
    Star,
    ProfileAvatar,
    Heart,
}