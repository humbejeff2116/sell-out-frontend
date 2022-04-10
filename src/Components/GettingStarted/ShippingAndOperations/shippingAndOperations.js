
import React, { useState, useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select } from '../../Formik/formik';
import { useGetStartedContext } from '../../../Context/context';
import { BiTrash, BiEdit } from "react-icons/bi";
import image from '../../../Images/avatar2.png';
import { insertCommasToNumber } from '../../../Library/index';
import '../Contact/contact.css';
import './shippingAndOperations.css';

export default function ShippingAndOperations(props) {

    const [redirect, setRedirect] = useState('');

    const [operationalRegions, setOperationalRegions] = useState([])

    const [operationalRegionsFormValues, setOperationalRegionsFormValues] = useState({})

    const {
        shippingAndOperationsData,
        setShippingAndOperationsData,
    } = useGetStartedContext();

    const location = useLocation();

    const history = useHistory();

    useEffect(() => { 

        window.scrollTo(0, 0);

    }, []);
    
    const handleSubmit = (values) => {

        setShippingAndOperationsData(values);

        history.push(location.pathname);

        setRedirect('/getting-started/application/profile-image');

    }

    const goBack = ( ) => { 

        history.push(location.pathname);

        setRedirect('/getting-started/application/legal-address');

    }

    const handleInputChange = e => {

        setOperationalRegionsFormValues(prevValues => ({...prevValues, [e.target.name]: e.target.value}))

    }

    const addOperationalRegion = () => {
        
        if(
            !operationalRegionsFormValues.hasOwnProperty('state') || 
            !operationalRegionsFormValues.hasOwnProperty('city') ||
            !operationalRegionsFormValues.hasOwnProperty('costOfDelivery')
        ) {
            return;
        }

        let regionIndex = operationalRegions.findIndex(region => region.state === operationalRegionsFormValues.state && region.city === operationalRegionsFormValues.city)

        if(regionIndex > -1) {

            return;

        }
        
        setOperationalRegions(prevValues => ([...prevValues, operationalRegionsFormValues]))

        setOperationalRegionsFormValues({});
         
    }

    const removeOperationRegion = (opRegion) => {

        const filteredOperationalRegions = operationalRegions.filter(region => region.state !== opRegion.state && region.city !== opRegion.city )
        
        setOperationalRegions(filteredOperationalRegions)
    
    }

    if (redirect) {

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
                        Kindly enter your shipping and operations details below 
                    </p>
                </div>
                <div className="getting-started-contact-img">
                    <img src={image} alt="avatar" />
                </div> 
            </div>

            <div className="getting-started-contact-body">                            
                <Formik
                    initialValues = {{
                        modeOfDelivery: shippingAndOperationsData ? shippingAndOperationsData?.modeOfDelivery : '',
                        estimatedDeliveryDuration: shippingAndOperationsData ? shippingAndOperationsData?.estimatedDeliveryDuration : '',
                        operationalTime: shippingAndOperationsData ? shippingAndOperationsData?.operationalTime : '',
                        shippingAddress: shippingAndOperationsData ? shippingAndOperationsData?.shippingAddress : '',
                        acceptReturns: shippingAndOperationsData ? shippingAndOperationsData?.acceptReturns : '',
                        conditionsForReturn: shippingAndOperationsData ? shippingAndOperationsData?.conditionsForReturn : '', 
                    }}

                    validationSchema = { Yup.object({
                        
                        modeOfDelivery: Yup.string().required('Mode of delivery is required'),
                        estimatedDeliveryDuration: Yup.string().required('Estimated delivery duration is required'),
                        operationalTime: Yup.string().required('Operational time is required'),
                        shippingAddress: Yup.string().required('Shipping address is required'),
                        acceptReturns: Yup.string().required('Accept returns is required'),
                        // state: Yup.string().required('State is required'),
                        // city: Yup.string().required('City is required'),
                        // costOfDelivery: Yup.string().required('Cost of delivery is required'),

                    })}

                    onSubmit = { handleSubmit }
                >

                {(formikProps) => {
                const { 
                    values, 
                } = formikProps;
                return (
                    <Form id="contactForm">

                
                    <div className="getting-started-contact-form-inputs">
                        {/* TODO... imlement operational regions component here */}

                        <div className="brand-name">
                        <span>
                            Your operational region and cost of delivery.
                        </span>
                        </div>
                        <OperationalRegions
                        handleInputChange = { handleInputChange }
                        addOperationalRegion = { addOperationalRegion }
                        operationalRegions = { operationalRegions }
                        removeOperationRegion ={ removeOperationRegion }
                        />
                        
                    
                    <Select
                    label="Mode of Delivery"
                    labelClassName="company-form-group"
                    name="modeOfDelivery"
                    errorClass="contact-form-error"
                    >
                        <option value="">Select</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Congo">Congo</option>
                    </Select>

                    <Select
                    label="Estimated Delivery Duration"
                    labelClassName="company-form-group"
                    name="estimatedDeliveryDuration"
                    errorClass="contact-form-error"
                    >
                        <option value="">Select</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Congo">Congo</option>
                    </Select>

                    <Select
                    label="Operational Time"
                    labelClassName="company-form-group"
                    name="operationalTime"
                    errorClass="contact-form-error"
                    >
                        <option value="">Select</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Congo">Congo</option>
                    </Select>

                    <Select
                    label="Accept Returns and Exchanges"
                    labelClassName="company-form-group"
                    name="acceptReturns"
                    errorClass="contact-form-error"
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </Select>
                    {
                        ( values.hasOwnProperty("acceptReturns") && values.acceptReturns === 'Yes') && (
                            
                            <TextAreaInput
                            label="Conditions for Return and Exchanges"
                            labelText=" (seprate conditions with a comma if more than one)"
                            labelClassName="company-form-group"
                            name="conditionsForReturn"
                            type="text"
                            errorClass="contact-form-error"
                            />
                            
                        )
                    }

                    <TextAreaInput
                        label="Shipping Address"
                        labelClassName="company-form-group"
                        name="shippingAddress"
                        type="text"
                        errorClass="contact-form-error"
                    />
                   
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
                )
                }}
                </Formik>
            </div>
        </div>
        </div>
    )

}

