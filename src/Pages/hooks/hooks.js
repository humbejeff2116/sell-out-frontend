
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageScrollTo() {
    const location = useLocation(); 
    const [cords, setCords] = useState({x: 0, y: 0});

    const setScrollPoints = () => {
        const scrollCords = {
           x: window.pageXOffset || document.documentElement.scrollLeft, 
           y: window.pageYOffset || document.documentElement.scrollTop
        }
        setCords(scrollCords);
    }

    useEffect(()=> {
        window.addEventListener("scroll", setScrollPoints);
        return () =>{ 
            window.removeEventListener("scroll", setScrollPoints);
            sessionStorage.setItem(`${location.pathname}-pageScroll`, JSON.stringify(cords));
        }
    }, [location.pathname, cords]);

    useEffect(()=> {
        const { x, y } = sessionStorage.getItem(`${location.pathname}-pageScroll`) ? (
            JSON.parse(sessionStorage.getItem(`${location.pathname}-pageScroll`))
        ) : {}; 

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
    }, [location.pathname]);
}