
import React, { useState } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { RiErrorWarningLine } from 'react-icons/ri';
import { RiUserAddLine } from 'react-icons/ri';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordInput } from '../Formik/formik';
import { TopPopUpBox, BottomPopUpBox, useBottomPopUpFor } from '../ModalBox/modalBox';
import { LoaderSmall } from '../Loader/loader';
import useCartContext from '../../Context/Cart/cartContext';
import useAuth from '../../Context/context';
import { loginUser } from '../../Utils/http.services';
import './login.css';
   //    import socket from '../Socket/socket';

export default function Login() {
    const [loginIn, setLoginIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginResponseMessage, setLoginResponseMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { setUserData, setTokenData }  = useAuth();
    const { updateCartContextState } = useCartContext();

    async function handleSubmit (values) {
        setLoginIn(true);
        const currentLocation = sessionStorage.getItem("currentLocation") ? (
            JSON.parse(sessionStorage.getItem("currentLocation"))
        ) : null;

        try {
            const { error, message, token, data } = await loginUser(values);

            if (error) {
                setLoginResponseMessage(message);
                setLoginError(true);
                setLoginIn(false);
                setShowMessage(true);
                return;
            }

            const TOKEN = token;
            setCartStateOnLogin(data);
            setUserData(data);
            setTokenData(TOKEN);
            setLoginError(false);
            setLoginIn(false);
            setLoginResponseMessage(null);
            history.push(location.pathname);
            return (currentLocation && currentLocation !== "/home/logout") ? setRedirect(currentLocation) : setRedirect('/home')
        } catch(err) {
            // TODO... handle error
            setLoginIn(false);
            setLoginError(true)
        } 
    }
    
    const setCartStateOnLogin = (user) => {
        const { userEmail } = user  
        const savedCartState =  localStorage.getItem(`${userEmail}-cart`) ? (
            JSON.parse(localStorage.getItem(`${userEmail}-cart`))
        ) : null;

        if (!savedCartState) {
            return;
        }

        return  updateCartContextState(savedCartState?.cartState, user);
    }

    const closeMessageBox = () => {
        setShowMessage(false);
    }
 
    if (redirect) {
        return (
            <Redirect to = { redirect }/>
        )
    }

    return (
        <>
            <TopPopUpBox
            closePopUp = { closeMessageBox }
            message= { loginResponseMessage }
            showPopUp = { showMessage }
            usedFor = { loginError ? useBottomPopUpFor.error : useBottomPopUpFor.success }
            />
            <div className="login-container">
                <div className="login-panel ">
                    <div className="login-panel-heading">
                        <h2>Login </h2>
                    </div>
                    <div className="login-panel-error">
                        <span>{ loginResponseMessage || ''  }</span> 
                    </div>
                    <div className="login-panel-body">                            
                        <Formik
                        initialValues = {{
                            email: '',
                            password: '',
                        }}

                        validationSchema = { 
                            Yup.object({
                                email: Yup.string().email('Invalid email address').required('Email is Required'),
                                password: Yup.string().required('password is required'),
                            })
                        }
                        
                        onSubmit = { handleSubmit }
                        >
                            <Form>
                                <TextInput
                                    label="EMAIL ADDRESS"
                                    labelClassName="login-form-group"
                                    name="email"
                                    type="email"
                                    errorClass="login-form-error"
                                    // dontShowErrorText
                                />
                                <PasswordInput
                                    label="PASSWORD"
                                    labelClassName="login-form-group"
                                    name="password"
                                    type="password"
                                    errorClass="login-form-error"
                                    // dontShowErrorText
                                />
                                <div className="login-forgot-pass">
                                    <span>forgot your password?</span>
                                </div>

                                <div className="login-button">
                                    <button type="submit" >
                                    {loginIn ? ( 
                                        <span>
                                            <LoaderSmall unsetMarginTop/>
                                        </span>
                                    ) : loginError ? (
                                        <>
                                            <RiErrorWarningLine className="login-button-icon"/>
                                            <span>
                                                Log in
                                            </span>
                                        </>
                                    ) : ( 
                                        <span>
                                            Log in
                                        </span>
                                    )}
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="login-signup-panel">
                    <div className="signup-link">
                        <div className="signup-link-text">
                            <p>Dont have an account yet? </p>
                        </div>
                        <div className="signup-link-button">
                            <Link to="/signup">
                                <RiUserAddLine className="signup-link-icon"/>
                                Sign up
                            </Link>
                        </div>  
                    </div>    
                </div>
            </div>
        </>
    )
}