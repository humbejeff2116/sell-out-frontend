


import React from 'react';
import { DisplayedProduct } from '../../../Product/product';
import {  BiTrash,BiEdit} from "react-icons/bi";
import './products.css';

const mockProducts = [
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
];


export default function StoreProducts(props) {
    return (
        
        <div className="placed-orders-container">
        <div className="placed-orders-header">
            <h3> Store Products</h3>
        </div>
        <div className="store-products-search-container">
            <div className="store-products-search">
                <form>
                    <label htmlFor="order-search"> Search by product name</label>
                    <div className="store-products-search-input">
                        <input type="text" />
                        <button>Search</button>
                    </div>
                   
                </form>
            </div>
        </div>

        <div className="store-products-container">
            {
                mockProducts.map((product, i)=>
                <StoreProduct 
                key={i}
                product={product}
                />
                )
            }
        </div>
        </div>
    )
}



function StoreProduct(props) {
    return (
        <div className="store-product-edit-panel">
            <div className="store-product-edit-icon-panel">
                <div className="store-product-edit-group">
                    <div className="store-product-edit-icon">
                        <BiEdit title="Edit" className="store-icon"/>
                    </div>
                </div>

                <div className="store-product-edit-group">
                    <div className="store-product-edit-icon">
                    <BiTrash title="Delete" className="store-icon"/>
                    </div>
                </div>
            </div>
            <DisplayedProduct 
            product={props.product}
            panelClassName="store-product-panel"
            />
        </div>
    )
}