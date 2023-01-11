import React from 'react';
import { Link } from 'react-router-dom';
import { RiUserAddLine } from 'react-icons/ri';
import { FiArrowRight }  from 'react-icons/fi'
import vaseCollection from '../../../Images/Illustrations/unDraw/vase-collections.svg';
import birdsBackground from '../../../Images/Illustrations/IRA/bg-12.svg';
import shopping from '../../../Images/Illustrations/draw-kit/SVG/shopping11.svg';

export default function TopInfoCardComponent() {
    return (
        <>
        <TopInfoCard/>
        <TopInfoCardBackgroundImage/>
        </>
    )
}

export  function TopInfoCard() {
    return (
        <div className="landing-info-card-contr" >
            <div className="landing-info-card-text-container" >
                <div className="landing-info-card-text-heading">
                    Buying and selling made easy and fun again
                </div>
                <div className="landing-info-card-text-paragraph">
                    All the tools you need to buy and sell in one place. 
                    A market place built just for you.  
                </div>  
            </div>
            <div className="landing-info-card-button">
                <div className="landing-info-card-login">
                    <Link to="/login">
                        <button>
                            Login
                            <FiArrowRight className="landing-info-login-icon"/>  
                        </button>
                    </Link>
                </div>
                <div className="landing-info-card-signup">
                    <Link to="/signup">
                        <button>
                            <RiUserAddLine className="landing-info-card-icon"/> 
                            Sign up 
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function TopInfoCardBackgroundImage() {
    return (
        <div className="landing-top-image-container" aria-hidden="true">
            {/* <img className="landing-top-foreground-image-left bottom" src={stickmansad} alt="dsds" /> */}
            <img 
            className="landing-top-foreground-image-right top" 
            src = { birdsBackground } 
            alt=""
            />
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320" 
            className="landing-top-foreground-image-left bottom" 
            >
                <path fill="#e6e6e6" fill-opacity="1" d="M0,288L48,250.7C96,213,192,139,288,128C384,117,480,171,576,176C672,181,768,139,864,138.7C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
            </svg>
            <img 
            className="landing-top-foreground-image-left" 
            src = { shopping } 
            alt=""
            />
            <img 
            className="landing-top-foreground-image-right" 
            src = { vaseCollection } 
            alt=""
            />
        </div>
    )
}