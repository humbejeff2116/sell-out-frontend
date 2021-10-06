






import { createContext, useContext } from 'react';


const initialViewContext = {
    viewState: [],
    setViewState: ()=>{},   
}

export const ViewContext = createContext(initialViewContext);

export default  function useViewContext() {
    return useContext(ViewContext);
}




