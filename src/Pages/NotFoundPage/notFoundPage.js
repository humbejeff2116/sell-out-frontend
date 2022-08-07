
import React from 'react';
import NotFound from '../../Components/NotFound/notFound';
import { LandingTemplate } from '../../Components/Landing/landing';




export default function NotFoundPage() {
    return (
        <LandingTemplate 
        landingTopChild={<NotFound/>}
        />
    )
}



