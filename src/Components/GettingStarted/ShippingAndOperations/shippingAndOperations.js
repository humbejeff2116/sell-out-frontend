
import React, { useState, useEffect, memo } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { BiTrash } from "react-icons/bi";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import GettingStartedFormTemplate, { GettingStartedPrevAndNextButtons } from '../Template/template';
import { Options } from '../CompanyOrBusiness/RegisteredCompanyOrBusiness/registeredCompanyOrBusiness';
import { TextInput, TextAreaInput, Select } from '../../Formik/formik';
import { insertCommasToNumber } from '../../../Library/index';
import { useGetStartedContext } from '../../../Context/context';
import Countries from '../../../Data/countries';
import './shippingAndOperations.css';

const nigeraianStates = Countries.getCountryStates({ continent: "Africa", country: "Nigeria" });

export default function ShippingAndOperations(props) {
    const [redirect, setRedirect] = useState('');
    const {
        shippingAndOperationsData,
        setShippingAndOperationsData,
        operationalRegions,
        setOperationalRegions,
        setSubmittedFormPaths,
        removePathName
    } = useGetStartedContext();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => { 
        window.scrollTo(0, 0);
    }, []);
    
    const handleSubmit = (values) => {
        values.state = ''
        values.city = ''
        values.amount = ''
        values.costOfDelivery = '';

        setShippingAndOperationsData(values);
        setSubmittedFormPaths(prevState => [...prevState, { href: location.pathname }]);
        history.push(location.pathname);
        setRedirect('/getting-started/application/profile-image');
    }

    const goBack = () => { 
        removePathName('/getting-started/application/legal-address')
        history.push(location.pathname);
        setRedirect('/getting-started/application/legal-address');
    }

    const addOperationalRegion = ({ state, city, costOfDelivery, amount }) => { 
        if (!state || !city || !costOfDelivery) {
            return;
        }

        if ((state.toLowerCase() === "all" && city.toLowerCase() === "all" && costOfDelivery === "Fixed Amount") && !amount) {
            return;
        }

        const regionIndex = operationalRegions.findIndex(region => region.state === state && region.city === city)
        if (regionIndex > -1) {
            return;
        }

        if (costOfDelivery !== "Fixed Amount") {
            setOperationalRegions(prevValues => ([...prevValues, { id: operationalRegions.length, state, city, costOfDelivery}]))
            return;
        }

        if (amount) {
            const validateAmount = parseFloat(amount);
            if (isNaN(validateAmount)) {
                return;
            }
            setOperationalRegions(prevValues => ([...prevValues, { id: operationalRegions.length, state, city, costOfDelivery, amount: validateAmount }]))
            return;
        }

        const validatecostOfDelivery = parseFloat(costOfDelivery);
        if (isNaN(validatecostOfDelivery)) {
            return;
        }
        setOperationalRegions(prevValues => ([...prevValues, { id:operationalRegions.length, state, city, costOfDelivery: validatecostOfDelivery }]))       
    }

    const removeOperationRegion = (id) => {
        const filteredOperationalRegions = operationalRegions.filter(region => region.id !== id)
        setOperationalRegions(filteredOperationalRegions)
    }

    if (redirect) {
        return (
            <Redirect to = { redirect } />
        )
    }

    return (
        <GettingStartedFormTemplate
        headingText= "Kindly enter your operation details below"
        >
        <div className="getting-started-application-template-body">                            
            <Formik
            initialValues = {{
                state: '',
                city: '',
                costOfDelivery: '',
                amount: '', 
                modeOfDelivery: shippingAndOperationsData?.modeOfDelivery ?? '',
                estimatedDeliveryDuration: shippingAndOperationsData?.estimatedDeliveryDuration ?? '',
                operationalTime: shippingAndOperationsData?.operationalTime ?? '',
                shippingAddress: shippingAndOperationsData?.shippingAddress ?? '',
                acceptReturns: shippingAndOperationsData?.acceptReturns ?? '',
                conditionsForReturn: shippingAndOperationsData?.conditionsForReturn ?? '', 
            }}
            validationSchema = {Yup.object({ 
                modeOfDelivery: Yup.string().required('Mode of delivery is required'),
                estimatedDeliveryDuration: Yup.string().required('Estimated delivery duration is required'),
                operationalTime: Yup.string().required('Operational time is required'),
                shippingAddress: Yup.string().required('Shipping address is required'),
                acceptReturns: Yup.string().required('Accept returns is required'),
                // conditionsForReturn: Yup.string().required('Conditions for return is required'),
            })}
            onSubmit = { handleSubmit }
            >
            {(formikProps) => {
                const { values } = formikProps;
                const { state, city } = values;
                const costOfDeliveryType  = (state.toLowerCase() === 'all' && city.toLowerCase() === 'all') ? "string" : "number"
                const OperationalRegionComponent = (
                    <RegionWrapper
                    operationalRegions = { operationalRegions }
                    removeOperationRegion = { removeOperationRegion }
                    />
                )
                const OperationalRegionCostInputComponent = (
                    <OperationalRegionCostInput { ...values } costOfDeliveryType = { costOfDeliveryType }/>
                )

                return (
                    <Form id="contactForm">
                        <div className="getting-started-application-template-form-inputs">
                            <div className="getting-started-application-template-form-group">
                                <label>
                                    Your Operational Region('s) and Cost of Delivery
                                </label>
                            </div>
                            <div>
                                <span className="brand-name">
                                    Select the "All" option for Nation Wide delivery
                                </span>
                            </div>
                            <OperationalRegions
                            values = { values }
                            operationalRegionCostInput = { OperationalRegionCostInputComponent }
                            addOperationalRegion = { addOperationalRegion }
                            regions = { OperationalRegionComponent }
                            />
                            <Select
                            label="Mode of Delivery"
                            labelClassName="company-form-group"
                            name="modeOfDelivery"
                            errorClass="getting-started-application-template-form-error"
                            >
                                <option value="">Select</option>
                                <option value="Pickup at physical store address">Pickup at physical address</option>
                                <option value="Home delivery">Home delivery</option>
                                <option value="All of the above">All of the above</option>
                            </Select>
                            <Select
                            label="Estimated Delivery Duration Within Operational Regions"
                            labelClassName="company-form-group"
                            name="estimatedDeliveryDuration"
                            errorClass="getting-started-application-template-form-error"
                            >
                                <option value="">Select</option>
                                <option value="In a day">In a day</option>
                                <option value="1 - 2 Days">1 - 2 days</option>
                                <option value="1 - 3 Days">1 - 3 days</option>
                                <option value="2 - 3 days">2 - 3 days</option>
                                <option value="2 - 4 days">2 - 4 days</option>
                                <option value="1 week">1 week</option>
                            </Select>
                            <Select
                            label="Operational Days"
                            labelClassName="company-form-group"
                            name="operationalTime"
                            errorClass="getting-started-application-template-form-error"
                            >
                                <option value="">Select</option>
                                <option value="Sun - Sat">Sun - Sat</option>
                                <option value="Mon - Wed">Mon - Wed</option>
                                <option value="Mon - Fri">Mon - Fri</option>
                                <option value="Mon - Sat">Mon - Sat</option>
                                <option value="Wed - Fri">Wed - Fri</option>
                                <option value="Wed - Fri">Wed - Sat</option>  
                            </Select>
                            <Select
                            label="Accept Returns and Exchanges"
                            labelClassName="company-form-group"
                            name="acceptReturns"
                            errorClass="getting-started-application-template-form-error"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Select>
                            {(values.acceptReturns && values.acceptReturns === 'Yes') && (  
                                <TextAreaInput
                                label="Condition('s) for Return and Exchange"
                                labelText="(seprate with comma if more than one)"
                                labelClassName="operations-form-group"
                                name="conditionsForReturn"
                                type="text"
                                errorClass="getting-started-application-template-form-error"
                                />    
                            )}
                            <TextAreaInput
                            label="Shipping Address"
                            labelClassName="company-form-group"
                            name="shippingAddress"
                            type="text"
                            errorClass="getting-started-application-template-form-error"
                            />
                        </div>
                        <GettingStartedPrevAndNextButtons goBack ={ goBack }/>
                    </Form>
                )
            }}
            </Formik>
        </div>
        </GettingStartedFormTemplate>
    )
}

