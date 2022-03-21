
import React, { useState, useEffect } from 'react';
import useAuth from '../../Context/context';
import { CommentBox } from './CommentBox/commentBox';
import ModalComment from '../ModalComments/modalComments';
import ModalProduct from './ModalProduct/modalProduct';
import  { SingleImageComponent } from './ImageComp/imageComp';
import { OpenComment, Star, ProfileAvatar, Heart } from './Fragments/productFragments';
import ProductLib from '../../Library/product/productLib';
import UserLib from '../../Library/user/userLib';
import './product.css';


export  function DisplayedProduct(props) {

    const { product, panelClassName } = props;

    let [starCount, setStarCount] = useState(0);

    let [likeCount, setLikeCount] = useState(0);

    const [starsUserRecieved, setStarsUserRecieved] = useState([]);

    const [showComment, setShowComment] = useState(false);

    const [likesProductRecieved, setLikesProductRecieved] = useState([]);

    const { user } = useAuth();
   
    useEffect(() => {

        const  userId = product.userId;
        
        UserLib.getSellerStars(userId, user, setStarCount, setStarsUserRecieved)

    }, [ product, user ]);

    useEffect(() => {
        
        let mounted = true;

        const  userId = product.userId;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        UserLib.getSellerStarsWhenUserDataChange({mounted, userId, user, setStarCount, setStarsUserRecieved})

        return ()=> {

            mounted = false;

        }

    }, [ product ]);

    useEffect(() => {
       
        const  productId = product.productId;

        ProductLib.getAllProductLikes(productId, user, setLikeCount, setLikesProductRecieved)

    }, [ product, user ]);

    useEffect(() => {
      
        let mounted = true;

        const  productId = product._id;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        ProductLib.getProductLikesWhenProductDataChange(mounted, productId, user, setLikeCount, setLikesProductRecieved)

        return ()=> {

            mounted = false;

        }

    }, [ product ]);

 
    const openCommentBox = () => {

        setShowComment(true);

    }

    const closeCommentBox = () => {

        setShowComment(false);

    }  

    let imageComponent = ( 

        <SingleImageComponent product = { product } image = { product.productImages[0] }/>

    )

    let ModalComments = (

        <ModalComment  
            handleClose = { closeCommentBox }
            modalDisplayedProduct = {

                <ModalProduct
                product = { product }
                ProductPanelClassName = "modal-comment-product-panel"

                />

            }
            commentBox = {

                <CommentBox
                product = { product }
                closeCommentBox = { closeCommentBox }
                // productCommentPanelName="modal-product-panel"
                commentBoxPanelClassName = "modal-comment-box-panel"
                />

            }
            />
            
    )

    return (
        
        <>
        {
           showComment && ModalComments
        }
        <div className = { panelClassName }>
            <div className="index-product-profile-panel">
                <ProfileAvatar product = { product } />
               <Star
                product = { product }
                user = { user }
                starsUserRecieved = { starsUserRecieved }
                starCount = { starCount }
                setStarsUserRecieved ={setStarsUserRecieved } 
                setStarCount ={setStarCount}
                starSeller = { UserLib.starSeller }
               />
            </div>

            <div className="index-product-image-wrapper">
                { imageComponent }
                <div className="index-product-image-details">
                    <div className="index-product-details-name">
                        <span>{product.productName} </span>
                    </div>

                    <Price {...product} />

                </div>
            </div>

            <div className="index-product-reaction-panel">
                <div className="index-product-reaction-star">
                   <Heart
                //    userLikedProduct = { userLikedProduct }
                   product = { product }
                   user = { user }
                   likesProductRecieved = { likesProductRecieved }
                   setLikesProductRecieved ={setLikesProductRecieved} 
                   setLikeCount = {setLikeCount}
                   likeCount = { likeCount }
                   likeProduct = { ProductLib.likeProduct }
                   />
                </div>
                <OpenComment openCommentBox = { openCommentBox } />
            </div>
        </div>
        </>

    )

}


export function Price({percentageOff, productPrice, className, showPriceTag}) {

    const priceContainerClass = className ? className : "index-product-details-price";

    if (percentageOff  && !showPriceTag) {

        const percentOffPrice = (percentageOff / 100) * Number(productPrice)

        const newPrice = Number(productPrice) - percentOffPrice;

        return (

            <div className={ priceContainerClass }>
            <p> £{ newPrice.toFixed(2, 10) } { `(${percentageOff}% OFF)` } <span> £{ Number( productPrice).toFixed(2, 10) } </span></p>
            </div>

        )

    }

    if (percentageOff && showPriceTag) {

        const percentOffPrice = (percentageOff / 100) * Number(productPrice)

        const newPrice = Number(productPrice) - percentOffPrice;

        return (

            <div className={ priceContainerClass }>
                <p>Price: <span className="price"> £{ newPrice.toFixed(2, 10) } { `(${percentageOff}% OFF)` }</span> <span className="original-price">£{ Number( productPrice).toFixed(2, 10) }</span></p>
            </div>

        )

    }

    if (!percentageOff && showPriceTag) {

        return (

            <div className={ priceContainerClass }>
                <p>Price: <span className="price"> £{ Number( productPrice).toFixed(2, 10) }</span> </p>
            </div>

        )

    }

    return (

        <div className={ priceContainerClass }>
            <p> £{ Number( productPrice).toFixed(2, 10) }</p>
        </div>

    )

}