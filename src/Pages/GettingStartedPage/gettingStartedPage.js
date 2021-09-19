



import React, {useEffect} from 'react';
import {  GettingStartedTemplate } from '../../Components/Template/template';
import {Route, Switch } from 'react-router-dom';
import GettingStarted from '../../Components/GettingStarted/gettingStarted';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import Location from '../../Components/GettingStarted/Location/location';
import Contact from '../../Components/GettingStarted/Contact/contact';
import ProfileImage from '../../Components/GettingStarted/ProfileImage/profileImage';



function GettingStartedPageComp({match}) {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <GettingStartedTemplate>
            <Switch>
            <Route exact path="/getting-started"  component={GettingStarted}/>
            <Route  path="/getting-started/contact" component={Contact} />
            <Route  path="/getting-started/location" component={Location} />
            <Route  path="/getting-started/profile-image" component={ProfileImage} /> 
            </Switch>
        </GettingStartedTemplate>   
    )
}

const GettingStartedPage = RequireAuthentication(GettingStartedPageComp);
export default GettingStartedPage;


    