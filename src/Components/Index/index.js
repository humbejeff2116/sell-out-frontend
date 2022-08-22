
import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import { SearchProducts } from './searchProducts';
import { PostProduct } from './postProduct';
// import { ErrorModal } from '../ModalBox/errorModal';
import { DisplayedProduct } from '../Product/product';
import FilterComponent, { FilterButtonComponent } from './filter'
import { CartNavButtonIcon } from '../Landing/Template/template';
import useSocketIsConnected from '../Hooks/socketHooks';
import { useScrolledToBottom } from '../Hooks/windowScrolledToBottom';
import useProductsContext from '../../Context/Products/context';
import { getProducts } from '../../Utils/http.services';
import './index.css';


const mockProducts = [
    {
        userId: 2234343,
        userName: "Humbe jeffrey",
        userEmail: "jeff@gmail.com",
        userProfileImage: "",
        productId: 232323,
        productName: "Denim blue shirt",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "214",
        percentageOff: 5,
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "Bottega",
        userEmail: "humbejeff@gmail.com",
        userProfileImage: "",
        productId: 232323,
        productName: "Fur pants",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        percentageOff: 7,
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfileImage: "",
        productId: 232323,
        productName: "Sweat shirt",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        percentageOff: 2,
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
];


export default function Index() {
    const [showFilter, setShowFilter] = useState(false);
    const [filterType, setFilterType] = useState('');

    const toggleFilter = (filterCategory) => {
        if (showFilter) {
            setFilterType("");
        } else {
            switch (filterCategory) {
                case "search" :
                    setFilterType("searchFilter");
                    break;
                case "products": 
                    setFilterType("productsFilter");
                    break;
                default: 
                throw new Error("proper filterCategory parameter is not specified");
            }
        }
        setShowFilter(prevState => !prevState);
    }

    const closeFilter = () => {
        setShowFilter(false)
        setFilterType("")
    }
    
    return (
        <div className="index-container">
           <PostProduct/>
           <FilterComponent
           filterType = { filterType }
           showFilter = { showFilter }
           closeFilter = { closeFilter }
           />
           <SearchProducts 
           toggleFilterComponent = { toggleFilter }
           />
           <FilterDisplayedProducts
           toggleFilterComponent = { toggleFilter }
           />
        </div>
    )
}

export function FilterDisplayedProducts({ 
    toggleFilterComponent
}) {
    const [products, setProducts] = useState([]);
    const [filterLoader, setFilterLoader] = useState(false);
    const [lazyLoader, setLazyLoader] = useState(false);
    const socketIsConnected = useSocketIsConnected();
    const windowIsScrolledToBottom = useScrolledToBottom();
    const { productsFilter } = useProductsContext(); // productsFilter -> ({type, filter})
    const productsLimit = 18;

    useEffect(()=> { // run effect only when there is no filter context
        let mounted = true;
        if (socketIsConnected && mounted) {
            if (!productsFilter) {
                getIndexProducts(
                    productsLimit, 
                    0, 
                    null, 
                    setProducts
                );
            }    
        }
        return ()=> mounted = false;    
    }, [socketIsConnected, productsFilter]);

    useEffect(()=> { // run effect only when there is filter context
        let mounted = true;
        if (socketIsConnected && mounted) {
            if (productsFilter) {
                getIndexProducts(
                    productsLimit, 
                    0, 
                    productsFilter, 
                    setProducts, 
                    setFilterLoader
                );
            }     
        }
        return ()=> mounted = false;    
    }, [socketIsConnected, products.length, productsFilter]); 

    useEffect(()=> { // run effect when product data changes
        let mounted = true;
        socket.on('productDataChange', function() {
            if (mounted) getIndexProducts(
                productsLimit, 
                products.length, 
                productsFilter, 
                setProducts, 
                setFilterLoader
            );
        });
        return ()=> mounted = false;    
    }, [products.length, productsFilter]);

    useEffect(()=> { // run effect on scroll
        let mounted = true;
        const setLazyLoadedProducts = (products) => {
            setProducts(prevProducts => ([...prevProducts, ...products]));
        }

        if (socketIsConnected && mounted) {
            if (windowIsScrolledToBottom) {
                getIndexProducts(
                    productsLimit, 
                    products.length, 
                    productsFilter, 
                    setLazyLoadedProducts, 
                    null,
                    setLazyLoader,
                );
            }     
        }
        return ()=> mounted = false;    
    }, [socketIsConnected, windowIsScrolledToBottom, products.length, productsFilter]);

    const getIndexProducts = async (limit, skip, filter, setProducts, setFilterLoader, setLazyLoader) => {
        if (!filter) {
            try {
                const productsResponse = await getProducts(limit, skip);
                const products = productsResponse.data;
                setProducts(products);
               
            } catch(err) {
                console.error(err);
            }
        } else {
            if (!setFilterLoader) {
                setLazyLoader(true)
                try {
                    const { products } = await getProducts(limit, skip, filter).data;
                    setProducts(products);
                    setLazyLoader(false);
                } catch(err) {
                    setLazyLoader(false);
                    console.error(err);
                }
                return
            }

            setFilterLoader(true);
            try {
                const { products } = await getProducts(limit, skip, filter).data;
                setProducts(products);
                setFilterLoader(false);
            } catch(err) {
                setFilterLoader(false);
                console.error(err);
            }
        }
    }
 
    return (
        <>
            <FilterButton
            toggleFilter = { toggleFilterComponent }
            />
            <div className="index-products-container">
            { filterLoader && <FilterLoader/> }
            {mockProducts.map((product, i) =>
                <DisplayedProduct 
                key = { i } 
                {...product} 
                product = { product } 
                panelClassName="index-product-panel"
                />
            )}
            { lazyLoader && <FilterLoader/> }
            </div>
        </>
    )
}

function FilterLoader({ ...props }) {
    return (
        <div>

        </div>
    )
}

export function  FilterButton({ 
    filterButtonContainerClass,
    toggleFilter, 
    showCartNavIcon,
    dontShowTitle,
    ...props 
}) {
    return (
        <div className={ filterButtonContainerClass || "index-products-filter-button-container" }>
            <div className="index-products-filter-heading">
               { dontShowTitle  ? ""  :"Products" } 
            </div>
            <div className="index-products-filter-menu-container">
                <div className="index-products-filter-menu-item-wrapper">
                { showCartNavIcon && <CartNavButtonIcon/> }   
                </div>
                <FilterButtonComponent
                toggleFilter = { toggleFilter }
                filter ="products"
                title="Filter Products"
                />
            </div>
        </div>
    )
}