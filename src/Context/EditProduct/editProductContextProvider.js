





import { useState } from 'react';
import { EditProductContext } from './context';

export function EditProductContextProvider(props) {
    const [productToEdit, setProductToEdit] = useState(null);

    const values = {
        productToEdit:productToEdit,
        setProductToEdit: setProductToEdit,
    }
    return(
        <EditProductContext.Provider value = { values } >
            {props.children}
        </EditProductContext.Provider>
    )
}