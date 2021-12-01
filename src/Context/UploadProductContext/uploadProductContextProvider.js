
import { useState } from 'react';
import {UploadProductContext } from './context';

export function UploadProductContextProvider(props) {
    const [productValues, setProductValues] = useState(null);



    const setProductFormValues = (values = {}) => {
        setProductValues(prevState => ({...prevState,...values}))
    }

    const values = {
        productValues: productValues,
        setProductFormValues: setProductFormValues,
    }
    return(
        <UploadProductContext.Provider value={values} >
            {props.children}
        </UploadProductContext.Provider>
    )
}