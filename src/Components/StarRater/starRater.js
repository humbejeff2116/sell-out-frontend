
import React, { useState } from 'react';
import styles from './StarRater.module.css';



export default function StartRater() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const numOfStars = [...Array(5)];

    return (
        <div className={styles.container}>
        {numOfStars.map((star, i) => {
            i += 1;
            return (
                <button
                type="button"
                key={i}
                className={i <= (hover || rating) ? styles.on : styles.off}
                onClick={()=> setRating(i)}
                onMouseEnter={()=> setHover(i)}
                onMouseLeave={()=> setHover(rating)}
                >
                    <span className={styles.star}>&#9733;</span>
                </button>
            )
        })}
        </div>
    )
}  