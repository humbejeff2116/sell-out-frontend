
import React, { useEffect } from 'react';
import { IndexTemplateChildrenWithFooterAndNoRightSideBar } from '../../Components/Template/template';
import Cart from '../../Components/Cart/cart';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';

 function CartPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
        <IndexTemplateChildrenWithFooterAndNoRightSideBar>
            <Cart/> 
        </IndexTemplateChildrenWithFooterAndNoRightSideBar>
    )    
}

const CartPage = RequireAuthentication(CartPageComp, isAuthenticated);
export default CartPage;