function OperationalRegions(props) {

    return (

        <div className="getting-started-operational-regions-container">
            {
               props.operationalRegions && props.operationalRegions.length > 0 && props.operationalRegions.map((region, i) =>

                    <Region
                    key = { i }
                    { ...region }
                    removeOperationRegion = { props.removeOperationRegion }

                    />
                )
            }
            {
               
                <div className="getting-started-operational-regions-form-group-child-container">

                <div className="getting-started-operational-regions-form-group-child">
                <Select
                label="State"
                labelClassName="company-form-group"
                name="state"
                errorClass="contact-form-error"
                onChange = { props.handleInputChange }
                >
                    <option value="">Select</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Congo">Congo</option>
                </Select>
                </div>

                <div className="getting-started-operational-regions-form-group-child">
                <Select
                label="City"
                labelClassName="company-form-group"
                name="city"
                errorClass="contact-form-error"
                onChange = { props.handleInputChange }
                >
                    <option value="">Select</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Congo">Congo</option>
                </Select>
                </div>


                <div className="getting-started-operational-regions-form-group-child">
                <TextInput
                    label="Cost of Delivery"
                    labelClassName="company-form-group"
                    name="costOfDelivery"
                    type="text"
                    errorClass="contact-form-error"
                    onChange = { props.handleInputChange }
                />
                </div>

                <div className="getting-started-operational-regions-form-group-child button">
                    <div className="company-form-group">
                    </div>
                    <button type="button" onClick= { props.addOperationalRegion } > Add + </button>
                    <div className="contact-form-error">
                    </div>
                </div>

                </div>
            }

        </div>
    )
}


function Region({state, city, costOfDelivery, ...props}) {

    const formatedCostOfDelivery = insertCommasToNumber(Number(costOfDelivery));

    return (

        <div className="getting-started-operational-region-container">

            <div className="getting-started-operational-region-left">

                <div className="getting-started-operational-region-left-child">
                    <div className="getting-started-operational-region-left-child-tag">State</div>
                    { state }
                </div>

                <div className="getting-started-operational-region-left-child">
                <div className="getting-started-operational-region-left-child-tag">City</div> 
                    { city }
                </div>

                <div className="getting-started-operational-region-left-child">
                <div className="getting-started-operational-region-left-child-tag">Cost of delivery</div>
                    £{ formatedCostOfDelivery }
                </div>

            </div>

            <div className="getting-started-operational-region-right">

                {/* <div className="getting-started-operational-region-right-child">
                    edit
                </div> */}

                <div 
                className="getting-started-operational-region-right-child" 
                title="Delete"  
                onClick = {()=> props.removeOperationRegion({ state, city }) }
                >
                   <BiTrash className="store-icon"/>
                </div>

            </div>

        </div> 

    )

}