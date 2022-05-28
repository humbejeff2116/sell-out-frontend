
import React, { useEffect } from 'react';
import Messages from '../../Components/Messages/messages';
import { 
    IndexTemplateChildrenWithRightSideBar, 
    // IndexTemplateChildrenWithFooterAndNoRightSideBar 
} from '../../Components/Template/template';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';


 function MessagesPageComp() {  
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
        <IndexTemplateChildrenWithRightSideBar>
            <Messages/>
        </IndexTemplateChildrenWithRightSideBar>
    )
}

const MessagesPage = RequireAuthentication(MessagesPageComp);
export default MessagesPage;