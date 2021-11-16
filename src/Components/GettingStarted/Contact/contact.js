



import React, {useState, useEffect} from 'react';
import { Link, Redirect, useLocation, useHistory  } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput } from '../../Formik/formik';
// import socket from '../../Socket/socket';
import { useGetStartedContext } from '../../../Context/context';
import image from '../../../Images/avatar.jpg';
import useAuth from '../../../Context/context';

import './contact.css';




export default function Contact(props) {
    const [redirect, setRedirect] = useState('');
    const {contactData, setContact, setIsContactDataSet} = useGetStartedContext();
    const { user } = useAuth();
    const location = useLocation();
    const history = useHistory();


    useEffect(() => {  
        window.scrollTo(0, 0);
    }, []);
    

    const handleSubmit = (values) => {
        setContact(values);
        history.push(location.pathname);
        setRedirect('/getting-started/location');    
    }

    const goBack = ( ) => { 
        setIsContactDataSet(false);
        history.push(location.pathname);
        setRedirect('/getting-started');   
    }


    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
    return (
       
        <div className="getting-started-contact-container">
        <div className="getting-started-contact-panel">
            {/* flex row */}
            <div className="getting-started-contact-avatar">
                <div className="getting-started-contact-heading">
                    <p>
                        Kindly enter your contact details below 
                    </p>
                </div>
                <div className="getting-started-contact-img">
                    <img src={image} alt="avatar" />
                </div>  
            </div>

            
            
            <div className="getting-started-contact-body">                            
                <Formik
                    initialValues = {{
                        contactEmail: (user && !contactData) ? user.userEmail :
                         contactData ?  contactData?.contactEmail : '',
                        contactNumber: contactData ? contactData?.contactNumber : '',
                        contactAddress: contactData ? contactData?.contactAddress : '',
                        brandName: contactData ? contactData?.brandName : '',
                    }}

                    validationSchema = { Yup.object({
                        
                        contactEmail: Yup.string().email('Email address is not valid').required('Contact email is Required'),
                        contactNumber: Yup.string().required('Contact number is required'),
                        contactAddress: Yup.string().required('Your contact address is Required'),
                    })}

                    onSubmit = { handleSubmit }
                >
                <Form id="contactForm">
                    <div className="getting-started-contact-form-inputs">
                        <div className="brand-name">
                            <span>
                                Your brand name which will be tagged on all your products is used to help your customers 
                                identify items which are sold by you. If not set, it automatically defaults 
                                to your names.
                            </span>
                        </div>
                    <TextInput
                    label="BRAND NAME"
                    labelClassName="contact-form-group brand-name-label"
                    labelText=" (optional)"
                    name="brandName"
                    type="text"
                    errorClass="contact-form-error"
                    />
                    <TextInput
                    label="CONTACT EMAIL"
                    labelClassName="contact-form-group"
                    name="contactEmail"
                    type="email"
                    errorClass="contact-form-error"
                   
                    />
               
                    <TextInput
                        label="CONTACT NUMBER"
                        labelClassName="contact-form-group"
                        name="contactNumber"
                        type="text"
                        errorClass="contact-form-error"
                    />
                    <TextAreaInput
                        label="CONTACT ADDRESS"
                        labelClassName="contact-form-group"
                        name="contactAddress"
                        // type="text"
                        errorClass="contact-form-error"
                    />
                     <span className="brand-name">
                        Each information provided here and here off is owned by you and as such, 
                        can be changed, modified or removed at any time under your settings. 
                        Kindly go through our privacy policy if you haven't to know how
                        we use your information or how you can manage your data. 
                    </span>

                    </div>
                

                <div className="getting-started-contact-buttons">
                <div className="getting-started-contact-back-button">
                    <button onClick={()=> goBack()}>
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


