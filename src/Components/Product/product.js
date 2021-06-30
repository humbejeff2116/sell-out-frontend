




import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import {CommentBox} from './commentBox';




export  function DisplayedProduct(props) {
    let [starCount, setStarCount] = useState(0);
    const [stars, setStars] = useState(null);
    const [gotStars, setGotStars] = useState(false)
    const [showComment, setShowComment] = useState(false);
    const { product } = props;
    const { user } = useAuth();

    useEffect(() => {
        setStar(user, product, setStarCount);
    }, [product, user]);


    const setStar = (user, product, callback) => {
        const sellerEmail = product.userEmail;
        const starsUserGave = user.starsUserGave;
        let starCount = 0;
        if (starsUserGave) {
            for (let i = 0; i < starsUserGave.length; i++) {
                if (starsUserGave[i].userEmail === sellerEmail) {
                   starCount = 1;
                   break;
                }
            }
            // if (starCount) {
            //     return callback(starCount);
            // }
            return callback(starCount);
        }
    }

   
    const starSeller = (product, user, star) => {
        if(!star) {
            setStarCount(++starCount);
            const data = {
                product,
                user,
                starCount: starCount
            }
            socket.emit('starSeller', data );
            // setTimeout(()=> alert(JSON.stringify(data)));
            return;
        }
        setStarCount(--starCount);
        const data = {
            product,
            user,
            starCount: starCount
        }
        socket.emit('starSeller', data );
        // setTimeout(()=> alert(JSON.stringify(data)));
    }
    
    const openCommentBox = () => {
        setShowComment(true);
    }
    const closeCommentBox = () => {
        setShowComment(false);
    }

    if(showComment) {
        return (
            <CommentBox 
            product={product}
            closeCommentBox={closeCommentBox}
            panelClassName={props.panelClassName}
             />
        )
    }
    return (
        <div className={props.panelClassName}>
            <div className="index-product-profile-panel">
                <ProfileAvatar product={product} />
               <Star
               product={product}
               user = {user}
                stars={stars}
                gotStars ={gotStars}
                starCount={starCount}
                starSeller={starSeller}
               />
            </div>

            <div className="index-product-image-panel">
                <div className="index-product-image">product images</div>
                <div className="index-product-image-details">product details</div>
            </div>

            <div className="index-product-reaction-panel">
                <div className="index-product-reaction-star">star product</div>
                <Comment openCommentBox={openCommentBox}  />
            </div>
        </div>
    )
}

function Comment(props) {
    return (
        <div className="index-product-reaction-comments">
           <i onClick={props.openCommentBox}> comment </i>
        </div>
    )
}

function Star(props) {
    const className =  props.starCount ? "star filled" : "star";
    let starslength 
    return (
        <div className="index-product-profile-star" onClick={()=> props.starSeller(props.product, props.user,props.starCount)}>
           stars {props.product.starsUserRecieved ? props.product.starsUserRecieved.length + props.starCount : ''}
        </div>
    )
}

function ProfileAvatar(props) {
    const { product } = props;
    const viewSeller = (product) => {
        // TODO.. call view context function to save view id and redirect to view page
        const { userId } = product;
    }

    return (
        <div className="index-product-profile">
            <img src={product.sellerProfilePicture} alt="seller" width="100%" height="auto" />
            <span onClick={viewSeller(product)}>{product.userName}</span>
        </div>
    )
}