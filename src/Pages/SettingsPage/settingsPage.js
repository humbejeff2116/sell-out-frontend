








import React, {useEffect} from 'react';
import { InsideLoginTemplate } from '../../Components/Template/template';
import Settings from '../../Components/Settings/settings';
import ProfileAvatar from '../../Components/Profile/profileAvatar';
import SettingsFooter from '../../Components/SettingsFooter/settingsFooter';
import SettingsSideNav from '../../Components/SettingsSideNav/settingsSideNav';


export default function SettingsPage() {
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