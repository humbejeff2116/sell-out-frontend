
import React, { useState, useEffect } from 'react';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';
import { BiDislike, BiLike, BiReply } from "react-icons/bi";
import image from '../../../Images/avatar.jpg';
import { getProductReviews } from '../../../Utils/http.services';
import { Loader } from '../../Loader/loader';
import './commentBox.css';


export function CommentBox(props) {

    const [reviewValue, setReviewValue] = useState('');

    const [reviewError,  setReviewError] = useState(null);

    const [productReviews, setProductReviews] = useState(null);

    const [productReviewsError, setProductReviewsError] = useState(false)

    const { user } = useAuth();

    const { commentBoxPanelClassName, product, productCommentPanelName } = props;

    const textBox = React.createRef();

    let CommentsPanel;

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

        CommentsPanel = (
           
            <Loader 
            loaderContainer = {"comments-loader-container"}
            loader = {"comments-loader"}
            />

        )    

    } else if (!productReviews.length >0) {
   
        CommentsPanel = (

            <EmptyComments/>

        )

    } else if (productReviewsError) {

        CommentsPanel = (
            // TODO... return an error component
            <div>Error</div>
        )

    } else {

        CommentsPanel = (

            < ReviewsWrapper
            productCommentPanelName = { productCommentPanelName } 
            productReviews = { productReviews }
            />
        )

    }

    return (

        <div className={commentBoxPanelClassName}>
            <div className="product-comment-container">
               
                <div className="product-comment-error">
                    <div>
                        {
                            reviewError && (
                                <span> {reviewError} </span>
                            )
                        } 
                    </div>
                </div>
                <div className="product-comments-container">
                    { CommentsPanel }
                </div>  
            </div> 

            <div className="product-comment-input">
                <textarea placeholder="Write review" name="reviewMessage" onChange={handleInputChange} ref= {textBox} />
                <div className="product-comment-input-bttn">
                <button  onClick={()=>makeReview(product, user, reviewValue)}> Send</button>
                </div>  
            </div>


        </div>  
    )
}

