




import React from 'react';
import { IndexPageTemplate} from '../../Components/Template/template';
import ViewProfile from '../../Components/ViewProfile/viewProfile';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';






 function ViewProfilePageComp() {
    return (
        <IndexPageTemplate>
           <ViewProfile/>
        </IndexPageTemplate>
    )

}

const ViewProfilePage= RequireAuthentication(ViewProfilePageComp, isAuthenticated);
export default ViewProfilePage;

