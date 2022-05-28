
import React, { useEffect } from 'react';
import { 
    IndexTemplateChildrenWithFooterAndNoRightSideBar 
} from '../../Components/Template/template';
import Settings from '../../Components/Settings/settings';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';


function SettingsPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);

    return (
        <IndexTemplateChildrenWithFooterAndNoRightSideBar>
            <Settings/>
        </IndexTemplateChildrenWithFooterAndNoRightSideBar>
    )
}

const SettingsPage = RequireAuthentication(SettingsPageComp);
export default SettingsPage;