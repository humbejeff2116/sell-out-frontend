




import React from 'react';
import Index from '../../Components/Index/index';
import {InsideLoginTemplate} from '../../Components/Template/template';
import ProfileAvatar from '../../Components/Profile/profileAvatar';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';


import Notifications from '../../Components/Notifications/notifications';
import Connections from '../../Components/Connections/connections';




export default function IndexPage() {
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