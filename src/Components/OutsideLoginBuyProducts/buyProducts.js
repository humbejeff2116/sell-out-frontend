
import React, { useEffect, useState } from 'react';
import { LandingTemplate } from '../Landing/Template/template';
import { DisplayedProduct } from '../Product/product';
import FilterComponent from '../Index/filter'
import { FilterButton } from '../Index/index';
import Pagination from '../Pagination/pagination';
import useSocketIsConnected from '../Hooks/socketHooks';
import socket from '../Socket/socket';
import { getProducts } from '../../Utils/http.services';
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
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(null);
    const [offset, setOffset] = useState(null);
    const [queryValues, setQueryValue] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [filterType, setFilterType] = useState('');
    const [currentPage, setCurrentPage]= useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const socketIsConnected = useSocketIsConnected();

    useEffect(()=> {
        let mounted = true;
        // if (socketIsConnected && mounted) getAllProducts(0, 20, totalProducts, setProducts, setTotalProducts);
        return ()=>mounted = false;    
    }, [socketIsConnected]); 

    useEffect(()=> {
        let mounted = true;
        socket.on('productDataChange', function() {
            if (mounted) {
                if (offset) {
                    getAllProducts(offset, 20, totalProducts, setProducts, setTotalProducts);
                }
                
            }
        });

        return ()=> mounted = false;   
    }, [offset, totalProducts]);


    useEffect(()=> {
       setProducts(mockProducts);  
    }, []);

    const toggleFilter = (filterCategory) => {
        if (showFilter) {
            setFilterType("");
        } else {
            switch (filterCategory) {
                case "search" :
                    setFilterType("searchFilter");
                    break;
                case "products": 
                    setFilterType("productsFilter")
                    break;
                default: 
                throw new Error("proper filterCategory parameter is not specified");
            }
        }
        setShowFilter(prevState => !prevState)
    }

    const closeFilter = () => {
        setShowFilter(false)
        setFilterType("")
    }

    const getAllProducts = async (skip, limit, totalProducts, setProducts, setTotalProducts) => {
        try {
            const productsResponse = await getProducts(skip, limit);
            const { total, products } = productsResponse.data;
            setProducts(products);
            if (!totalProducts) {
                setTotalProducts(total);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        // skip -> {offset} limit -> {pageLimit}
        const currentPageProducts = products.slice(offset, offset + pageLimit);
        // const { products } = getAllProducts(offset, pageLimit, totalProducts, setProducts, setTotalProducts);
        setOffset(offset);
        setCurrentPage(currentPage);
        setProducts(currentPageProducts);
    }

    return (
        <div className ={ styles.container }>
            <FilterComponent
            filterType = { filterType }
            showFilter = { showFilter }
            closeFilter = { closeFilter }
            />
            {
                // TODO... return loader when products.length < 1;
                products.length > 0 && (
                    <FilterDisplayedProducts
                    toggleFilterComponent={ toggleFilter }
                    products={ products }
                    totalProducts = { totalProducts }
                    onPageChanged ={ onPageChanged }
                    />
                )
            }
        </div>
    )
}

// NOTE: This is an almost identical duplicate of FilterDisplayedProducts component 
// from Index and is done on purpose to promote scalability, mantainability and 
// avoid unprecedented complexity 
export function FilterDisplayedProducts({ 
    products, 
    toggleFilterComponent,
    totalProducts,
    onPageChanged, 
    ...props 
}) { 
    return (
        <div>
            <FilterButton
            filterButtonContainerClass ={styles.fliterButtonContainer}
            toggleFilterComponent = { toggleFilterComponent }
            showCartNavIcon
            dontShowTitle
            />
            <div className={ styles.productsContainer}>
            {
                products.map((product, i) =>
                    <DisplayedProduct 
                    key = { i } 
                    {...product} 
                    product = { product } 
                    panelClassName={ styles.productPanel }
                    productUsedOutsideLogin
                    />
                )
            }
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
    )
}