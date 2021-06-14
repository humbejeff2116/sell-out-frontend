








import React, {useEffect} from 'react';
import { InsideLoginTemplate } from '../../Components/Template/template';
import Settings from '../../Components/Settings/settings';
import ProfileAvatar from '../../Components/Profile/profileAvatar';
import SettingsFooter from '../../Components/SettingsFooter/settingsFooter';
import SettingsSideNav from '../../Components/SettingsSideNav/settingsSideNav';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';


function SettingsPageComp() {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <InsideLoginTemplate 
        leftSideBarTop={<ProfileAvatar/>} 
        leftSideBarCenter={<SettingsSideNav/>} 
        leftSideBarBottom={<SettingsFooter/>} 
        >
            <Settings/>
        </InsideLoginTemplate>
    )

}
function isAuthenticated() {
    return true;
}
const SettingsPage = RequireAuthentication(SettingsPageComp, isAuthenticated);
export default SettingsPage;

export function SettingsPageTemplate(props) {
    return (
        <InsideLoginTemplate 
        leftSideBarTop={<ProfileAvatar/>} 
        leftSideBarCenter={<SettingsSideNav/>} 
        leftSideBarBottom={<SettingsFooter/>} 
        >
           {props.children}
        </InsideLoginTemplate>

    )
}