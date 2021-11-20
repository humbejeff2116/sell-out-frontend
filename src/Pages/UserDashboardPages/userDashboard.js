






import React, {useEffect} from 'react';
import { IndexPageTemplate} from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import Router from '../../Components/Router/router';
import {
    PlacedOrders, 
    SoldProducts, 
    // ConfirmDelivery, 
    DeliveredProducts
} from '../../Components/UserDashboard/Orders/index';
import {
    PaymentsMade,
    PaymentsRecieved,
} from '../../Components/UserDashboard/Payments/index';
import {
    ProductsSold,
    ProductsBought,
    PaymentsMade as ActivityPaymentsMade,
    PaymentsRecieved as ActivityPaymentsRecieved,

} from '../../Components/UserDashboard/Activity/index';
import {
    UploadProductOrService,
    Products,
    StoreSettings,
    EditProduct,
} from '../../Components/UserDashboard/Store/index';
import DashboardIndex from '../../Components/UserDashboard/Index/index';
 import  NotFoundPage from '../NotFoundPage/notFoundPage';


const dashboardRoutes = [
    // orders
    {path: "/home/dashboard", exact: true, Component: DashboardIndex},
    {path: "/home/dashboard/orders/placed-orders", Component: PlacedOrders},
    {path: "/home/dashboard/orders/sold-products", Component: SoldProducts},
    // {path: "/home/dashboard/orders/confirm-delivery", Component: ConfirmDelivery},
    {path: "/home/dashboard/orders/delivered-products", Component: DeliveredProducts},
    // payments
    {path: "/home/dashboard/payments/made-payments",  Component:  PaymentsMade},
    {path: "/home/dashboard/payments/recieved-payments",  Component:  PaymentsRecieved},
    // {path: "/home/dashboard/payments/pending-payments", Component: SoldProducts},
    // activity
    {path: "/home/dashboard/activity/sold-products", Component:  ProductsSold},
    {path: "/home/dashboard/activity/bought-products", Component:  ProductsBought},
    {path: "/home/dashboard/activity/made-payments", Component: ActivityPaymentsMade},
    {path: "/home/dashboard/activity/recieved-payments", Component: ActivityPaymentsRecieved},
    // store
    {path: "/home/dashboard/store/products", Component:  Products},
    {path: "/home/dashboard/store/upload-product", Component:  UploadProductOrService},
    {path: "/home/dashboard/store/edit-product", Component: EditProduct},
    {path: "/home/dashboard/store/settings", Component: StoreSettings}, 

    {path: "/home/dashboard/*", Component: NotFoundPage,},
]

function UserDashboardPageComp({match}) {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        // TODO... substitute index template with dashboard template
        < IndexPageTemplate>
            <Router routes={dashboardRoutes}/>
        </IndexPageTemplate>   
    )
}

const UserDashboardPage = RequireAuthentication(UserDashboardPageComp);
export default UserDashboardPage;