


import React from 'react';
import {Link} from 'react-router-dom';


export function PostProduct(props) {
    return (
        <div className="index-post-container">
            <div className="index-post-writeup-container">
                <div className="index-post-writeup">
                    <p>
                        Got a product to sell ?
                       You can start here.
                    </p>
                    

                </div>
            </div>
            <div className="index-post-upload">
            <Link to="/home/dashboard/store/upload-product"><button>Sell Product</button></Link>
            </div>
        </div>
    )
}