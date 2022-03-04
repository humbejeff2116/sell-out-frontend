
import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import { CommentBox } from './CommentBox/commentBox';
import './product.css';
import ModalComment from '../ModalComments/modalComments';
import ModalProduct from './ModalProduct/modalProduct';
import  { SingleImageComponent } from './ImageComp/imageComp';
import { OpenComment, Star, ProfileAvatar, Heart } from './Fragments/productFragments';
import { getUserStars } from '../../Utils/http.services';


export  function DisplayedProduct(props) {
    const {product, panelClassName, productCommentPanelName } = props;

    let [starCount, setStarCount] = useState(0);

    const [starsUserRecieved, setStarsUserRecieved] = useState([]);

    const [starClicked, setStarClicked] = useState(false);

    const [showComment, setShowComment] = useState(false);

    const [likesProductRecieved, setLikesProductRecieved] = useState([]);

    const [userLikedProduct, setUserLikedProduct] = useState(false);

    const [userId, setUserId] = useState();

    const { user } = useAuth();
   


    useEffect(() => {


         const  userId = product.userId;

         const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


        const getSellerStars = async (userId) => {

            const sellerStarsResponse = await getUserStars(userId)
           
            if (sellerStarsResponse.error) return;

            setStarCountOnLoad(user, sellerStarsResponse?.data?.starsUserRecieved, setStarCount);

            setStarsUserRecieved(sellerStarsResponse?.data?.starsUserRecieved);

        }
        
        getSellerStars(userId); 

         

    }, [ product ]);

    useEffect(() => {
      

        let mounted = true;

        const  userId = product.userId;
        
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        const getSellerStars = async (userId) => {

            const sellerStarsResponse = await getUserStars(userId)
           
            if (sellerStarsResponse.error) return;

            setStarCountOnLoad(user, sellerStarsResponse?.data?.starsUserRecieved, setStarCount);

            setStarsUserRecieved(sellerStarsResponse?.data?.starsUserRecieved);

        }

    
        socket.on('starUserDataChange', function() {

           if (mounted) {
                getSellerStars(userId);

           }

        });

        return ()=> {

            mounted = false;

        }

    }, [ product ]);

    

    //TODO... ucomment code below to set likes product recieved
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

    const setStarCountOnLoad = (user, starsUserRecieved, setStarCount) => {

        const userEmail = user?.userEmail;

        // const starsUserRecieved = product.starsUserRecieved ? product.starsUserRecieved : null;

        let starCount = 0;

        if (!starsUserRecieved  || !user) {

            return setStarCount(starCount);
        }

        const len = starsUserRecieved.length;

        let i;
        
        for ( i = 0; i < len; i++) {

            if (starsUserRecieved[i].userEmail === userEmail) {

                starCount = starsUserRecieved[i].star;

                break;
            }

        }

        return setStarCount(starCount);

    }

  
    const starSeller = (product, user, star) => {
        
        if (!star) {

            if (user) {

                const addeStar = {
                    star: star, 
                    userEmail: user.userEmail, 
                    userId: user.id,
                    userFullName: user.fullName
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

            socket.emit('starSeller', data);

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

            let len = likesProductRecieved.length;

            let i 

            for (i = 0; i < len; i++) {

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
        </>

    )

}