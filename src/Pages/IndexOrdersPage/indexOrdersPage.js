








import React, {useEffect} from 'react';
import { IndexPageTemplate} from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import Router from '../../Components/Router/router';
import {
    PlacedOrders, 
    RecievedOrders, 
    ConfirmDelivery, 
    DeliveredProducts
} from '../../Components/UserDashboard/Orders/index';
import  NotFoundPage from '../NotFoundPage/notFoundPage';

const orderRoutes = [
    {path: "/home/orders", exact: true, Component: PlacedOrders},
    {path: "/home/orders/placed-orders",exact: true,  Component: PlacedOrders},
    {path: "/home/orders/recieved-orders", Component: RecievedOrders},
    {path: "/home/orders/confirm-delivery", Component: ConfirmDelivery},
    {path: "/home/orders/delivered-products", Component: DeliveredProducts},
    {path: "/home/orders/*", Component: NotFoundPage,},
]

function IndexOrdersPageComp({match}) {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <IndexPageTemplate>
            <Router routes={orderRoutes}/>
        </IndexPageTemplate>   
    )
}

const IndexOrdersPage = RequireAuthentication(IndexOrdersPageComp);
export default IndexOrdersPage;


    