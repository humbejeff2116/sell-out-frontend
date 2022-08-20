
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, Select } from '../../../Formik/formik';
import { Options } from '../RegisteredCompanyOrBusiness/registeredCompanyOrBusiness';
import { useGetStartedContext } from '../../../../Context/context';
import Countries from '../../../../Data/countries';

const africanCountries = Countries.getCountries({continent: "Africa"});
const nigeraianStates = Countries.getCountryStates({ continent: "Africa", country: "Nigeria" });

export default function UnregisteredBusinessOrBrand({
    handleSubmit,
    prevAndNextButtons,
    ...props
}) {
    const { unregisteredBusinessData } = useGetStartedContext();

    return (
        <Formik
        initialValues = {{
            countryFoundIn: unregisteredBusinessData?.countryFoundIn ?? '',
            stateFoundIn: unregisteredBusinessData?.stateFoundIn ?? '',
            businessOrBrandName: unregisteredBusinessData?.businessOrBrandName ?? '',
            YearOfFoundation: unregisteredBusinessData?.YearOfFoundation ?? '',
        }}
        validationSchema = {Yup.object({   
            countryFoundIn: Yup.string().required('Country founded in is required'),
            stateFoundIn: Yup.string().required('State founded in is required'),
            businessOrBrandName: Yup.string().required('Business or Brand Name is required'),
            YearOfFoundation: Yup.string().required('Year of foundation is required'),
        })}
        onSubmit = {handleSubmit}
        >
        <Form id="contactForm">
            <div className="getting-started-application-template-form-inputs">
                <Select
                label="Country Founded In"
                labelClassName="company-form-group"
                name="countryFoundIn"
                errorClass="getting-started-application-template-form-error"
                >
                <option value="">Select</option>
                {africanCountries.map((country, i) =>
                    <Options 
                    key = { i }
                    { ...country }
                    />
                )}
                </Select>
                <Select
                label="State Founded In"
                labelClassName="company-form-group"
                name="stateFoundIn"
                errorClass="getting-started-application-template-form-error"
                >
                <option value="">Select</option>
                {nigeraianStates.map((state, i) =>
                    <Options 
                    key = { i }
                    { ...state }
                    />
                )}
                </Select>
                <TextInput
                label="Business/Brand Name"
                labelClassName="company-form-group"
                name="businessOrBrandName"
                type="text"
                errorClass="getting-started-application-template-form-error"
                />
                <TextInput
                label="Year of Foundation"
                labelClassName="company-form-group"
                name="YearOfFoundation"
                type="text"
                errorClass="getting-started-application-template-form-error"
                />
                <span className="brand-name">
                    Each information provided here and here off is owned by you and as such, 
                    can be changed, modified or removed at any time under your settings. 
                    Kindly go through our privacy policy if you haven't, to know how
                    we use your data or how you can manage it. 
                </span>
            </div>
            {prevAndNextButtons}
        </Form>
        </Formik>
    )
}