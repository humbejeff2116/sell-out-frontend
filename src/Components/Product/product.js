


import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import { CommentBox } from './CommentBox/commentBox';
import './product.css';
import ModalComment from '../ModalComments/modalComments';
import ModalProduct from './ModalProduct/modalProduct';
import  { SingleImageComponent } from './ImageComp/imageComp';
import {
    OpenComment,
    Star,
    ProfileAvatar,
    Heart,
} from './Fragments/productFragments';



export  function DisplayedProduct({ product, panelClassName, productCommentPanelName }) {
    let [starCount, setStarCount] = useState(0);
    const [starsUserRecieved, setStarsUserRecieved] = useState([]);
    const [starClicked, setStarClicked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [likesProductRecieved, setLikesProductRecieved] = useState([]);
    const [userLikedProduct, setUserLikedProduct] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) { 
            setStarOnLoad(user, product, setStarCount);         
        } 
        setStarsUserRecieved(product.starsUserRecieved);
    }, [product, user]);

    //TODO... ucomment code below to set stars user liked
    // useEffect(() => {
    //     setLikesProductRecieved(product.likesProductRecieved);
    // }, [ product.likesProductRecieved ]);

    // useEffect(() => {
    //     const checkIfUserLikedProduct = (user, likes) => {
    //         const { userEmail } = user;
    //         for (let i = 0; i < likes.length; i++ ) {
    //             if (likes[i].likeGiverEmail === userEmail) {
    //                 setUserLikedProduct(true);
    //                 break;
    //             }
    //         }
    //     }
    //     if(user) {
    //         checkIfUserLikedProduct(user, product.likesProductRecieved);
    //     }    
    // }, [user, product.likesProductRecieved]);

    const setStarOnLoad = (user, product, callback) => {
        const userEmail = user.userEmail;
        const starsUserRecieved = product.starsUserRecieved ? product.starsUserRecieved : null;
        let starCount = 0;
        if (starsUserRecieved) {
            for (let i = 0; i < starsUserRecieved.length; i++) {
                if (starsUserRecieved[i].starGiverEmail === userEmail) {
                    starCount = starsUserRecieved[i].star;
                    break;
                }
            }
            return callback(starCount);
        }   
    }
  
    const starSeller = (product, user, star) => {
        
        if (!star) {
            if (user) {
                const addeStar = {
                    star: star, 
                    starGiverEmail: user.userEmail, 
                    starGiverId: user.id,
                    starGiverFullName: user.fullName
                }
                setStarsUserRecieved(currentState => [...currentState, addeStar]);
                setStarClicked(true);
                setStarCount(++starCount);
            }
           
            const data = {
                product,
                user,
                starCount: starCount
            }
            socket.emit('starSeller', data );
            return;
        }
        if (user) {
            setStarsUserRecieved(currentState => currentState.filter( star => star.starGiverEmail !== user.userEmail));
            setStarClicked(false);
            setStarCount(--starCount);
        }
       
        const data = {
            product,
            user,
            starCount: starCount
        }
        socket.emit('starSeller', data );
    }

    const likeProduct = (product, user) => {
        const data = {
            product: product,
            user: user,
        }
        if (user) {
            const like = { 
                likeGiverEmail: user.userEmail, 
                likeGiverId: user.id, 
                likeGiverFullName: user.fullName 
            }
            let likedProduct = false;
            for (let i = 0; i < likesProductRecieved.length; i++) {
                if (likesProductRecieved[i].likeGiverEmail === user.userEmail) {
                    likedProduct = true;
                    break;
                }
            }
            if (likedProduct) {
                setUserLikedProduct(false);
                setLikesProductRecieved(currentState => currentState.filter(like => like.likeGiverEmail !== user.userEmail ));
                socket.emit('likeProduct', data );
                return;
            }
            setUserLikedProduct(true);
            setLikesProductRecieved([...likesProductRecieved, like]);
            socket.emit('likeProduct', data);
            return;
        }
        socket.emit('likeProduct', data);
    }

    const openCommentBox = () => {
        setShowComment(true);
    }
    const closeCommentBox = () => {
        setShowComment(false);
    }  
    let imageComponent = ( 
        <SingleImageComponent product = { product } image = { product.productImages[0] }/>
    )

    // if(showMobileComment) {
    //     // return (
    //     //     <CommentBox 
    //     //     product={product}
    //     //     closeCommentBox={closeCommentBox}
    //     //     commentBoxPanelClassName={panelClassName}
    //     //     productCommentPanelName={productCommentPanelName}
    //     //      />
    //     // )
    // }

    if (showComment) {
        
        return (       
            <ModalComment  
            handleClose = { closeCommentBox }

            modalDisplayedProduct = {
                <ModalProduct
                product = { product }
                ProductPanelClassName = "modal-comment-product-panel"

                />
            }
            commentBox= {
                <CommentBox
                product = { product }
                closeCommentBox = { closeCommentBox }
                // productCommentPanelName="modal-product-panel"
                commentBoxPanelClassName = "modal-comment-box-panel"
                />
            }
            >
            </ModalComment>
        )

    }
    return (
        <div className = { panelClassName }>
            <div className="index-product-profile-panel">
                <ProfileAvatar product = { product } />
               <Star
                product = {product}
                user = { user }
                starsUserRecieved = { starsUserRecieved }
                starCount = { starCount }
                starClicked = { starClicked }
                starSeller = { starSeller }
               />
            </div>

            <div className="index-product-image-wrapper">
                { imageComponent }
                <div className="index-product-image-details">
                    <div className="index-product-details-name">
                        <span>blue denim close up andre 200 </span>
                    </div>
                    <div className="index-product-details-price">
                        <p>£300.00 (22% OFF) <span>£320.00</span></p>
                    </div>
                </div>
            </div>

            <div className="index-product-reaction-panel">
                <div className="index-product-reaction-star">
                   <Heart
                   userLikedProduct = { userLikedProduct }
                   likeProduct = { likeProduct }
                   product = { product }
                   user = { user }
                   likesProductRecieved = { likesProductRecieved }
                   />
                </div>
                <OpenComment openCommentBox = { openCommentBox } />
            </div>
        </div>
    )
}