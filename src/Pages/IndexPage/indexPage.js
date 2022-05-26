
import React, { useEffect } from 'react';
import Index from '../../Components/Index/index';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';


 function IndexPageComp() {  
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Index/>
        </IndexTemplateChildrenWithRightSideBar>
    )
}

const IndexPage = RequireAuthentication(IndexPageComp, isAuthenticated);
export default IndexPage;