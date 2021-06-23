






import React, {useState, useEffect, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {TextInput, PasswordInput} from '../Formik/formik';
import './signup.css';
// import socket from '../Socket/socket';
import MyContext from '../Context/context';








export default function Signup() {
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [signingUpResponse, setSigningUpResponse] = useState({});
    const [redirect, setRedirect] =useState('');
    const socket = useContext(MyContext);
    

    useEffect(() => {
       
                 
        return () => {
           socket.off('signUp')
        }
    }, [socket]);

    function handleSubmit  (values) {
        try{
            setCreatingAccount(true);
            socket.emit("signUp",values);
            socket.on('userAlreadyExist', function (response) {
                setCreatingAccount(false);
                setSigningUpResponse(response);
             
            })
            socket.on('userSignedUp', function(response) {
                const TOKEN = response.token;
                localStorage.setItem('newUser',response.data );
                localStorage.setItem('x-access-token', TOKEN);
                localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
                setCreatingAccount(false);
                setRedirect('/settings');
            })

        } catch(e) {
            

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

                    onSubmit = {handleSubmit}
                >
                <Form>
                <TextInput
                    label="EMAIL ADDRESS"
                    labelClassName="signup-form-group"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    errorClass="signup-form-error"
                />
                   <TextInput
                    label="FULL NAMES"
                    labelClassName="signup-form-group"
                    name="fullname"
                    type="text"
                    placeholder="e.g John Doe"
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
                    {creatingAccount ? 'Creating Account...' : 'Create Account'}
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