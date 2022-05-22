
import React from 'react';
import eror404Image from '../../Images/error404.png';
import './notFound.css';


export default function NotFound({ usedForHomeRoutes }) {

    let wrapperClassName = usedForHomeRoutes ? "page-notfound-wrapper home-routes" : "page-notfound-wrapper";

    return (

        <div className= "page-notfound-container">
            <div className= { wrapperClassName }>
                <div className="page-notfound-details">
                    <div className="page-notfound-image">
                        <img src={ eror404Image } alt=""/>
                    </div>
                    <h3 className="page-notfound-heading">
                        Oops! We could not find that page.
                    </h3>
                    <div className="page-notfound-para">
                        The link you entered or followed is either broken, removed or does not exist.
                    </div>
                </div>
            </div>         
        </div>

    )
}