/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RiErrorWarningLine } from 'react-icons/ri';
import { BiLogIn } from 'react-icons/bi';
import { TextInput, PasswordInput } from '../Formik/formik';
import { BottomPopUpBox, useBottomPopUpFor } from '../ModalBox/modalBox';
import { LoaderSmall } from '../Loader/loader';
import useAuth from '../../Context/context';
import { signupUser } from '../../Utils/http.services';
import styles from './Signup.module.css';
import './signup.css';

export default function Signup() {
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [creatingAccountError, setCreatingAccountError] = useState(false);
    const [signingUpResponseMessage, setSigningUpResponseMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [form, setForm] = useState(null);
    const [showFullNamesAndPassword, setShowFullNamesAndPassword] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { setUserData, setTokenData } = useAuth();

    useEffect(() => {
        let timer = null;
        if (showMessage) {
            timer = setTimeout(() => setShowMessage(false), 7000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [showMessage]);
    
    async function handleSubmit (values) {
        setCreatingAccount(true);
        setCreatingAccountError(false);
        values = {...values, ...form}

        try {
            const { token, userAlreadyExist, message, data } = await signupUser(values);
            const TOKEN = token;

            if (userAlreadyExist) {
                setCreatingAccountError(true);
                setSigningUpResponseMessage(message);
                setCreatingAccount(false);
                setShowMessage(true);
                return;
            }
            setCreatingAccountError(false);
            // sessionStorage.setItem(
            //     'access-getting-started-page', 
            //     JSON.stringify({ user: data, canAccessGettingStarted: true })
            // )
            setUserData(data);
            setTokenData(TOKEN);
            setCreatingAccount(false);
            history.push(location.pathname);
            setRedirect('/getting-started');
        } catch(err) {
            console.error(err);
        }  
    }

    async function submitEmail({ email }) {
        // ensure email exists
        setForm({ email });
        setShowFullNamesAndPassword(true);
    } 

    const closeMessageBox = () => {
        setShowMessage(false);
    }

    const goBack = (e) => {
        e.preventDefault();
        setShowFullNamesAndPassword(false);
    }
 
    if (redirect) {
        return (
            <Redirect to = { redirect }/>
        )
    }

    return (
        <CreateAccountTemplate
        bottomPopUpBox = { 
            <BottomPopUpBox
            closePopUp = { closeMessageBox }
            message = { signingUpResponseMessage }
            showPopUp = { showMessage }
            usedFor = { creatingAccountError ? useBottomPopUpFor.error : useBottomPopUpFor.success }
            />
        }
        >
        {showFullNamesAndPassword ? (
            <FullNamesAndPassword 
            handleSubmit = { handleSubmit }
            creatingAccount = { creatingAccount }
            creatingAccountError = { creatingAccountError }
            goBack = { goBack }
            />
        ) : (
            // <SignupWithGoogle/>
            <Email 
            email = { form?.email }
            handleSubmit = { submitEmail }
            />
        )}
        </CreateAccountTemplate>
    )
}

function CreateAccountTemplate({ 
    bottomPopUpBox,
    children,
    ...props 
}) {
    return (
        <div className="signup-container">
            { bottomPopUpBox }
        <div className="signup-panel ">
            <div className="signup-panel-heading">
                Create Account
            </div>
            <div className="signup-panel-body">
            { children }
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

function SignupWithGoogle({ ...props }) {
    return (
        <div className = { styles.googleSignupContainer }>
            <div className = { styles.googleSignupButtonWrapper }>
                <button className = { styles.googleSignupButton }>
                    Sign Up With Google
                </button>
            </div>
            <div className = { styles.googleSignupOrWrapper }>
                <div className = { styles.googleSignupOr }>
                    OR
                </div>
            </div>
        </div>
    )
}

function Email({
    handleSubmit,
    creatingAccount,
    creatingAccountError,
    email, 
    ...props 
}) {
    return (
        <div className = { styles.emailContainer }>
            <Formik
            initialValues = {{
                email:   email ?? '',  
            }}
            validationSchema = {Yup.object({
                email: Yup.string().email('Invalid').required('Required'),
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
                <div className="signup-button">
                    <button type="submit" >
                    {creatingAccount ? (
                        <span>
                            <LoaderSmall unsetMarginTop/>
                        </span>
                    ) : creatingAccountError ? (
                        <>
                            <RiErrorWarningLine className="signup-button-icon"/>
                            <span>
                                Next
                            </span>
                        </>
                    ) : (
                        <span>
                            Next
                        </span>
                    )}
                    </button>
                </div>
            </Form>
            </Formik>
        </div>
    )
}

function FullNamesAndPassword({ 
    handleSubmit,
    creatingAccount,
    creatingAccountError,
    goBack,
    ...props 
}) {
    return (
        <div className = { styles.fullNamesAndPasswordContainer }>
            <Formik
            initialValues = {{
                fullname:'',
                password: '',  
            }}
            validationSchema = {Yup.object({
                fullname: Yup.string().required('Required'),
                password: Yup.string().required('Required'),
            })}
            onSubmit = { handleSubmit }
            >
            <Form>
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
                <div className="signup-button-container">
                    <div className="signup-button-child">
                        <button type="button" onClick = { goBack }>
                            Go back
                        </button>
                    </div>
                    <div className="signup-button-child">
                        <button type="submit">
                        {creatingAccount ? (
                            <span>
                                <LoaderSmall unsetMarginTop/>
                            </span>
                        ) : creatingAccountError ? (
                            <>
                                <RiErrorWarningLine className="signup-button-icon"/>
                                <span>
                                    Create account
                                </span>
                            </>
                        ) : (
                            <span>
                                Create account
                            </span>
                        )}
                        </button>
                    </div>
                </div>
            </Form>
            </Formik>
        </div>
    )
}