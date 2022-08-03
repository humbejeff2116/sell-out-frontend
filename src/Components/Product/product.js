
import React, { useState, useEffect } from 'react';
import ModalReviews from '../ModalReviews/modalReviews';
import { SingleImageComponent } from './ImageComp/imageComp';
import { ReviewsIconWrapper, Star, ProfileAvatar, Heart } from './Fragments/productFragments';
import ProductLib from '../../Library/product/productLib';
import UserLib from '../../Library/user/userLib';
import useAuth from '../../Context/context';
import './product.css';


export  function DisplayedProduct({ 
    product,
    panelClassName,
    dontShowModal,
    dontShowReviews,
    showLikes,
    productUsedOutsideLogin,
    ...props
}) {
    let [starCount, setStarCount] = useState(0);
    let [likeCount, setLikeCount] = useState(0);
    const [starsUserRecieved, setStarsUserRecieved] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [showReviewsChild, setShowReviewsChild] = useState(false);
    const [likesProductRecieved, setLikesProductRecieved] = useState([]);
    const { user } = useAuth();
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    },[timer])

    useEffect(() => {
        const  userId = product.userId;
        UserLib.getSellerStarsAndSetStarCount(userId, user, setStarCount, setStarsUserRecieved)
    }, [product, user]);

    useEffect(() => { 
        let mounted = true;
        const  userId = product.userId;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        UserLib.getSellerStarsWhenUserDataChange({ mounted, userId, user, setStarCount, setStarsUserRecieved })
        return ()=> mounted = false;
    }, [product]);

    useEffect(() => {
        const  productId = product.productId;
        ProductLib.getProductLikesAndSetLikeCount(productId, user, setLikeCount, setLikesProductRecieved)
    }, [product, user]);

    useEffect(() => {
        let mounted = true;
        const  productId = product._id;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        ProductLib.getProductLikesWhenProductDataChange(mounted, productId, user, setLikeCount, setLikesProductRecieved)
        return ()=>  mounted = false;
    }, [product]);

 
    const openReviewBox = () => {
        setShowReviews(true);
        timer = setTimeout(() => {
            setShowReviewsChild(true);
        }, 300);
    }

    const closeReviewBox = () => {
        setShowReviewsChild(false);
        timer = setTimeout(() => {
            setShowReviews(false);
        }, 800);
    }  

    const imageComponent = ( 
        <SingleImageComponent 
        product = { product } 
        image = { product.productImages[0] }
        usedOutsideLogin ={ productUsedOutsideLogin }
        />
    )

    const modal = (
        <ModalReviews 
        product = { product }
        closeReviewBox = { closeReviewBox }
        handleClose = { closeReviewBox }
        showModalChild = { showReviewsChild }
        />
    )

    return ( 
        <>
            { dontShowModal ? "" : showReviews && modal }
            <div className = { panelClassName }>
                <div className="index-product-profile-panel">
                    <ProfileAvatar product = { product } />
                    <Star
                    product = { product }
                    user = { user }
                    starsUserRecieved = { starsUserRecieved }
                    starCount = { starCount }
                    setStarsUserRecieved ={  setStarsUserRecieved } 
                    setStarCount ={ setStarCount }
                    starSeller = { UserLib.starSeller }
                    />
                </div>
                <div className="index-product-image-wrapper">
                    { imageComponent }
                    <div className="index-product-image-details">
                        <div className="index-product-details-name">
                            <span>{ product.productName } </span>
                        </div>
                        <Price { ...product }/>
                    </div>
                </div>
                <div className="index-product-bottom-panel">
                    <ReviewsIconWrapper 
                    openReviews = { openReviewBox }
                    dontShowReviews = { dontShowReviews }
                    /> 
                    <div className="index-product-likes-container">
                        <Heart
                        product = { product }
                        user = { user }
                        likesProductRecieved = { likesProductRecieved }
                        setLikesProductRecieved = { setLikesProductRecieved } 
                        setLikeCount = { setLikeCount }
                        likeCount = { likeCount }
                        likeProduct = { ProductLib.likeProduct }
                        showLikes = { showLikes }
                        />
                    </div> 
                </div>
            </div>
        </>
    )
}


export function Price({ percentageOff, productPrice, className, showPriceTag }) {
    const priceContainerClass = className ? className : "index-product-details-price";

    if (percentageOff) {
        const percentOffPrice = (percentageOff / 100) * parseFloat(productPrice)
        const newPrice = (parseFloat(productPrice) - percentOffPrice).toFixed(2, 10);

        if (!showPriceTag) {
            return (
                <div className={ priceContainerClass }>
                    <div> 
                        <span className="price"> £{ newPrice } {`(${ percentageOff }% OFF)` }</span> <span className="original-price">£{ parseFloat( productPrice).toFixed(2, 10) }</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={ priceContainerClass }>
                    <div>
                        Price: <span className="price"> £{ newPrice } {`(${ percentageOff }% OFF)` }</span> <span className="original-price">£{ parseFloat( productPrice).toFixed(2, 10) }</span>
                    </div>
                </div>
            )
        }
    }

    if (!percentageOff) {
        if (showPriceTag) {
             return (
                <div className={ priceContainerClass }>
                    <div>
                        Price: <span className="price"> £{parseFloat(productPrice).toFixed(2, 10)}</span> 
                    </div>
                </div>
            )
        } else {
            return (
                <div className={ priceContainerClass }>
                    <div> 
                        <span className="price"> £{parseFloat(productPrice).toFixed(2, 10)}</span>
                    </div>
                </div>
            )
        }
    }
}