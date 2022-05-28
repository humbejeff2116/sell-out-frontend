
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
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));
const SignupPage = React.lazy(()=> import('../Pages/SignupPage/signupPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/NotFoundPage/notFoundPage'));
const GettingStartedPage = React.lazy(()=> import('../Pages/GettingStartedPage/gettingStartedPage'));

const appRoutes = [
    {path: "/", exact: true, suspense: true, SuspenseComponent: OutsideLoginSuspenseLoader, Component: LandingPage},
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