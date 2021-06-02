




import React from 'react';
import Index from '../../Components/Index/index';
import {InsideLoginTemplate} from '../../Components/Template/template';
import ProfileAvatar from '../../Components/Profile/profile';
import IndexSideNav from '../../Components/IndexSideNav/indexSideNav';
import IndexFooter from '../../Components/IndexFooter/indexFooter';





export default function IndexPage() {
    return (
        <InsideLoginTemplate top={<ProfileAvatar/>} center={<IndexSideNav/>} bottom={<IndexFooter/>} >
            <Index/>
        </InsideLoginTemplate>
    )

}