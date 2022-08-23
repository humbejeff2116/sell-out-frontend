
import React from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import styles from './HowItWorks.module.css';



export default function HowItWorks(props) {
    return (
        <div className={ styles.container }>
            <div className={ `${styles.panel} ${styles.top}` }>
                <div className={ styles.howItWorksContainer }>
                    {/* How it works */}
                    <div className={ `${styles.panel} ${styles.left}` }>
                        how it works svg image
                         {/* image here */}
                        {/* <img /> */}
                    </div>
                    <div className={ `${styles.panel} ${styles.right}` }>
                        <h2 className={ styles.heading }>How it works on Fling</h2>
                        <div className={ styles.text }>
                            Lorem ispium do lus set me at per
                            Lorem ispium do lus set me at per
                            Lorem ispium do lus set me at per
                            Lorem ispium do lus set me at per
                            Lorem ispium do lus set me at per 
                        </div>
                    </div>
                </div>

                <div className={ styles.signUpContainer }>
                   <h4 className={ styles.signUpHeader }>
                        Become part of this community
                   </h4>
                   <a href="/sign" className={ styles.signUpButton }>
                    <RiUserAddLine className={ styles.signUpButtonIcon }/>
                        Signup on Fling
                    </a>
                </div>
            </div>
            <div className={ `${styles.panel} ${styles.bottom}` }>
                trusted brands slider
            </div>
        </div>
    )
}