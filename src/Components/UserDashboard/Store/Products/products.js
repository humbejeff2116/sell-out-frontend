/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import { BiTrash, BiPencil } from "react-icons/bi";
import { RiFilterLine, RiSettingsLine, RiUpload2Line } from 'react-icons/ri';
import { BottomSpinner, LoaderSmall } from '../../../Loader/loader';
import { DisplayedProduct } from '../../../Product/product';
import useAuth from '../../../../Context/context';
import EmptyState, { EmptyStateButton } from '../../../EmptyState/emptyState';
import { ModalBox } from '../../../ModalReviews/modalReviews';
import { FilterButtonComponent } from '../../../Index/filter';
import Collections, { PopupMenuWrapper } from '../Collections/collections';
import { TabItem } from '../../Order/Deliveries/deliveries';
import useEditProductContext from '../../../../Context/EditProduct/context';
import socket from '../../../Socket/socket';
import useSocketIsConnected from '../../../Hooks/socketHooks';
import { deleteProduct } from '../../../../Utils/http.services';
import failureImage from '../../../../Images/failure9.jpg';
import './products.css';


const mockProducts = [
    // {
    //     userId: 2234343,
    //     userName: "hummbe jeffre",
    //     userEmail: "humbejeff@gmail.com",
    //     userProfilePicture: "",
    //     productId: 232323,
    //     productName: "short black shirt",
    //     productCategory: "Furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "Never used",
    //     productCurrency: "Naira",
    //     productPrice: "200",
    //     productContactNumber: "334039438493",
    //     productImages: [{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
    // {
    //     userId: 2234343,
    //     userName: "hummbe j",
    //     userEmail: "humbejeff@gmail.com",
    //     userProfilePicture: "",
    //     productId: 232323,
    //     productName: "short nikka",
    //     productCategory: "Furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "Never used",
    //     productCurrency: "Naira",
    //     productPrice: "200",
    //     productContactNumber: "334039438493",
    //     productImages: [{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
    // {
    //     userId: 2234343,
    //     userName: "hummbe jj",
    //     userEmail: "humbejeff@gmail.com",
    //     userProfilePicture: "",
    //     productId: 232323,
    //     productName: "short nikka",
    //     productCategory: "Furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "Never used",
    //     productCurrency: "Naira",
    //     productPrice: "200",
    //     productContactNumber: "334039438493",
    //     productImages: [{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
    // {
    //     userId: 2234343,
    //     userName: "hummbe effrey",
    //     userEmail: "humbejeff@gmail.com",
    //     userProfilePicture: "",
    //     productId: 232323,
    //     productName: "short nikka",
    //     productCategory: "Furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "Never used",
    //     productCurrency: "Naira",
    //     productPrice: "200",
    //     productContactNumber: "334039438493",
    //     productImages: [{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
];

const mockCollections = [ 
    
    {
        name: "Default",
        products: [
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 23232343,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 237672323,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2237684343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 232323,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 223409343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 232323,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 2398785672323,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
          
        ],
        totalProducts: 3
    },

    // {
    //     name: "Default",
    //     products: [
    //         {
    //             userId: 2234343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 23232343,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 2234343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 237672323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 2237684343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 232323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 223409343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 232323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 2234343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 2398785672323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
          
    //     ],
    //     totalProducts: 3
    // },

    // {
    //     name: "Default",
    //     products: [
    //         {
    //             userId: 2234343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 23232343,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 2234343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 237672323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 2237684343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 232323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 223409343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 232323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
    //         {
    //             userId: 2234343,
    //             userName: "hummbe effrey",
    //             userEmail: "humbejeff@gmail.com",
    //             userProfilePicture: "",
    //             productId: 2398785672323,
    //             productName: "short nikka",
    //             productCategory: "furniture",
    //             productCountry: "Nigeria",
    //             productState: "Benue",
    //             productUsage: "never used",
    //             productCurrency: "naira",
    //             productPrice: "200",
    //             productContactNumber: "334039438493",
    //             productImages: [{}],
    //             stars: [],
    //             unstars: [],
    //             comments: [],
    //             interests: []
    //         },
          
    //     ],
    //     totalProducts: 3
    // },


    {
        name: "Clothes",
        products: [
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 2323676923,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 232387854523,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 23237670223,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
          
        ],
        totalProducts: 4
    },


    {
        name: "Shoes",
        products: [
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 232232890323,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 232324343,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 65232323,
                productName: "short nikka",
                productCategory: "furniture",
                productCountry: "Nigeria",
                productState: "Benue",
                productUsage: "never used",
                productCurrency: "naira",
                productPrice: "200",
                productContactNumber: "334039438493",
                productImages: [{}],
                stars: [],
                unstars: [],
                comments: [],
                interests: []
            },
          
        ],
        totalProducts: 4
    }
  
]

