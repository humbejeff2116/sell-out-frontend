


import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import {CommentBox} from './commentBox';
import './product.css';
import image from '../../Images/avatar.jpg';
import image2 from '../../Images/product3.webp';





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

    if(showComment) {
        return (
            <CommentBox 
            product={product}
            closeCommentBox={closeCommentBox}
            commentBoxPanelClassName={panelClassName}
            productCommentPanelName={productCommentPanelName}
             />
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
               
                <Comment openCommentBox={openCommentBox}  />
            </div>
        </div>
    )
}

function Comment(props) {
    const {openCommentBox} =props;
    return (
        <div className="index-product-reaction-comments">
           <i onClick={ openCommentBox }> comment </i>
        </div>
    )
}

function Star(props) {
    const { starCount, starSeller, product, user, starsUserRecieved } = props;
    const className =  starCount ? "index-product-profile-star filled" : "index-product-profile-star";
    return (
        <div className={className} onClick={()=> starSeller(product, user, starCount)}>
            stars 
            { 
                (starsUserRecieved && starsUserRecieved.length) ? 
                starsUserRecieved.length : ''
            }
        </div>
    )
}

function ProfileAvatar(props) {
    const { product } = props;
    const viewSeller = (product) => {
        // TODO... call view context function to save view id and redirect to view page
        const { userId } = product;
    }

    return (
        <div className="index-product-profile">
            <img src={image} alt="seller" width="100%" height="auto" />
            <span onClick={viewSeller(product)}><b>{product.userName}</b></span>
        </div>
    )
}


function SingleImageComponent(props) {
    const { image } = props;
    return (
        <div className="index-product-single-image-panel">
            {
                image.map((img,i) =>
                    <div key={i} className="index-product-single-image">
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