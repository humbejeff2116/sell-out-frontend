







import React, {useEffect} from 'react';
import UploadProductOrService from '../../Components/UploadProductOrService/uploadProduct';
import {IndexPageTemplate} from '../IndexPage/indexPage';
import RequireAuthentication from '../../Components/Authentication/requireAuthentication';





function UploadProductOrServicePageComp() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <IndexPageTemplate>
            <UploadProductOrService/>
        </IndexPageTemplate>
    )
}

function isAuthenticated() {
    return true;
}

const  UploadProductOrServicePage = RequireAuthentication(UploadProductOrServicePageComp, isAuthenticated);
export default  UploadProductOrServicePage;