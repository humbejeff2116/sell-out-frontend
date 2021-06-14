



import React from 'react';








 function Product(props) {

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

function Service(props) {

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
            <div><button>See more</button></div>
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
            <div><button>See more</button></div>
        </div>
        </>
    )
}