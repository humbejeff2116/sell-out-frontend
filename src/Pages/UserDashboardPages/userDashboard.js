






import React, {useEffect} from 'react';
import {  IndexPageTemplate } from '../IndexPage/indexPage';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import Router from '../../Components/Router/router';
import {
    PlacedOrders, 
    RecievedOrders, 
    ConfirmDelivery, 
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
    Products,
    StoreSettings,
    EditProduct,
} from '../../Components/UserDashboard/Store/index';
 import  NotFoundPage from '../NotFoundPage/notFoundPage';


const dashboardRoutes = [
    // orders
    {path: "/home/dashboard", exact: true, Component: PlacedOrders},
    {path: "/home/dashboard/orders/placed-orders",exact: true,  Component: PlacedOrders},
    {path: "/home/dashboard/orders/recieved-orders", Component: RecievedOrders},
    {path: "/home/dashboard/orders/confirm-delivery", Component: ConfirmDelivery},
    {path: "/home/dashboard/orders/delivered-products", Component: DeliveredProducts},
    // payments
    {path: "/home/dashboard/payments/payments-made",  Component:  PaymentsMade},
    {path: "/home/dashboard/payments/payments-recieved",  Component:  PaymentsRecieved},
    {path: "/home/dashboard/payments/pending-payments", Component: RecievedOrders},
    // activity
    {path: "/home/dashboard/activity/products-sold", Component:  ProductsSold},
    {path: "/home/dashboard/activity/products-bought", Component:  ProductsBought},
    {path: "/home/dashboard/activity/payments-made", Component: ActivityPaymentsMade},
    {path: "/home/dashboard/activity/payments-recieved", Component: ActivityPaymentsRecieved},
    // store
    {path: "/home/dashboard/store/products", Component:  Products},
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