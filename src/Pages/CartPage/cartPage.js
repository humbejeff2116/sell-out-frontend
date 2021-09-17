




import React from 'react';
import { SettingsPageTemplate } from '../SettingsPage/settingsPage';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import Cart from '../../Components/Cart/cart';

export default function CartPage() {
    return (
        <SettingsPageTemplate
        sideNav={<IndexSideNav/>}
        >
            <Cart/> 
        </SettingsPageTemplate>
    )
}