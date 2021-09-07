


import React from 'react';
import {Link} from 'react-router-dom';


export function PostProduct(props) {
    return (
        <div className="index-post-container">
            <div className="index-post-writeup-container">
                <div className="index-post-writeup">
                    <p>
                        Got a product to sell ?
                        No better place to start than here.
                    </p>
                    

                </div>
            </div>
            <div className="index-post-upload">
            <Link to="/upload-product"><button>Upload product details</button></Link>
            </div>
        </div>
    )
}