
import React, { useEffect } from 'react';
import { LoginAndSignupTemplate } from '../../Components/Template/template';
import Login from '../../Components/Login/login';



export default function LoginPage() {  
    useEffect(()=> {
        window.scrollTo(0, 0);
    }, []);

    return (
        <LoginAndSignupTemplate stickHeaderToTop>
            <Login/>
        </LoginAndSignupTemplate>
    )
}