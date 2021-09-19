





import React, {useEffect} from 'react';
import { SettingsPageTemplate} from '../../Components/Template/template';
import Settings from '../../Components/Settings/settings';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';


function SettingsPageComp() {
   
    useEffect(()=> {
        window.scrollTo(0,0);
    },[]);
    return (
        <SettingsPageTemplate>
            <Settings/>
        </SettingsPageTemplate>
    )

}
function isAuthenticated() {
    return true;
}
const SettingsPage = RequireAuthentication(SettingsPageComp, isAuthenticated);
export default SettingsPage;