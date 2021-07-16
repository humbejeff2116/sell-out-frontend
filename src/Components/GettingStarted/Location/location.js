








import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {TextAreaInput,Select} from '../../Formik/formik';
import socket from '../../Socket/socket';

import './location.css';
import '../Contact/contact.css';




export default function Location(props) {
    const [redirect, setRedirect] = useState('');

    useEffect(() => {  
        window.scrollTo(0, 0);
    }, []);
    

    function handleSubmit  (values) {
           
    }
    return (
       
        <div className="getting-started-contact-container">
        <div className="getting-started-contact-panel">
           
            <div className="getting-started-contact-avatar">
                <div className="getting-started-contact-img">
                    <div><img src="" alt="avatar" /></div>
                </div>
                 <div className="getting-started-contact-hr">
                    
                 </div>
            </div>

            <div className="getting-started-contact-heading">
                <p>Kindly enter your address details below</p>
            </div>
            
            <div className="getting-started-location-body">                            
                <Formik
                    initialValues = {{
                        email: '',
                        password: '',
                    }}

                    validationSchema = { Yup.object({
                        country: Yup.string().required('Country is required'),
                        state: Yup.string().required('State is required'),
                        address: Yup.string().required('Address is required') 
                    })}

                    onSubmit = { handleSubmit }
                >
                <Form>
                    <div className="location-form-address">
                        <div className="location-form-country">
                        <Select
                        label="Country"
                        labelClassName="location-form-group"
                        name="country"
                        type="email"
                        placeholder="e.g Nigeria"
                        errorClass="contact-form-error"
                        >
                            <option value="">--Select--</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>
                        
                        </div>
                        <div className="location-form-state">
                            <Select
                            label="City"
                            labelClassName="location-form-group"
                            name="state"
                            type="text"
                            placeholder="e.g Lagos"
                            errorClass="contact-form-error"
                            >
                                <option value="">--Select--</option>
                                <option value="Nigeria">Abuja</option>
                                <option value="Ghana">Abia</option>
                                <option value="Congo">Adamawa</option>
                            </Select>
                        </div>
                    
                    
                    </div> 
                <TextAreaInput
                    label="Address"
                    labelClassName="location-form-group"
                    name="address"
                    type="text"
                    errorClass="contact-form-error"
                />
                <div className="getting-started-contact-buttons">
                <div className="getting-started-contact-back-button">
                    <button type="submit" >
                        Back
                    </button>
                </div>

                <div className="getting-started-contact-next-button">
                    <button type="submit" >
                     Continue
                    </button>
                </div>

                </div>
                </Form>
                </Formik>
            </div>
        </div>
        </div>
    )

}





