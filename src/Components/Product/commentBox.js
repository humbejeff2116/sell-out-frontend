


import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';


export function CommentBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviews, setReviews] = useState([]);
    const [reviewError,  setReviewError] = useState(null);
    const {user} = useAuth();

    useEffect(() => {
        getReviews(props.product);
        socket.on('reviewDataChange', function() {
            getReviews(props.product);
        });

    }, [props.product]);

    const getReviews = (product) => { 
        const { sellerId } = product;

        socket.emit('getInitialReviewData', sellerId);
        socket.on('initialReviewData', function(response) {
            const { data } = response;
            setReviews(data)
        })
    }

    const makeReview = (product, user, reviewMessage) => {
        const message = reviewMessage.trim();
        if (!message.length) {
            return setReviewError('error')
        }

        const data = {
            product: product,
            user: user,
            reviewMessage: reviewMessage
        }

        socket.emit('reviewproduct', data);
        socket.on('reviewProductSuccess', function(response) {
            const { data, message } = response;
            setReviews(data);
        });
    }

    const handleInputChange = (e) => {
        setReviewValue( e.target.value )
    }

    return (
        <div className={props.panelClassName}>
            <div>
                <div>
                    <button onClick={props.closeCommentBox}>Close</button>
                </div>
            </div>
            <div>
                <div>
                    {
                         reviewError && (
                            <span> {reviewError} </span>
                        )
                    } 
                </div>
            </div>
            <div>
               {
                    ( reviews.length > 0 )  && 
                    (reviews.map((review, i) =>
                        <Review key={i} {...review} />
                    ))
                }
            </div>
            <div>
                <textarea name="reviewMessage" onChange={handleInputChange} />
                <button type="button" onClick={()=>makeReview(props.product, user, reviewValue)}> Review</button>
            </div>
        </div>
        
    )
}

function Review(props) {
    const { reviewName, reviewId, reviewProfileImage, reviewMessage } = props;

    const viewProfile = () => {
        // TODO save revieId in a context or local storage and redirect to view profile page
    }

    return (
        <div>
            <div>
                <img src={reviewProfileImage} alt="profile" />
                 <span onClick={()=>viewProfile(reviewId)}>{reviewName}</span>
            </div>
            <div>
                <p> {reviewMessage} </p>
            </div>
        </div>
    )
}