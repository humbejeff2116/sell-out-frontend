/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { DisplayedProduct } from '../Product/product';
import EmptyState, { EmptyStateButton }  from '../EmptyState/emptyState';
import { LoaderSmall } from '../Loader/loader';
import { getSimilarProducts } from '../../Utils/http.services';
import errorImage from '../../Images/error2.png';
import failureImage from '../../Images/failure9.jpg';
import styles from './BottomProducts.module.css';


const mockProducts = [
    // {
    //     userId: 2234343,
    //     userName: "hummbe jeffrey",
    //     userEmail: "humbejeff@gmail.com",
    //     userProfileImage: "",
    //     productId: 232323,
    //     productName: "short andres denim combat ",
    //     productCategory: "furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "never used",
    //     productCurrency: "naira",
    //     productPrice: "230",
    //     percentageOff: 3,
    //     productContactNumber: "334039438493",
    //     productImages: [{},{},{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
    // {
    //     userId: 2234343,
    //     userName: "hummbe jeffrey",
    //     userEmail: "humbeeff@gmail.com",
    //     userProfileImage: "",
    //     productId: 232323,
    //     productName: "blue tantarum maryland jean",
    //     productCategory: "furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "never used",
    //     productCurrency: "naira",
    //     productPrice: "110",
    //     productContactNumber: "334039438493",
    //     productImages: [{},{},{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
    // {
    //     userId: 2234343,
    //     userName: "hummbe jeffrey",
    //     userEmail: "humbeff@gmail.com",
    //     userProfileImage: "",
    //     productId: 232323,
    //     productName: "short nikka",
    //     productCategory: "furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "never used",
    //     productCurrency: "naira",
    //     productPrice: "17.2",
    //     productContactNumber: "334039438493",
    //     productImages: [{},{},{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
    // {
    //     userId: 2234343,
    //     userName: "hummbe jeffrey",
    //     userEmail: "humbjef@gmail.com",
    //     userProfileImage: "",
    //     productId: 232323,
    //     productName: "short nikka",
    //     productCategory: "furniture",
    //     productCountry: "Nigeria",
    //     productState: "Benue",
    //     productUsage: "never used",
    //     productCurrency: "naira",
    //     productPrice: "15.22",
    //     productContactNumber: "334039438493",
    //     productImages: [{},{},{}],
    //     stars: [],
    //     unstars: [],
    //     comments: [],
    //     interests: []
    // },
];


export default function BottomProductsWrapper({ 
    usedOutsideLogin,
    viewState,
    ...props 
}) {
    const [showStoreProducts, setShowStoreProducts] = useState(true);
    const [showSimilarProducts, setShowSimilarProducts]= useState(false);
    const [storeProducts, setStoreProducts] = useState(null);
    const [similarProducts, setSimilarProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        let timer = null;

        const getBottomProducts = async (queryData) => {
            setLoading(true);
            try {
                const { data } = await getSimilarProducts(queryData);
                const { sellerProducts, similarProducts } = data;
                setStoreProducts(sellerProducts);
                setSimilarProducts(similarProducts);

                if (sellerProducts.length < 1 && similarProducts.length > 0) { 
                    setShowStoreProducts(false);
                    setShowSimilarProducts(true);
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError({
                    exist: true,
                    message: err.message
                });
                setStoreProducts([]);
                setSimilarProducts([]);
                setLoading(false);
            } 
        }
        
        if (viewState) {
            const { userId, userEmail, productCategory } = viewState;
            const queryData = {
                userId,
                userEmail,
                productCategory,
            }
            //delay and get products after window has probably scrolled to top
            timer = setTimeout(() => {
                return getBottomProducts(queryData);
            }); 
        }

        return ()=> {
            if (timer) clearTimeout(timer);
        }
    }, [viewState]);

    const showStoreProductsTab = () => {
        setShowStoreProducts(true);
        setShowSimilarProducts(false);
    }

    const showSimilarProdcutsTab = () => {
        setShowStoreProducts(false);
        setShowSimilarProducts(true);
    }

    const storeProductsTabHeaderClassName = `${styles.bottomProductsTabHeader} ${showStoreProducts ? styles.tabsHeaderActive : "" }`;
    const similarProductsTabHeaderClassName = `${styles.bottomProductsTabHeader} ${showSimilarProducts ? styles.tabsHeaderActive : ""}`;
    const { userName, brandName } = viewState;

    return (
        <div className = { styles.bottomPoductsWrapper }>
            <div className = { styles.bottomPoductsHeader }>
                <div  
                className = { storeProductsTabHeaderClassName } 
                onClick = { showStoreProductsTab }
                >
                    { brandName ?? userName }
                </div>
                <div 
                className = { similarProductsTabHeaderClassName } 
                onClick = { showSimilarProdcutsTab }
                >
                    Similar Products
                </div>
                <div className = { styles.bottomProductsEmptyTabHeader }>  
                </div>
            </div>
            <div className = { styles.bottomPoductsContainer }>
            {loading || !storeProducts ? (
                <LoaderSmall/>
            ) : showStoreProducts ? (
                <BottomProducts
                usedForUserProducts
                products = { storeProducts }
                error = { error }
                productUsedOutsideLogin = { usedOutsideLogin }
                brandName = { brandName ?? userName }
                />
            ) : (
                <BottomProducts
                usedForSimilarProducts
                products = { similarProducts }
                error = { error }
                productUsedOutsideLogin = { usedOutsideLogin }
                />
            )}
            </div>           
        </div>
    )
}

function BottomProducts({ 
    productUsedOutsideLogin,
    products, 
    error,
    usedForUserProducts,
    usedForSimilarProducts, 
    brandName, 
    ...props 
}) {
    if (error.exist) {
        return (
            <EmptyState
            imageSrc = { errorImage }
            heading="Error!"
            writeUp = { error.message }
            >
                <EmptyStateButton
                buttonIcon = {
                    <AiOutlineReload className = { styles.reloadIcon }/>
                }
                emptyStateButtonText="Reload"
                // handleClick
                />
            </EmptyState>
        )
    }
    if (products && products.length < 1) {
        if (usedForUserProducts) {
            return (
                <EmptyState
                imageSrc = { failureImage }
                heading="Store Products"
                writeUp = { `${ brandName } does'nt have other products at the moment` }
                >

                </EmptyState>
            )
        }
        if (usedForSimilarProducts) {
            return (
                <EmptyState
                imageSrc = { failureImage }
                heading="Similar Products"
                writeUp="Sorry, We couldn't find any similar products to the one you've viewed"
                >

                </EmptyState>
            )
        }
    }
    return (
        <div className = { styles.bottomProductsWrapper }>
        {products && products.map((product, i) =>
            <DisplayedProduct 
            key = { i }  
            product = { product } 
            productUsedOutsideLogin = { productUsedOutsideLogin }
            />
        )}
        </div>
    )
}