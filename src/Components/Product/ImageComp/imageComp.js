
import React, { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import useViewContext from '../../../Context/viewContext/context';
import image2 from '../../../Images/product3.webp';



function SingleImageComponent({ usedOutsideLogin, image, product , ...props }) {
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { setViewState } = useViewContext();

    const viewProduct = (product) => {
        if (location.pathname === '/home/view-product') {
           setViewState(product);
           window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
           return; 
        }

        setViewState(product)
        history.push(location.pathname);
        setRedirect('/home/view-product');
    }

    const viewProductOutsideLogin = (product) => {
        if (location.pathname === '/view-product') {
           setViewState(product);
           window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
           return; 
        }

        setViewState(product)
        history.push(location.pathname);
        setRedirect('/view-product');
    }

    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    }

    if (usedOutsideLogin) {
        return (
            <div className="index-product-single-image-panel" onClick={()=> viewProductOutsideLogin(product)}>
            {
                [image].map((img, i) =>
                    <div key={ i } className="index-product-single-image">
                        <img src={ img.src || image2 } alt="product"/>
                    </div>
                )
            } 
            </div>
        )
    }

    return (
        <div className="index-product-single-image-panel" onClick={()=>viewProduct(product)}>
        {
            [image].map((img, i) =>
                <div key={ i } className="index-product-single-image">
                    <img src={ img?.src || image2 } alt="product"/>
                </div>
            )
        } 
        </div>
    )
}


function DoubleImageComponent(props) {
    const { images } = props;
    return (
        <div className="index-product-double-images-panel">
            {
                images.map((img,i) =>
                    <div key={i} className="index-product-double-image">
                    <img src={img.src || image2} alt="product"/>
                    </div>
                )
            }   
        </div>
    )
}

function TrippleImageComponent(props) {
    const { images } = props;
    return (
        <div className="index-product-tripple-images-panel">
            {
                images.map((img,i) =>
                    <div key={i} className="index-product-tripple-image">
                    <img src={img.src || image2} alt="product"/>
                    </div>
                )
            }  
        </div>
    )
}
export {
    SingleImageComponent,
    DoubleImageComponent,
    TrippleImageComponent,
    // CommentImageComponent,
}