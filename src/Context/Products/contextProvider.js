
import { useState } from 'react';
import { ProductsContext } from './context';

export function ProductsContextProvider({ children }) {
    const [productsFilter, setFilter] = useState(null);

    const setProductsFilter = (type, val) => {
        // alert(filter);
        setFilter({ type, val });
    }

    const values = {
        productsFilter,
        setProductsFilter,
    }

    return(
        <ProductsContext.Provider value={values} >
            {children}
        </ProductsContext.Provider>
    )
}