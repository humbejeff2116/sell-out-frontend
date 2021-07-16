




import React, {useState, useEffect} from 'react';
import { Link, Redirect, useLocation, useHistory  } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../Formik/formik';
// import socket from '../../Socket/socket';
import { useGetStartedContext } from '../../../Context/context';

import './contact.css';




export default function Contact(props) {
    const [redirect, setRedirect] = useState('');
    const {contactData, setContact, setIsContactDataSet} = useGetStartedContext();
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
                <div className="getting-started-contact-img">
                    <div><img src="" alt="avatar" /></div>
                </div>
                 <div className="getting-started-contact-hr">
                    
                 </div>
            </div>

            <div className="getting-started-contact-heading">
                <p>Kindly enter your contact details below</p>
            </div>
            
            <div className="getting-started-contact-body">                            
                <Formik
                    initialValues = {{
                        contactEmail: contactData ?  contactData?.contactEmail : '',
                        contactNumber: contactData ? contactData?.contactNumber : '',
                    }}

                    validationSchema = { Yup.object({
                        contactEmail: Yup.string().email('Email address is not valid').required('Contact email is Required'),
                        contactNumber: Yup.string().required('Contact number is required'),
                    })}

                    onSubmit = { handleSubmit }
                >
                <Form id="contactForm">
                <TextInput
                    label="Contact Email"
                    labelClassName="contact-form-group"
                    name="contactEmail"
                    type="email"
                   
                    placeholder="contactme@yahoo.com"
                    errorClass="contact-form-error"
                />
               
                <TextInput
                    label="Contact Number"
                    labelClassName="contact-form-group"
                    name="contactNumber"
                    type="text"
                    placeholder="+234-813-43-4444"
                    errorClass="contact-form-error"
                />

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


