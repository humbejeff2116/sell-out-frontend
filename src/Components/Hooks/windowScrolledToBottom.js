/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';


export const  useScrolledToBottom = () => {
    const [scrolledToBottom, setScrolledToBottom] = useState(null);
    // TODO... complete functionality 
    const checkScrollToBottom = () => {
        // if (window.scroll){
        //     setScrolledToBottom(true)
        // }   
    };

    useEffect(() => {
        checkScrollToBottom();
        window.addEventListener('scroll', checkScrollToBottom);
        return () => window.removeEventListener('scroll', checkScrollToBottom)
    }, []);

    return scrolledToBottom;
}