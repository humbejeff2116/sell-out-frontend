







import React, {useEffect} from 'react';
import UploadProductOrService from '../../Components/UploadProductOrService/uploadProduct';
import {IndexPageTemplate} from '../IndexPage/indexPage';





export default function UploadProductOrServicePage() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <IndexPageTemplate>
            <UploadProductOrService/>
        </IndexPageTemplate>
    )
}