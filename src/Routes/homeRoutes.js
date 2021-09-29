
import React from 'react';
import Router from '../Components/Router/router';
import {
    SettingsSuspenseLoader, 
    InsideLoginSuspenseLoader, 
} from '../Components/SuspenseLoader/suspenseLoader';

const IndexPage = React.lazy(()=> import('../Pages/IndexPage/indexPage'));
const Settingspage = React.lazy(()=> import('../Pages/SettingsPage/settingsPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/NotFoundPage/notFoundPage'));
const InterestPage = React.lazy(()=> import('../Pages/InterestPage/interestPage'));
const ConfirmationsPage = React.lazy(()=> import('../Pages/ConfirmationsPage/confirmationsPage'));
const NotificationsPage = React.lazy(()=> import('../Pages/NotificationsPage/notificationsPage'));
const GettingStartedPage = React.lazy(()=> import('../Pages/GettingStartedPage/gettingStartedPage'));
const ViewProfilePage = React.lazy(()=> import('../Pages/ViewProfilePage/viewProfilePage'));
const CartPage = React.lazy(()=> import('../Pages/CartPage/cartPage'));
const ViewProductPage = React.lazy(()=> import('../Pages/ViewProductPage/viewProductPage'));
const IndexOrdersPage = React.lazy(()=> import('../Pages/IndexOrdersPage/indexOrdersPage'));
const UserDashboardPage = React.lazy(()=> import('../Pages/UserDashboardPages/userDashboard'));


const homeRoutes = [
    {path: "/home", exact: true, suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: IndexPage, },
    {path: "/home/settings",  suspense: true,SuspenseComponent: SettingsSuspenseLoader, Component: Settingspage, },
    {path: "/home/interests",  suspense: true,SuspenseComponent: SettingsSuspenseLoader, Component: InterestPage, },
    {path: "/home/confirmations",  suspense: true,SuspenseComponent: SettingsSuspenseLoader, Component: ConfirmationsPage, },
    {path: "/home/notifications",  suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: NotificationsPage, },
    {path: "/home/getting-started", suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: GettingStartedPage, },
    {path: "/home/view-profile",suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: ViewProfilePage,},
    {path: "/home/cart", suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: CartPage, },
    {path: "/home/view-product",suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: ViewProductPage, },
    {path: "/home/orders", suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: IndexOrdersPage, },
    {path: "/home/dashboard", suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: UserDashboardPage, },
    {path: "/home/*", suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: NotFoundPage,},
]

export default function HomeRoutes(props) {
    return (
        <Router routes={props.routes || homeRoutes}/>
    )
}