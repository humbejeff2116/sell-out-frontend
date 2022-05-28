
import React, { useEffect } from 'react';
import Logout from '../../Components/Logout/logout';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';




function LogoutPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Logout/>
        </IndexTemplateChildrenWithRightSideBar>
    )
}

const LogoutPage = RequireAuthentication(LogoutPageComp, isAuthenticated, "/");
export default LogoutPage;