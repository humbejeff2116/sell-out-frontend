




import React from 'react';
import { SettingsPageTemplate } from '../../Components/Template/template';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';
import Cart from '../../Components/Cart/cart';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';

 function CartPageComp() {
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