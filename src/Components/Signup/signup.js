






import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { ImWarning } from 'react-icons/im';
import * as Yup from 'yup';
import {TextInput, PasswordInput} from '../Formik/formik';
import './signup.css';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';






export default function Signup() {
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [creatingAccountError, setCreatingAccountError] = useState(false);
    const [signingUpResponse, setSigningUpResponse] = useState({});
    const [redirect, setRedirect] =useState('');
    const location = useLocation();
    const history = useHistory();
    const { setUserData, setTokenData } = useAuth();
    

    useEffect(() => {
        let mounted = true;
        socket.on('userSignedUp', function(response) {
            if(mounted) {  
                setCreatingAccountError(false);
                setUserData(response.data)
                setCreatingAccount(false);
                history.push(location.pathname);
                setRedirect('/getting-started');
            }   
        });
        socket.on('userAlreadyExist', function (response) {
            if(mounted) {
                setCreatingAccountError(true);
                setSigningUpResponse(response);
                setCreatingAccount(false);
            }  
        });
        return () => {
            mounted = false;
        }         
    }, [setUserData, location, history, setTokenData]);

    function handleSubmit  (values) {
        try{
            setCreatingAccount(true);
            setCreatingAccountError(false);
            socket.emit("signUp", values);    
        } catch(err) {
            

        }     
    }
 
    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
    return (
        <div className="signup-container">
            <div className="signup-panel ">
                <div className="signup-panel-heading">
                    <h2> Create Account </h2>
                </div>
                <div className="signup-panel-error">
                    {
                        signingUpResponse.message && (
                            <span>{signingUpResponse.message}</span>
                        )
                    }
                </div>
                <div className="signup-panel-body">
                <Formik
                    initialValues = {{
                        email: '',
                        fullname:'',
                        password: '',
                       
                    }}

                    validationSchema = { Yup.object({
                        email: Yup.string().email('Invalid email address').required('Email is Required'),
                        fullname: Yup.string().required('Full names are Required'),
                        password: Yup.string().required('Password is required'),
                    })}

                    onSubmit = { handleSubmit }
                >
                <Form>
                <TextInput
                    label="EMAIL ADDRESS"
                    labelClassName="signup-form-group"
                    name="email"
                    type="email"
                    errorClass="signup-form-error"
                />
                   <TextInput
                    label="FULL NAMES"
                    labelClassName="signup-form-group"
                    name="fullname"
                    type="text"
                    errorClass="signup-form-error"
                />
                <PasswordInput
                    label="PASSWORD"
                    labelClassName="signup-form-group"
                    name="password"
                    type="password"
                    errorClass="signup-form-error"
                />
                 <div className="signup-button">
                    <button type="submit" >
                    {
                        creatingAccount ? <span>Creating Account...</span> : 
                        creatingAccountError ? <><ImWarning/> <span>Create account</span></> : 
                        <span>Create account</span>
                    }
                    </button>
                </div>
               
                </Form>
                </Formik>
                </div>
            </div>

            <div className="signup-login-panel">
                <div className="login-link">
                    <div className="login-link-text">
                        <p>Already have an account ? </p>
                    </div>

                    <div className="login-link-button">
                        <Link to="/login"><button> Login </button></Link>
                    </div>
                    
                </div>    
            </div>
        </div>
    )
}