const OperationalRegions = ({
    values, 
    operationalRegionCostInput,
    addOperationalRegion,
    regions,
    ...props 
}) => {
    return (
        <div className="getting-started-operational-regions-container">
           { regions }    
            <div className="getting-started-operational-regions-form-group-child-container">
            <div className="getting-started-operational-regions-form-group-child">
            <Select
            dontShowErrorText
            label="State"
            labelClassName="company-form-group"
            name="state"
            errorClass="getting-started-application-template-form-error"
            >
            <option value="">Select</option>
            <option value="All">All</option>
            {nigeraianStates.map((state, i) =>
                <Options 
                key = { i }
                { ...state }
                />
            )}
            </Select>
            </div>
            <div className="getting-started-operational-regions-form-group-child">
            <Select
            dontShowErrorText
            label="City"
            labelClassName="company-form-group"
            name="city"
            errorClass="getting-started-application-template-form-error"
            >
                <option value="">Select</option>
                <option value="All">All</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Congo">Congo</option>
            </Select>
            </div>
            <div className="getting-started-operational-regions-form-group-child">
            { operationalRegionCostInput }
            </div>
            <div className="getting-started-operational-regions-form-group-child button">
                <div className="company-form-group">
                </div>
                <button type="button" onClick = { ()=> addOperationalRegion({ ...values }) } > Add + </button>
                <div className="getting-started-application-template-form-error">
                </div>
            </div>
            </div>
        </div>
    )
}


