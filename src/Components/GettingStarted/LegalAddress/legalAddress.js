
import React, { useState, useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select } from '../../Formik/formik';
import { useGetStartedContext } from '../../../Context/context';
import { Options } from '../CompanyOrBusiness/RegisteredCompanyOrBusiness/registeredCompanyOrBusiness';
import Countries from '../../../Data/countries';
import image from '../../../Images/avatar2.png';
import '../Contact/contact.css';

export default function LegalAdress(props) {

    const [redirect, setRedirect] = useState('');

    const {
        registeredCompanyOrBusinessData,
        legalAddressData, 
        setLegalAddressData,
        setSubmittedFormPaths,
        removePathName
    } = useGetStartedContext();

    const location = useLocation();

    const history = useHistory();

    const africanCountries = Countries.getCountries({ continent: "Africa" });

    const nigeraianStates = Countries.getCountryStates({ continent: "Africa", country: "Nigeria" });

    useEffect(() => { 

        window.scrollTo(0, 0);

    }, []);
    
    const handleSubmit = (values) => {

        setLegalAddressData(values);

        setSubmittedFormPaths( prevState => [...prevState, { href: location.pathname }]);

        history.push(location.pathname);

        setRedirect('/getting-started/application/shipping-and-operations');

    }

    const goBack = ( ) => {

        removePathName('/getting-started/application/company-or-business');

        history.push(location.pathname);

        setRedirect('/getting-started/application/company-or-business');

    }

    if (redirect) {

        return (

            <Redirect to = { redirect } />

        )

    }

    return (
       
        <div className="getting-started-contact-container">
        <div className="getting-started-contact-panel">
            <div className="getting-started-company-heading-container">
                <div className="getting-started-company-heading">
                    <p>
                        Kindly enter your company, business or brand legal address details below 
                    </p>
                </div>
                <div className="getting-started-contact-img">
                    <img src={image} alt="avatar" />
                </div> 
            </div>

            <div className="getting-started-contact-body">                            
            <Formik
            initialValues = {{
                country: legalAddressData ?  legalAddressData?.country : '',
                state: legalAddressData ? legalAddressData?.state : '',
                city: legalAddressData ? legalAddressData?.city : '',
                address: legalAddressData ? legalAddressData?.address : '',
                addressLine1: legalAddressData ? legalAddressData?.addressLine1 : '',
                addressLine2: legalAddressData ? legalAddressData?.addressLine2 : '',
                companyWebsite: legalAddressData ? legalAddressData?.companyWebsite : ''
            }}

            validationSchema = { 

                Yup.object({
                
                    country: Yup.string().required('Country is required'),
                    state: Yup.string().required('State is required'),
                    city: Yup.string().required('City is required'),
                    address: Yup.string().required('Address is required'),
                    addressLine1: Yup.string().required('Address line 1 is required'),

                })

            }

            onSubmit = { handleSubmit }
            >
            <Form id="contactForm">
                <div className="getting-started-contact-form-inputs">

                    <Select
                    label="Country"
                    labelClassName="company-form-group"
                    name="country"
                    errorClass="contact-form-error"
                    >
                    <option value="">Select</option>
                    {

                        africanCountries.map((country, i) =>

                            <Options 
                            key = { i }
                            { ...country }
                            />

                        )

                    }
                    </Select>

                    <Select
                    label="State"
                    labelClassName="company-form-group"
                    name="state"
                    errorClass="contact-form-error"
                    >
                    <option value="">Select</option>
                    {

                        nigeraianStates.map((state, i) =>

                            <Options 
                            key = { i }
                            { ...state }
                            />

                        )

                    }
                    </Select>

                    <TextInput
                    label="City"
                    labelClassName="company-form-group"
                    name="city"
                    type="text"
                    errorClass="contact-form-error"
                    />

                    <TextAreaInput
                    label="Address"
                    labelClassName="company-form-group"
                    name="address"
                    type="text"
                    errorClass="contact-form-error"
                    />

                    <TextInput
                    label="Postal Code"
                    labelClassName="company-form-group"
                    labelText=" (optional)"
                    name="postalCode"
                    type="text"
                    errorClass="contact-form-error"
                    />

                    <TextInput
                    label="Address Line 1"
                    labelClassName="company-form-group"
                    name="addressLine1"
                    type="text"
                    errorClass="contact-form-error"
                    />

                    <TextInput
                    label="Address Line 2"
                    labelText=" (optional)"
                    labelClassName="company-form-group"
                    name="addressLine2"
                    type="text"
                    errorClass="contact-form-error"
                    />
                    {

                        registeredCompanyOrBusinessData && (

                            <TextInput
                            label="Company Website"
                            labelText=" (optional)"
                            labelClassName="company-form-group"
                            name="companyWebsite"
                            type="text"
                            errorClass="contact-form-error"
                            />

                        )

                    }
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