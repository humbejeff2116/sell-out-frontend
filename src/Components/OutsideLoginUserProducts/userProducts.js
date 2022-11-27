
import React from 'react';
import { LandingTemplate } from '../Landing/Template/template';
import UserProductsComp from '../UserProducts/userProducts';
import styles from './UserProducts.module.css';


export default function UserProducts() {
    return (
        <LandingTemplate 
        showCartMenuItem
        stickHeaderToTop
        landingTopChild = { <UserProductsWrapper/> }
        />
    )
}


function UserProductsWrapper({ ...props }) {
    return (
        <div className={styles.container}>
            <UserProductsComp/>
        </div>
        
    )
}

