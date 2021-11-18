



   import React, {useState, useEffect} from 'react';
   import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
   import { ImWarning } from 'react-icons/im';
   import { Formik, Form } from 'formik';
   import * as Yup from 'yup';
   import {TextInput, PasswordInput} from '../Formik/formik';
   import socket from '../Socket/socket';
   import useCartContext from '../../Context/Cart/cartContext';
   import useAuth from '../../Context/context';
   import { loginUser } from '../../Utils/http.services';
   import './login.css';

export default function Login() {
    const [loginIn, setLoginIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginResponseMessage, setLoginResponseMessage] = useState(null);
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const {setUserData, setTokenData} = useAuth();
    const {  clearCart, cartState, updateCartContextState } = useCartContext();

    async function handleSubmit (values) {
        try{
            setLoginIn(true);
            clearCartState(cartState)
            const loginData = values;
            // socket.emit('login', loginData);

            const loggedInUserResponse = await loginUser(values);
            if (loggedInUserResponse.error) {
                setLoginResponseMessage(loggedInUserResponse.message);
                setLoginError(true);
                setLoginIn(false);
                return;
            }
            if (loggedInUserResponse.data.isNewUser) {
                setUserData(loggedInUserResponse.data)
                history.push(location.pathname);
                setLoginError(false);
                setLoginIn(false);
                setLoginResponseMessage(null);
                return setRedirect('/getting-started');
            }
            const TOKEN = loggedInUserResponse.token;
            setUserData(loggedInUserResponse.data);
            setTokenData(TOKEN);
            setLoginError(false);
            setLoginIn(false);
            setLoginResponseMessage("");
            history.push(location.pathname);
            setRedirect('/home');

        } catch(e) {
            setLoginError(true)
        }     
    }
    const clearCartState = async (cartState) => {
        const cart = await clearCart(cartState);
            updateCartContextState(cart);
            return;
    }
 
    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
    return (
        <>
        <div className="login-container">
        <div className="login-panel ">
            <div className="login-panel-heading">
                <h2>Login </h2>
            </div>
            <div className="login-panel-error">
                    {
                        ( <span>{loginResponseMessage || '' }</span> )
                    }
            </div>
            <div className="login-panel-body">                            
                <Formik
                    initialValues = {{
                        email: '',
                        password: '',
                    }}

                    validationSchema = { Yup.object({
                        email: Yup.string().email('Invalid email address').required('Email is Required'),
                        password: Yup.string().required('password is required'),
                    })}

                    onSubmit = { handleSubmit }
                >
                <Form>
                <TextInput
                    label="EMAIL ADDRESS"
                    labelClassName="login-form-group"
                    name="email"
                    type="email"
                    errorClass="login-form-error"
                />
                <PasswordInput
                    label="PASSWORD"
                    labelClassName="login-form-group"
                    name="password"
                    type="password"
                    errorClass="login-form-error"
                />
                <div className="login-forgot-pass">
                    <span>forgot your password?</span>
                </div>

                <div className="login-button">
                    <button type="submit" >
                    {
                        loginIn ? <span>Loging in...</span> : 
                        loginError ? <><ImWarning/> <span>Log in</span></> :
                        <span>Log in</span>
                    }
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
                            <Link to="/signup"><button> sign up </button></Link>
                        </div>  
                    </div>    
                </div>
            </div>
        </>

    )
}
