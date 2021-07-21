


import React, {useState, useEffect} from 'react';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';


export function CommentBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviewError,  setReviewError] = useState(null);
    const { user } = useAuth();

    const textBox = React.createRef();

    useEffect(() => {
        textBox.current.focus();
        
        
    }, [textBox]);

    const makeReview = (product, user, reviewMessage) => {
        const message = reviewMessage.trim();
        if (!message.length) {
            textBox.current.focus();
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
        <div className={props.commentBoxPanelClassName}>
            <div className="product-comment-container">
                <div className="product-comment-close-bttn-contr">
                    <div className="product-comment-close-bttn">
                        <button onClick={props.closeCommentBox}>Close</button>
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
                        ( props.product.comments.length > 0 )  && 
                        (props.product.comments.map((comment, i) =>
                            <Comment key={i} {...comment} />
                        ))
                    }
                </div>
                <div className="product-comment-input">
                    <textarea name="reviewMessage" onChange={handleInputChange} ref= {textBox} />
                    <div className="product-comment-input-bttn">
                    <button type="button" onClick={()=>makeReview(props.product, user, reviewValue)}> Send</button>
                    </div>
                    
                </div>
            </div>    
        </div>
        
    )
}

function Comment(props) {
    const { user } = useAuth();
    const [showReplies, setShowReplies] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [likedComment, setLikedComment] = useState(false);
    const [unLikedComment, setUnLikedComment] = useState(false);
    const textBox = React.createRef();
    const { userName, userId, profileImage, comment, _id, replies, likesCommentRecieved, unlikesCommentRecieved } = props;
    

    useEffect(() => {
        if (user) { 
            setLike(user, likesCommentRecieved, setLikedComment);
            setUnLike(user, unlikesCommentRecieved, setUnLikedComment) 
        }

    }, [user, likesCommentRecieved, unlikesCommentRecieved, textBox]);
    
    const viewProfile = () => {
        // TODO... save revieId in a context or local storage and redirect to view profile page
    }
    const replyComment = (commentId, user, replyMessage) => {
        const replyReviewData = {
            commentId,
            user,
            replyMessage
        }
        socket.emit("replyReviewProductOrService", replyReviewData)
    }
    const handleInputChange = (e) => {
        setReplyMessage( e.target.value )
    }
    const toggleReply = () => {
        return setShowReplies(state => !state);
    }

    const setLike = (user, likesCommentRecieved, callback) => {
        const userEmail = user.userEmail;
        const commentLikes = likesCommentRecieved ;
        
        let likedComment = false;
        if(commentLikes) {
            for (let i = 0; i < commentLikes.length; i++) {
                if (commentLikes[i].likeGiverEmail === userEmail) {
                    likedComment = true;
                    break;
                }
            }
           
        } 
         return callback(likedComment); 
    }
    const setUnLike = (user, unLikesCommentRecieved, callback) => {
        const userEmail = user.userEmail;
        const commentUnLikes = unLikesCommentRecieved;
        
        let unLikedComment = false;
        if(commentUnLikes) {
            for (let i = 0; i < commentUnLikes.length; i++) {
                if (commentUnLikes[i].unlikeGiverEmail === userEmail) {
                    unLikedComment = true;
                    break;
                }
            } 
        }  
        return callback(unLikedComment);
    }

    const likeComment = (commentId, user) => {
        const data = {
           commentId: commentId,
            user: user,
        }
        socket.emit('likeComment', data );
        setLikedComment(true);
        setUnLikedComment(false);
    }

    const unLikeComment = (commentId, user) => {
        const data = {
            commentId: commentId,
            user: user,
        }
        
        socket.emit('unLikeComment', data);
        setLikedComment(false);
        setUnLikedComment(true);
    }

    return (
        <div className="product-comment-panel">
        {/* flex row */}
        <div className="product-comment-info">
            <div className="product-comment-profile">
                <img src={image} alt="profile" />
                 <span onClick={()=>viewProfile(userId)}>{userName}</span>
            </div>
            <div className="product-comment-message">
                <span> {comment} </span>
            </div>
        </div>
        {/* flex row */}
        <div className="product-comment-buttons-cntr">
            <div className="product-comment-bttn">
                <button onClick={()=> likeComment(_id, user)}><i>like</i></button>
                <span>
                {
                    (likesCommentRecieved && likesCommentRecieved.length > 0) ? 
                    likesCommentRecieved.length : ''
                }
                </span>
            </div>
            <div className="product-comment-bttn">
                <button onClick={()=> unLikeComment(_id, user)}><i>unlike</i></button>
                <span>
                {
                    (unlikesCommentRecieved && unlikesCommentRecieved.length > 0) ? 
                    unlikesCommentRecieved.length : ''
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
                id ={_id}
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
    useEffect(() => {
        props.textBox.current.focus();
    }, [props.textBox])
   
    return (
        <div className="product-comment-reply-container">
            {
                ( props.repliesCommentRecieved && props.repliesCommentRecieved.length > 0 ) && (
                    <div className="product-comment-replies">
                    {
                        props.repliesCommentRecieved.map((replies, i)=>
                            <Reply key={i} {...replies} />
                        )
                    }     
                    </div>
                )

            } 
            <div className="product-comment-reply-input">
                <textarea name="reviewMessage" onChange={props.handleInputChange} ref= {props.textBox} />
                <button type="button" 
                onClick={()=>props.replyComment(props.id, props.user, props.replyMessage)}
                > 
                Reply
                </button>
            </div>
           
        </div>
    )
}

function Reply (props) {
    const {replyMessage, userName} = props
    return (
        <>
        <div className="product-comment-reply-profile">
            <img src={image} alt="profile" />
            <span onClick={()=>props.viewProfile(props.userId)}>{userName}</span>
        </div>
        <div className="product-comment-reply-message">
            <span>
                {replyMessage}
            </span>
        </div>
        
        </>
    )
}