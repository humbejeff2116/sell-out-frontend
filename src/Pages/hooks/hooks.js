
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageScrollTo() {
    const location = useLocation(); 

    useEffect(()=> {
        const { x, y } = sessionStorage.getItem(`${location.pathname}-pageScroll`) ? (
            JSON.parse(sessionStorage.getItem(`${location.pathname}-pageScroll`))
        ) : {} 

        if (!x && !y) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });     
        } else {
            window.scrollTo({
                top: y,
                behavior: "smooth",
            }); 
        }

        return () => {
            const scrollCords = {
                pathname: location.pathname,
               x: window.pageXOffset || document.documentElement.scrollLeft, 
               y: window.pageYOffset || document.documentElement.scrollTop
            }

            sessionStorage.setItem(`${location.pathname}-pageScroll`, JSON.stringify(scrollCords))
        }
    }, [location.pathname]);
}