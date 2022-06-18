
import React, { useState } from 'react';
import {  IoMdCheckmark } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { GoSettings } from 'react-icons/go';
import profileAvatar from '../../Images/avatar4.png';
import styles from './Reviews.module.css';

export default function Reviews({ productReviewsContainer, ...props}) {
    return (
        <div className={ productReviewsContainer || styles.productReviewsContainer }>
           <div className={ styles.productReviewsHeader }>
            <div className={ styles.productReviewsHeaderText }>
                200 shop reviews
            </div>

            <div className={ styles.productReviewsHeaderSortContainer }>
                
                <Sort/>
            </div>
            
           </div>

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

function Sort(props) {
    const [showMore, setShowMore] = useState(false);
    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState)
    }
    const showMoreIcon = showMore ? ( 
        <TiArrowSortedUp className={ styles.showMoreIcon }/>
    ) : (
        <TiArrowSortedDown className={ styles.showMoreIcon } />
    )

    const sortContainerClassName = showMore ? (
        `${styles.reviewsSortContainer} ${styles.reviewsSortContainerOpen}`
    ) : (
        `${styles.reviewsSortContainer}` 
    )

    const sortheaderClassName = showMore ? (
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
                <div className={ sortheaderClassName } onClick ={ viewMoreDetails }>
                    <div className={ styles.sortIconWrapper }>
                        <GoSettings/>
                        <span>Recomended</span>
                        {showMoreIcon}
                    </div>
                    
                </div>
                
                <div className={ styles.reviewsSortBodyContainer }>
                    <div className={ reviewSortBodyClassName }>
                        <div>Recomended <IoMdCheckmark/></div>
                        <div>Newest <IoMdCheckmark/></div>
                        <div>Oldest <IoMdCheckmark/></div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

function Review(props) {
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