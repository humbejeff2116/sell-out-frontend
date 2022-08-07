
import React from 'react';
import ViewProduct from '../../Components/OutsideLoginViewProduct/viewProduct';
import RequireViewStateAuthentication from '../../Components/Authentication/requireViewStateAuthentication';


function ViewProductPageComponent() {
    return (
        <ViewProduct/>
    )
}

const ViewProductPage = RequireViewStateAuthentication(null, ViewProductPageComponent);
export default ViewProductPage;
