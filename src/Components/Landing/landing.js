




import React,{useState, Suspense, useEffect} from 'react';
import Header from './Header/header';
import LandingInfoCard from './InfoCard/landingInfoCard';
import LandingFooter from './Footer/landingFooter';
import './landing.css';

import LoginModal from '../LoginModal/loginModal';
// const LoginModal = React.lazy(()=> import('../LoginModal/loginModal'));


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
                        <LoginModal show={showLoginModal} handleClose={closeLoginModal} />
                    )
                }
                <LandingInfoCard/>
            </div>
            {/* flex row contains three divs 100vh */}
            <div className="landing-center" >
                <div className="landing-center-1">1</div>
                <div className="landing-center-2">2</div>
                <div className="landing-center-3">3</div>
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