
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight }  from 'react-icons/fi'
import { LandingTemplate } from '../Landing/Template/template';
import shopping from '../../Images/Illustrations/draw-kit/SVG/shopping6.svg';
import styles from './SellProducts.module.css';


export default function SellProducts() {
    return (
        <LandingTemplate 
        showCartMenuItem
        stickHeaderToTop
        landingTopChild = { <SellProductsComponent/> }
        />
    )
}

function SellProductsComponent(props) {
    return (
        <div className = { styles.container }>
            <div className={ styles.contentWrapper }>
                <div className = { styles.left }>
                    <div className={ styles.contentImageWrapper }>
                        <img 
                        className= { styles.contentImage }
                        loading="lazy" 
                        src = { shopping } 
                        alt =""
                        />
                    </div>
                </div>
                <div className = { styles.right }>
                    <div className={ styles.contentHeader }>
                        Sell your products on Fling
                    </div>
                    <div className={ styles.contentBody }>
                        With our modernized systems and enhanced tooling,
                        Fling is definitely the best and easiest place to 
                        sell your products and the fun part is we handle 
                        most of this process for you, and let you do just 
                        little. Why not login and find out where 
                        we fit into your business model
                    </div>
                    <div className={ styles.contentButtonContainer }>
                        <Link to="/login">
                            <button className={ styles.loginButton }>
                                Login
                                <FiArrowRight className={ styles.loginButtonIcon }/>  
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function OutsideloginChildTemplateIllustrationLeft({ 
    leftChild, 
    heading,
    writeup,
    rightBottomChild,
    rightChild, 
    ...props
}) {
    if (rightChild) {
        return (           
            <div className={ styles.contentWrapper }>
                <div className = { styles.left }>
                    {leftChild}
                </div>
                <div className = { styles.right }>
                    {rightChild}
                </div>
            </div>   
        )
    }
    return (
        <div className={ styles.contentWrapper }>
            <div className = { styles.left }>
                {leftChild}
            </div>
            <div className = { styles.right }>
                <div className={ styles.contentHeader }>
                    {heading}
                </div>
                <div className={ styles.contentBody }>
                    {writeup}
                </div>
                {rightBottomChild && (
                    <div className={ styles.contentButtonContainer }>
                        {rightBottomChild}
                    </div>
                )}
            </div>
        </div>
    )
}

export function OutsideloginChildTemplateIllustrationRight({ 
    leftChild, 
    heading,
    writeup,
    rightBottomChild,
    rightChild, 
    ...props
}) {
    if (rightChild) {
        return (           
            <div className={ styles.contentWrapperIllustrationRight }>
                <div className = { styles.left }>
                    {leftChild}
                </div>
                <div className = { styles.right }>
                    {rightChild}
                </div>
            </div>   
        )
    }

    return (
        <div className={ styles.contentWrapperIllustrationRight }>
            <div className = { styles.right }>
                <div className={ styles.contentHeader }>
                    {heading}
                </div>
                <div className={ styles.contentBody }>
                    {writeup}
                </div>
                {rightBottomChild && (
                    <div className={ styles.contentButtonContainer }>
                        {rightBottomChild}
                    </div>
                )}
            </div>
            <div className = { styles.left }>
                {leftChild}
            </div>
        </div>
    )
}