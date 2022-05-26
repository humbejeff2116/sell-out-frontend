
import React, { useEffect } from 'react';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import Checkout from '../../Components/Checkout/checkout';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';

 function CheckoutPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Checkout/> 
        </IndexTemplateChildrenWithRightSideBar>
    )
}

const CheckoutPage = RequireAuthentication(CheckoutPageComp);
export default CheckoutPage;