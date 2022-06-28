
import React from 'react';
import styles from './HowItWorks.module.css';



export default function HowItWorks(props) {
    return (
        <div className={ styles.container }>
            <div className={ `${styles.panel} ${styles.top}` }></div>
            <div className={ `${styles.panel} ${styles.bottom}` }></div>
        </div>
    )
}