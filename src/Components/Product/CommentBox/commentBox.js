


import React, { useState, useEffect } from 'react';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';
import { BiDislike,BiLike, BiReply, BiMessageAltDots, BiMessageAlt, BiMessage} from "react-icons/bi";
import image from '../../../Images/avatar.jpg';
import './commentBox.css';


export function CommentBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(null);
    const { user } = useAuth();
    const {commentBoxPanelClassName, closeCommentBox, product,productCommentPanelName } = props;
    const textBox = React.createRef();

    useEffect(() => {
        textBox.current.focus();  
    }, [textBox]);

    const makeReview = (product, user, reviewMessage) => {
        const message = reviewMessage.toString().trim();
        if (!message.length) {
            textBox.current.focus();
            return setReviewError('please type in a comment')     
        }

        const data = {
            productOrService: product,
            user: user,
            reviewMessage: reviewMessage
        }
        socket.emit('reviewProductOrService', data);
        textBox.current.value = '';
    }

    const handleInputChange = e => {
        setReviewValue( e.target.value )
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
                    {
                        ( product.comments.length > 0 )  && 
                        (product.comments.map((comment, i) =>
                            <Comment
                            productCommentPanelName={productCommentPanelName} 
                            key={i} 
                            {...comment} 
                            />
                        ))
                    }
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
    const { user } = useAuth();
    const [likesCommentRecieved, setLikesCommentRecieved] = useState([]);
    const [unlikesCommentRecieved, setUnlikesCommentRecieved] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [userLikedComment, setUserLikedComment] = useState(false);
    const [userDislikedComment, setUserDislikedComment] = useState(false);
    const replyTextBox = React.createRef();
    const { userName, userId, profileImage, comment, _id, replies } = props;
    const likeIconClassName = userLikedComment ? "product-comment-bttn fill" : "product-comment-bttn"
    const dislikeIconClassName = userDislikedComment ? "product-comment-bttn fill" : "product-comment-bttn"
    
    useEffect(() => {
        setLikesCommentRecieved(props.likesCommentRecieved);
        setUnlikesCommentRecieved(props.unlikesCommentRecieved);
        
    }, [user, props.likesCommentRecieved, props.unlikesCommentRecieved]);

    useEffect(() => {
        const checkIfUserLikedOrDislikedComment = (user, likes, disLikes) => {
            const { userEmail } = user;
            for(let i = 0; i < likes.length; i++ ) {
                if(likes[i].likeGiverEmail === userEmail) {
                    setUserLikedComment(true);
                    break;
                }
            }
            for(let i = 0; i < disLikes.length; i++ ) {
                if(disLikes[i].unlikeGiverEmail === userEmail) {
                    setUserDislikedComment(true);
                    break;
                }
            }
        }
        if(user) {
            checkIfUserLikedOrDislikedComment(user, props.likesCommentRecieved, props.unlikesCommentRecieved );
        }    
    }, [user, props.likesCommentRecieved, props.unlikesCommentRecieved ]);
    
    
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
        socket.emit("replyReviewProductOrService", replyReviewData);
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
        const data = {
            commentId: commentId,
             user: user,
        }
        const commentLikes = likesCommentRecieved;
        if (user) {
            const like = { likeGiverEmail: user.userEmail, likeGiverId: user.id, likeGiverFullName: user.fullName }
            let likedComment = false;
            for (let i = 0; i < commentLikes.length; i++) {
                if (commentLikes[i].likeGiverEmail === user.userEmail) {
                    likedComment = true;
                    break;
                }
            }
            if (likedComment) {
                setUserLikedComment(false);
                setLikesCommentRecieved(currentState => currentState.filter(like => like.likeGiverEmail !== user.userEmail ));
                setUnlikesCommentRecieved(currentState => currentState.filter(dislike => dislike.unlikeGiverEmail !== user.userEmail ));
                socket.emit('likeComment', data );
                return;
            }
            setUserLikedComment(true);
            setUserDislikedComment(false);
            setLikesCommentRecieved([...likesCommentRecieved, like]);
            setUnlikesCommentRecieved(currrentState => currrentState.filter(dislike => dislike.unlikeGiverEmail !== user.userEmail ));
            socket.emit('likeComment', data );
            return;
        }
        socket.emit('likeComment', data );
    }

    const disLikeComment = (commentId, user) => {   
        const data = {
            commentId: commentId,
            user: user,
        }
        const commentDislikes = unlikesCommentRecieved;
        if (user) {
            const dislike = { unlikeGiverEmail: user.userEmail, unlikeGiverId: user.id, unlikeGiverFullName: user.fullName }
            let dislikedComment = false;
            for (let i = 0; i < commentDislikes.length; i++) {
                if (commentDislikes[i].unlikeGiverEmail === user.userEmail) {
                    dislikedComment = true;
                    break;
                }
            }
            if (dislikedComment) {
                setUserDislikedComment(false);
                setLikesCommentRecieved(currrentState => currrentState.filter(like => like.likeGiverEmail !== user.userEmail ));
                setUnlikesCommentRecieved(currrentState => currrentState.filter(dislike => dislike.unlikeGiverEmail !== user.userEmail ));
                socket.emit('unLikeComment', data );
                return;
            }
             setUserDislikedComment(true);
             setUserLikedComment(false);
            setUnlikesCommentRecieved([...unlikesCommentRecieved, dislike]);
            setLikesCommentRecieved(currrentState => currrentState.filter(like => like.likeGiverEmail !== user.userEmail ));
            socket.emit('unLikeComment', data ); 
            return;   
        }
        socket.emit('unLikeComment', data );   
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
                        (unlikesCommentRecieved && unlikesCommentRecieved.length > 0) ? 
                        unlikesCommentRecieved.length : ''
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
        textBox.current.focus();
    }, [textBox]);
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
        <>
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
            <BiDislike title="Dislike" className="nav-icon"onClick={()=> props.disLikeReply(props._id, user)}/>
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

        </>
    )
}