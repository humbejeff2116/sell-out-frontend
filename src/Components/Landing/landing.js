




import React,{useState, Suspense, useEffect} from 'react';
import Header from './Header/header';
import LandingInfoCard from './InfoCard/landingInfoCard';
import LandingFooter from './Footer/landingFooter';
import LandingProduct, {LandingServices} from './Product/product';
import './landing.css';

import LoginModal from '../LoginModal/loginModal';
// const LoginModal = React.lazy(()=> import('../LoginModal/loginModal'));
const products = [
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
    {name:""},
]


export default function LandingComponent(props) {
    const [showLoginModal, setShowLoginModal] = useState(false);
   

    const closeLoginModal = function() {
        setShowLoginModal(false);    
    }

    return (
        <section className="landing-container">
            {/* 100vh */}
            <div className="landing-top" >
                <Header showLoginModal={setShowLoginModal}/>
                {
                    showLoginModal && (
                        <LoginModal show={showLoginModal} handleClose={closeLoginModal}/>
                    )
                }
                <LandingInfoCard/>
            </div>
            <div className="landing-center">
                <LandingProduct products={products} />
                <LandingServices services={products} />
            </div>

            <div className="landing-footer" >
                <LandingFooter/>
            </div>

        </section>
    )
}

export function NotFoundTemplate(props) {
    return (
        <section className="landing-container">
            <div className="landing-top" >
                <Header/>
               {props.notFoundComponent}
            </div>
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>
    )
}

export function LandingSuspenseTemplate(props) {
    return (
        <section className="landing-container">   
            <div className="landing-top" >
                <Header/>
                <div className="landing-center">
                    {props.children}
                </div>
            </div>
            <div className="landing-footer" >
                <LandingFooter/>
            </div>

        </section>
    )

}