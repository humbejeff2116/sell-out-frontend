


import React from 'react';
import image2 from '../../../Images/product3.webp';



function SingleImageComponent(props) {
    const { image } = props;
    return (
        <div className="index-product-single-image-panel">
            {
                image.map((img,i) =>
                    <div key={i} className="index-product-single-image">
                    <img src={img.src || image2} alt="product"/>
                    </div>
                )
            } 
        </div>
    )
}
function CommentImageComponent(props) {
    const { image } = props;
    return (
        <div className="comment-product-image-panel">
            {
                image.map((img,i) =>
                    <div key={i} className="comment-product-image">
                    <img src={img.src || image2} alt="product"/>
                    </div>
                )
            } 
        </div>
    )
}

function DoubleImageComponent(props) {
    const { images } = props;
    return (
        <div className="index-product-double-images-panel">
            {
                images.map((img,i) =>
                    <div key={i} className="index-product-double-image">
                    <img src={img.src || image2} alt="product"/>
                    </div>
                )
            }   
        </div>
    )
}
function TrippleImageComponent(props) {
    const { images } = props;
    return (
        <div className="index-product-tripple-images-panel">
            {
                images.map((img,i) =>
                    <div key={i} className="index-product-tripple-image">
                    <img src={img.src || image2} alt="product"/>
                    </div>
                )
            }  
        </div>
    )
}
export {
    SingleImageComponent,
    DoubleImageComponent,
    TrippleImageComponent,
    CommentImageComponent,
}