






import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {LoginTextInput, LoginPasswordInput} from '../Formik/formik';
import './signup.css';

export default function Signup() {
    const [signingUp, setSigningUp] = useState(false);
    return (
        <div className="signup-container">
            <div className="signup-panel ">
                <div className="signup-panel-heading">
                    <h2> Create Account </h2>
                </div>
                <div className="signup-panel-body">
                <Formik
                    initialValues = {{
                        email: '',
                        fullname:'',
                        password: '',
                       
                    }}

                    validationSchema = { Yup.object({
                        email: Yup.string().email('Invalid email address').required('Your email is Required'),
                        fullname: Yup.string().required('Your full names are Required'),
                        password: Yup.string().required('Your password is required'),
                    })}

                    onSubmit = {(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                <Form>
                <LoginTextInput
                    label="EMAIL ADDRESS"
                    labelClassName="signup-form-group"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    errorClassName="signup-form-error"
                />
                   <LoginTextInput
                    label="FULL NAMES"
                    labelClassName="signup-form-group"
                    name="fullname"
                    type="text"
                    placeholder="e.g John Doe"
                    errorClassName="signup-form-error"
                />
                <LoginPasswordInput
                    label="PASSWORD"
                    labelClassName="signup-form-group"
                    name="password"
                    type="password"
                    errorClassName="signup-form-error"
                />
                <div className="signup-button">
                    <button type="submit" className="btn btn-success">
                    {signingUp ? 'Creating Account...' : 'Create Account'}
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