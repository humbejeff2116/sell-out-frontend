
import React,{ useState, useEffect } from 'react';
import socket from '../Socket/socket';
import Header from './Header/header';
import LandingInfoCard from './InfoCard/landingInfoCard';
import LandingFooter from './Footer/landingFooter';
import LandingProducts from './Product/product';
import { ErrorModal } from '../ModalBox/errorModal';
import LoginModal from '../LoginModal/loginModal';
// import marketplace from '../../Images/marketplace3.jpg';
// import bottomLeftImage from '../../Images/marketplace3.jpg';
import stickmansad from '../../Images/notfound8.jpg';
import './landing.css';


export default function LandingComponent() {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=> {

        let mounted = true;

        socket.on('unRegisteredUser', function(response) {

            if (mounted){

                setErrorMessage(response.message)

            }

        })

        socket.on('showInterestError', function(response) {

            const { message } = response;

            setErrorMessage(message)

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
                <Header showLoginModal={setShowLoginModal}/>
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
                <LandingInfoCard/>

                <LandingBackgroundImage/>
            </div>
            <div className="landing-center">
                <LandingProducts />
            </div>

            <div>
                <LandingFooter/>
            </div>
        </section>

    )

}

function LandingBackgroundImage() {

    return (

        <div className="landing-top-image-container" aria-hidden="true">

            <img className="landing-top-background-image" src="" alt="gffgfgfd" />

            <img className="landing-top-foreground-image-left top" src = { stickmansad } alt="dsds" />

            {/* <img className="landing-top-foreground-image-left bottom" src={stickmansad} alt="dsds" />

            <img className="landing-top-foreground-image-right top" src={stickmansad} alt="dsd" /> */}

            <img className="landing-top-foreground-image-right bottom" src = { stickmansad } alt="dsd" />

        </div>

    )

}

export function NotFoundTemplate(props) {

    return (

        <section className="landing-container">
            <div className="landing-top" >
                <Header/>
               { props.notFoundComponent }
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
                { props.children }
                </div>
            </div>
            <div className="landing-footer" >
                <LandingFooter/>
            </div>
        </section>

    )

}