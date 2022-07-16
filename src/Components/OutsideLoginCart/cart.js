
import React from 'react';
import { LandingTemplate } from '../Landing/Template/template';
import Cart from '../Cart/cart';
import styles from './Cart.module.css';

export default function CartComponent() {
    return (
        <LandingTemplate 
        stickHeaderToTop
        showCartMenuItem
        usedCartIconInCart
        landingTopChild = { <CartWrapper/> }
        />
    )
}

function CartWrapper({ ...props }) {
    return (
        <div className = { styles.container }>
            <Cart
            emptyCartHref={"/products"}
            emptyCartContainerClassName={ styles.emptyContainer } 
            dontShowHeading
            />
        </div>
    )
}