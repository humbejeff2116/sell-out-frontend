





import React from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import './template.css';


export default function Template(props) {
    return (
        <>
        <Header/>
        <div className="template-container">
            {props.children}
        </div>
        <Footer/>
        </>
    )
}

export function LoginAndSignupTemplate(props) {
    return (
       
        <div className="login-template-container">

            <div className="login-template-left">
                <section>logo</section>
            </div>

            <div className="login-template-center">
                {props.children}
            </div>

            <div className="login-template-right">
               <section> empty section </section>
            </div>
        </div>
    )
}