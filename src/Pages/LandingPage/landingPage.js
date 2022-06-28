
import React from 'react';
import LandingComponent from '../../Components/Landing/landing';
import { usePageScrollTo } from '../hooks/hooks';


export default function LandingPage() {
    usePageScrollTo();

    return (
        <LandingComponent/>
    )
}