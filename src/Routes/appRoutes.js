
import React from 'react';
import Router from '../Components/Router/router';
import {
    InsideLoginSuspenseLoader, 
    OutsideLoginSuspenseLoader, 
    LoginAndSignupSuspenseLoader,
    GettingStartedSuspenseLoader 
} from '../Components/SuspenseLoader/suspenseLoader';
import HomeRoutesUsingIndexTemplate from './homeRoutes';

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));
const AboutPage = React.lazy(()=> import('../Pages/OutsideLoginAboutPage/aboutPage'));
const BuyProductsPage = React.lazy(()=> import('../Pages/OutsideLoginBuyProductsPage/buyProductsPage'));
const SellProductsPage = React.lazy(()=> import('../Pages/OutsideLoginSellProductsPage/sellProductsPage'));
const CartPage = React.lazy(()=> import('../Pages/OutsideLoginCartPage/cartPage'));
const ViewProductPage = React.lazy(()=> import('../Pages/OutsideLoginViewProductPage/viewProductPage'));
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));
const SignupPage = React.lazy(()=> import('../Pages/SignupPage/signupPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/NotFoundPage/notFoundPage'));
const GettingStartedPage = React.lazy(()=> import('../Pages/GettingStartedPage/gettingStartedPage'));
const UserProductsPage = React.lazy(() => import('../Pages/OutsideLoginUserProductsPage/userProductsPage'));


const appRoutes = [
    {path: "/", exact: true, suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: LandingPage},
    {path: "/about", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: AboutPage},
    {path: "/products", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: BuyProductsPage},
    {path: "/sell-products", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: SellProductsPage},
    {path: "/cart", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: CartPage},
    {path: "/view-product", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: ViewProductPage},
    {path: "/user-products", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: UserProductsPage},
    {path: "/login", suspense: true, SuspenseComponent: LoginAndSignupSuspenseLoader, Component: LoginPage},
    {path: "/signup", suspense: true, SuspenseComponent: LoginAndSignupSuspenseLoader, Component: SignupPage},
    {path: "/home", suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: HomeRoutesUsingIndexTemplate},
    {path: "/getting-started", suspense: true,SuspenseComponent: GettingStartedSuspenseLoader, Component: GettingStartedPage},
    {path: "/*", suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: NotFoundPage},
]

export default function AppRoutes({ routes, ...props }) {
    return (
        <Router routes={ routes || appRoutes }/>
    )
}