const OperationalRegionCostInput = ({ 
    state, 
    city, 
    costOfDeliveryType, 
    costOfDelivery 
}) => {
    return (
        <>
        {(state.toLowerCase() === 'all' && city.toLowerCase() === 'all')  ? (
            <>
            <Select
            dontShowErrorText
            label="Cost"
            labelClassName="company-form-group"
            name="costOfDelivery"
            errorClass="getting-started-application-template-form-error"
            >
                <option value="">Select</option>
                <option value="Depends on location">Depends on location</option>
                <option value="Fixed Amount">Fixed Amount</option>
            </Select>
            {
                (costOfDeliveryType === "string" && costOfDelivery === "Fixed Amount") ? (
                    <div className="getting-started-operational-regions-amount-contr">
                        <div className="getting-started-operational-regions-amount-wrppr">
                        <TextInput
                        dontShowErrorText
                        label="Amount"
                        labelClassName="company-form-group"
                        name="amount"
                        type="text"
                        errorClass="getting-started-application-template-form-error"
                        />
                        </div>
                    </div>
                ) : ""
            } 
            </>
        ) : (
            <TextInput
            dontShowErrorText
            label="Cost"
            labelClassName="company-form-group"
            name="costOfDelivery"
            type="text"
            errorClass="getting-started-application-template-form-error"
            />
        )}
        </>
    )
}

const RegionWrapper = memo(({ operationalRegions, removeOperationRegion }) => {
    return (
        <>
        {operationalRegions?.length > 0 && operationalRegions.map((region, i) =>
            <Region
            key = { i }
            { ...region }
            removeOperationRegion = { removeOperationRegion }
            />
        )} 
        </>  
    )
})

export const Region = ({ 
    state, 
    city, 
    costOfDelivery, 
    amount, 
    id,
    dontShowDelete, 
    ...props 
}) => {

    let formatedCostOfDelivery;
    const newAmount = amount ?? null;
    const newCostOfDelivery = costOfDelivery ?? null;
 
    if ((isNaN(parseFloat(newCostOfDelivery))) && newAmount === null) {
        formatedCostOfDelivery = (newCostOfDelivery)
    } else if ((isNaN(parseFloat(newCostOfDelivery))) && newAmount !== null) {
        formatedCostOfDelivery = (
            `£${ insertCommasToNumber(parseFloat(newAmount)) }`   
        )
    } else if (isNaN(parseFloat(newCostOfDelivery))) {
        formatedCostOfDelivery = (
            formatedCostOfDelivery = (newCostOfDelivery)     
        )
    } else {
        formatedCostOfDelivery = (
            `£${ insertCommasToNumber(parseFloat(newCostOfDelivery)) }`     
        )
    }

    return (
        <div className="getting-started-operational-region-container">
            <div className="getting-started-operational-region-child">
                <div className="getting-started-operational-region-child-tag">State</div>
                { state }
            </div>
            <div className="getting-started-operational-region-child">
            <div className="getting-started-operational-region-child-tag">City</div> 
                { city }
            </div>
            <div className="getting-started-operational-region-child">
            <div className="getting-started-operational-region-child-tag">Cost</div>
                { formatedCostOfDelivery }  
            </div>
            {dontShowDelete ? "" : (
                <div 
                className="getting-started-operational-region-delete" 
                title="Delete"  
                onClick = {()=> props.removeOperationRegion(id)}
                >
                    <BiTrash className="store-icon"/>
                </div>
            )} 
        </div> 
    )
}