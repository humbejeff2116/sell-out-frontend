


import React from 'react';

import NotFound from '../../Components/NotFound/notFound';
import {NotFoundTemplate} from '../../Components/Landing/landing';




export default function NotFoundPage() {
    return (
        <NotFoundTemplate notFoundComponent={<NotFound/>} />
    )
}



