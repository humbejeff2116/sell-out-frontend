
import { createContext, useContext } from 'react';
const initialViewContext = {
    viewState: null,
    setViewState: ()=>{},   
}
export const ViewContext = createContext(initialViewContext);
export default  function useViewContext() {
    return useContext(ViewContext);
}




