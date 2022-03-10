
import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import { CommentBox } from './CommentBox/commentBox';
import './product.css';
import ModalComment from '../ModalComments/modalComments';
import ModalProduct from './ModalProduct/modalProduct';
import  { SingleImageComponent } from './ImageComp/imageComp';
import { OpenComment, Star, ProfileAvatar, Heart } from './Fragments/productFragments';
import { getUserStars, getProductLikes } from '../../Utils/http.services';


export  function DisplayedProduct(props) {
    const {product, panelClassName, productCommentPanelName } = props;

    let [starCount, setStarCount] = useState(0);

    let [likeCount, setLikeCount] = useState(0);

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

    //get and set product likes
    useEffect(() => {
       
        const  productId = product.productId;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        const getAllProductLikes = async (productId) => {

            const productLikesResponse = await getProductLikes(productId)

            // alert(JSON.stringify(productLikesResponse, null, 2))
           
            if (productLikesResponse.error) return;

            setLikeCountOnLoad(user, productLikesResponse?.data, setLikeCount);

            setLikesProductRecieved(productLikesResponse?.data);

        }

        getAllProductLikes(productId)

    }, [ product ]);

    // listen for  product like data change  socket event
    useEffect(() => {
      

        let mounted = true;

        const  productId = product._id;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        const getAllProductLikes = async (productId) => {

            const productLikesResponse = await getProductLikes(productId)
           
            if (productLikesResponse.error) return;

            setLikeCountOnLoad(user, productLikesResponse?.data, setLikeCount);

            setLikesProductRecieved(productLikesResponse?.data);

        }

    
        socket.on('likePoductDataChange', function() {

            if (mounted) {

                getAllProductLikes(productId);

            }

        });

        return ()=> {

            mounted = false;

        }

    }, [ product ]);

    
    const setLikeCountOnLoad = (user, likesProductRecieved, setLikeCount) => {

        const userEmail = user?.userEmail;

        // const starsUserRecieved = product.starsUserRecieved ? product.starsUserRecieved : null;

        let likeCount = 0;

        if (!likesProductRecieved || !likesProductRecieved.length > 0 || !user) {

            return setLikeCount(likeCount);

        }

        const likesProductRecievedLen = likesProductRecieved.length;

        let i;
        
        for ( i = 0; i < likesProductRecievedLen; i++) {

            if (likesProductRecieved[i].userEmail === userEmail) {

                likeCount = 1;

                break;
            }

        }

        return setLikeCount(likeCount);

    }

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

            setStarsUserRecieved(currentState => currentState.filter( star => star.userEmail !== user.userEmail));

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

    const likeProduct = (product, user, likeCount) => {

        

        if (!likeCount) {

            if (user) {

                const addedLike = {
                    like: likeCount, 
                    userEmail: user.userEmail, 
                    userId: user.id,
                    userFullName: user.fullName
                }

                setLikesProductRecieved(currentState => [...currentState, addedLike]);

                // setStarClicked(true);

                setLikeCount(++likeCount);

            }

            const data = {
                product,
                user,
                likeCount: likeCount
            }

            socket.emit('likeProduct', data);

            return;
              

        }
        
        if (user) {

            setLikesProductRecieved(currentState => currentState.filter( like=> like.userEmail !== user.userEmail));

            // setStarClicked(false);

            setLikeCount(--likeCount);

            

        }

        const data = {
                product,
                user,
                likeCount: likeCount
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
                   product = { product }
                   user = { user }
                   likesProductRecieved = { likesProductRecieved }
                   likeCount = { likeCount }
                   likeProduct = { likeProduct }
                   />
                </div>
                <OpenComment openCommentBox = { openCommentBox } />
            </div>
        </div>
        </>

    )

}