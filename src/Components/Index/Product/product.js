




import React, {useState, useEffect} from 'react';
import socket from '../../Socket/socket';
import useAuth from '../../../Context/context';





export default function DisplayProducts(props) {
    const [products, setProducts] = useState([]);
   
    useEffect(()=> {
        socket.emit('getProducts');
        socket.on('gottenProducts', function(response) {
            const products = response.data;
            setProducts(products);
        })
    })

    return (
        <div className="index-products-container">
            {
                products.map((prod,i) =>
                <DisplayedProduct key={i}  {...prod} />
                )
            }
        </div>
    )
}

export  function DisplayedProduct(props) {
    const [starCount, setStarCount] = useState(null);
    const [stars, setStars] = useState('');
    const [showComment, setShowComment] = useState(false);
    const { product } = props;
    const {user} = useAuth();

    useEffect(() => {
        getSellerStars(product);
        socket.on('starDataChange', function() {
            getSellerStars(product);
        });
    })

    const getSellerStars = (product) => {
        let { sellerName, sellerId, ...rest } = product;

        socket.emit('getInitialStarData', product )
        socket.on('initialStarData', function(response) {
            const { data } = response;
            setStars(data);
        })
    }
    const starSeller = (product, user, star) => {
        if(star) {
            return setStarCount(prevState => prevState - 1);
        }
        setStarCount(prevState => ++prevState);

        const data = {
            product,
            user,
            starCount
        }
        socket.emit('starSeller', data );
        socket.on('starDataChange')
    }
    const openCommentBox = () => {
        setShowComment(true);
    }
    const closeCommentBox = () => {
        setShowComment(false);
    }

    if(showComment) {
        return (
            <CommentBox 
            product={product}
            closeCommentBox={closeCommentBox}
             />
        )
    }
    return (
        <div className="index-product-panel">
            <div className="index-product-profile-panel">
                <ProfileAvatar product={product} />
               <Star
               product={product}
               user = {user}
                stars={stars}
                starCount={starCount}
                starSeller={starSeller}
               />
            </div>

            <div className="index-product-image-panel">
                <div className="index-product-image">product images</div>
                <div className="index-product-image-details">product details</div>
            </div>

            <div className="index-product-reaction-panel">
                <div className="index-product-reaction-star">star product</div>
                <Comment openCommentBox={openCommentBox} />
            </div>
        </div>
    )
}


function CommentBox(props) {
    const [reviewValue, setReviewValue] = useState('');
    const [reviews, setReviews] = useState('');
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
        <div className="index-product-panel">
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
                    reviews.map((review, i) =>
                        <Review key={i} {...review} />
                    )
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
    const { review } = props;
    const { reviewName, reviewId, reviewProfileImage, reviewMessage } = review;

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

function Comment(props) {
    return (
        <div className="index-product-reaction-comments">
           <i onClick={props.openCommentBox}> comment </i>
        </div>
    )
}

function Star(props) {
    return (
        <div className="index-product-profile-star" onClick={()=> props.starSeller(props.product, props.user,props.starCount)}>
            {props.stars}
        </div>
    )
}

function ProfileAvatar(props) {
    const { product } = props;
    const viewSeller = (product) => {
        // TODO.. call view context function to save view id and redirec to view page
        const { sellerId } = product;
    }

    return (
        <div className="index-product-profile">
            <img src={product.sellerProfilePicture} alt="product iamge" width="100%" height="auto" />
            <span onClick={viewSeller(product)}>{product.sellerName}</span>
        </div>
    )
}