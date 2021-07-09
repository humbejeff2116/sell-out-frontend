


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
                    ( props.product.comments.length > 0 )  && 
                    (props.product.comments.map((comment, i) =>
                        <Comment key={i} {...comment} />
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

    }, [user, likesCommentRecieved, unlikesCommentRecieved]);
    
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
        <div className="review-container">
        {/* flex row */}
        <div className="review-info">
            <div>
                <img src={profileImage} alt="profile" />
                 <span onClick={()=>viewProfile(userId)}>{userName}</span>
            </div>
            <div>
                <span> {comment} </span>
            </div>
        </div>
        {/* flex row */}
        <div className="review-buttons">
            <div>
                <button onClick={()=> likeComment(_id, user)}><i>like</i></button>
                <span>
                {
                    (likesCommentRecieved && likesCommentRecieved.length > 0) ? 
                    likesCommentRecieved.length : ''
                }
                </span>
            </div>
            <div>
                <button onClick={()=> unLikeComment(_id, user)}><i>unlike</i></button>
                <span>
                {
                    (unlikesCommentRecieved && unlikesCommentRecieved.length > 0) ? 
                    unlikesCommentRecieved.length : ''
                }
                </span>
            </div>
            <div>
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
   
    return (
        <div>
            {
                ( props.repliesCommentRecieved && props.repliesCommentRecieved.length > 0 ) && (
                    <div>
                    {
                        props.repliesCommentRecieved.map((replies, i)=>
                            <Reply key={i} {...replies} />
                        )
                    }     
                    </div>
                )

            } 
            <div>
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
    let{replyMessage, userName} = props
    return (
        <>
        <span>{userName}</span>
        <span>
            {replyMessage}
        </span>
        </>
    )
}