








import React, {useEffect} from 'react';
import { InsideLoginTemplate, GettingStartedTemplate } from '../../Components/Template/template';
import {Route, Switch } from 'react-router-dom';
import GettingStarted from '../../Components/GettingStarted/gettingStarted';
import ProfileAvatar from '../../Components/Profile/profileAvatar';
import SettingsFooter from '../../Components/SettingsFooter/settingsFooter';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import {BiHome, BiUser} from "react-icons/bi";
import {RiBookOpenLine} from "react-icons/ri";
import Location from '../../Components/GettingStarted/Location/location';
import Contact from '../../Components/GettingStarted/Contact/contact';
import ProfileImage from '../../Components/GettingStarted/ProfileImage/profileImage';

const links = [
    { name: "Getting Started", href: "/getting-started", icon: <BiHome className="index-side-nav-icon" /> },
    { name: "Contact details", href: "/getting-started/contact", icon: <BiUser className="index-side-nav-icon"/> },
    { name: "Location", href: "/getting-started/location", icon: <RiBookOpenLine className="index-side-nav-icon"/> },
    { name: "Profile Image", href: "/getting-started/profile-image", icon: <RiBookOpenLine className="index-side-nav-icon"/> },
]


function GettingStartedPageComp({match}) {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <GettingStartedTemplate
        leftSideBarTop={<ProfileAvatar/>} 
        leftSideBarCenter={<IndexSideNav links ={links}/>} 
        leftSideBarBottom={<SettingsFooter/>} 
        >
            <Switch>
            <Route exact path="/getting-started"  component={GettingStarted}/>
            <Route  path="/getting-started/contact" component={Contact} />
            <Route  path="/getting-started/location" component={Location} />
            <Route exact path="/getting-started/profile-image" component={ProfileImage} /> 
            </Switch>
        </GettingStartedTemplate>   
    )
}

const GettingStartedPage = RequireAuthentication(GettingStartedPageComp);
export default GettingStartedPage;


    