



import React, {Suspense} from 'react';
import { Route,Switch, useLocation } from 'react-router-dom';

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));
const SignupPage = React.lazy(()=> import('../Pages/SignupPage/signupPage'));




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

        </Switch>

    )
}