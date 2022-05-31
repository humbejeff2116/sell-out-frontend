
import React from 'react';
import { usePageScrollTo } from '../hooks/hooks';
import { IndexTemplateChildrenWithFooterAndNoRightSideBar } from '../../Components/Template/template';
import Cart from '../../Components/Cart/cart';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';

 function CartPageComp() {
    usePageScrollTo();

    return (
        <IndexTemplateChildrenWithFooterAndNoRightSideBar>
            <Cart/> 
        </IndexTemplateChildrenWithFooterAndNoRightSideBar>
    )    
}

const CartPage = RequireAuthentication(CartPageComp, isAuthenticated);
export default CartPage;