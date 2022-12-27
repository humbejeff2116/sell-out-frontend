/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoMdCheckmark } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { GoSettings } from 'react-icons/go';
import socket from '../Socket/socket';
import { reviewsSortData } from '../../Data/data';
import profileAvatar from '../../Images/avatar4.png';
import styles from './Reviews.module.css';


export default function Reviews({ 
    productReviewsContainer, 
    viewState, 
    ...props
}) {
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const { userId, userName, userProfileImage } = viewState;

    useEffect(() => {
        getSellerReviews(viewState);
    }, [viewState]);

    useEffect(() => {
        let mounted = true;

        socket.on('reviewDataChange', function () {
            if (mounted) getSellerReviews(viewState);
        });

        socket.on("getSellerReviewsSuccess", function (response) {
            if (mounted) {
                setReviews(response.data);
                setLoading(false);
            }   
        });

        socket.on("getSellerReviewsError", function (response) {
            if (mounted) {
                setMessage(response.message);
                setError(true); 
                setLoading(false);
            }   
        });

        return () => mounted = false;
    }, [viewState]);

    const getSellerReviews = ({ userId: sellerId }) => {
        setLoading(true);
 
        try {
            socket.emit('getSellerReviews', {sellerId});
        } catch (err) {
            console.error(err);
            setMessage('Error occured while getting reviews');
            setError(true);
        }
    }

    return (
        <div className={ productReviewsContainer || styles.productReviewsContainer }>
           <ReviewsHeader  headerTitle="200 Store Reviews"/>
            <div className = { styles.productReviews }>
            {/* {
                props.reviews.map((review, i) => 
                    <Review 
                    key = { i } 
                    { ...review } 
                    seller = { {userId, userName, userProfileImage} } 
                    />
                )
            } */}
                <Review 
                seller = { {userId, userName, userProfileImage} }
                />
                <Review 
                seller = { {userId, userName, userProfileImage} }
                />
           </div>
        </div>
    )
}

export function ReviewsHeader({ 
    reviewsHeaderContainerClassName, 
    headerTitle, 
    ...props
}) {
    return (
        <div className = { reviewsHeaderContainerClassName || styles.productReviewsHeader }>
            <div className = { styles.productReviewsHeaderText }>
                { headerTitle }
            </div>
            <div className = { styles.productReviewsHeaderSortContainer }>  
                <Sort/>
            </div> 
        </div>
    )
}


const review = {
    sellerId:"343434",
    buyerId: "hdjfjdf",
    productId: "htuydfjd",
    date: "fjdhf",
    stars: "hdfjdf",
    review: "hdjfhdjfhd",
    reply:"",
}

