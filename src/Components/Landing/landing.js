import React from 'react';
import TopInfoCardComponent from './TopInfoCard/topInfoCard';
import LandingProducts from './Product/product';
import { 
    NotFoundTemplate, 
    LandingSuspenseTemplate, 
    LandingTemplate 
} from './Template/template';
import AboutFling from './AboutFling/aboutFling';
import HowItWorks from './HowItWorks/howItWorks';
import './landing.css';

export default function LandingComponent() {
    return (
        <LandingTemplate
        landingTopChild ={ <TopInfoCardComponent/> }
        landingCenterChild ={ <AboutFling/> }
        >
            <LandingProducts/>
            <HowItWorks/>    
        </LandingTemplate>
    )
}

export {
    NotFoundTemplate, 
    LandingSuspenseTemplate, 
    LandingTemplate,
    TopInfoCardComponent,
    LandingProducts, 
}