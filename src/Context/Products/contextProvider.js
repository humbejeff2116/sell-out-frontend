
import { useState } from 'react';
import { ProductsContext } from './context';

export function ProductsContextProvider({ children }) {
    const [productsFilter, setFilter] = useState(null);

    const setProductsFilter = (type, val, tag) => {
        if (!type || !val) {
            return setFilter(null);
        }
        if (!tag) {
           return  setFilter({ type, val });
        }
        setFilter({ type, val, tag });
    }

    const values = {
        productsFilter,
        setProductsFilter,
    }

    return(
        <ProductsContext.Provider value = { values }>
            {children}
        </ProductsContext.Provider>
    )
}