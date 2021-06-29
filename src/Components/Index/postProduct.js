


import React from 'react';
import {Link} from 'react-router-dom';


export function PostProduct(props) {
    return (
        <div className="index-post-container">
            <div className="index-post-writeup-container">
                <div className="index-post-writeup">
                    <h4>
                        Got a Product to sell or a service to offer?
                        someone might just be needing it.
                    </h4>
                    

                </div>
            </div>
            <div className="index-post-upload">
            <Link to="/upload-product"><button>Upload Details</button></Link>
            </div>
        </div>
    )
}