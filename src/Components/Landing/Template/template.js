
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation, useHistory  } from 'react-router-dom'
import { BiCartAlt } from "react-icons/bi";
import socket from '../../Socket/socket';
import Header from '../Header/header';
import LandingFooter from '../Footer/landingFooter';
import { BottomErrorPopUpBox } from '../../ModalBox/modalBox';
import LoginModal from '../../LoginModal/loginModal';
import { NotificationAlert } from '../../NotificationsDropdown/notifications';
import BackButton from '../../BackButton/backButton';
import useCartContext from '../../../Context/Cart/cartContext'
import useAuth from '../../../Context/context';
import styles from './Template.module.css';


export function LandingSuspenseTemplate({ children, ...props }) {
    return (
        <section className="landing-container">   
            <div className="landing-top" >
                <Header/>
                <div className="landing-center">
                { children }
                </div>
            </div>
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>
    )
}

export function LandingTemplate({ 
    stickHeaderToTop,
    showCartMenuItem,
    usedCartIconInCart, 
    landingTopChild, 
    landingCenterChild,
    showBackButton, 
    popUp,
    children, 
    ...props 
}) {
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    // outsideLoginPopUpMessage({
    //     type: "unAuthenticated",
    //      show: true,
    //     message: "Hi, kindly login so you could checkout in a more secured environment"
    // })
    const { isAuthenticated, outsideLoginPopUpMessage, setOutsideLoginPopUpMessage } = useAuth();

    useEffect(()=> {
        let mounted = true;
        let timer = null;
        socket.on('unRegisteredUser', function(response) {
            if (mounted) {
                setErrorMessage(response.message);
                setError(true);
            }
        })
        if (error) timer = setTimeout(()=> setError(false), 9000);
        return ()=> {
            if (timer) clearTimeout(timer);
            mounted = false;
        }
    }, [error]);

    useEffect(()=> {
        let timer = null;
        if (outsideLoginPopUpMessage?.show) setErrorMessage(outsideLoginPopUpMessage?.message);
        if (outsideLoginPopUpMessage?.show) timer = setTimeout(()=> setOutsideLoginPopUpMessage({}), 9000);
        return ()=> {
            if (outsideLoginPopUpMessage?.show) setOutsideLoginPopUpMessage({});
            if (timer) clearTimeout(timer); 
        }
    }, [outsideLoginPopUpMessage, setOutsideLoginPopUpMessage]);

    const goToLogin = () => {
        const userIsAuthenticated = isAuthenticated();
        if (userIsAuthenticated) {
            history.push(location.pathname);
            setRedirect('/home');
            return;
        }
        history.push(location.pathname);
        setRedirect('/login');
        setShowLoginDropdown(true);
    }
   
    const closeLoginModal = () => {
        setShowLoginDropdown(false); 
    }

    const closeOutsideLoginPopUp = () => {
        if (outsideLoginPopUpMessage?.show) setOutsideLoginPopUpMessage({});
        setError(false);  
    }

    if (redirect) {
        return (
            <Redirect to={ redirect } />
        )
    }

    return (
        <section className="landing-template-container">   
            <div className="landing-top">    
            <Header 
            showLogin = { goToLogin }
            stickToTop = { stickHeaderToTop }
            />
            {showLoginDropdown && (
                <LoginModal 
                show = { showLoginDropdown } 
                handleClose = { closeLoginModal }
                />
            )}
            <BottomErrorPopUpBox
            showPopUp = { outsideLoginPopUpMessage?.show || error }
            message = { errorMessage || outsideLoginPopUpMessage?.message }
            closePopUp = { closeOutsideLoginPopUp }
            />
            {showCartMenuItem  && ( 
                <CartNavButton
                showBackButton = { showBackButton }
                usedInCart = { usedCartIconInCart }
                />
            )}
            { landingTopChild }
            </div>
            {
                (landingCenterChild) ? (
                    <div className="landing-center">
                        { landingCenterChild }
                    </div>
                ) : ""
            }
            { children }
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>
    )
}

function CartNavButton({ 
    usedInCart,
    showBackButton,
     ...props 
}) {
    return (
        <div className={styles.cartNavButtonContainer}>
            {showBackButton && (
                <BackButton 
                buttonWrapperClassName = {styles.backButtonWrapper} 
                clearSessionStorageWithKey = "view-product-location"
                buttonIconClassName = {styles.backButtonIcon}
                />
            )}
            <CartNavButtonIcon 
            { ...props }
            usedInCart = { usedInCart }
            />
        </div>
    )
}

export function CartNavButtonIcon({ usedInCart, ...props }) {
    const {  cartTotalNumberOfProducts } = useCartContext();
    const cartButtonItemClassName = usedInCart ? `${styles.cartNavButtonItem} ${styles.cart}` : `${styles.cartNavButtonItem}`
    
    return (
        <div className={cartButtonItemClassName}>
            {cartTotalNumberOfProducts > 0  && ( 
                <NotificationAlert 
                className={styles.notification}
                /> 
            )}
            <Link className={styles.cartNavButton} to="/cart" >
                <BiCartAlt className={styles.cartNavButtonItemIcon}/>
            </Link>
        </div>
    )
}
