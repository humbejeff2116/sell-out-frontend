
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

export default function Router({ routes, ...props }) {
    return (

        <Switch>
        {
            routes?.map((route, i) =>
                <RouteComponent key={i} {...route}/>
            )
        }
        </Switch>

    )
}

export function RouteComponent({ path, exact, suspense, SuspenseComponent, Component, ...props }) {

    if (suspense) {

        if (exact) {
    
            return (
                <Route exact path={path}>
                    <Suspense fallback={ <SuspenseComponent/> }>
                        <Component { ...props }/>
                    </Suspense>
                </Route>
            )
    
        } else if (!exact) {
    
             return (
                <Route path={path}>
                    <Suspense fallback={ <SuspenseComponent/> }>
                        <Component { ...props }/>
                    </Suspense>
                </Route>
            )
    
        } 
    
    } else if (!suspense) {
    
        if (exact) {
    
            return (
                <Route exact path={ path }>
                    <Component { ...props }/>
                </Route>
            )
    
        } else {
    
            return (
                <Route path={ path }>
                    <Component { ...props }/>
                </Route>
           )
    
        } 
        
    }
    
}

export function RouterWithTemplate({ template, typeOfTemplate, routes, ...props }) {

    const Template = template;

    return (
        <>
        {
            <Template>
                <Switch>
                {
                    routes?.map((route, i) => 

                        <RouteComponent 
                        key={i} 
                        { ...route }
                        />

                    )
                }
                </Switch>
            </Template>
        }
        </>
    ) 
}