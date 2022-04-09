


import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select } from '../../../Formik/formik';
import { useGetStartedContext } from '../../../../Context/context';


export default function UnregisteredBusinessOrBrand(props) {

    const {
        unregisteredBusinessData,
    } = useGetStartedContext();

    return (
        <Formik
                    initialValues = {{

                        countryFoundIn: unregisteredBusinessData ?
                        unregisteredBusinessData?.countryFoundIn : '',

                        stateFoundIn: unregisteredBusinessData ?
                        unregisteredBusinessData?.stateFoundIn : '',

                        businessOrBrandName: unregisteredBusinessData ?
                        unregisteredBusinessData?.businessOrBrandName : '',

                        YearOfFoundation: unregisteredBusinessData ?
                        unregisteredBusinessData?.YearOfFoundation : '',

                    }}

                    validationSchema = { Yup.object({
                        
                        countryFoundIn: Yup.string().required('Country founded in is required'),
                        stateFoundIn: Yup.string().required('State founded in is required'),
                        businessOrBrandName: Yup.string().required('Business or Brand Name is required'),
                        YearOfFoundation: Yup.string().required('Year of foundation is required'),

                    })}

                    onSubmit = { props.handleSubmit }
                >
                <Form id="contactForm">
                    <div className="getting-started-contact-form-inputs">

                        <Select
                        label="Country Founded In"
                        labelClassName="company-form-group"
                        name="countryFoundIn"
                        errorClass="contact-form-error"
                        >
                            <option value="">Select</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>

                        <Select
                        label="State Founded In"
                        labelClassName="company-form-group"
                        name="stateFoundIn"
                        errorClass="contact-form-error"
                        >
                            <option value="">Select</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>

                        <TextInput
                        label="Business/Brand Name"
                        labelClassName="company-form-group"
                        // labelText=" (optional)"
                        name="businessOrBrandName"
                        type="text"
                        errorClass="contact-form-error"
                        />

                        <TextInput
                        label="Year of Foundation"
                        labelClassName="company-form-group"
                        // labelText=" (optional)"
                        name="YearOfFoundation"
                        type="text"
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
                    <button onClick={()=> props.goBack()}>
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
    )

}