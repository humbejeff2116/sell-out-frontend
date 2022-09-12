
import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import ProductLib from '../../Library/product/productLib';
import useAuth from '../../Context/context';
import styles from './HeartGiver.module.css';



export default function HeartGiver({  
    product,  
    iconWrapperClassName,
    heartIconClassName,
    showLikes, 
    ...props  
}) {
    let [likeCount, setLikeCount] = useState(0);
    const [likesProductRecieved, setLikesProductRecieved] = useState([]);
    const { user } = useAuth();
    const likes = likesProductRecieved.length;

    useEffect(() => {
        const  productId = product.productId;
        ProductLib.getProductLikesAndSetLikeCount(
            productId, 
            user, 
            setLikeCount, 
            setLikesProductRecieved
        )
    }, [product, user]);

    useEffect(() => {
        let mounted = true;
        const  productId = product.productId;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        ProductLib.getProductLikesWhenProductDataChange(
            mounted, 
            productId, 
            user, 
            setLikeCount, 
            setLikesProductRecieved
        )
        return ()=>  mounted = false;
    }, [product]);

    return (
        <div 
        className= {iconWrapperClassName || styles.container} 
        onClick = {()=> ProductLib.likeProduct(
            product, 
            user, 
            likeCount, 
            setLikesProductRecieved, 
            setLikeCount
        )}
        >
        {likeCount ? (
            <AiFillHeart className={ heartIconClassName || styles.heartIcon }/>
        ) : (
            <AiOutlineHeart className={ heartIconClassName || styles.heartIcon }/>
        )} 
        {showLikes ? (likesProductRecieved && likes > 0  && likes) : ""}  
        </div>
    )
}