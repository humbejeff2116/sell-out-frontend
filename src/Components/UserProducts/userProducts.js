
import React, { useEffect, useState } from 'react';
import styles from './UserProducts.module.css';


export default function UserProducts(props) {
    return (
        <div className={ styles.container }>
            <div className={ styles.containerTop }>
                <div className={ styles.containerTopLeft }>
                    <Avatar/>
                </div>
                <div className={ styles.containerTopRight }>
                    kebab
                </div>
            </div>

            <div>
                <div>
                    nav Title
                </div>
                <div>
                    search
                </div>
            </div>

            <div>
                products
            </div>
        </div>
    )
}


function Avatar({ ...props }) {
    return (
        <div>
            <div>
                {/* <img src="" alt="" /> */}
            </div>
            <div>
                details
            </div>
        </div>
    )
}