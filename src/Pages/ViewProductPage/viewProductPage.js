


import React, {useEffect} from 'react';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import { SettingsPageTemplate } from '../../Components/Template/template';
import ViewProduct from '../../Components/ViewProduct/viewProduct';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import RequireViewStateAuthentication from '../../Components/Authentication/requireViewStateAuthentication';



 function ViewProductPageComp() {
     useEffect(()=>{
         window.scrollTo(0,0);
     },[])
    return (
        <SettingsPageTemplate
        leftSideBarCenter ={<IndexSideNav/>}
        >
            <ViewProduct/> 
        </SettingsPageTemplate>
    )
}

const ViewProductPage = RequireViewStateAuthentication(RequireAuthentication, ViewProductPageComp);
export default ViewProductPage;