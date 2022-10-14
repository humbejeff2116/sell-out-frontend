
import React, { useState, useEffect, useRef } from 'react';
import { RiUpload2Line } from 'react-icons/ri';
import socket from '../Socket/socket';
import { SearchProducts } from './searchProducts';
import { PostProduct } from './postProduct';
import EmptyState, { EmptyStateButton } from '../EmptyState/emptyState';
import { LoaderSmall } from '../Loader/loader';
import { DisplayedProduct } from '../Product/product';
import { FilterButtonComponent, ProductsFilterMenu } from './filter'
import { CartNavButtonIcon } from '../Landing/Template/template';
import hrefs from '../../Data/hrefs';
import useSocketIsConnected from '../Hooks/socketHooks';
import { useScrolledToBottom } from '../Hooks/windowScrolledToBottom';
import useProductsContext from '../../Context/Products/context';
import { getProducts } from '../../Utils/http.services';
import failureImage from '../../Images/failure9.jpg';
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

export const filterTypes =  {
    productsFilter: "productsFilter",
    searchFilter: "searchFilter"
}


export default function Index() {
    const [showFilter, setShowFilter] = useState(false);
    const [filterType, setFilterType] = useState(filterTypes.productsFilter);
    const _productsFilterMenu = useRef();

    const toggleFilter = (filterCategory) => {
        if (!showFilter) {
            switch (filterCategory) {
                case "search":
                    setFilterType(filterTypes.searchFilter);
                    break;
                case "products": 
                    setFilterType(filterTypes.productsFilter);
                    break;
                default: 
                throw new Error("proper filter Category parameter is not specified");
            }
        }
        setShowFilter(prevState => !prevState);
    }

    const closeFilter = () => {
        setShowFilter(false);
    }

    const onClickOutsideProductsMenu = (e) => { 
        const { current } = _productsFilterMenu;   
        if (showFilter && current && !current.contains(e.target)) {      
            setShowFilter(false);    
        }  
    }
    
    return (
        <div className="index-container">
           <PostProduct/>
            {(filterType && filterType === filterTypes.productsFilter) && (
                <ProductsFilterMenu 
                onClickOutside = { onClickOutsideProductsMenu }
                ref = { _productsFilterMenu }
                showFilter = { showFilter }
                closeFilter = { closeFilter }
                />   
            )}
           <SearchProducts 
           toggleFilterComponent = { toggleFilter }
           />
           <FilterDisplayedProducts
           toggleFilterComponent = { toggleFilter }
           setShowFilter= { setShowFilter }
           />
        </div>
    )
}

export function FilterDisplayedProducts({ 
    toggleFilterComponent,
    setShowFilter
}) {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
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
        let timer = null;
        if (socketIsConnected && mounted) {
            if (productsFilter) {
                setShowFilter(false);
                timer = setTimeout(() => {
                    getIndexProducts(
                        productsLimit, 
                        0, 
                        productsFilter, 
                        setProducts, 
                        setFilterLoader
                    )
                }, 700)
            }     
        }

        return () => {
            mounted = false; 
            if (timer) {
                clearTimeout(timer);
            }
        }   
    }, [socketIsConnected, productsFilter, setShowFilter]); 

    useEffect(()=> { // run effect when product data changes
        let mounted = true;
        socket.on('productDataChange', function () {
            if (mounted) getIndexProducts(
                productsLimit, 
                products?.length - productsLimit, 
                productsFilter, 
                setProducts, 
                setFilterLoader
            );
        });
        return ()=> mounted = false;    
    }, [products, productsFilter]);

    useEffect(()=> { // run effect on scroll
        let mounted = true;
        const setLazyLoadedProducts = (products) => {
            setProducts(prevProducts => ([...prevProducts, ...products]));
        }

        if (socketIsConnected && mounted) {
            if (windowIsScrolledToBottom) {
                getIndexProducts(
                    productsLimit, 
                    products?.length, 
                    productsFilter, 
                    setLazyLoadedProducts, 
                    null,
                    setLazyLoader,
                );
            }     
        }
        return ()=> mounted = false;    
    }, [socketIsConnected, windowIsScrolledToBottom, products, productsFilter]);

    const getIndexProducts = async (
        limit, 
        skip, 
        filter, 
        setProducts, 
        setFilterLoader, 
        setLazyLoader
    ) => {
        if (!filter) {
            try {
                setLoading(true)
                const productsResponse = await getProducts(limit, skip);
                const products = productsResponse.data;
                setProducts(products);
                setLoading(false);
            } catch(err) {
                setLoading(false);
                console.error(err);
            }
        } else {
            if (!setFilterLoader) {
                setLazyLoader(true);
                try {
                    const { data } = await getProducts(limit, skip, filter);
                    setProducts(data);
                    setLazyLoader(false);
                } catch(err) {
                    setLazyLoader(false);
                    console.error(err);
                }
                return;
            }

            setFilterLoader(true);
            try {
                const { data } = await getProducts(limit, skip, filter);
                setProducts(data);
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
            disableFilterToggle = { (!products || products.length < 0) || false }
            toggleFilter = { toggleFilterComponent }
            />
            {!products || loading ? (
                <LoaderSmall/>
            ) : 
            products.length > 0 ? (
                <div>
                    { filterLoader && <FilterLoader/> }
                    <div className="index-products-container">
                    {products.map((product, i) =>
                        <DisplayedProduct 
                        key = { i } 
                        {...product} 
                        product = { product } 
                        />
                    )}
                    { lazyLoader && <FilterLoader/> }
                    </div>
                </div>
            ) : 
            (
                <div className="index-products-empty-container">
                    <EmptyState
                    imageSrc = { failureImage }
                    imageAlt = "Illustration representing no products"
                    heading = "No products yet"
                    writeUp = {`
                        We have no products for sale at the moment. 
                        Why not be our first seller and let our systems help you 
                        sell your product('s)
                    `}
                    >
                        <EmptyStateButton
                        useLinkButton
                        buttonIcon = {
                            <RiUpload2Line className="empty-store-products-icon"/>
                        }
                        emptyStateButtonText= "Upload Product"
                        href = { hrefs.sellProduct }
                        />
                        
                    </EmptyState>
                </div>
            )}
        </>
    )
}

export function FilterLoader({ ...props }) {
    return (
        <div>
            <LoaderSmall/>
        </div>
    )
}

export function  FilterButton({ 
    filterButtonContainerClass,
    toggleFilter, 
    showCartNavIcon,
    dontShowTitle,
    disableFilterToggle,
    ...props 
}) {
    return (
        <div className = { filterButtonContainerClass || "index-products-filter-button-container" }>
            <div className="index-products-filter-heading">
               { dontShowTitle  ? ""  :"Products" } 
            </div>
            <div className="index-products-filter-menu-container">
                <div className="index-products-filter-menu-item-wrapper">
                { showCartNavIcon && <CartNavButtonIcon/> }   
                </div>
                {/* {disableFilterToggle ? "" : ( */}
                    <FilterButtonComponent
                    toggleFilter = { disableFilterToggle ? f=> f : toggleFilter }
                    filter ="products"
                    title="Filter Products"
                    />
                {/* )} */}
            </div>
        </div>
    )
}