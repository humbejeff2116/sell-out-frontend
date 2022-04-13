
import React, { useState, useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import UnregisteredBusinessOrBrand from './UnregisteredBusinessOrBrand/unregisteredBusinessOrBrand';
import RegisteredCompanyOrBusiness from './RegisteredCompanyOrBusiness/registeredCompanyOrBusiness';
import { useGetStartedContext } from '../../../Context/context';
import image from '../../../Images/avatar2.png';
import '../Contact/contact.css';
import './companyOrBusiness.css';

export default function CompanyOrBusiness(props) {

    const [redirect, setRedirect] = useState('');

    const [showUnregBusinessForm, setShowUnregBusinessForm]  = useState(false);

    const {
        registeredCompanyOrBusinessData, 
        setRegisteredCompanyOrBusinessData,
        unregisteredBusinessData,
        setUnregisteredBusinessData,
        setSubmittedFormPaths,
        removePathName
    } = useGetStartedContext();

    const location = useLocation();

    const history = useHistory();

    let CompanyRegForm;

    useEffect(() => { 

        window.scrollTo(0, 0);

    }, []);
    
    const handleSubmit = (values) => {
        
        if (showUnregBusinessForm) {

            if (registeredCompanyOrBusinessData) {

                setRegisteredCompanyOrBusinessData(null)

            }

            setUnregisteredBusinessData(values);

            setSubmittedFormPaths( prevState => [...prevState, { href: location.pathname }]);

            history.push(location.pathname);

            setRedirect('/getting-started/application/legal-address');

            return;

        }

        if (unregisteredBusinessData) {

            setRegisteredCompanyOrBusinessData(null)

        }

        setRegisteredCompanyOrBusinessData(values);

        setSubmittedFormPaths( prevState => [...prevState, { href: location.pathname }]);

        history.push(location.pathname);

        setRedirect('/getting-started/application/legal-address');

    }

    const goBack = ( ) => { 

        removePathName('/getting-started');

        history.push(location.pathname);

        setRedirect('/getting-started');

    }

    const displayRegCompanyForm = () => {

        setShowUnregBusinessForm(false);
            
    }

    const displayUnregBusinessForm = () => {

        setShowUnregBusinessForm(true);

    }
    
    if (showUnregBusinessForm) {

        CompanyRegForm = (

            <UnregisteredBusinessOrBrand
            handleSubmit = { handleSubmit }
            goBack = { goBack }
            />

        )

    } else {

        CompanyRegForm = (

            <RegisteredCompanyOrBusiness
            handleSubmit = { handleSubmit }
            goBack = { goBack }
            />
            
        )

    }

    if (redirect) {

        return (

            <Redirect to={redirect} />

        )

    }

    return (
       
        <div className="getting-started-contact-container">
        <div className="getting-started-contact-panel">
            <div className="getting-started-company-heading-container">
                <div className="getting-started-company-heading">
                    <p>
                        Kindly enter your company, business or brand details below 
                    </p>
                </div>
                <div className="getting-started-contact-img">
                    <img src={image} alt="avatar" />
                </div> 
            </div>

            <div className="getting-started-company-tabs-container">

                <div className="getting-started-company-tabs">

                    <div 
                    className = { !showUnregBusinessForm ? "getting-started-company-tabs-child active" : "getting-started-company-tabs-child" } 
                    onClick = { displayRegCompanyForm }>
                        Registered Company/Registered Business
                    </div>

                    <div 
                    className = { showUnregBusinessForm ? "getting-started-company-tabs-child active" : "getting-started-company-tabs-child" }
                    onClick = { displayUnregBusinessForm } >
                        Unregistered Business/Personal Brand
                    </div>

                </div>
                
            </div>

            <div className="getting-started-contact-body">                            
                { CompanyRegForm }
            </div>
        </div>
        </div>
    )

}