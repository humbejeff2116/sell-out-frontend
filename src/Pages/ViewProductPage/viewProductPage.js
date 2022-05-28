
import React, { useEffect } from 'react';
import { IndexTemplateChildrenWithFooterAndNoRightSideBar } from '../../Components/Template/template';
import ViewProduct from '../../Components/ViewProduct/viewProduct';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import RequireViewStateAuthentication from '../../Components/Authentication/requireViewStateAuthentication';



 function ViewProductPageComp() {
     useEffect(()=>{
         window.scrollTo(0,0);
     }, [])

    return (
        <IndexTemplateChildrenWithFooterAndNoRightSideBar>
            <ViewProduct/> 
        </IndexTemplateChildrenWithFooterAndNoRightSideBar>
    )
}

const ViewProductPage = RequireViewStateAuthentication(RequireAuthentication, ViewProductPageComp);
export default ViewProductPage;