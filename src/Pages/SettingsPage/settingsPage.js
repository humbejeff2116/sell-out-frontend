
import React from 'react';
import { 
    IndexTemplateChildrenWithFooterAndNoRightSideBar 
} from '../../Components/Template/template';
import Settings from '../../Components/Settings/settings';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';
import { usePageScrollTo } from '../hooks/hooks';


function SettingsPageComp() {
    usePageScrollTo();

    return (
        <IndexTemplateChildrenWithFooterAndNoRightSideBar>
            <Settings/>
        </IndexTemplateChildrenWithFooterAndNoRightSideBar>
    )
}

const SettingsPage = RequireAuthentication(SettingsPageComp);
export default SettingsPage;