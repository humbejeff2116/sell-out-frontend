




import React from 'react';
import { SettingsPageTemplate } from '../../Components/Template/template';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';
import Cart from '../../Components/Cart/cart';

export default function CartPage() {
    return (
        <SettingsPageTemplate
        leftSideBarCenter={<IndexSideNav/>}
       leftSideBarBottom={<IndexFooter/>}
        >
            <Cart/> 
        </SettingsPageTemplate>
    )
}