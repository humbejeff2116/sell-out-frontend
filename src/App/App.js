



import React, {Suspense} from 'react';
import { Route,Switch, useLocation } from 'react-router-dom';

const LandingPage = React.lazy(()=> import('../Pages/LandingPage/landingPage'));




export default function App() {
   
    return (
        <Switch >

            <Route exact  path="/">
                <Suspense fallback={<div>loading...</div>}>
                    <LandingPage/>
                </Suspense>
            </Route>

        </Switch>

    )
}