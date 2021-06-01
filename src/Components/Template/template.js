





import React from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';


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