function Comment(props) {

    const [likesCommentRecieved, setLikesCommentRecieved] = useState([]);

    const [dislikesCommentRecieved, setDislikesCommentRecieved] = useState([]);

    const [showReplies, setShowReplies] = useState(false);

    const [replyMessage, setReplyMessage] = useState('');

    const [userLikedComment, setUserLikedComment] = useState(false);

    const [userDislikedComment, setUserDislikedComment] = useState(false);

    const { user } = useAuth();

    const replyTextBox = React.createRef();

    const { userName, userId, profileImage, comment, _id, replies } = props;

    const likeIconClassName = userLikedComment ? "product-comment-bttn fill" : "product-comment-bttn"

    const dislikeIconClassName = userDislikedComment ? "product-comment-bttn fill" : "product-comment-bttn"
    
    useEffect(() => {

        if (props?.likesCommentRecieved.length > 0) {

            setLikesCommentRecieved(props.likesCommentRecieved);

        }

        if (props?.dislikesCommentRecieved.length > 0) {
            
            setDislikesCommentRecieved(props.dislikesCommentRecieved);

        }

    }, [user, props.likesCommentRecieved, props.dislikesCommentRecieved]);

    useEffect(() => {

        const checkIfUserLikedOrDislikedComment = (user, likes, dislikes) => {

            let i;

            const likesLen = likes.length;

            const dislikesLen = dislikes.length;

            const { userEmail } = user;

            for (i = 0; i < likesLen; i++) {

                if (likes[i].userEmail === userEmail) {

                    setUserLikedComment(true);

                    break;
                }

            }

            for ( i = 0; i < dislikesLen; i++) {

                if (dislikes[i].userEmail === userEmail) {

                    setUserDislikedComment(true);

                    break;
                }

            }

        }

        if (user && (props?.likesCommentRecieved.length > 0 ||  props?.dislikesCommentRecieved.length > 0)) {

            checkIfUserLikedOrDislikedComment(user, props.likesCommentRecieved, props.dislikesCommentRecieved );

        }  

    }, [user, props.likesCommentRecieved, props.dislikesCommentRecieved ]);
    
    
    const viewProfile = () => {
        // TODO... save reviewId in a context or local storage and redirect to view profile page
    }

    const replyComment = (commentId, user, replyMessage) => {

        const message = replyMessage.toString().trim();

        if (!message.length) {

            replyTextBox.current.focus();

            return;
            // return setReviewError('please type in a comment')     
        }

        const replyReviewData = {
            commentId,
            user,
            replyMessage: message
        }

        socket.emit("replyReviewProduct", replyReviewData);

        replyTextBox.current.value = '';

        replyTextBox.current.focus();

    }

    const handleInputChange = e => {

        setReplyMessage(e.target.value)

    }

    const toggleReply = () => {

        return setShowReplies(currentState => !currentState);

    }

    const likeComment = (commentId, user) => {

        let i;

        const commentLikes = likesCommentRecieved;

        const commentLikesLen = commentLikes.length;

        const data = {
            commentId: commentId,
             user: user,
        }

        if (user) {

            const like = { userEmail: user.userEmail, userId: user.id, userFullName: user.fullName }

            let likedComment = false;

            for (i = 0; i < commentLikesLen; i++) {

                if (commentLikes[i].userEmail === user.userEmail) {

                    likedComment = true;

                    break;

                }

            }

            if (likedComment) {

                setUserLikedComment(false);

                setLikesCommentRecieved(currentState => currentState.filter(like => like.userEmail !== user.userEmail ));

                setDislikesCommentRecieved(currentState => currentState.filter(dislike => dislike.userEmail !== user.userEmail ));

                socket.emit('likeReview', data );

                return;

            }

            setUserLikedComment(true);

            setUserDislikedComment(false);

            setLikesCommentRecieved([...likesCommentRecieved, like]);

            setDislikesCommentRecieved(currrentState => currrentState.filter(dislike => dislike.userEmail !== user.userEmail ));

            socket.emit('likeReview', data );
            
            return;

        }

        socket.emit('likeReview', data );

    }

    const disLikeComment = (commentId, user) => { 
        let i;
    
        const commentDislikes = dislikesCommentRecieved;

        const commentDislikesLen = commentDislikes.length;

        const data = {
            commentId: commentId,
            user: user,
        }

        if (user) {

            const dislike = { userEmail: user.userEmail, userId: user.id, userFullName: user.fullName }

            let dislikedComment = false;

            for (i = 0; i < commentDislikesLen; i++) {

                if (commentDislikes[i].userEmail === user.userEmail) {

                    dislikedComment = true;

                    break;

                }

            }

            if (dislikedComment) {

                setUserDislikedComment(false);

                setLikesCommentRecieved(currrentState => currrentState.filter(like => like.userEmail !== user.userEmail ));

                setDislikesCommentRecieved(currrentState => currrentState.filter(dislike => dislike.userEmail !== user.userEmail ));

                socket.emit('dislikeReview', data);

                return;

            }

            setUserDislikedComment(true);

            setUserLikedComment(false);

            setDislikesCommentRecieved([...dislikesCommentRecieved, dislike]);

            setLikesCommentRecieved(currrentState => currrentState.filter(like => like.userEmail !== user.userEmail ));

            socket.emit('dislikeReview', data);

            return; 

        }

        socket.emit('dislikeReview', data); 

    }

    return (

        <div className={ props.productCommentPanelName ? props.productCommentPanelName : "product-comment-panel" }>
       
        <div className="product-comment-info">
            <div className="product-comment-profile">
                <img src={image} alt="profile" />
                 <span onClick={()=>viewProfile(userId)}><b>{userName}</b></span>
            </div>
            <div className="product-comment-message">
                <span> {comment} </span>
            </div>
        </div>
       
        <div className="product-comment-buttons-cntr">
            <div className={likeIconClassName}>
                <BiLike title="Like" className="nav-icon" onClick={()=> likeComment(_id, user)}/>
                <div className="product-comment-bttn-count">
                    <span>
                    {
                        (likesCommentRecieved && likesCommentRecieved.length > 0) ? 
                        likesCommentRecieved.length :  ''
                    }
                    </span>
                </div>
            </div>
           
            <div className={dislikeIconClassName}>
                <BiDislike title="Dislike" className="nav-icon" onClick={()=> disLikeComment(_id, user)}/>
                <div className="product-comment-bttn-count">
                    <span>
                    {
                        (dislikesCommentRecieved && dislikesCommentRecieved.length > 0) ? 
                        dislikesCommentRecieved.length : ''
                    }
                    </span>
                </div>
            </div>
            
            <div className="product-comment-bttn">
                <BiReply title="Reply" className="nav-icon" onClick={()=> toggleReply()}/>
                <div className="product-comment-bttn-count">
                    <span>
                    {
                        (replies && replies.length > 0) ? 
                        replies.length : ''
                    }
                    </span>
                </div>
            </div>
           
        </div>
        {
            (showReplies) && (
                <Replies
                commentId ={_id}
                handleInputChange={handleInputChange}
                replyComment={replyComment}
                repliesCommentRecieved={replies}
                user={user}
                replyMessage={replyMessage}
                textBox={replyTextBox}
                />
            )   
        }
        </div>

    )

}

