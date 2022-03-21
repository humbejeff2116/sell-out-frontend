
import React,  { useState, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import image2 from '../../Images/product3.webp';
import { Heart, Star, ProfileAvatar } from '../Product/Fragments/productFragments';
import { Price } from '../Product/product';
import useAuth from '../../Context/context';
import ProductLib from '../../Library/product/productLib';
import UserLib from '../../Library/user/userLib';

 export default function SearchResult(props) {

    const { searchItem } = props;

    let [starCount, setStarCount] = useState(0);

    let [likeCount, setLikeCount] = useState(0);

    const [starsUserRecieved, setStarsUserRecieved] = useState([]);

    const [likesProductRecieved, setLikesProductRecieved] = useState([]);

    const { user } = useAuth();
   
    useEffect(() => {

        const  userId = searchItem.userId;
        
        UserLib.getSellerStarsAndSetStarCount(userId, user, setStarCount, setStarsUserRecieved)

    }, [ searchItem, user ]);

    useEffect(() => {
        
        let mounted = true;

        const  userId = searchItem.userId;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        UserLib.getSellerStarsWhenUserDataChange({mounted, userId, user, setStarCount, setStarsUserRecieved})

        return ()=> {

            mounted = false;

        }

    }, [ searchItem ])

    useEffect(() => {
       
        const  productId = searchItem.productId;

        ProductLib.getProductLikesAndSetLikeCount(productId, user, setLikeCount, setLikesProductRecieved)

    }, [ searchItem, user ]);

    useEffect(() => {
      
        let mounted = true;

        const  productId = searchItem._id;

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        ProductLib.getProductLikesWhenProductDataChange(mounted, productId, user, setLikeCount, setLikesProductRecieved)

        return ()=> {

            mounted = false;

        }

    }, [ searchItem ])


    return (

        <div className="index-search-result">
            <div className="index-search-result-details-container">
                {/* image */}
                <div className="index-search-result-product-details-container">
                    <div className="index-search-result-product-image">
                    <img src={props.src || image2} alt="product"/>
                    </div> 
                    <div className="index-search-result-product-details">

                        <p className="index-search-result-product-name">
                            Lingerie top gown
                        </p>

                        <Price 
                        percentageOff={ 2 }
                        productPrice={ 200 }
                        className={ "index-search-result-product-price" }
                        />

                        <Heart
                        iconWrapperClassName={"index-search-result-product-heart-icon"}
                        heartIconClassName={""}
                        product = { searchItem }
                        user = { user }
                        likesProductRecieved = { likesProductRecieved }
                        setLikesProductRecieved ={ setLikesProductRecieved } 
                        setLikeCount = { setLikeCount }
                        likeCount = { likeCount }
                        likeProduct = { ProductLib.likeProduct }
                        /> 
                       
                       
                        <div className="index-search-result-user-details">

                            <div className="index-search-result-user-details-name">
                                <ProfileAvatar
                                // product = {} 
                                brandName = {"Humbe Jeffrey"} 
                                imageWrapperClassName = {""}
                                />
                            </div>

                            <div className="index-search-result-user-details-star">
                               
                                <Star
                                 iconWrapperClassName={"index-search-result-product-heart-icon"}
                                product = { searchItem }
                                user = { user }
                                starsUserRecieved = { starsUserRecieved }
                                starCount = { starCount }
                                setStarsUserRecieved ={setStarsUserRecieved } 
                                setStarCount ={ setStarCount }
                                starSeller = { UserLib.starSeller }
                            />
                            </div> 

                            <div className="index-search-result-user-details-location-container">
                                <div className="index-search-result-user-details-location-icon">
                                    <MdLocationOn className="index-search-result-icon"/>
                                </div>
                                 

                                <div className="index-search-result-user-details-location">
                                    <span className="index-search-result-user-details-group-location">Benue</span>
                                    <span className="index-search-result-user-details-group-location">Lagos</span>
                                    <span className="index-search-result-user-details-group-location">Maiduguri</span>
                                    <span className="index-search-result-user-details-group-location">Lagos</span>
                                    <span className="index-search-result-user-details-group-location">Maiduguri</span>
                                </div>

                            </div>

                        </div>
                    </div>

                    
                </div>
                {/* product user details */}
               
            </div>
            {/* close icon */}
            <div className="index-search-result-close" onClick={ (e)=> props.removeSearchItem(e, props.searchItem) }>
                <span>
                X
                {/* <RiCloseFill className="index-search-close-icon"/> */}
                </span>

            </div>
        </div>

    )
    
}