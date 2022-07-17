
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingTemplate } from '../Landing/Template/template';
import { RiUserAddLine } from 'react-icons/ri';
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
                    {/* <div className={ styles.contentImage }>
                        <img src ={ bell } alt ="" />
                    </div> */}
                    sell products illustration
                </div>
                <div className = { styles.right }>
                    <div className={ styles.contentHeader }>
                        <h2>Sell your products on Fling</h2>
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
                        <Link to="/login" className={ styles.loginButton }>
                            <RiUserAddLine className={ styles.loginButtonIcon }/>
                            Login
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
                    <h2>{heading}</h2>
                </div>
                <div className={ styles.contentBody }>
                    {writeup}
                </div>
                {
                    rightBottomChild && (
                        <div className={ styles.contentButtonContainer }>
                            {rightBottomChild}
                        </div>
                    )
                }
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
            <div className = { styles.left }>
                <div className={ styles.contentHeader }>
                    <h2>{heading}</h2>
                </div>
                <div className={ styles.contentBody }>
                    {writeup}
                </div>
                {
                    rightBottomChild && (
                        <div className={ styles.contentButtonContainer }>
                            {rightBottomChild}
                        </div>
                    )
                }
            </div>
            <div className = { styles.right }>
                {leftChild}
            </div>
        </div>
    )
}