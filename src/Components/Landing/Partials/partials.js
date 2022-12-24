import React from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import styles from './HowItWorks.module.css';

export function SignUpOnFling() {
    return (
        <div className = { styles.signUpContainer }>
            <a href="/signup" className = { styles.signUpButton }>
                <RiUserAddLine className = { styles.signUpButtonIcon }/>
                Signup on Fling
            </a>
        </div>
    )
}



export function TrustedBrands({
    brands
}) {
    return (
        <div className = { styles.trustedBrandsContainer }>
        {brands?.map((brand, i) => 
            <Brand key = {i} {...brand}/>
        )}
        </div>  
    )
}

function Brand({ logo }) {
    return (
        <div className = { styles.trustedBrand }>
            this is a brand
        </div>
    )
}