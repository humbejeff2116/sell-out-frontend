



import React, { Suspense } from 'react';
import {Route, Switch } from 'react-router-dom';

export default function Router(props) {
    return (
        <Switch>
            {
                props.routes && props.routes.map((route, i) =>
                <Routes key={i} {...route} />
                )
            }
        </Switch>
    )
}

function Routes({path, Component, suspense, SuspenseComponent, exact}) {
    return (
        <>
        {
            suspense && exact ? (
                <Route exact path={path}>
                <Suspense fallback={<SuspenseComponent/>}>
                    <Component/>
                </Suspense>
                </Route>
            ) :
            suspense && !exact ?  (
                <Route path={path}>
                <Suspense fallback={<SuspenseComponent/>}>
                    <Component/>
                </Suspense>
                </Route>
            ) : 
            !suspense && exact ? (
                <Route exact path={path}>
                    <Component/>
                </Route>
            ) : (
                <Route path={path}>
                    <Component/>
                </Route>
            )
        }
        </>
    )
}