
import { useState, useEffect } from 'react';


export const  useWindowsWidth = () => {
    const [screenWidth, setScreenWidth] = useState(null);
    const checkScreenSize = () => setScreenWidth(window.innerWidth);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize)
    }, []);

    return screenWidth;
}