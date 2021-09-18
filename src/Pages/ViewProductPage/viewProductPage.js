


import React from 'react';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import { SettingsPageTemplate } from '../SettingsPage/settingsPage';
import ViewProduct from '../../Components/ViewProduct/viewProduct';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';


 function ViewProductPageComp() {
    return (
        <SettingsPageTemplate
        sideNav ={<IndexSideNav/>}
        >
            <ViewProduct/> 
        </SettingsPageTemplate>
    )
}

const ViewProductPage = RequireAuthentication(ViewProductPageComp, isAuthenticated);
export default ViewProductPage;