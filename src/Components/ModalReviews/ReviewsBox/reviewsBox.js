
import React, { useState, useEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi'
import { Loader } from '../../Loader/loader';
import { ReviewsHeader, Review } from '../../Reviews/reviews';
import EmptyState, { ErrorState } from '../../EmptyState/emptyState';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';
import { getProductReviews } from '../../../Utils/http.services';
import bell from '../../../Images/bell3.png';
import styles from './ReviewsBox.module.css';


export function ReviewsBox({ getReviews, reviewsBoxPanelClassName, product,   ...props }) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(null);
    const [productReviews, setProductReviews] = useState(null);
    const [productReviewsError, setProductReviewsError] = useState(false);
    const { user } = useAuth();
    const textBox = useRef();
    const { productId } = product;
    let ReviewsPanel;

    useEffect(() => {
        textBox.current.focus(); 
    }, [textBox]);

    useEffect(() => { 
        if (getReviews) getCurrentProductReviews(productId); 
    }, [productId, getReviews]);

    useEffect(() => { 
        let mounted = true;
        socket.on('reviewDataChange', function() {
            if (mounted) getCurrentProductReviews(productId);
        })
        return ()=> mounted = false;
    }, [productId]);

    const makeReview = (product, user, reviewMessage) => {
        const message = reviewMessage.toString().trim();
        if (!message.length) {
            textBox.current.focus();
            return setReviewError('please type in a review') 
        }
        const data = {
            product: product,
            user: user,
            reviewMessage: reviewMessage
        }
        socket.emit('reviewProduct', data);
        textBox.current.value = '';
    }

    const handleInputChange = e => setReviewValue(e.target.value);

    const getCurrentProductReviews = async (productId) => {
        try {
            const productReviews = await getProductReviews(productId);
            setProductReviews(productReviews.data);
        } catch(err) {
            setProductReviewsError(true)
        }    
    }

    if (!getReviews) {
        ReviewsPanel = ""    
    } else if (!productReviews) {
        ReviewsPanel = (    
            <Loader 
            loaderContainer = { styles.loaderContainer }
            loader = { styles.loader }
            />
        )    
    } 
    else if (productReviews.length < 1) {
        ReviewsPanel = (
            <EmptyState
            imageSrc = {bell} //TODO... return appropraite image
            heading = "No Reviews"
            writeUp = "Product has no reviews at the moment"
            />   
        )
    } else if (productReviewsError) {
        ReviewsPanel = (
            <ErrorState
            imageSrc = {bell} //TODO... return appropraite image
            heading = "An Error Has Occured"
            writeUp = {
                `Something went wrong while getting reviews, 
                but its not your fault. Try reloading`
            }
            reloadContent = { ()=> getCurrentProductReviews(productId) }
            />
        )
    }
     else {
        ReviewsPanel = (
            <ReviewsWrapper
            productReviews = { productReviews }
            />
        )
    }

    return (
        <div className={ reviewsBoxPanelClassName }>
            <ReviewsHeader  headerTitle= "Product Reviews"/>
            <div className={ styles.container }>         
                <div className={ styles.reviewsContainer }>
                    { ReviewsPanel }
                </div>  
            </div> 
            <div className={ styles.inputContainer }>
                <textarea 
                placeholder="Type review" 
                name="reviewMessage" 
                onChange={ handleInputChange } 
                ref= { textBox } 
                />
                <div className={ styles.inputBttn } onClick={ ()=> makeReview(product, user, reviewValue) }>
                    <BiSend className={ styles.inputBttnIcon }/>
                </div>  
            </div>
        </div>  
    )
}

function ReviewsWrapper({ productReviews, ...props }) {
    return (
        <>
        {     
            productReviews.map((review, i) =>
                <Review 
                key = { i } 
                { ...review } 
                />
            )    
        }
        </>
    )
}