

import React, {useEffect} from 'react';
import Index from '../../Components/Index/index';
import { IndexPageTemplate} from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';



 function IndexPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <IndexPageTemplate>
            <Index/>
        </IndexPageTemplate>
    )

}

const IndexPage = RequireAuthentication(IndexPageComp, isAuthenticated);
export default IndexPage;