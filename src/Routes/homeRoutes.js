
import React from 'react';
import { RouterWithTemplate } from '../Components/Router/router';
import { IndexPageTemplate } from '../Components/Template/template';
import { InsideLoginSuspenseLoader } from '../Components/SuspenseLoader/suspenseLoader';
import LogoutPage from  '../Pages/LogoutPage/logoutPage';

const IndexPage = React.lazy(()=> import('../Pages/IndexPage/indexPage'));
const SettingsPage = React.lazy(()=> import('../Pages/SettingsPage/settingsPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/HomeNotFoundPage/homeNotFoundPage'));
const NotificationsPage = React.lazy(()=> import('../Pages/NotificationsPage/notificationsPage'));
const ViewProfilePage = React.lazy(()=> import('../Pages/ViewProfilePage/viewProfilePage'));
const CartPage = React.lazy(()=> import('../Pages/CartPage/cartPage'));
const ViewProductPage = React.lazy(()=> import('../Pages/ViewProductPage/viewProductPage'));
const UserDashboardPage = React.lazy(()=> import('../Pages/UserDashboardPages/userDashboard'));
const CheckoutPage = React.lazy(()=> import('../Pages/CheckoutPage/checkoutPage'));
const MessagesPage = React.lazy(()=> import('../Pages/MessagesPage/messagesPage'))

const homeRoutesUsingIndexTemplate = [
    { 
        template: IndexPageTemplate,
        routes: [
            {path: "/home", exact: true, suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: IndexPage},
            {path: "/home/notifications",  suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: NotificationsPage},
            {path: "/home/view-profile",suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: ViewProfilePage,},
            {path: "/home/checkout", suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: CheckoutPage},
            {path: "/home/cart", exact: true, suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: CartPage},
            {path: "/home/dashboard", suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: UserDashboardPage},
            {path: "/home/logout", Component: LogoutPage, },
            {path: "/home/settings",  suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: SettingsPage},
            {path: "/home/view-product",suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: ViewProductPage},
            {path: "/home/messages",suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: MessagesPage},
            {path: "/home/*", suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: NotFoundPage},
        ]
    } 
]

export default function HomeRoutesUsingIndexTemplate({ ...props }) {
    return (
       <>
        {
            homeRoutesUsingIndexTemplate?.map(({ template, routes }, i) => 
                <RouterWithTemplate
                key = { i }
                template = { template } 
                routes = { routes }     
                />
            )
        }
       </>
    )

}