const tabs = [{name: "All products"}, {name: "My collections"}]
const tabsType = {
    allProducts: "All products",
    myCollections: "My collections",
}

const storeProductsPopupMenus = {
    products: [
        {
            name: "Most recent",
            icon: <RiFilterLine className="store-products-popup-icon"/>    
        },
        {
            name: "Most sold",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        },
        {
            name: "Least sold",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        },
    ],
    collections: [
        {
            name: "Most recent",
            icon:<RiFilterLine className="store-products-popup-icon"/>    
        },
        {
            name: "Highest products",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        }
    ]
}

export default function StoreProducts() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [collections, setCollections] = useState(null);
    const [displayTab, setDisplayTab] = useState({name: tabsType.allProducts});
    const [loadingCollectionProducts, setLoadingCollectionProducts] = useState(false);
    const [allStoreProducts, setAllStoreProducts] = useState(null);
    const [collectionsErr, setCollectionsErr] = useState('');
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [popupMenuFilter, setPopupMenuFilter] = useState({});
    const productsMenu = React.useRef();
    const socketIsConnected = useSocketIsConnected();
    const { user } = useAuth();

    useEffect(()=> {
        let mounted = true;
        if (socketIsConnected && mounted && user) {
            if (!loading) {
                getStoreProducts(user);
            }
            if (!loadingCollectionProducts) {
                getUserCollectionsProducts(user);
            } 
        }

        socket.on('userDataChange', () => {
            if (socketIsConnected && user && mounted) {    
                if (!loadingCollectionProducts) {
                    getUserCollectionsProducts(user);
                }
            } 
        })

        return ()=> mounted = false    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketIsConnected, user]);

    useEffect(()=> {
        // TODO... move to getUserCollectionsProductsSuccess socket event
        setAllStoreProducts(extractCollectionProducts([]));
    }, []);

    useEffect(()=> {
        let mounted = true;

        socket.on("getUserProductsSuccess", function(response) {
            if (mounted) {
                const { data } = response;
                setError(false);
                setProducts(data);
                setLoading(false);
            }
        })

        socket.on("getUserProductsError", function(response) {
            if (mounted) {
                const { message } = response;
                setError(true);
                setMessage(message);
                setProducts([]);
                setLoading(false);
            }
        })

        socket.on('getUserCollectionsProductsSuccess', function(response) {
            if (mounted) {
                const { data } = response;       
                setCollections(data);
                setLoadingCollectionProducts(false);
            }
        })

        socket.on('getUserCollectionsProductsError', function(response) {
            if (mounted) {
                const { message } = response;
                setCollectionsErr(message);
                setLoadingCollectionProducts(false);                  
            }
        })  

        return () => mounted = false;    
    }, []);

    function extractCollectionProducts(p = []) {
        const prods = [];
        if (p.length < 0) {
            return prods;
        }
        p.forEach(({products}) => (prods.push(...products)));
        return prods;
    }

    const getStoreProducts = ({ id }) => {
        setLoading(true);
        try {
            socket.emit("getUserProducts", { userId: id })
        } catch (err) {
            console.error(err);
        }
    }

    const getUserCollectionsProducts = ({ id }) => {
        setLoadingCollectionProducts(true);
        try {
            socket.emit('getUserCollectionsProducts', { userId: id })         
        } catch(err) {
            setLoadingCollectionProducts(false);
            console.error(err)
        }
    }

    const displayTabChild = (name) => {
        setDisplayTab({name});
    }

    const toggleProductsMenu = () => {
        setShowProductsMenu(prevState => !prevState);
    }

    const onClickOutsidePopupMenu = (e) => { 
        const { current } = productsMenu;   
        if (showProductsMenu && current && !current.contains(e.target)) {      
            setShowProductsMenu(false);    
        }  
    }

    const setPopupFilter = (filter) => {
        setPopupMenuFilter(prevState => {
            return (displayTab?.name === tabsType.allProducts) ? ({
                ...prevState,
                allProducts: {
                    filter: filter
                }   
            }) : ({
                ...prevState,
                allCollections: {
                    filter: filter
                }
            })
        });
    }

    const getFilteredItems = (items, filter) => {
        switch (filter) {
            case "":
                break;
            default:
                break;
        }
    }
    
    if (redirect) {
        return (
            <Redirect to = {  redirect}/>
        )
    }
    
    return (
        <div className="placed-orders-container">
           <ProductsTop/>
            <div className="placed-orders-header">
                <h3> Store Items</h3>
            </div>
            <div className="store-products-filter-wrapper">
            <div className="store-products-filter-container">
               <ProductsNav
                tabsData = { tabs }
                displayItem ={ displayTab }
                handleTabClick = { displayTabChild }
               />
                <FilterButtonComponent
                filterButtonClassName="store-products-filter"
                filterIconClassName="store-products-filter-icon"
                title="Filter products"
                toggleFilter = { toggleProductsMenu } 
                />
            </div>
            <div className="store-products-popup-wrapper">
            {displayTab?.name === tabsType.allProducts ? (
                <PopupMenuWrapper 
                menus = { storeProductsPopupMenus.products }
                ref = { productsMenu } 
                showMenu = { showProductsMenu }
                onClickOutsideMenu = { onClickOutsidePopupMenu }
                setMenuFilter = { setPopupFilter }
                filter = { popupMenuFilter?.allProducts?.filter }
                />
            ) : (
                <PopupMenuWrapper 
                menus = { storeProductsPopupMenus.collections }
                ref = { productsMenu } 
                showMenu = { showProductsMenu }
                onClickOutsideMenu = { onClickOutsidePopupMenu }
                setMenuFilter = { setPopupFilter }
                filter = { popupMenuFilter?.allCollections?.filter }
                />
            )}
            </div>
            </div>
            {displayTab?.name === tabsType.allProducts  ? (
                !products || loading ? (
                    <LoaderSmall/>
                ) : (
                    // TODO... replace mockProducts with products
                    <AllStoreProducts
                    products = { mockProducts }
                    setDeleteProductResponseMessage = { setMessage }
                    setRedirect = { setRedirect }
                    >
                        <div className="empty-store-products-container">
                        <EmptyState
                        emptyContainerClassName ="empty-state-container"
                        imageSrc = { failureImage }
                        imageAlt = "Illustration of no products"
                        heading = "No store products"
                        writeUp = "You do not have any product for sale at the moment"
                        >
                            <EmptyStateButton
                            useLinkButton
                            buttonIcon = {
                                <RiUpload2Line className="empty-store-products-icon"/>
                            }
                            emptyStateButtonText="Upload Product"
                            href = "/home/dashboard/store/sell-product"
                            /> 
                        </EmptyState>
                        </div>
                    </AllStoreProducts>
                )
            ) : (
                <Collections
                collections = { collections }
                loading = { loadingCollectionProducts}
                allStoreProducts = { allStoreProducts}
                collectionsErr = { collectionsErr }
                setAllStoreProducts = { setAllStoreProducts }
                />
            )}
        </div>
    )
}

