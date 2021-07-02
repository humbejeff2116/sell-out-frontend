


import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';


export function CommentBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(null);
    const { user } = useAuth();

    const textBox = React.createRef();

    useEffect(() => {
        
        
    }, []);

    const makeReview = (product, user, reviewMessage) => {
        const message = reviewMessage.trim();
        if (!message.length) {
            return setReviewError('error')
        }

        const data = {
            productOrService: product,
            user: user,
            reviewMessage: reviewMessage
        }

        socket.emit('reviewProductOrService', data);
        textBox.current.value = '';
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
                    ( props.product.reviews.length > 0 )  && 
                    (props.product.reviews.map((review, i) =>
                        <Review key={i} {...review} />
                    ))
                }
            </div>
            <div>
                <textarea name="reviewMessage" onChange={handleInputChange} ref= {textBox} />
                <button type="button" onClick={()=>makeReview(props.product, user, reviewValue)}> Review</button>
            </div>
        </div>
        
    )
}

function Review(props) {
    const { userName, userId, profileImage, review } = props;

    const viewProfile = () => {
        // TODO... save revieId in a context or local storage and redirect to view profile page
    }

    return (
        <div>
            <div>
                <img src={profileImage} alt="profile" />
                 <span onClick={()=>viewProfile(userId)}>{userName}</span>
            </div>
            <div>
                <p> {review} </p>
            </div>
        </div>
    )
}