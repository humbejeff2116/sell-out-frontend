
import React, { useState } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ImWarning } from 'react-icons/im';
import { BiLogIn } from 'react-icons/bi';
import { TextInput, PasswordInput } from '../Formik/formik';
import useAuth from '../../Context/context';
import { signupUser } from '../../Utils/http.services';
import './signup.css';

export default function Signup() {
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [creatingAccountError, setCreatingAccountError] = useState(false);
    const [signingUpResponseMessage, setSigningUpResponseMessage] = useState(null);
    const [redirect, setRedirect] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { setUserData, setTokenData } = useAuth();
    
    async function handleSubmit (values) {
        try {
            setCreatingAccount(true);
            setCreatingAccountError(false);

            const { token, userAlreadyExist, message, data } = await signupUser(values);
            const TOKEN = token;

            if (userAlreadyExist) {
                setCreatingAccountError(true);
                setSigningUpResponseMessage(message);
                setCreatingAccount(false);
                return;
            }
            setCreatingAccountError(false);
            // allow user access to getting started pages
            sessionStorage.setItem('access-getting-started-page', JSON.stringify({ user: data, canAccessGettingStarted: true }))
            setUserData(data)
            setTokenData(TOKEN);
            setCreatingAccount(false);
            history.push(location.pathname);
            setRedirect('/getting-started');
        } catch(err) {
            

        }  
    }
 
    if (redirect) {
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
                {signingUpResponseMessage && (
                    <span> {signingUpResponseMessage} </span>
                )}
                </div>
                <div className="signup-panel-body">
                    <Formik
                    initialValues = {{
                        email: '',
                        fullname:'',
                        password: '',  
                    }}
                    validationSchema = {Yup.object({
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        fullname: Yup.string().required('Full name is required'),
                        password: Yup.string().required('Password is required'),
                    })}
                    onSubmit = {handleSubmit}
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
                        label="FULL NAME"
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
                        <Link to="/login">
                            <BiLogIn className="login-link-icon"/>
                            Login
                        </Link>
                    </div>  
                </div>    
            </div>
        </div>
    )
}