




import React, {useEffect} from 'react';
import { IndexPageTemplate} from '../../Components/Template/template';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';
import Checkout from '../../Components/Checkout/checkout';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';


 function CheckoutPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <IndexPageTemplate
        leftSideBarCenter={<IndexSideNav/>}
        leftSideBarBottom={<IndexFooter/>}
        >
            <Checkout/> 
        </IndexPageTemplate>
    )
}

const CheckoutPage = RequireAuthentication(CheckoutPageComp);
export default CheckoutPage;