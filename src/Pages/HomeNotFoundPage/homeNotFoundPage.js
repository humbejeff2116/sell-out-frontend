
import React, { useEffect } from 'react';
import NotFound from '../../Components/NotFound/notFound';
import { IndexTemplateChildrenWithRightSideBar } from '../../Components/Template/template';




export default function NotFoundPage() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    
    return (

        <IndexTemplateChildrenWithRightSideBar>
            <NotFound usedForHomeRoutes/>
        </IndexTemplateChildrenWithRightSideBar>
    )
}



