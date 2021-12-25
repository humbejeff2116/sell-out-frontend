










import { createContext, useContext } from 'react';
const initialEditProductContext = {
    productToEdit: null,
    setProductToEdit: ()=>{},   
}
export const EditProductContext = createContext(initialEditProductContext);
export default  function useEditProductContext() {
    return useContext(EditProductContext);
}




