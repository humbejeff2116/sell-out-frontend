
import React, { useState, useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import GettingStartedFormTemplate, { GettingStartedPrevAndNextButtons } from '../Template/template';
import UnregisteredBusinessOrBrand from './UnregisteredBusinessOrBrand/unregisteredBusinessOrBrand';
import RegisteredCompanyOrBusiness from './RegisteredCompanyOrBusiness/registeredCompanyOrBusiness';
import { useGetStartedContext } from '../../../Context/context';
// HINT... css imported in index module

export default function CompanyOrBusiness(props) {
    const [redirect, setRedirect] = useState('');
    const [showUnregBusinessForm, setShowUnregBusinessForm] = useState(false);
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
            setRegisteredCompanyOrBusinessData(null);
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
            prevAndNextButtons = {
                <GettingStartedPrevAndNextButtons
                goBack = { goBack }
                />
            }
            />
        )
    } else {
        CompanyRegForm = (
            <RegisteredCompanyOrBusiness
            handleSubmit = { handleSubmit }
            prevAndNextButtons = {
                <GettingStartedPrevAndNextButtons
                goBack = { goBack }
                />
            }
            />  
        )
    }

    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    }

    return (
        <GettingStartedFormTemplate
        headingText = "Kindly enter your company, business or brand details below"
        >
            <div className="getting-started-company-tabs-container">
                <div className="tabs-label">Status</div>
                <div className="getting-started-company-tabs">
                    <div 
                    className = { !showUnregBusinessForm ? "getting-started-company-tabs-child active" : "getting-started-company-tabs-child" } 
                    onClick = { displayRegCompanyForm }>
                        Registered 
                    </div>
                    <div 
                    className = { showUnregBusinessForm ? "getting-started-company-tabs-child active" : "getting-started-company-tabs-child" }
                    onClick = { displayUnregBusinessForm } >
                        Unregistered 
                    </div>
                </div>
            </div>
            <div className="getting-started-application-template-body">                            
            { CompanyRegForm }
            </div>
        </GettingStartedFormTemplate>
    )
}