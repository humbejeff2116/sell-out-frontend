
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select } from '../../../Formik/formik';
import { useGetStartedContext } from '../../../../Context/context';


export default function RegisteredCompanyOrBusiness(props) {

    const {
        registeredCompanyOrBusinessData,
    } = useGetStartedContext();

    return (
        <Formik
        initialValues = {{
            countryOfIncorporation: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.countryOfIncorporation : '',

            stateOfIncorporation: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.stateOfIncorporation : '',

            legalCompanyName: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.legalCompanyName : '',

            yearOfFoundation: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.yearOfFoundation : '',

            nigerianTaxId: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.nigerianTaxId : '',

            taxClassification: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.taxClassification : '',
        }}

        validationSchema = { Yup.object({
            
            countryOfIncorporation: Yup.string().required('Country of incorporation is required'),
            stateOfIncorporation: Yup.string().required('State of incorporation is required'),
            legalCompanyName: Yup.string().required('Legal company name is required'),
            yearOfFoundation: Yup.string().required('Year of foundation is required'),
            nigerianTaxId: Yup.string().required('Nigerian tax id is required'),
            taxClassification: Yup.string().required('Tax classification is required'),

        })}

        onSubmit = { props.handleSubmit }
        >
        <Form id="contactForm">
            <div className="getting-started-contact-form-inputs">

                <Select
                label="Country of Incorporation"
                labelClassName="company-form-group"
                name="countryOfIncorporation"
                errorClass="contact-form-error"
                >
                    <option value="">Select</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Congo">Congo</option>
                </Select>

                <TextInput
                label="State of Incorporation"
                labelClassName="company-form-group"
                name="stateOfIncorporation"
                type="email"
                errorClass="contact-form-error"
                />

                <TextInput
                label="Legal Company Name"
                labelClassName="company-form-group"
                // labelText=" (optional)"
                name="legalCompanyName"
                type="text"
                errorClass="contact-form-error"
                />

                <TextInput
                label="Year of Foundation"
                labelClassName="company-form-group"
                // labelText=" (optional)"
                name="yearOfFoundation"
                type="text"
                errorClass="contact-form-error"
                />

                <TextInput
                label="Nigerian Tax ID"
                labelClassName="company-form-group"
                name="nigerianTaxId"
                type="email"
                errorClass="contact-form-error"
                placeholder ="XX-XXXXX"
                />

                <Select
                label="Tax classification"
                labelClassName="company-form-group"
                name="taxClassification"
                errorClass="contact-form-error"
                >
                    <option value="">Select</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Congo">Congo</option>
                </Select>

                    {/* 
                    


                    <div className="getting-started-company-form-group-child-container">

                        <div className="getting-started-company-form-group-child">

                            

                        <Select
                        label="Country of Incorporation"
                        labelClassName="company-form-group"
                        name="country"
                        errorClass="contact-form-error"
                        >
                            <option value="">Select</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>

                        </div>

                        <div className="getting-started-company-form-group-child">

                        <TextInput
                        label="State of Incorporation"
                        labelClassName="company-form-group"
                        name="contactEmail"
                        type="email"
                        errorClass="contact-form-error"
                        />

                        </div>

                        </div>



                        <div className="getting-started-company-form-group-child-container">

                        <div className="getting-started-company-form-group-child">

                            

                        <TextInput
                        label="Legal Company Name"
                        labelClassName="company-form-group"
                        // labelText=" (optional)"
                        name="brandName"
                        type="text"
                        errorClass="contact-form-error"
                        />

                        </div>

                        <div className="getting-started-company-form-group-child">

                        <TextInput
                        label="Nigerian Tax ID"
                        labelClassName="company-form-group"
                        name="contactEmail"
                        type="email"
                        errorClass="contact-form-error"
                        placeholder ="XX-XXXXX"
                        />

                        </div>

                        </div>



                        <div className="getting-started-company-form-group-child-container">

                        <div className="getting-started-company-form-group-child">

                            

                        <TextInput
                        label="Year of Foundation"
                        labelClassName="company-form-group"
                        // labelText=" (optional)"
                        name="brandName"
                        type="text"
                        errorClass="contact-form-error"
                        />

                        </div>

                        <div className="getting-started-company-form-group-child">

                        <Select
                        label="Tax classification"
                        labelClassName="company-form-group"
                        name="country"
                        errorClass="contact-form-error"
                        >
                            <option value="">Select</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>

                        </div>

                        </div>
                    
                    */}
                
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