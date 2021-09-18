




import React, {useEffect} from 'react';
import Index from '../../Components/Index/index';
import {InsideLoginTemplate} from '../../Components/Template/template';
import ProfileAvatar from '../../Components/Profile/profileAvatar';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';
import Notifications from '../../Components/NotificationsDropdown/notifications';
import Connections from '../../Components/Connections/connections';





 function IndexPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <InsideLoginTemplate 
        leftSideBarTop={<ProfileAvatar/>} 
        leftSideBarCenter={<IndexSideNav/>} 
        leftSideBarBottom={<IndexFooter/>}
        rightSideBarTop={<Notifications/>}
        rightSideBarBottom={<Connections/>} 
        >
            <Index/>
        </InsideLoginTemplate>
    )

}

const IndexPage = RequireAuthentication(IndexPageComp, isAuthenticated);
export default IndexPage;

export  function IndexPageTemplate(props) {
    return (
        <InsideLoginTemplate 
        leftSideBarTop={<ProfileAvatar/>} 
        leftSideBarCenter={<IndexSideNav/>} 
        leftSideBarBottom={<IndexFooter/>}
        rightSideBarTop={props.rightSideBarTop || <Notifications/>}
        rightSideBarBottom={<Connections/>} 
        >
           {props.children}
        </InsideLoginTemplate>
    )

}