function Replies(props) {

    const { textBox, repliesCommentRecieved, handleInputChange, replyComment, commentId, user, replyMessage } = props;

    useEffect(() => {
        // textBox.current.focus();
    }, [textBox]);


    // TODO... implement like and dislike review reply
    const likeReply = ( ) => {

    }

    const dislikeReply = ( ) => {

    }
   
    return (

        <div className="product-comment-reply-container">
            {
                ( repliesCommentRecieved && repliesCommentRecieved.length > 0 ) && (
                    <div className="product-comment-replies">
                    {
                        repliesCommentRecieved.map((replies, i)=>
                            <Reply 
                            key={i} 
                            {...replies}
                            user={user}
                            likeReply={likeReply}
                            dislikeReply={dislikeReply} 

                            />
                        )
                    }     
                    </div>
                )
            } 
            <div className="product-comment-reply-input">
                <textarea name="reviewMessage" onChange={handleInputChange} ref= {textBox} placeholder="Write reply" />
                <div className="product-comment-reply-input-bttn">
                    <button onClick={()=> replyComment(commentId, user, replyMessage)}>
                    Reply
                    </button> 
                </div>
               
              
            </div>
           
        </div>
    )
}

function Reply (props) {
    const {replyMessage, userName, viewProfile, user , userId, likesReplyRecieved, _id, dislikesReplyRecieved } = props;
    return (
        <div className="product-comment-reply-wrapper">
        {/* reply profile */}
        <div className="product-comment-reply-profile">
            <img src={image} alt="profile" />
            <span onClick={()=> viewProfile(userId)}><b>{userName}</b></span>
        </div>
        {/* reply message */}
        <div className="product-comment-reply-message">
            <span>
                {replyMessage}
            </span>
        </div>
        {/* reply buttons */}

        <div className="product-comment-reply-buttons-cntr">
            <div className="product-comment-bttn">
            <BiLike title="Like" className="nav-icon" onClick={()=> props.likeReply(_id, user)}/>
                <div className="product-comment-bttn-count">
                    <span>
                    {
                        ( likesReplyRecieved &&  likesReplyRecieved.length > 0) ? 
                        likesReplyRecieved.length :  ''
                    }
                    </span>
                </div>
            </div>
           
            <div className="product-comment-bttn">
            <BiDislike title="Dislike" className="nav-icon"onClick={()=> props.dislikeReply(props._id, user)}/>
                <div className="product-comment-bttn-count">
                    <span>
                    {
                        (dislikesReplyRecieved && dislikesReplyRecieved.length > 0) ? 
                        dislikesReplyRecieved.length : ''
                    }
                    </span>
                </div>
            </div>

        </div>

        </div>
    )
}


function EmptyComments(props) {
    return (
        <div>
            <div>
                Product has no reviews yet 
            </div>

        </div>
    )
}

function ReviewsWrapper(props) {

    return (

        <>
        {
            
            (props.productReviews.map((review, i) =>

                <Comment
                productCommentPanelName = { props.productCommentPanelName } 
                key = { i } 
                {...review} 
                />

            ))
            
        }
        </>

    )
}