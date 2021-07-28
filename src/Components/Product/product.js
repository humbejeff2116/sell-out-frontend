




import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import {CommentBox} from './commentBox';
import './product.css';
import image from '../../Images/avatar.jpg';




export  function DisplayedProduct(props) {
    let [starCount, setStarCount] = useState(0);
    const [starsUserRecieved, setStarsUserRecieved] = useState([]);
    const [interested, setInterested] = useState(false);
    const [starClicked, setStarClicked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const { product, panelClassName } = props;
    const { user } = useAuth();

    useEffect(() => {
        if (user) { 
            setStarOnLoad(user, product, setStarCount);
            setInterestOnLoad(user, product, setInterested);
             
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
    const showInterest = (product, user, isInterested ) => {
        if(!isInterested) {
            setInterested(true);
            const data = {
                product,
                user,
                interested: true
            }
            socket.emit('showInterest', data );
            return;
        }
         setInterested(false);
        const data = {
            product,
            user,
            interested: false
        }
        socket.emit('showInterest', data );
    }
    const setInterestOnLoad = (user, product, callback) => {
        const userEmail = user.userEmail;
        const interestProductRecieved = (product.interests && product.interests.length) ? product.interests: null;
        
        let interested = false;
        if(interestProductRecieved) {
            for (let i = 0; i < interestProductRecieved.length; i++) {
                if (interestProductRecieved[i].userEmail === userEmail) {
                    interested = true;
                    break;
                }
            }
            return callback(interested);
        }
        return callback(interested);   
    }

    if(showComment) {
        return (
            <CommentBox 
            product={product}
            closeCommentBox={closeCommentBox}
            commentBoxPanelClassName={panelClassName}
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

            <div className="index-product-image-panel">
                <div className="index-product-image">product images</div>

                
                <div className="index-product-image-details">product details</div>
            </div>

            <div className="index-product-reaction-panel">
                <div className="index-product-reaction-star">heart</div>
                <div className="index-product-reaction-star">
                    <i onClick={()=> showInterest( product, user, interested)}>
                        Intrested 
                        {
                            (product.interests && product.interests.length) ? product.interests.length: ''
                        }
                    </i>
                    </div>
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
            <span onClick={viewSeller(product)}>{product.userName}</span>
        </div>
    )
}