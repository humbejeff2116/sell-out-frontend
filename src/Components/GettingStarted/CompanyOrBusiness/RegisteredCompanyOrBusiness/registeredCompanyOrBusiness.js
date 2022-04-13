
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select } from '../../../Formik/formik';
import { useGetStartedContext } from '../../../../Context/context';
import Countries from '../../../../Data/countries';


export default function RegisteredCompanyOrBusiness(props) {

    const { registeredCompanyOrBusinessData } = useGetStartedContext();

    const africanCountries = Countries.getCountries({ continent:"Africa" });

    const nigeraianStates = Countries.getCountryStates({ continent:"Africa", country:"Nigeria" });

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

            taxIdClassification: registeredCompanyOrBusinessData ?  
            registeredCompanyOrBusinessData?.taxIdClassification : '',
        }}

        validationSchema = { Yup.object({
            
            countryOfIncorporation: Yup.string().required('Country of incorporation is required'),
            stateOfIncorporation: Yup.string().required('State of incorporation is required'),
            legalCompanyName: Yup.string().required('Legal company name is required'),
            yearOfFoundation: Yup.string().required('Year of foundation is required'),
            nigerianTaxId: Yup.string().required('Nigerian tax id is required'),
            taxIdClassification: Yup.string().required('Tax classification is required'),

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
                label="State of Incorporation"
                labelClassName="company-form-group"
                name="stateOfIncorporation"
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
                label="Legal Company Name"
                labelClassName="company-form-group"
                name="legalCompanyName"
                type="text"
                errorClass="contact-form-error"
                />

                <TextInput
                label="Year of Foundation"
                labelClassName="company-form-group"
                name="yearOfFoundation"
                type="text"
                errorClass="contact-form-error"
                />

                <TextInput
                label="Nigerian Tax ID"
                labelClassName="company-form-group"
                name="nigerianTaxId"
                type="text"
                errorClass="contact-form-error"
                placeholder ="XX-XXXXX"
                />

                <Select
                label="Tax ID classification"
                labelClassName="company-form-group"
                name="taxIdClassification"
                errorClass="contact-form-error"
                >
                    <option value="">Select</option>
                    <option value="FIRS">FIRS</option>
                    <option value="JTB">JTB</option>
                </Select>
                
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

export function Options({ name, ...props }) {

    return (

        <option  value= { name } > { name } </option>

    )

}