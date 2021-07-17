



   import React, {useState, useEffect} from 'react';
   import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
   import { ImWarning } from 'react-icons/im';
   import { Formik, Form } from 'formik';
   import * as Yup from 'yup';
   import {TextInput, PasswordInput} from '../Formik/formik';
   import socket from '../Socket/socket';
   import useAuth from '../../Context/context';
   import './login.css';

export default function Login() {
    const [loginIn, setLoginIn] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginResponse, setLoginResponse] = useState({});
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const {setUserData, setTokenData} = useAuth();

    useEffect(() => {
        let isMounted = true;

        socket.on('userNotFound', function(response) {
            if(isMounted) {
                setLoginResponse(response);
                setLoginError(true);
                setLoginIn(false);
            }
        })

        socket.on('passwordError', function(response) {
            if(isMounted) {
                setLoginResponse(response);
                setLoginError(true);
                setLoginIn(false);
            }   
        });

        socket.on('passwordMatchNotFound', function(response) {
            if(isMounted) {
            setLoginResponse(response);
            setLoginError(true);
            setLoginIn(false); 
            }   
        });

        socket.on('userFound', function(response) {
                    const TOKEN = response.token;
                    
                    if (isMounted) {
                        if (response.data.isNewUser) {
                            setUserData(response.data)
                            history.push(location.pathname);
                            setLoginError(false);
                            setLoginIn(false);
                            setLoginResponse({});
                            return setRedirect('/getting-started');
                        }
                        setUserData(response.data)
                        setTokenData(TOKEN);
                        setLoginError(false);
                        setLoginIn(false);
                        setLoginResponse({});
                        history.push(location.pathname);
                        setRedirect('/home');
                    } 
        });

    
        return ()=> {
            isMounted = false
        }         
    }, [setUserData, history, location, setTokenData]);

    function handleSubmit  (values) {
        try{
            setLoginIn(true);
            const loginData = values;
            socket.emit('login', loginData);

        } catch(e) {
            setLoginError(true)
        }     
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
                        ( <span>{loginResponse.message || '' }</span> )
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
                    placeholder="example@gmail.com"
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
                    <p>forgot your password?</p>
                </div>

                <div className="login-button">
                    <button type="submit" className="btn btn-success">
                    {loginIn ? 'Loging in...' : loginError ? <><ImWarning/> Log in</> : 'Log in'}
                    </button>
                </div>
                </Form>
                </Formik>
            </div>
                </div>
                <div className="login-signup-panel">
                    <div className="signup-link">
                        <div className="signup-link-text">
                            <p>dont have an account yet ? </p>
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
