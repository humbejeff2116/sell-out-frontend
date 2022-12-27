/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { GettingStartedTemplate } from '../../Components/Template/template';
import { Route, Switch } from 'react-router-dom';
import {
    GettingStarted,
    ProfileImage,
    CompanyOrBusiness,
    LegalAdress,
    ShippingAndOperations,
    Confirmation
} from '../../Components/GettingStarted/index';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';

import { RequireGettingStartedAuthentication } from '../../Components/Authentication/requireViewStateAuthentication';



function GettingStartedPageComp({match}) {

    useEffect(()=> {

        window.scrollTo(0,0);

    },[]);

    return (

        <GettingStartedTemplate>
            <Switch>
            <Route exact path="/getting-started"  component={GettingStarted}/>
            <Route  path="/getting-started/application/company-or-business" component = { CompanyOrBusiness } />
            <Route  path="/getting-started/application/legal-address" component = { LegalAdress } />
            <Route  path="/getting-started/application/shipping-and-operations" component = { ShippingAndOperations } />
            <Route  path="/getting-started/application/profile-image" component={ProfileImage} /> 
            <Route  path="/getting-started/application/confirmation" component = { Confirmation } /> 
            </Switch>
        </GettingStartedTemplate> 

    )

}

const GettingStartedPage = RequireAuthentication(GettingStartedPageComp);
// TODO... uncomment code when ready to use functionality
// const GettingStartedPage = RequireGettingStartedAuthentication(RequireAuthentication, GettingStartedPageComp);
export default GettingStartedPage;