function ProductsNav({
    tabsData,
    displayItem,
    handleTabClick
}) {
    return (
        <div className="store-products-filter-nav">
        {tabsData.map(({name}, i) =>
            <TabItem 
            key = { i }
            name = { name }
            showItem = { displayItem?.name === name }
            handleClick ={ handleTabClick }
            /> 
        )}
        </div>
    )
}

function ProductsTop({...props}) {
    return (
        <div className="store-products-stats-container">
        <div className="store-products-stats-child left">
            <div className="store-products-stats-showcase-product">
                <h3>List a product</h3>
                <div className="store-products-showcase-writeup">
                    Showcase more of your products to potential cutomers
                </div>
                <div className="store-products-showcase-link-wrapper">
                    <Link to="/home/dashboard/store/sell-product">
                        Upload Product Details
                    </Link>
                </div>
            </div>
        </div>
        <div className="store-products-stats-child">
            metric
        </div>
    </div>
    )
}

export function AllStoreProducts({ 
    products, 
    storeContainerClassName, 
    productEditPanel, 
    setDeleteProductResponseMessage, 
    setRedirect,
    setProductsSelected,
    showSelect, 
    children
}) {
    return (
        <>
        {products?.length > 0 ? (
            <div className={ storeContainerClassName || "store-products-container"}>
            {products.map((product, i) =>
                <StoreProduct 
                key = { i }
                product = { product }
                setDeleteProductResponseMessage = { setDeleteProductResponseMessage }
                setRedirect = { setRedirect }
                productEditPanel = { productEditPanel }
                setProductsSelected = { setProductsSelected }
                showSelect = { showSelect }
                />
            )}
            </div>
        )  : (
            children
        )}
        </>
    )
}

