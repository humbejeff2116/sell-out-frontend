








import React, {useState, useEffect} from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {TextAreaInput,Select} from '../../Formik/formik';
import socket from '../../Socket/socket';
import { useGetStartedContext } from '../../../Context/context';
import image from '../../../Images/avatar.jpg'

import './location.css';
import '../Contact/contact.css';




export default function Location(props) {
    const [redirect, setRedirect] = useState('');
    const {locationData, setLocation, setIsContactDataSet } = useGetStartedContext();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {  
        window.scrollTo(0, 0);
    }, []);
    

    const handleSubmit =  (values) => {
        setLocation(values);
        history.push(location.pathname);
        setRedirect('/getting-started/profile-image');     
    }

    const goBack = () => {  
        setIsContactDataSet(false);
        history.push(location.pathname);
        setRedirect('/getting-started/contact');   
    }
    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }
    return (
       
        <div className="getting-started-contact-container">
        <div className="getting-started-contact-panel">
           
            <div className="getting-started-contact-avatar">
                <div className="getting-started-contact-heading">
                    <p>
                        Kindly enter your location details below 
                    </p>
                </div>
                <div className="getting-started-contact-img">
                    <img src={image} alt="avatar" />
                </div>  
            </div>

            <div className="getting-started-contact-body location">                            
                <Formik
                    initialValues = {{
                        country: locationData ? locationData?.country : '',
                        city: locationData ? locationData?.city : '',
                        address: locationData ? locationData?.address : '',
                    }}

                    validationSchema = { Yup.object({
                        country: Yup.string().required('Country is required'),
                        city: Yup.string().required('City is required'),
                        address: Yup.string().required('Address is required') 
                    })}

                    onSubmit = { handleSubmit }
                >
                <Form>
                <div className="getting-started-contact-form-inputs ">
                    <div className="location-form-address">
                        <div className="location-form-country">
                        <Select
                        label="COUNTRY"
                        labelClassName="location-form-group"
                        name="country"
                        errorClass="contact-form-error"
                        >
                            <option value="">Select</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>
                        
                        </div>
                        <div className="location-form-state">
                            <Select
                            label="CITY"
                            labelClassName="location-form-group"
                            name="city"
                            errorClass="contact-form-error"
                            >
                                <option value="">Select</option>
                                <option value="Abuja">Abuja</option>
                                <option value="Abia">Abia</option>
                                <option value="Adamawa">Adamawa</option>
                            </Select>
                        </div>
                    
                    
                    </div>
                    <div className="brand-name">
                        <span>
                          Your residentail address if different from your contact address.
                        </span>
                    </div>
                    <TextAreaInput
                    label="RESIDENTIAL ADDRESS"
                    labelClassName="location-form-group brand-name-label"
                    labelText=" (optional)"
                    name="address"
                    type="text"
                    errorClass="contact-form-error"
                    /> 
                </div>
                
                <div className="getting-started-contact-buttons">
                <div className="getting-started-contact-back-button">
                    <button onClick={()=>goBack()} >
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





