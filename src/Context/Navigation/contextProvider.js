
import { useState } from 'react';
import { NavContext } from './context';


export function NavContextProvider(props) {
    const [showLeftSideBar, setShowLeftSideBar] = useState(false);

    const openLeftSideBar = () => {
        setShowLeftSideBar(prevState => !prevState);
    }

    const values = {
        showLeftSideBar: showLeftSideBar,
        openLeftSideBar: openLeftSideBar,
    }

    return (
        <NavContext.Provider value={values} >
            {props.children}
        </NavContext.Provider>
    )  
}