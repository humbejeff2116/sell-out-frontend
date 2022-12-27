/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ImWarning } from 'react-icons/im';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordInput } from '../Formik/formik';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';
import image2 from '../../Images/product2.webp';
import './settings.css';


export default function Settings(props) {
    // const [user, setUser] = useState({});
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [changingPasswordError, setChangingPasswordError] = useState(false);
    const [updatingProfileError, setUpdatingProfileError] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
           
    }, [user]);

    return (
        <div className="settings-container">
            <div className="profile-settings-wrapper" >
                <div className="settings-header" >
                   <h3>Profile settings</h3>
                </div>
                <div className="profile-settings-panel" > 
                    <div className="profile-settings-form-panel">
                        <Formik
                        initialValues = {{
                            fullName: '',
                            email: '',
                            contactNumber: '',
                            country: '',
                            state: '',
                        }}
                        onSubmit = { () => {} }
                        >
                        <Form>
                        <TextInput
                        label="Full Name"
                        labelClassName="settings-form-group"
                        name="fullName"
                        type="text"
                        />
                        <TextInput
                        label="Email"
                        labelClassName="settings-form-group"
                        name="email"
                        type="email"
                        />
                        <TextInput
                        label="Contact Number"
                        labelClassName="settings-form-group"
                        name="contactNumber"
                        type="text"
                        />
                        <TextInput
                        label="Country"
                        labelClassName="settings-form-group"
                        name="country"
                        type="text"
                        />
                        <TextInput
                        label="State"
                        labelClassName="settings-form-group"
                        name="state"
                        type="text"
                        />
                        <div className="profile-settings-button-wrapper">
                            <div className="profile-settings-button-consent">
                                <span>
                                    All feilds are optional and can be removed at any time.
                                    This is just a reminder that you are giving us consent to
                                    share this data wherever your profile appears.
                                    Please checkout our <a href="/#">privacy policy</a> if you haven't 
                                    to understand how we use this data.
                                </span>
                            </div>
                            <div className="profile-settings-button">
                            <button type="submit" >
                            {
                                updatingProfile ? 'Updating Profile...' : 
                                updatingProfileError ? <><ImWarning/> Update Profile</> : 
                                'Update Profile'
                            }
                            </button>
                            </div>
                        </div>
                        </Form>
                        </Formik>
                    </div>
                    <div className="profile-settings-image-panel">
                       <div className="profile-settings-image">
                           <img src={image} alt="profile"/>
                       </div>
                        <div className="profile-settings-image-button">
                            <button>View public profile</button>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="account-settings-wrapper"> 
                <div className="settings-header" id="account">
                  <h3>Account settings</h3>
                </div>
                <div className="account-settings-panel">
                  <div className="account-settings-group">
                        <div className="account-settings-group-header">
                         <h4>Change password</h4>
                        </div>
                        <div className="account-settings-form-panel">
                        <Formik
                        initialValues = {{
                            oldPassword: '',
                            newPassword: '',
                        }}

                        validationSchema = { Yup.object({
                            oldPassword: Yup.string().required('old password is Required'),
                            newPassword: Yup.string().required('new password is Required'),
                        })}
                        onSubmit = { ()=>{} }
                        >
                        <Form>
                            <div className="account-settings-form-group">
                                <PasswordInput
                                label="Old password"
                                labelClassName="settings-form-group"
                                name="oldPassword"
                                type="password"
                                errorClass="settings-form-error"
                                />
                            </div>
                            <div className="account-settings-form-group">
                                <PasswordInput
                                label="New password"
                                labelClassName="settings-form-group"
                                name="newPassword"
                                type="password"
                                errorClass="settings-form-error"
                                />    
                            </div>
                            <div className="account-settings-form-group password-button">
                                <div className="account-settings-password-button">
                                    <button type="submit" >
                                    {
                                        changingPassword ? 'Changing password...' : 
                                        changingPasswordError ? <><ImWarning/> Change password</> : 
                                        'Change password'
                                    }
                                    </button>
                                </div>
                                <div  className="settings-form-error">
                                </div>
                            </div>
                        </Form>
                        </Formik>
                        </div>
                  </div>
                  <div className="account-settings-group">
                        <div className="account-settings-group-header">
                          <h4>Account removal</h4>
                        </div>
                        <div className="account-remove-settings-panel">
                            <div className="account-settings-remove-group">
                                <div className="account-remove-settings-button disable">
                                    <button type="submit" >Disable Account</button>
                                </div> 
                            </div>
                            <div className="account-settings-remove-group">
                                <div className="account-remove-settings-button delete">
                                    <button type="submit" >Delete Account</button>
                                </div>  
                            </div>
                        </div>
                  </div>
                </div>
            </div>  
        </div>
    )
}