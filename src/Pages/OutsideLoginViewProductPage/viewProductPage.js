
import React from 'react';
import ViewProduct from '../../Components/OutsideLoginViewProduct/viewProduct';
import RequireViewStateAuthentication from '../../Components/Authentication/requireViewStateAuthentication';


function ViewProductPageComponent() {
    React.useEffect(()=> {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <ViewProduct/>
    )
}

const ViewProductPage = RequireViewStateAuthentication(null, ViewProductPageComponent);
export default ViewProductPage;
