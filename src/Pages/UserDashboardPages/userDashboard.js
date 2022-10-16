
import React from 'react';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import Router from '../../Components/Router/router';
import {
    PlacedOrdersComponent, 
    Deliveries
} from '../../Components/UserDashboard/Order/index';
import {
    Payments
} from '../../Components/UserDashboard/Payments/index';

import {
    UploadProduct,
    Products,
    StoreSettings,
    EditProduct,
} from '../../Components/UserDashboard/Store/index';
import DashboardIndex from '../../Components/UserDashboard/Index/index';
import NotFound from '../../Components/NotFound/notFound';
import { usePageScrollTo } from '../hooks/hooks';

const dashboardRoutes = [
    // orders
    {path: "/home/dashboard", exact: true, Component: DashboardIndex},
    {path: "/home/dashboard/orders/placed-orders", Component: PlacedOrdersComponent},
    {path: "/home/dashboard/orders/deliveries", Component: Deliveries},
    // payments
    {path: "/home/dashboard/payments",  Component:  Payments},
    // store
    {path: "/home/dashboard/store/products", Component:  Products},
    {path: "/home/dashboard/store/sell-product", Component:  UploadProduct},
    {path: "/home/dashboard/store/edit-product", Component: EditProduct},
    {path: "/home/dashboard/store/settings", Component: StoreSettings}, 
    {path: "/home/dashboard/*", usedForHomeRoutes: true, Component: NotFound},
]

function UserDashboardPageComp({match}) {
    usePageScrollTo();

    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Router routes={dashboardRoutes}/>
        </IndexTemplateChildrenWithRightSideBar>   
    )  
}

const UserDashboardPage = RequireAuthentication(UserDashboardPageComp);
export default UserDashboardPage;