
import React, { useState, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi'
import { Loader } from '../../Loader/loader';
import { ReviewsHeader, Review } from '../../Reviews/reviews';
import EmptyState, { ErrorState } from '../../EmptyState/emptyState';
import { BottomPopUpBox, useBottomPopUpFor } from '../../ModalBox/modalBox';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';
// import { getProductReviews } from '../../../Utils/http.services';
import bell from '../../../Images/bell3.png';
import styles from './ReviewsBox.module.css';


export function ReviewsBox({ 
    getReviews, 
    reviewsBoxPanelClassName, 
    product,   
    ...props 
}) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [productPatch, setProductPatch] = useState(null);
    const [productReviewsError, setProductReviewsError] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const textBox = useRef();
    const { productId, userProfileImage, userName } = product;
    let ReviewsPanel;

    useEffect(() => {
        textBox.current.focus(); 
    }, [textBox]);

    useEffect(() => {
        let timer = null;
        if (reviewError) {
            timer = setTimeout(() => setReviewError(false), 4000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [reviewError]);

    useEffect(() => { 
        if (getReviews) getProductReviews(productId); 
    }, [productId, getReviews]);

    useEffect(() => { 
        let mounted = true;
        socket.on('reviewDataChange', function () {
            if (mounted) getProductReviews(productId);
        });

        socket.on('getProductReviewsSuccess', function (response) {
            if (mounted) {
                setProductPatch(response.data);
                setLoading(false); 
            }
        });

        socket.on('getProductReviewsError', function (response) {
            if (mounted) {
                setMessage(response.message);
                setProductReviewsError(true);
                setProductPatch(response.data); 
                setLoading(false);
            }
        });
        return ()=> mounted = false;
    }, [productId]);

    const makeReview = (product, user, reviewMessage) => {
        const message = reviewMessage.toString().trim();

        if (!message.length) {
            // textBox.current.focus();
            setMessage('please type a review');
            setReviewError(true);
            return;
        }

        const data = {
            productId: product.productId,
            sellerId: product.userId,
            userId: user?.id,
            reviewMessage: reviewMessage
        }

        socket.emit('reviewProduct', data);
        textBox.current.value = '';
    }

    const handleInputChange = e => setReviewValue(e.target.value);

    const getProductReviews = async (productId) => {
        setLoading(true);
        try {
            socket.emit('getProductReviews', {productId});  
        } catch(err) {
            console.error(err);
            setProductReviewsError(true);
            setLoading(false);
        }    
    }

    const closeReviewMessagePopUp = () => {
        if (reviewError) setReviewError(false);
    }

    if (!getReviews) {
        ReviewsPanel = ""    
    } else if (!productPatch || loading) {
        ReviewsPanel = (    
            <Loader 
            loaderContainer = { styles.loaderContainer }
            loader = { styles.loader }
            />
        )    
    } 
    else if (productPatch?.reviews?.length < 1) {
        ReviewsPanel = (
            <EmptyState
            imageSrc = { bell } //TODO... return appropraite image
            heading = "No Reviews"
            writeUp = "Product has no reviews at the moment"
            />   
        )
    } else if (productReviewsError) {
        ReviewsPanel = (
            <ErrorState
            imageSrc = { bell } //TODO... return appropraite image
            heading = "Error"
            writeUp = {
                `Something went wrong while getting reviews, 
                but its not your fault. Try reloading`
            }
            reloadContent = { ()=> getProductReviews(productId) }
            />
        )
    }
     else {
        ReviewsPanel = (
            <ReviewsWrapper
            productPatch = { productPatch }
            seller = {{ userProfileImage, userName }}
            />
        )
    }

    return (
        <div className = { reviewsBoxPanelClassName }>
            <ReviewsHeader  headerTitle="Product Reviews"/>
            <BottomPopUpBox
            usedFor = { useBottomPopUpFor.error }
            showPopUp = { reviewError }
            message = { message }
            closePopUp = { closeReviewMessagePopUp }
            />
            <div className = { styles.container }>         
                <div className = { styles.reviewsContainer }>
                    { ReviewsPanel }
                </div>  
            </div> 
            <div className = { styles.inputContainer }>
                <textarea 
                placeholder="Type review" 
                name="reviewMessage" 
                onChange = { handleInputChange } 
                ref = { textBox } 
                />
                <div className = { styles.inputBttn } onClick = { ()=> makeReview(product, user, reviewValue) }>
                    <BiSend className = { styles.inputBttnIcon }/>
                </div>  
            </div>
        </div>  
    )
}

function ReviewsWrapper({ 
    productPatch, //  productPatch{ productImages, productName, reviews }
    seller, 
    ...props 
}) {
    return (
        <>
        {productPatch?.reviews?.map((review, i) =>
            <Review 
            key = { i } 
            { ...review }
            seller = { seller }
            { ...productPatch } 
            />
        )}
        </>
    )
}