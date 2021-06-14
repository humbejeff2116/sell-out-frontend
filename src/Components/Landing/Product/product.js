



import React from 'react';








export default function LandingProduct(props) {

    return (
        <div className="landing-product-panel">

            <div className="landing-product-image">         
                <img src={"src"} width="80%" height="80%" alt="product"/> 
            </div>

            <div>
                <span>{props.name}</span>

            </div> 
        </div>
    )

}