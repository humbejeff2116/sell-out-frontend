
import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import UserLib from '../../Library/user/userLib';
import useAuth from '../../Context/context';
import styles from './StarGiver.module.css';



export default function StarGiver({  
    product,  
    starIconClassName,
    iconWrapperClassName,
    ...props 
}) {
    let [starCount, setStarCount] = useState(0);
    const [starsUserRecieved, setStarsUserRecieved] = useState([]);
    const { user } = useAuth();
    let starsLength = starsUserRecieved.length; 

    useEffect(() => {
        const  userId = product.userId;
        UserLib.getSellerStarsAndSetStarCount(userId, user, setStarCount, setStarsUserRecieved);
    }, [product, user]);

    useEffect(() => { 
        let mounted = true;
        const  userId = product.userId;
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        UserLib.getSellerStarsWhenUserDataChange({ mounted, userId, user, setStarCount, setStarsUserRecieved });
        return ()=> mounted = false;
    }, [product]);

    return (
        <div 
        className= { iconWrapperClassName || styles.container } 
        onClick = {()=> UserLib.starSeller(product, user, starCount, setStarsUserRecieved, setStarCount)}
        >
        {starCount ? (
            <AiFillStar className={ starIconClassName || styles.starIcon }/>
        ) : (
            <AiOutlineStar className={ starIconClassName || styles.starIcon }/>
        )} 
        { starsUserRecieved && starsLength > 0  && starsLength }
        </div>
    )
}