
import { useState } from 'react';
import { NavContext } from './context';


export function NavContextProvider({ children }) {
    const [showLeftSideBar, setShowLeftSideBar] = useState(false);
    const [showOutsideLoginNav, setShowOutsideLoginNav] = useState(false);

    const openLeftSideBar = () => {
        setShowLeftSideBar(prevState => !prevState);
    }

    const toggleOutsideLoginNav = () => {
        setShowOutsideLoginNav(prevState => !prevState);
    }

    const values = {
        showLeftSideBar: showLeftSideBar,
        showOutsideLoginNav: showOutsideLoginNav,
        toggleOutsideLoginNav: toggleOutsideLoginNav,
        openLeftSideBar: openLeftSideBar,
    }

    return (
        <NavContext.Provider value = { values }>
            { children }
        </NavContext.Provider>
    )  
}