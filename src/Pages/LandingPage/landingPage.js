
import React, { useEffect } from 'react';
import { 
    LandingTemplate, 
    LandingProducts, 
    TopInfoCardComponent 
} from '../../Components/Landing/landing';


export default function LandingPage() {
    useEffect(()=> {
        window.scrollTo(0,0)          
    }, []);

    return (
        <LandingTemplate
        landingTopChild ={ <TopInfoCardComponent/> }
        landingCenterChild = { <LandingProducts/> }
        >     
        </LandingTemplate>
    )
}