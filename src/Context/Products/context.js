
import { createContext, useContext } from 'react';

const initialContext = {
    productsFilter: null,
    setProductsFilter: ()=> {},
}

export const ProductsContext = createContext(initialContext);

export default function useProductsContext() {
    return useContext(ProductsContext);
}