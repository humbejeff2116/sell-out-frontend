






import React, { useEffect} from 'react';
import LandingComponent from '../../Components/Landing/landing';




export default function LandingPage() {
    useEffect(()=> {
        window.scrollTo(0,0)       
    }, []);

    return (
        <LandingComponent/>
    )
}