




import React from 'react';
import './viewProduct.css';
import image2 from '../../Images/product4.webp';
import image from '../../Images/avatar.jpg';




export default function ViewProduct() {
    return (
        <div className="view-product-container">

            <div className="view-product-top">
                <ProductImage/>
                <ProductDetails/>
            </div>

            <div className="view-product-bottom">
                product bottom
            </div>

        </div>
    )
}

function ProductImage(props) {
    return (
        <div className="view-product-image-wrapper">
{/* seller profile */}
        <div className="view-product-profile" >
            <div  className="view-product-profile-image">
                <img src={image} alt="avatar" />
                
            </div>
            <div className="view-product-seller-stars">
                seller stars
            </div>
        </div>
        {/* product images */}
        <div className="view-product-image-container">
            <div className="view-product-image-thumbnails">
                thumbnails
            </div>
            <div className="view-product-image">
                <img src={image2} alt="product"/>
            </div>
        </div>

        

        </div>
    )
}

function ProductDetails(props) {
    return (
        <div className="view-product-details">
            product details go here

        </div>
    )
}