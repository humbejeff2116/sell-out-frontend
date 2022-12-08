
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight }  from 'react-icons/fi'
import { LandingTemplate } from '../Landing/Template/template';
import shopping from '../../Images/Illustrations/draw-kit/SVG/shopping6.svg';
import styles from './SellProducts.module.css';


const sellProductsComponentData = {
    imgSrc: shopping,
    imgAlt: '',
    headerText: `
        Sell your products on Fling
    `,
    bodyText: `
        With our modernized systems and enhanced tooling,
        Fling is definitely the best and easiest place to 
        sell your products and the fun part is we handle 
        most of this process for you, and let you do just 
        little. Why not login and find out where 
        we fit into your business model
    `
}

export default function SellProducts() {
    return (
        <LandingTemplate 
        showCartMenuItem
        stickHeaderToTop
        landingTopChild = { <SellProductsComponent { ...sellProductsComponentData }/> }
        />
    )
}

function SellProductsComponent({ 
    imgSrc, 
    imgAlt, 
    headerText, 
    bodyText 
}) {
    return (
        <div className = { styles.container }>
            <div className = { styles.contentWrapper }>
                <div className = { styles.left }>
                    <div className = { styles.contentImageWrapper }>
                        <img 
                        className = { styles.contentImage }
                        loading="lazy" 
                        src = { imgSrc } 
                        alt = { imgAlt }
                        />
                    </div>
                </div>
                <div className = { styles.right }>
                    <div className = { styles.contentHeader }>
                        { headerText }
                    </div>
                    <div className = { styles.contentBody }>
                        { bodyText }
                    </div>
                    <div className = { styles.contentButtonContainer }>
                        <Link to="/login">
                            <button className = { styles.loginButton }>
                                Login
                                <FiArrowRight className = { styles.loginButtonIcon }/>  
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const illustrationPosition = {
    left: 'left',
    right: 'right'
}

export function TwoColWithIllustration({
    headerText,
    bodyText,
    rightBottomChild,
    imgSrc,
    imgAlt,
    illustrationPos
}) {
    return (
        <div className = { styles.contentWrapper }>
            {illustrationPos === illustrationPosition.left ? (
                <>
                    <div className = { styles.left }>
                        <div className = { styles.contentImageWrapper }>
                            <img 
                            className = { styles.contentImage }
                            loading="lazy" 
                            src = { imgSrc } 
                            alt = { imgAlt }
                            />
                        </div>
                    </div>
                    <div className = { styles.right }>
                        <div className = { styles.contentHeader }>
                            { headerText  }
                        </div>
                        <div className = { styles.contentBody }>
                            { bodyText }
                        </div>
                        {rightBottomChild && (
                            <div className = { styles.contentButtonContainer }>
                                { rightBottomChild }
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className = { styles.right }>
                        <div className = { styles.contentHeader }>
                            { headerText }
                        </div>
                        <div className = { styles.contentBody }>
                            { bodyText }
                        </div>
                        {rightBottomChild && (
                            <div className = { styles.contentButtonContainer }>
                                { rightBottomChild }
                            </div>
                        )}
                    </div>
                    <div className = { `${styles.left} ${styles.illustRight}` }>
                        <div className = { styles.contentImageWrapper }>
                            <img 
                            className = { `${styles.contentImage} ${styles.illusRightImage}` }
                            loading="lazy" 
                            src = { imgSrc } 
                            alt = { imgAlt }
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}