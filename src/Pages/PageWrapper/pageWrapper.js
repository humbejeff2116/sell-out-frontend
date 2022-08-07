
import React from 'react';
import { usePageScrollTo } from '../hooks/hooks';


export default function PageWrapper({ children }) {
    usePageScrollTo();
    return (
        <>
            {children}
        </>
    )
}