export function StoreProduct({ 
    setDeleteProductResponseMessage, 
    setProductsSelected, 
    showSelect, 
    productEditPanel, 
    setRedirect, 
    product 
}) {
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { setProductToEdit } = useEditProductContext();
    let deleteModalChild;

    const deleteStoreProduct = async (product) => {  
        setShowDeleteProductModal(false);
        setDeletingProduct(true);
        try {
            
            const deleteProductResponse = await deleteProduct(product);
            setDeletingProduct(false); 
            setDeleteProductResponseMessage(deleteProductResponse.message);
        } catch(err) {
        
        } 
    }

    const editProduct = (product) => {
        setProductToEdit([product]);
        history.push(location.pathname);
        setRedirect("/home/dashboard/store/edit-product");
    }

    const closeModal = () => {
        setShowDeleteProductModal(false);
    }

    const openModal =() => {
        setShowDeleteProductModal(true);
    }

    
    return (
        <>
        {(showDeleteProductModal) && (
            <ModalBox 
            handleModal = { closeModal } 
            modalContainer = "store-products-modal-container" 
            >
                <DeleteModalChild 
                removeProduct = { ()=> deleteStoreProduct(product) } 
                cancel = { closeModal } 
                />
            </ModalBox>
        )}
        <BottomSpinner showLoader = { deletingProduct } >
            Deleting Prodcut...
        </BottomSpinner>
        <div className={ productEditPanel || "store-product-edit-panel" }>
            <div className="store-product-edit-icon-panel">
                {showSelect && (
                    <div className="store-product-edit-icon checkbox">
                        <input type="checkbox" onClick={ (e)=> setProductsSelected(product) }/>
                    </div>
                )}
                <div className="store-product-edit-icon edit" onClick={ ()=> editProduct(product) }>
                    <BiPencil title="Edit" className="store-icon" />
                </div>
                <div className="store-product-edit-icon delete" onClick = { openModal }>
                    <BiTrash title="Delete" className="store-icon"/>
                </div>
            </div>
            <DisplayedProduct 
            product = { product }
            panelClassName="store-product-panel"
            />
        </div>
        </>
    )
}

function DeleteModalChild({ cancel, removeProduct }) {
    return (
        <div className="store-products-modal-body-container">
            <div className="store-products-modal-content">
                <p>
                    Are you sure you want to delete product?
                </p>
            </div>
            <div className="store-products-modal-button-container">
                <div className="store-products-modal-button left">
                    <button onClick = { cancel }>Cancel</button>
                </div>
                <div className="store-products-modal-button">
                    <button onClick = { removeProduct }>Delete</button>
                </div>
            </div>
        </div>
    )

}