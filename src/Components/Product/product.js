


import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import {CommentBox} from './CommentBox/commentBox';
import './product.css';
import image from '../../Images/avatar.jpg';
import image2 from '../../Images/product3.webp';
import ModalComment from '../ModalComments/modalComments';
import ModalProduct from './ModalProduct/modalProduct';
import  {
    SingleImageComponent,
    DoubleImageComponent,
    TrippleImageComponent
} from './ImageComp/imageComp';
import {
    OpenComment,
    Star,
    ProfileAvatar,

} from './Fragments/productFragments';





export  function DisplayedProduct(props) {
    let [starCount, setStarCount] = useState(0);
    const [starsUserRecieved, setStarsUserRecieved] = useState([]);
    const [starClicked, setStarClicked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const { product, panelClassName, productCommentPanelName } = props;
    const { user } = useAuth();

    useEffect(() => {
        if (user) { 
            setStarOnLoad(user, product, setStarCount);         
        } 
        setStarsUserRecieved(product.starsUserRecieved);
    }, [product, user]);

    const setStarOnLoad = (user, product, callback) => {
        const userEmail = user.userEmail;
        const starsUserRecieved = product.starsUserRecieved ? product.starsUserRecieved: null;
        let starCount = 0;
        if(starsUserRecieved) {
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
            if(user) {
                const addeStar = {
                    star: star, 
                    starGiverEmail: user.userEmail, 
                    starGiverId: user.id,
                    starGiverFullName: user.fullName
                }
                setStarsUserRecieved(currentState => [...currentState, addeStar]);
            }
            setStarClicked(true);
            setStarCount(++starCount);
            const data = {
                product,
                user,
                starCount: starCount
            }
            socket.emit('starSeller', data );
            return;
        }
        if(user) {
            setStarsUserRecieved(currentState => currentState.filter( star => star.starGiverEmail !== user.userEmail));
        }
        setStarClicked(false);
        setStarCount(--starCount);
        const data = {
            product,
            user,
            starCount: starCount
        }
        socket.emit('starSeller', data );
    }
    
    const openCommentBox = () => {
        setShowComment(true);
    }
    const closeCommentBox = () => {
        setShowComment(false);
    }
    
    let imageComponent = null;

    if (product.productImages.length === 1) {
        imageComponent = <SingleImageComponent image={product.productImages}/>
    }
    if (product.productImages.length === 2) {
        imageComponent = <DoubleImageComponent images={product.productImages}/>
    }
    if (product.productImages.length === 3) {
        imageComponent = <TrippleImageComponent images={product.productImages}/>
    }
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

    if(showComment) {
        
        return (       
            <ModalComment  
            handleClose={closeCommentBox}

            modalDisplayedProduct={
                <ModalProduct
                product={product}
                ProductPanelClassName="modal-comment-product-panel"

                />
            }
            commentBox={
                <CommentBox
                product={product}
                closeCommentBox={closeCommentBox}
                productCommentPanelName="modal-product-panel"
                commentBoxPanelClassName="modal-comment-box-panel"
                />
            }
            >
            </ModalComment>
        )

    }
    return (
        <div className={panelClassName}>
            <div className="index-product-profile-panel">
                <ProfileAvatar product={product} />
               <Star
                product={product}
                user = {user}
                starsUserRecieved={starsUserRecieved}
                starCount={starCount}
                starClicked={starClicked}
                starSeller={starSeller}
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
                <div className="index-product-reaction-star">heart </div>
               
                <OpenComment openCommentBox={openCommentBox}  />
            </div>
        </div>
    )
}