import React from 'react';
import TopInfoCardComponent from './TopInfoCard/topInfoCard';
import LandingProducts from './Product/product';
import { 
    LandingSuspenseTemplate, 
    LandingTemplate 
} from './Template/template';
import LandingChildren from './Partials/partials';
import './landing.css';

export default function LandingComponent() {
    return (
        <LandingTemplate
        useChildrenWrapper
        stickHeaderToTop
        headerContainerModificationClass="header-absolute"
        landingTopChild = { <TopInfoCardComponent/> }
        >
            <LandingChildren/>
        </LandingTemplate>
    )
}

export { 
    LandingSuspenseTemplate, 
    LandingTemplate,
    TopInfoCardComponent,
    LandingProducts, 
}