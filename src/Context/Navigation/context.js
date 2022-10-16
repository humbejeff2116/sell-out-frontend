
import { createContext, useContext } from 'react';


const initialContext = {
    showLeftSideBar: false,
    showOutsideLoginNav: false,
    toggleOutsideLoginNav: () => {},
    openLeftSideBar: () => {},
}


export const NavContext = createContext(initialContext);

export default function useNavContext() {
    return useContext(NavContext);
}
