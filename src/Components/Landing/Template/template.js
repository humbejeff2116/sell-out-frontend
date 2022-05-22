
import React,{ useState, useEffect } from 'react';
import socket from '../../Socket/socket';
import Header from '../Header/header';
import LandingFooter from '../Footer/landingFooter';
import { ErrorModal } from '../../ModalBox/errorModal';
import LoginModal from '../../LoginModal/loginModal';


export function NotFoundTemplate({ notFoundComponent, ...props }) {

    return (

        <section className="landing-container">
            <div className="landing-top" >
                <Header/>
               { notFoundComponent }
            </div>
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>

    )

}

export function LandingSuspenseTemplate({ children, ...props }) {

    return (

        <section className="landing-container">   
            <div className="landing-top" >
                <Header/>
                <div className="landing-center">
                { children }
                </div>
            </div>
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>

    )

}

export function LandingTemplate({ landingTopChild, landingCenterChild, children, ...props }) {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=> {

        let mounted = true;

        socket.on('unRegisteredUser', function(response) {

            if (mounted) {

                setErrorMessage(response.message)

            }

        })


        return ()=> {

            mounted = false

        }

    }, [])
   
    const closeLoginModal = () => {

        setShowLoginModal(false); 

    }

    return (

        <section className="landing-container">   
            <div className="landing-top" >    
            <Header/>
            {

                showLoginModal && (

                    <LoginModal show = { showLoginModal } handleClose = { closeLoginModal }/>

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
            { landingTopChild }
            </div>
            {
                (landingCenterChild) ? (

                    <div className="landing-center">
                    { landingCenterChild }
                    </div>

                ) : ""
            }
            { children }
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>

    )

}