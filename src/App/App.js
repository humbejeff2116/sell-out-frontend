



import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from '../Context/authContextProvider';
import { GetStartedContextProvider } from '../Context/gettingStartedContextProvider';
import {
    SettingsSuspenseLoader, 
    InsideLoginSuspenseLoader, 
    OutsideLoginSuspenseLoader, 
    LoginAndSignupSuspenseLoader 
} from '../Components/SuspenseLoader/suspenseLoader';

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));
const SignupPage = React.lazy(()=> import('../Pages/SignupPage/signupPage'));
const IndexPage = React.lazy(()=> import('../Pages/IndexPage/indexPage'));
const Settingspage = React.lazy(()=> import('../Pages/SettingsPage/settingsPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/NotFoundPage/notFoundPage'));
const UploadProductOrServicePage = React.lazy(()=>import('../Pages/UploadProductPage/uploadProductOrService'));
const InterestPage = React.lazy(()=> import('../Pages/InterestPage/interestPage'));
const ConfirmationsPage = React.lazy(()=> import('../Pages/ConfirmationsPage/confirmationsPage'));
const NotificationsPage = React.lazy(()=> import('../Pages/NotificationsPage/notificationsPage'));
const GettingStartedPage = React.lazy(()=> import('../Pages/GettingStartedPage/gettingStartedPage'));
const ViewProfilePage = React.lazy(()=> import('../Pages/ViewProfilePage/viewProfilePage'));



export default function App() {
   
    return (
        <AuthContextProvider >
        <GetStartedContextProvider>
        <Switch >

            <Route exact  path="/">
                <Suspense fallback={<OutsideLoginSuspenseLoader/>}>
                    <LandingPage/>
                </Suspense>
            </Route>

            <Route exact  path="/login">
                <Suspense fallback={<LoginAndSignupSuspenseLoader/>}>
                    <LoginPage/>
                </Suspense>
            </Route>

            <Route exact  path="/signup">
                <Suspense fallback={<LoginAndSignupSuspenseLoader/>}>
                    <SignupPage/>
                </Suspense>
            </Route>

            <Route exact  path="/home">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <IndexPage/>
                </Suspense>
            </Route>

            <Route exact  path="/settings">
                <Suspense fallback={<SettingsSuspenseLoader/>}>
                    <Settingspage/>
                </Suspense>
            </Route>

            <Route exact  path="/upload-product">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <UploadProductOrServicePage/>
                </Suspense>
            </Route>
            <Route exact  path="/interests">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <InterestPage/>
                </Suspense>
            </Route>

            <Route exact  path="/confirmations">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <ConfirmationsPage/>
                </Suspense>
            </Route>

            <Route exact  path="/notifications">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <NotificationsPage/>
                </Suspense>
            </Route>
            <Route path="/getting-started">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <GettingStartedPage/>
                </Suspense>
            </Route>
            <Route path="/view-profile">
                <Suspense fallback={<InsideLoginSuspenseLoader/>}>
                    <ViewProfilePage/>
                </Suspense>
            </Route>


            <Route path="*">
                <Suspense fallback={ <div>loading...</div>}>
                    <NotFoundPage />
                </Suspense>
            </Route> 

        </Switch>
        </GetStartedContextProvider>
        </AuthContextProvider > 

    )
}