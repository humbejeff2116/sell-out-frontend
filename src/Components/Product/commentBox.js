


import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';


export function CommentBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(null);
    const { user } = useAuth();
    const {commentBoxPanelClassName, closeCommentBox, product, } = props;
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
                <div className="product-comment-close-bttn-contr">
                    <div className="product-comment-close-bttn">
                        <button onClick={closeCommentBox}>Close</button>
                    </div>
                </div>
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
                            <Comment key={i} {...comment} />
                        ))
                    }
                </div>
                <div className="product-comment-input">
                    <textarea name="reviewMessage" onChange={handleInputChange} ref= {textBox} />
                    <div className="product-comment-input-bttn">
                    <button type="button" onClick={()=>makeReview(product, user, reviewValue)}> Send</button>
                    </div>  
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
    const textBox = React.createRef();
    const { userName, userId, profileImage, comment, _id, replies } = props;
    
    useEffect(() => {
        setLikesCommentRecieved(props.likesCommentRecieved);
        setUnlikesCommentRecieved(props.unlikesCommentRecieved);
    }, [user, props.likesCommentRecieved, props.unlikesCommentRecieved]);
    
    const viewProfile = () => {
        // TODO... save reviewId in a context or local storage and redirect to view profile page
    }
    const replyComment = (commentId, user, replyMessage) => {
        const replyReviewData = {
            commentId,
            user,
            replyMessage
        }
        socket.emit("replyReviewProductOrService", replyReviewData)
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
                setLikesCommentRecieved(currentState => currentState.filter(like => like.likeGiverEmail !== user.userEmail ));
                setUnlikesCommentRecieved(currentState => currentState.filter(dislike => dislike.unlikeGiverEmail !== user.userEmail ));
                socket.emit('likeComment', data );
                return;
            }
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
                setLikesCommentRecieved(currrentState => currrentState.filter(like => like.likeGiverEmail !== user.userEmail ));
                setUnlikesCommentRecieved(currrentState => currrentState.filter(dislike => dislike.unlikeGiverEmail !== user.userEmail ));
                socket.emit('unLikeComment', data );
                return;
            }
            setUnlikesCommentRecieved([...unlikesCommentRecieved, dislike]);
            setLikesCommentRecieved(currrentState => currrentState.filter(like => like.likeGiverEmail !== user.userEmail ));
            socket.emit('unLikeComment', data ); 
            return;   
        }
        socket.emit('unLikeComment', data );   
    }

    return (
        <div className="product-comment-panel">
       
        <div className="product-comment-info">
            <div className="product-comment-profile">
                <img src={image} alt="profile" />
                 <span onClick={()=>viewProfile(userId)}>{userName}</span>
            </div>
            <div className="product-comment-message">
                <span> {comment} </span>
            </div>
        </div>
       
        <div className="product-comment-buttons-cntr">
            <div className="product-comment-bttn">
                <button onClick={()=> likeComment(_id, user)}><i>like</i></button>
                <span>
                {
                    (likesCommentRecieved && likesCommentRecieved.length > 0) ? likesCommentRecieved.length :  ''
                }
                </span>
            </div>
            <div className="product-comment-bttn">
                <button onClick={()=> disLikeComment(_id, user)}><i>unlike</i></button>
                <span>
                {
                    (unlikesCommentRecieved && unlikesCommentRecieved.length > 0) ? unlikesCommentRecieved.length : ''
                }
                </span>
            </div>
            <div className="product-comment-bttn">
                <button onClick={()=> toggleReply()}><i>reply</i></button>
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
                textBox={textBox}
                />
            )   
        }
        </div>
    )
}

function Replies(props) {
    const {textBox, repliesCommentRecieved, handleInputChange, replyComment, commentId, user, replyMessage} = props;
    useEffect(() => {
        textBox.current.focus();
    }, [textBox])
   
    return (
        <div className="product-comment-reply-container">
            {
                ( repliesCommentRecieved && repliesCommentRecieved.length > 0 ) && (
                    <div className="product-comment-replies">
                    {
                        repliesCommentRecieved.map((replies, i)=>
                            <Reply key={i} {...replies} />
                        )
                    }     
                    </div>
                )
            } 
            <div className="product-comment-reply-input">
                <textarea name="reviewMessage" onChange={handleInputChange} ref= {textBox} />
                <button type="button" 
                onClick={()=> replyComment(commentId, user, replyMessage)}
                > 
                Reply
                </button>
            </div>
           
        </div>
    )
}

function Reply (props) {
    const {replyMessage, userName, viewProfile, userId } = props;
    return (
        <>
        <div className="product-comment-reply-profile">
            <img src={image} alt="profile" />
            <span onClick={()=> viewProfile(userId)}>{userName}</span>
        </div>
        <div className="product-comment-reply-message">
            <span>
                {replyMessage}
            </span>
        </div>
        </>
    )
}