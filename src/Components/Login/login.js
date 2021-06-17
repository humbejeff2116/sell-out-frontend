



   import React, {useState} from 'react';
   import { Link } from 'react-router-dom';
   import { Formik, Form } from 'formik';
   import * as Yup from 'yup';
   import {TextInput, PasswordInput} from '../Formik/formik';
   import './login.css';

export default function Login() {
    const [loginIn, setLoginIn] = useState(false);
    return (
        <>
        <div className="login-container">
        <div className="login-panel ">
            <div className="login-panel-heading">
                <h2>Login </h2>
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

                    onSubmit = {(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                <Form>
                <TextInput
                    label="EMAIL ADDRESS"
                    labelClassName="login-form-group"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    errorClassName="login-form-error"
                />
                <PasswordInput
                    label="PASSWORD"
                    labelClassName="login-form-group"
                    name="password"
                    type="password"
                    errorClassName="login-form-error"
                />
                <div className="login-forgot-pass">
                    <p>forgot your password?</p>
                </div>

                <div className="login-button">
                    <button type="submit" className="btn btn-success">
                    {loginIn ? 'Loging in...' : 'Log in'}
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
