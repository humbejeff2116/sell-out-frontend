


import React, {useState} from 'react';
import {  Redirect, useLocation, useHistory } from 'react-router-dom';
import useViewContext from '../../../Context/viewContext/context';
import image2 from '../../../Images/product3.webp';



function SingleImageComponent(props) {
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { setViewState } = useViewContext();
    const { image } = props;

    const viewProduct = (product) => {
        if(location.pathname === '/home/view-product') {
           setViewState(product);
           window.scrollTo(0,0);
           return; 
        }
        setViewState(product)
        history.push(location.pathname);
        return setRedirect('/home/view-product');
    }
    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
    return (
        <div className="index-product-single-image-panel" onClick={()=>viewProduct(props.product)}>
            {
               [image].map((img,i) =>
                    <div key={i} className="index-product-single-image">
                    <img src={img?.src || image2} alt="product"/>
                    </div>
                )
            } 
        </div>
    )
}
function CommentImageComponent(props) {
    const { image } = props;
    return (
        <div className="comment-product-image-panel">
            {
                image.map((img,i) =>
                    <div key={i} className="comment-product-image">
                    <img src={img.src || image2} alt="product"/>
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
    CommentImageComponent,
}