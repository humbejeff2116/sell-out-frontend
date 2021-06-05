



import React, {Suspense} from 'react';
import { Route, Switch} from 'react-router-dom';

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));
const SignupPage = React.lazy(()=> import('../Pages/SignupPage/signupPage'));
const IndexPage = React.lazy(()=> import('../Pages/IndexPage/indexPage'));
const Settingspage = React.lazy(()=> import('../Pages/SettingsPage/settingsPage'));
const NotFoundPage = React.lazy(()=> import('../Pages/NotFoundPage/notFoundPage'));




export default function App() {
   
    return (

        <Switch >

            <Route exact  path="/">
                <Suspense fallback={<div>loading...</div>}>
                    <LandingPage/>
                </Suspense>
            </Route>

            <Route exact  path="/login">
                <Suspense fallback={<div>loading...</div>}>
                    <LoginPage/>
                </Suspense>
            </Route>

            <Route exact  path="/signup">
                <Suspense fallback={<div>loading...</div>}>
                    <SignupPage/>
                </Suspense>
            </Route>

            <Route exact  path="/home">
                <Suspense fallback={<div>loading...</div>}>
                    <IndexPage/>
                </Suspense>
            </Route>

            <Route exact  path="/settings">
                <Suspense fallback={<div>loading...</div>}>
                    <Settingspage/>
                </Suspense>
            </Route>

            <Route path="*">
                <Suspense fallback={ <div>loading...</div>}>
                    <NotFoundPage />
                </Suspense>
            </Route> 

        </Switch>

    )
}