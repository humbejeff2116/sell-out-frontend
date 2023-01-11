/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { RiUpload2Line } from 'react-icons/ri';
import { LandingTemplate } from '../Landing/Template/template';
import { DisplayedProduct } from '../Product/product';
import { ProductsFilterMenu } from '../Index/filter'
import { 
    FilterButton, 
    filterTypes, 
    FilterLoader,
    // FilterDisplayedProducts 
} from '../Index/index';
import hrefs from '../../Data/hrefs';
import EmptyState, { EmptyStateButton } from '../EmptyState/emptyState';
import { LoaderSmall } from '../Loader/loader';
import Pagination from '../Pagination/pagination';
import useSocketIsConnected from '../Hooks/socketHooks';
import socket from '../Socket/socket';
import { getProducts } from '../../Utils/http.services';
import failureImage from '../../Images/failure9.jpg';
import styles from './BuyProducts.module.css';


const mockProducts = [
    {
        userId: 2234343,
        userName: "Humbe jeffrey",
        userEmail: "jeff@gmail.com",
        userProfilePicture: "",
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
        userProfilePicture: "",
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
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
    {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
      {
        userId: 2234343,
        userName: "Splash Collections",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
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
export default function BuyProducts() {
    return (
        <LandingTemplate 
        stickHeaderToTop
        landingTopChild = { <BuyProductsComponent/> }
        />
    )
}

function BuyProductsComponent(props) {
    const [loadedProducts, setLoadedProducts] = useState(null);
    const [currentPageProducts, setCurrentPageProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const [filterLoader, setFilterLoader] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const [offset, setOffset] = useState(0);
    const [queryValues, setQueryValue] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [filterType, setFilterType] = useState(filterTypes.productsFilter);
    const [currentPage, setCurrentPage]= useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const socketIsConnected = useSocketIsConnected();
    const _productsFilterMenu = useRef();

    useEffect(() => {
        let mounted = true;

        if (socketIsConnected && mounted) {
            setConnected(true)
            getPageProducts(
            0, 
            20, 
            totalProducts, 
            setCurrentPageProducts, 
            setTotalProducts
            );
        }
        return ()=> mounted = false;    
    }, [socketIsConnected]); 

    useEffect(()=> {
        let mounted = true;

        socket.on('productDataChange', function () {
            if (mounted) {
                if (offset) {
                    getPageProducts(
                        offset, 
                        20, 
                        totalProducts, 
                        setCurrentPageProducts, 
                        setTotalProducts
                    );
                }  
            }
        });

        return ()=> mounted = false;   
    }, [offset, totalProducts]);


    // useEffect(()=> {
    //    setCurrentPageProducts(mockProducts);  
    // }, []);

    // NOTE: duplicate function -> component: Index
    const toggleFilter = (filterCategory) => {
        if (!showFilter) {
            switch (filterCategory) {
                case "search" :
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

    const getPageProducts = async (
        skip, 
        limit, 
        totalProducts, 
        setPageProducts, 
        setTotalProducts
    ) => {
        try {
            const productsResponse = await getProducts(skip, limit);
            const { total, data:products } = productsResponse;
            
            if (!products) {
                setPageProducts([]);
                return;
            } 
            setPageProducts(products);
            setLoadedProducts(prevState => prevState ? [...prevState, ...products] : products);
            if (!totalProducts) {
                setTotalProducts(total);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const onPageChanged = async (data) => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        // skip -> {offset} limit -> {pageLimit}
        getPageProducts(
            offset, 
            pageLimit, 
            totalProducts, 
            setCurrentPageProducts, 
            setTotalProducts
        );
        setOffset(offset);
        setCurrentPage(currentPage);
    }

    const onClickOutsideProductsMenu = (e) => { 
        const { current } = _productsFilterMenu;   
        if (showFilter && current && !current.contains(e.target)) {      
            setShowFilter(false);    
        }  
    }

    return (
        <div className = { styles.container }>
            {(filterType && filterType === filterTypes.productsFilter) && (
                <ProductsFilterMenu 
                usedOutsideLogin
                onClickOutside = { onClickOutsideProductsMenu }
                ref = { _productsFilterMenu }
                showFilter = { showFilter }
                closeFilter = { closeFilter }
                />   
            )}
            <FilterDisplayedProducts
            loading = { loading }
            connectedToServer = { connected }
            filterLoader = { filterLoader }
            toggleProductsMenu = { toggleFilter }
            products = { currentPageProducts }
            totalProducts = { totalProducts }
            onPageChanged = { onPageChanged }
            />
        </div>
    )
}

// NOTE: This is an almost identical duplicate of FilterDisplayedProducts component 
// from Index and is done on purpose to promote scalability, mantainability, flexibility and 
// avoid unprecedented complexity 
export function FilterDisplayedProducts({ 
    products, 
    toggleProductsMenu,
    totalProducts,
    onPageChanged,
    loading,
    filterLoader,
    connectedToServer, 
    ...props 
}) { 
    return (
        <div>
            <FilterButton
            showCartNavIcon
            dontShowTitle
            filterButtonContainerClass = { styles.fliterButtonContainer }
            toggleFilter = { toggleProductsMenu }
            disableFilterToggle = { (!products || products.length < 0) || false }
            />
           
            {!connectedToServer ? (
                <div className = { styles.emptyProductsContainer }>
                    <NotConnectedToServer/>
                </div>
            ) : (
                (!products || loading) ? (
                    <LoaderSmall/>
                ) : 
                products.length > 0 ? (
                    <div>
                        { filterLoader && <FilterLoader/> }
                        <div className = { styles.productsContainer }>
                        {products.map((product, i) =>
                            <DisplayedProduct 
                            key = { i } 
                            {...product} 
                            product = { product } 
                            productUsedOutsideLogin
                            />
                        )}
                        </div>
                        <div className={styles.paginationContainer}>
                            {/* <Pagination 
                            totalRecords = { totalProducts } 
                            pageLimit = { 10 } 
                            pageNeighbours = { 1 } 
                            onPageChanged = { onPageChanged } 
                            /> */}
                        </div>
                    </div>
                ) : 
                (
                    <div className = { styles.emptyProductsContainer }>
                        <EmptyState
                        imageSrc = { failureImage }
                        imageAlt = "Illustration representing no products"
                        heading = "No products yet"
                        writeUp = {`
                            We have no products for sale at the moment. 
                            Why not be our first seller and let our systems help with 
                            selling your product('s)
                        `}
                        >
                            <EmptyStateButton
                            useLinkButton
                            buttonIcon = {
                                <RiUpload2Line className = { styles.uploadIcon }/>
                            }
                            emptyStateButtonText= "Upload Product"
                            href = { hrefs.sellProduct }
                            />    
                        </EmptyState>
                    </div>
                )
            )}
        </div>
    )
}

function NotConnectedToServer() {
    return (
        <EmptyState
        imageSrc = { failureImage }
        imageAlt = "Illustration representing not connected to server"
        heading = "Not connected to server"
        writeUp = {`
            Please wait while we establish a connection... 
        `}
        >
            <LoaderSmall/>
        </EmptyState>
    )
}