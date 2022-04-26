
import React from 'react';
import {Link} from 'react-router-dom';


export function PostProduct(props) {
    return (
        <section className="index-post-container">
            <div className="index-post-writeup-container">

                <h4>Sell your products using Fling</h4>

                <div className="index-post-writeup">     
                Join this amazing community of enterprenuers, connect share ideas and sell your products? 
                </div>

                <div className="index-post-getting-started">
                <Link to="/home/dashboard/store/upload-product">
                    Get Started
                </Link>
                </div>
            </div>
        </section>
    )
}