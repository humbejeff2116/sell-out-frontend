


import React from 'react';
import { SettingsPageTemplate } from '../SettingsPage/settingsPage';
import ViewProduct from '../../Components/ViewProduct/viewProduct';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';


 function ViewProductPageComp() {
    return (
        <SettingsPageTemplate>
            <ViewProduct/> 
        </SettingsPageTemplate>
    )
}

const ViewProductPage = RequireAuthentication(ViewProductPageComp, isAuthenticated);
export default ViewProductPage;