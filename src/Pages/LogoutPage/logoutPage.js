
import React, {useEffect} from 'react';
import Logout from '../../Components/Logout/logout';
import { IndexPageTemplate } from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';




function LogoutPageComp() {

    useEffect(()=> {

        window.scrollTo(0,0);

    },[]);

    return (

        <IndexPageTemplate>
            <Logout/>
        </IndexPageTemplate>

    )

}

const LogoutPage = RequireAuthentication(LogoutPageComp, isAuthenticated, "/");
export default LogoutPage;