export function Review({
    seller,
    productName,
    productImages,
    ...props
}) {
    const [loading, setLoading]  = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [reviewUser, setReviewUser] = useState(null);
    const { buyerId } = props;

     useEffect(() => {
        getReviewUser(buyerId);
    }, [ buyerId ]);

    useEffect(() => {
        socket.on("getReviewUserSuccess", function (response) {
            setReviewUser(response.data);
            setLoading(false);
        })

        socket.on("getReviewUserError", function (response) {
            setMessage(response.message);
            setError(true);
            setLoading(false);
        })
    }, []);

    const getReviewUser = (userId) => {
        if (!userId) {
            return;
        }
        setLoading(true);
        return socket.emit("getReviewUser", {userId});
    }

    return (
        <div className = { styles.reviewContainer }>
            <div className = { styles.reviewAvatarContainer }>
               <ReviewAvatar imageSrc = { reviewUser?.userProfileImage }/> {/* TODO... return skeleton loader if reviewUser is null */}
            </div>
            <div className = { styles.reviewContentContainer }>
                <div className = { styles.reviewContent }>
                    <div className = { `${styles.reviewContentChild} ${styles.userNameWrapper}` }>
                        <div className = { styles.reviewContentUserName }>
                        { reviewUser?.fullName ?? "User Name" } {/* TODO... return skeleton loader if reviewUserName is null */}
                        </div>
                        <div>
                        { props.date ?? "9, March 2022" }
                        </div>
                    </div>
                    <div className = { styles.reviewContentChild }>
                    { props.stars ?? "review stars" }
                    </div>
                    <div className = { `${styles.reviewContentChild} ${styles.reviewText}` }>
                    {props.review ?? `
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                    `}
                    </div>      
                </div>
                <ReviewReply seller = { seller }/>
                <ReviewItem item = { {productName: productName, productImages: productImages} }/>
                <div className = { styles.reviewHelpfulContainer }>
                    Was this review helpful ?
                    <div className = { styles.reviewHelpfulButtons }>
                        <button>Yes</button>
                        <button>No</button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

function ReviewAvatar({ 
    imageSrc, 
    ...props
}) {
    return (
        <div  className = { styles.reviewAvatarWrapper }>
            <img src = { imageSrc  || profileAvatar } alt="avatar"/>    
        </div>
    )
}

function ReviewReply({
    seller, 
    ...props
}) {
    const { userProfileImage: profileImage, userName } = seller;

    return (
        <div className = { styles.reviewReply }>
            <div className = { styles.reviewReplyAvatarContainer }>
                <ReviewAvatar
                imageSrc = { profileImage }
                />
                <span className = { styles.replyUserName }>
                    Reply from { userName || "seller" }
                </span>
            </div>
            <div className = { styles.reviewReplyText }>
            {props.reply ?? `
                This is the reply of review from the owner of the store
            `}
            </div> 
        </div>
    )
}

function ReviewItem({ item }) {
    const randomImage = (images) => {
        if (!images || images.length < 1) {
            return;
        }

        let len = images.length;
        const randomIndex = Math.floor(Math.random()); //TODO... return random number between len
        return images[randomIndex];  
    }

    return (
        <div className = { styles.reviewItemContainer }>                  
            <div className = { styles.reviewItemHeader }> 
                Purchased Item:
            </div>
            <div className = { styles.reviewItem }> 
                <div className = { styles.reviewItemImageWrapper }>
                    <img src = { item?.productImages?.[0] || profileAvatar } alt="avatar"/>
                </div> 
                <span>{ item?.productName || "product name" }</span> 
            </div>
        </div>
    )
}

export function Sort({
    data, 
    sortTitle, 
    sortContainerClass,
    sortContainerModifyClass,
    sortContainerOpenClass, 
    onSelectChange = f => f, 
    ...props 
}) {
    const [showMore, setShowMore] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const sortDefault = data ? data[0].name : null;
    const reviewsDefault = !data ? reviewsSortData[0].name : null;
    let sortContainerClassName; 

    useEffect(() => {
        if (data) {
            setSelectedValue(data[0].name);
            return
        }
        setSelectedValue(reviewsSortData[0].name);
    }, [data])

    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState);
    }

    const selectOption = (e) => {
        let value;
        if (e.target.tagName.toLowerCase() === "div") {
            value = e.target.firstElementChild.value;
        } else {
            value = e.target.value;
        }
        setSelectedValue(value);
        onSelectChange(value);
    }

    const showMoreIcon = showMore ? ( 
        <TiArrowSortedUp className = { styles.showMoreIcon }/>
    ) : (
        <TiArrowSortedDown className = { styles.showMoreIcon }/>
    )

    const sortHeaderClassName = `${styles.reviewsSortHeader} ${showMore ? styles.reviewsSortHeaderOpen : ""}`;
    const reviewSortBodyClassName = `${styles.reviewsSortBody} ${showMore ? styles.reviewsSortBodyOpen : ""}`;

    if (sortContainerOpenClass && sortContainerModifyClass && !sortContainerClass) {
        sortContainerClassName = `${styles.reviewsSortContainer} ${sortContainerModifyClass} ${showMore ? sortContainerOpenClass : ""}`;
    } else if (!sortContainerOpenClass && sortContainerModifyClass) {
        sortContainerClassName = `${styles.reviewsSortContainer} ${sortContainerModifyClass} ${showMore ? styles.reviewsSortContainerOpen : ""}`;
    } else if (sortContainerClass) {
        sortContainerClassName = showMore ? sortContainerOpenClass : sortContainerClass; 
    } else {
        sortContainerClassName = `${styles.reviewsSortContainer} ${showMore ? styles.reviewsSortContainerOpen : ""}`;
    }

    return (
        <div className = { sortContainerClassName }>
            <div className = { styles.reviewsSortWrapper }>
                <div className = { sortHeaderClassName } onClick ={ viewMoreDetails }>
                    <div className = { styles.sortIconWrapper }>
                        <GoSettings/>
                        <span>{ selectedValue || sortDefault || reviewsDefault }</span> 
                        { showMoreIcon }
                    </div>  
                </div>
                <div className = { styles.reviewsSortBodyContainer }>
                    <div className = { reviewSortBodyClassName }>
                    {data ? (
                        data.map((child, i) =>
                            <SortChild 
                            key = { i } 
                            {...child}
                            onClick = { selectOption }
                            selectedValue = { selectedValue }
                            /> 
                        )
                    ) : (
                        reviewsSortData.map((child, i) =>
                            <SortChild 
                            key = { i } 
                            {...child}
                            onClick = { selectOption }
                            selectedValue = { selectedValue }
                            /> 
                        )
                    )}    
                    </div>
                </div>
            </div> 
        </div>
    )
}

Sort.propTypes = {
    sortTitle: PropTypes.string, 
    sortContainerClass: PropTypes.string,
    sortContainerOpenClass: PropTypes.string, 
    onSelectChange: PropTypes.func, 
    props: PropTypes.object,
}

function SortChild({ 
    onClick,
    name, 
    selectedValue,
    ...props 
}) {
    return (
        <div onClick = { onClick } className = { selectedValue === name ? styles.active : "" }>
            <option 
            value = { name }
            >
               { name } 
            </option>
           { selectedValue === name && <IoMdCheckmark className = { styles.sortmarker }/> }
        </div>
    )
}

SortChild.propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string, 
    selectedValue: PropTypes.string,
    props: PropTypes.object,

}