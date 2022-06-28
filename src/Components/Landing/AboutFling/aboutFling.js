





import React from 'react';
import styles from './AboutFling.module.css';




export default function AboutFling(props) {
    return (
        <div className={ styles.container }>
            <div className={ `${styles.panel} ${styles.leftPanel}` }></div>
            <div className={ `${styles.panel} ${styles.rightPanel}` }></div>
        </div>
    )
}