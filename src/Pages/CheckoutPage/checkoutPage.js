
import React from 'react';
import { usePageScrollTo } from '../hooks/hooks';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import Checkout from '../../Components/Checkout/checkout';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';

 function CheckoutPageComp() {
    usePageScrollTo();

    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Checkout/> 
        </IndexTemplateChildrenWithRightSideBar>
    )
}

const CheckoutPage = RequireAuthentication(CheckoutPageComp);
export default CheckoutPage;