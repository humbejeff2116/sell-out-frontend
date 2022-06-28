
import React from 'react';
import { Link } from 'react-router-dom';


export function PostProduct(props) {
    return (
        <section className="index-post-container">
            <div className="index-post-writeup-container">
                <h4>Let Fling help you sell your products</h4>
                <div className="index-post-writeup">     
                    Selling your products doesn't need to be complex, in simple steps, 
                    upload details about your asset('s) and 
                    let our systems handle the sales for you. 
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