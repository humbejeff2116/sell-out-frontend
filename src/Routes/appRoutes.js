
import React from 'react';
import Router from '../Components/Router/router';
import {
    InsideLoginSuspenseLoader, 
    OutsideLoginSuspenseLoader, 
    LoginAndSignupSuspenseLoader 
} from '../Components/SuspenseLoader/suspenseLoader';
import HomeRoutes from './homeRoutes'

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));
const SignupPage = React.lazy(()=> import('../Pages/SignupPage/signupPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/NotFoundPage/notFoundPage'));
const GettingStartedPage = React.lazy(()=> import('../Pages/GettingStartedPage/gettingStartedPage'));

const appRoutes = [
    {path: "/", exact: true, suspense: true,SuspenseComponent: OutsideLoginSuspenseLoader, Component: LandingPage, },
    {path: "/login",  suspense: true,SuspenseComponent: LoginAndSignupSuspenseLoader, Component: LoginPage, },
    {path: "/signup", suspense: true,  SuspenseComponent: LoginAndSignupSuspenseLoader, Component: SignupPage,},
    {path: "/home",  suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: HomeRoutes, },
    {path: "/getting-started", suspense: true,SuspenseComponent: InsideLoginSuspenseLoader, Component: GettingStartedPage, },
    {path: "/*", suspense: true, SuspenseComponent: InsideLoginSuspenseLoader, Component: NotFoundPage,},
]

export default function AppRoutes(props){
    return (
        <Router routes={props.routes || appRoutes} />
    )
}