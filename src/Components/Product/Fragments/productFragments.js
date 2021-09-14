import React from 'react';
import image from '../../../Images/avatar.jpg';



function OpenComment(props) {
    const {openCommentBox} =props;
    return (
        <div className="index-product-reaction-comments">
           <i onClick={ openCommentBox }> Reviews </i>
        </div>
    )
}

function Star(props) {
    const { starCount, starSeller, product, user, starsUserRecieved } = props;
    const className =  starCount ? "index-product-profile-star filled" : "index-product-profile-star";
    return (
        <div className={className} onClick={()=> starSeller(product, user, starCount)}>
            stars 
            { 
                (starsUserRecieved && starsUserRecieved.length) ? 
                starsUserRecieved.length : ''
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
            <span onClick={viewSeller(product)}><b>{product.userName}</b></span>
        </div>
    )
}

export {
    OpenComment,
    Star,
    ProfileAvatar,
}