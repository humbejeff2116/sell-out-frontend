




import React, { useEffect } from 'react';
import { SettingsPageTemplate } from '../../Components/Template/template';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';
import Cart from '../../Components/Cart/cart';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';

 function CartPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <SettingsPageTemplate
        leftSideBarCenter={<IndexSideNav/>}
       leftSideBarBottom={<IndexFooter/>}
        >
            <Cart/> 
        </SettingsPageTemplate>
    )
}

const CartPage = RequireAuthentication(CartPageComp, isAuthenticated);
export default CartPage;