
import React, { useState, useEffect } from 'react';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';
import { getProductReviews } from '../../../Utils/http.services';
import { Loader } from '../../Loader/loader';
import { ReviewsHeader, Review } from '../../Reviews/reviews';
import styles from './ReviewsBox.module.css';


export function ReviewsBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(null);
    const [productReviews, setProductReviews] = useState(null);
    const [productReviewsError, setProductReviewsError] = useState(false)
    const { user } = useAuth();
    const { reviewsBoxPanelClassName, product } = props;
    const textBox = React.createRef();
    let ReviewsPanel;

    useEffect(() => {
        textBox.current.focus(); 
    }, [textBox]);

    useEffect(() => { 
        getCurrentProductReviews(product.productId) 
    }, [product]);

    useEffect(() => { 
        let mounted = true;

        socket.on('reviewDataChange', function() {
            if (mounted) {
                getCurrentProductReviews(product.productId)
            } 
        })

        return ()=> {
            mounted = false;
        }
    }, [product]);

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

    const handleInputChange = e => {
        setReviewValue( e.target.value )
    }

    const getCurrentProductReviews = async (productId) => {
        try {
            const productReviews = await getProductReviews(productId);
            setProductReviews(productReviews.data);
        } catch(err) {
            setProductReviewsError(true)
        }    
    }

    if (!productReviews) {
        ReviewsPanel = (    
            <Loader 
            loaderContainer = { styles.container }
            loader = { styles.loader }
            />
        )    
    } 
    // else if (productReviews.length < 1) {
    //     ReviewsPanel = (
    //         <EmptyReviews/>
    //     )
    // } else if (productReviewsError) {
    //     ReviewsPanel = (
    //         <div>Error</div>
    //     )
    // }
     else {
        ReviewsPanel = (
            < ReviewsWrapper
            productReviews = { productReviews }
            />
        )
    }

    return (
        <div className={reviewsBoxPanelClassName}>
            <ReviewsHeader  headerTitle= "Product Reviews"/>
            <div className={ styles.container }>         
                {/* <div className="product-comment-error">
                    <div>
                    {
                        reviewError && (
                            <span> {reviewError} </span>
                        )
                    } 
                    </div>
                </div> */}
                <div className={ styles.reviewsContainer }>
                    { ReviewsPanel }
                </div>  
            </div> 
            <div className={ styles.inputContainer }>
                <textarea placeholder="Type review" name="reviewMessage" onChange={handleInputChange} ref= {textBox} />
                <div className={ styles.inputBttn } onClick={()=>makeReview(product, user, reviewValue)}>
                    Send
                </div>  
            </div>
        </div>  
    )
}

function ReviewsWrapper(props) {
    return (
        <>
        {/* {     
            (props.productReviews.map((review, i) =>
                <Review 
                key = { i } 
                {...review} 
                />
            ))    
        } */}
        <Review/>
        <Review/>
        </>
    )
}


function EmptyReviews(props) {
    return (
        <div>
            <div>
                Product has no reviews yet 
            </div>

        </div>
    )
}