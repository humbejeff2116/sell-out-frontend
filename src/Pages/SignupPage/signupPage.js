




import React,{useEffect} from 'react';

import Signup from '../../Components/Signup/signup';
import {LoginAndSignupTemplate} from '../../Components/Template/template';



export default function SignupPage() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    return (
        <LoginAndSignupTemplate>
            <Signup/>
        </LoginAndSignupTemplate>
    )
}