
import React from 'react';
import Index from '../../Components/Index/index';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { isAuthenticated } from '../../Services/services';
import { usePageScrollTo } from '../hooks/hooks';


 function IndexPageComp() { 
    usePageScrollTo()
    
    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Index/>
        </IndexTemplateChildrenWithRightSideBar>
    )
}

const IndexPage = RequireAuthentication(IndexPageComp, isAuthenticated);
export default IndexPage;