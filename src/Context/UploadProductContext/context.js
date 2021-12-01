
import { createContext, useContext } from 'react';
const initialUploadProductContext = {
    productValues: null,
    setProductFormValues: () => {},   
}
export const UploadProductContext = createContext(initialUploadProductContext);
export default function useUploadProductContext() {
    return useContext(UploadProductContext);
}




