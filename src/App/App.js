



import React, {Suspense} from 'react';
import { Route,Switch, useLocation } from 'react-router-dom';

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));
const LoginPage = React.lazy(()=> import('../Pages/LoginPage/loginPage'));




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

        </Switch>

    )
}