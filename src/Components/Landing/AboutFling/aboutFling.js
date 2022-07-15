





import React from 'react';
import styles from './AboutFling.module.css';




export default function AboutFling(props) {
    return (
        <div className={ styles.container }>
            <div className={ styles.wrapper }>
                <div className={ `${styles.panel} ${styles.left}` }>
                    <h2 className={ styles.heading }>Lorem ispium do lus set me at per</h2>
                    <div className={ styles.text }>
                        Lorem ispium do lus set me at per
                        Lorem ispium do lus set me at per
                        Lorem ispium do lus set me at per
                        Lorem ispium do lus set me at per
                        Lorem ispium do lus set me at per 
                    </div>
                </div>
                <div className={ `${styles.panel} ${styles.right}` }>
                    {/* image here */}
                    {/* <img /> */}
                    
                </div>
            </div>
        </div>
    )
}