
import React, { useEffect } from 'react';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import Notifications from '../../Components/Notifications/notifications';


export default function NotificationsPage() {
    useEffect(()=> {
        window.scrollTo(0,0);
    }, [])
    
    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Notifications/>
        </IndexTemplateChildrenWithRightSideBar>
    )
}