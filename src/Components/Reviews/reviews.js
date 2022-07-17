
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  IoMdCheckmark } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { GoSettings } from 'react-icons/go';
import { reviewsSortData } from '../../Data/data';
import profileAvatar from '../../Images/avatar4.png';
import styles from './Reviews.module.css';


export default function Reviews({ productReviewsContainer, ...props}) {
    return (
        <div className={ productReviewsContainer || styles.productReviewsContainer }>
           <ReviewsHeader  headerTitle= "200 Store Reviews"/>
            <div className={ styles.productReviews }>
                {/* {
                props.reviews.map((review, i) => 
                    <Review key={ i } { ...review } />
                )
            } */}
                <Review />
           </div>
        </div>
    )
}

export function ReviewsHeader({ reviewsHeaderContainerClassName, headerTitle, ...props}) {
    return (
        <div className={ reviewsHeaderContainerClassName || styles.productReviewsHeader }>
            <div className={ styles.productReviewsHeaderText }>
                { headerTitle }
            </div>
            <div className={ styles.productReviewsHeaderSortContainer }>  
                <Sort/>
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
    let sortContainerClassName;
    const sortDefault = data ? data[0].name : null;
    const reviewsDefault = !data ? reviewsSortData[0].name : null 

    useEffect(() => {
        if (data) {
            setSelectedValue(data[0].name);
            return
        }
        setSelectedValue(reviewsSortData[0].name);
    }, [data])

    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState)
    }

    const selectOption = (e) => {
        let value;
        if (e.target.tagName.toLowerCase() === "div") {
            value = e.target.firstElementChild.value
        } else {
            value = e.target.value
        }
        setSelectedValue(value);
        onSelectChange(value)
    }

    const showMoreIcon = showMore ? ( 
        <TiArrowSortedUp className={ styles.showMoreIcon }/>
    ) : (
        <TiArrowSortedDown className={ styles.showMoreIcon } />
    )

    if (sortContainerOpenClass && sortContainerModifyClass && !sortContainerClass) {
        sortContainerClassName = showMore ? (
            `${styles.reviewsSortContainer} ${sortContainerModifyClass} ${sortContainerOpenClass}`   
        ) : (
            `${styles.reviewsSortContainer} ${sortContainerModifyClass}` 
        )
    }else if (sortContainerClass) {
        sortContainerClassName = showMore ? sortContainerOpenClass :  sortContainerClass 
    } else {
        sortContainerClassName = showMore ? (
            `${styles.reviewsSortContainer} ${styles.reviewsSortContainerOpen}`   
        ) : (
            `${styles.reviewsSortContainer}` 
        )
    }

    const sortHeaderClassName = showMore ? (
        `${styles.reviewsSortHeader} ${styles.reviewsSortHeaderOpen}`
    ) : (
        `${styles.reviewsSortHeader}` 
    )

    const reviewSortBodyClassName = showMore ? (
        `${styles.reviewsSortBody} ${styles.reviewsSortBodyOpen}`
    ) : (
        `${styles.reviewsSortBody}` 
    )
    return (
        <div className={ sortContainerClassName }>
            <div className={ styles.reviewsSortWrapper }>
                <div className={ sortHeaderClassName } onClick ={ viewMoreDetails }>
                    <div className={ styles.sortIconWrapper }>
                        <GoSettings/>
                        <span>{ selectedValue || sortDefault || reviewsDefault }</span> 
                        {showMoreIcon}
                    </div>  
                </div>
                <div className={ styles.reviewsSortBodyContainer }>
                    <div className={ reviewSortBodyClassName }>
                    {
                        data ? (
                            data.map((child, i) =>
                                <SortChild 
                                key = {i} 
                                {...child}
                                onClick = { selectOption }
                                selectedValue = { selectedValue }
                                /> 
                            )
                        ) : (
                            reviewsSortData.map((child, i) =>
                                <SortChild 
                                key = {i} 
                                {...child}
                                onClick = { selectOption }
                                selectedValue = { selectedValue }
                                /> 
                            )
                        )
                    }    
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
        <div onClick={ onClick } className={ selectedValue === name ? styles.active : ""}>
            <option 
            value= { name }
            >
               { name } 
            </option>
           { selectedValue === name && <IoMdCheckmark className={styles.sortmarker}/> }
        </div>
    )
}

SortChild.propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string, 
    selectedValue: PropTypes.string,
    props: PropTypes.object,

}

export function Review(props) {
    return (
        <div className ={styles.reviewContainer}>

            <div className ={styles.reviewAvatarContainer}>
               <ReviewAvatar/>
            </div>

            <div className ={ styles.reviewContentContainer }>
                <div className ={ styles.reviewContent }>
                    <div className ={ `${styles.reviewContentChild} ${styles.userNameWrapper}` }>
                        <div className={ styles.reviewContentUserName }>Humbe Jeffrey</div>
                        <div>9, March 2022</div>
                    </div>

                    <div className ={ styles.reviewContentChild }>
                        review stars
                    </div>

                    <div className ={ `${styles.reviewContentChild} ${styles.reviewText}` }>
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                    </div>      
                </div>

                <ReviewReply/>
                <ReviewItem/>
                <div className ={ styles.reviewHelpfulContainer }>
                    Was this review helpful?
                    <div className ={ styles.reviewHelpfulButtons }>
                        <button>Yes</button>
                        <button>No</button>
                    </div>
                    {/* <MdThumbUpAlt className ={ styles.reviewHelpfulIcon }/> */}
                </div>
                
            </div>

        </div>
    )
}

function ReviewAvatar(props) {
    return (
        <div  className={ styles.reviewAvatarWrapper }>
            <img src={ profileAvatar } alt="avatar" />    
        </div>
    )
}

function ReviewItem(props) {
    return (
        <div className ={ styles.reviewItemContainer }>                  
            <div className ={ styles.reviewItemHeader }> 
                Purchased Item:
            </div>
            <div className ={ styles.reviewItem }> 
                <div className ={ styles.reviewItemImageWrapper }>
                    <img src={ profileAvatar } alt="avatar" />
                </div> 
                <span>product name</span> 
            </div>
        </div>
    )
}

function ReviewReply(props) {
    return (
        <div className ={styles.reviewReply}>
            <div className ={styles.reviewReplyAvatarContainer}>
                <ReviewAvatar/>
                <span className={ styles.replyUserName }>Reply from { props.useName || "user" }</span>
            </div>

            <div className ={styles.reviewReplyText}>
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
            </div> 
        </div>
    )
}