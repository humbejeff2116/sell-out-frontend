



import React from 'react';
import './product.css';








 function Product(props) {

    return (
        <div className="landing-product-panel">
        <div className="landing-product-profile-panel">
            <div className="landing-product-profile">profile info</div>
            <div className="landing-product-profile-star">star seller</div>
        </div>

        <div className="landing-product-image-panel">
            <div className="landing-product-image">product images</div>
            <div className="landing-product-image-details">product details</div>
        </div>

        <div className="landing-product-reaction-panel">
            <div className="landing-product-reaction-star">star product</div>

            <div className="landing-product-reaction-comments">comments</div>
        </div>

    </div>
    )
}

function Service(props) {

    return (
        <div className="landing-product-panel">
        <div className="landing-product-profile-panel">
            <div className="landing-product-profile">profile info</div>
            <div className="landing-product-profile-star">star seller</div>
        </div>

        <div className="landing-product-image-panel">
            <div className="landing-product-image">product images</div>
            <div className="landing-product-image-details">product details</div>
        </div>

        <div className="landing-product-reaction-panel">
            <div className="landing-product-reaction-star">star product</div>

            <div className="landing-product-reaction-comments">comments</div>
        </div>

    </div>
    )
}

export default function LandingProducts(props) {
    return (
        <>
        <div  className="landing-product-heading">
            <h3>Products</h3>
        </div>
        <div  className="landing-product-container">
        {
            props.products.map((prod,i) =>
            <Product  key={i} {...prod} />
            )
        }
        </div>
        <div className="landing-product-heading">
            <div><button>View more products </button></div>
        </div>
        </>
    )
}

export function LandingServices(props) {
    return (
        <>
        <div className="landing-product-heading">
            <h3>Services</h3>
        </div>
        <div  className="landing-product-container">
        {
            props.products.map((prod,i) =>
            <Service  key={i} {...prod} />
            )
        }
        </div>
        <div className="landing-product-heading">
            <div><button>View more services</button></div>
        </div>
        </>
    )
}