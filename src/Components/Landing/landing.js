




import React,{useState, useEffect} from 'react';
import socket from '../Socket/socket';
import Header from './Header/header';
import LandingInfoCard from './InfoCard/landingInfoCard';
import LandingFooter from './Footer/landingFooter';
import LandingProduct, {LandingServices} from './Product/product';
import { ErrorModal } from '../ModalBox/errorModal';
import './landing.css';
import LoginModal from '../LoginModal/loginModal';


export default function LandingComponent(props) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(()=> {
        let mounted = true;
        socket.on('unRegisteredUser', function(response) {
            if(mounted){
                setErrorMessage(response.message)
            }    
        });
        socket.on('showInterestError', function(response) {
            const { message } = response;
            setErrorMessage(message)
        });
        return ()=> {
            mounted = false
        }
    }, []);
   

    const closeLoginModal = function() {
        setShowLoginModal(false);    
    }

    return (
        <section className="landing-container">
            <div className="landing-top" >
                <Header showLoginModal={setShowLoginModal}/>
                {
                    showLoginModal && (
                        <LoginModal show={showLoginModal} handleClose={closeLoginModal}/>
                    )
                }
                {
                    errorMessage && (
                        <ErrorModal 
                        errorMessage={errorMessage}
                        errorContainerClassName={"landing-error-container"}
                        panelClassName = {"landing-error-modal"}
                        />
                    )

                }
                <LandingInfoCard/>
            </div>
            <div className="landing-center">
                <LandingProduct />
                <LandingServices  />
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