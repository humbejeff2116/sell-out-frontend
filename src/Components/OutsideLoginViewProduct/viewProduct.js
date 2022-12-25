import React from 'react';
import { LandingTemplate } from '../Landing/Template/template';
import ViewProductComp from '../ViewProduct/viewProduct';
import styles from './ViewProduct.module.css';


export default function ViewProduct() {
    return (
        <LandingTemplate 
        stickHeaderToTop
        showHeaderShadow
        showCartMenuItem
        showBackButton
        landingTopContainerModificationClass = { styles.wrapper }
        landingTopChild = { <ViewProductWrapper/> }
        />
    )
}

function ViewProductWrapper(props) {
    return (
        <div className = { styles.container }>
            <ViewProductComp
            usedOutsideLogin
            dontShowbackButton
            />
        </div>
    )
}