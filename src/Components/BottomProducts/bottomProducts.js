
import React, { useEffect, useState } from 'react';
import { DisplayedProduct } from '../Product/product';
import { getSellerProducts } from '../../Utils/http.services';
import styles from './BottomProducts.module.css';


const mockProducts = [
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short andres denim combat ",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "230",
        percentageOff: 3,
        productContactNumber: "334039438493",
        productImages: [{},{},{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbeeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "blue tantarum maryland jean",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "110",
        productContactNumber: "334039438493",
        productImages: [{},{},{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "17.2",
        productContactNumber: "334039438493",
        productImages: [{},{},{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbjef@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "15.22",
        productContactNumber: "334039438493",
        productImages: [{},{},{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
];


export default function BottomProductsWrapper({ 
    usedOutsideLogin,
    viewState, 
    ...props 
}) {
    const [showStoreProducts, setShowStoreProducts] = useState(true);
    const [showSimilarProducts, setShowSimilarProducts]= useState(false);
    const [storeProducts, setStoreProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        const getBottomProducts = async (queryData) => {
            setLoading(true);
            try {
                const { 
                    status,
                    error,
                    message,
                    sellerProducts, 
                    similarProducts
                } = await getSellerProducts(queryData);
                if (sellerProducts.length < 1) { 
                    setShowStoreProducts(false);
                    setShowSimilarProducts(true)
                }
                setStoreProducts(sellerProducts);
                setSimilarProducts(similarProducts);
                setLoading(false);
            } catch(err) {
                console.error(err);
                setError({
                    exist: true,
                    message: err.message
                })
                setLoading(false);
            } 
        }
        
        if (viewState) {
            const { userId, userEmail, productCategory } = viewState
            const queryData = {
                userId,
                userEmail,
                productCategory,
            }
            return getBottomProducts(queryData);
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

    const storeProductsTabHeaderClassName = showStoreProducts ? (
        `${styles.bottomProductsTabHeader} ${styles.tabsHeaderActive}`
    ) : (
        `${styles.bottomProductsTabHeader}` 
    )

    const similarProductsTabHeaderClassName = showSimilarProducts ? (
        `${styles.bottomProductsTabHeader} ${styles.tabsHeaderActive}`
    ) : (
        `${styles.bottomProductsTabHeader}` 
    )
    const { userName, brandName } = viewState

    return (
        <div className={ styles.bottomPoductsWrapper }>
            <div className={ styles.bottomPoductsHeader }>
                <div  
                className = { storeProductsTabHeaderClassName } 
                onClick = { showStoreProductsTab }
                >
                    { brandName ?? userName }
                </div>
                <div 
                className = { similarProductsTabHeaderClassName } 
                onClick ={ showSimilarProdcutsTab }
                >
                    Similar Products
                </div>
                <div className = { styles.bottomProductsEmptyTabHeader } >  
                </div>
            </div>
            <div className={ styles.bottomPoductsContainer }>
            {
                loading? "loading" : showStoreProducts ? (
                    <BottomProducts
                    usedForUserProducts
                    products = { storeProducts.length > 0 ? storeProducts : mockProducts }
                    error = { error }
                    productUsedOutsideLogin = { usedOutsideLogin }
                    brandName = { brandName ?? userName }
                    />
                ) : (
                    <BottomProducts
                    usedForSimilarProducts
                    products = { similarProducts }
                    error = { error }
                    productUsedOutsideLogin ={ usedOutsideLogin }
                    />
                )
            }
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
    
    // if (error.exist) {
    //     return (
    //         <div className={ styles.bottomProductsEmpty }>
              
    //            { error.message }
    //         </div>
    //     )
    // }
    if (products && products.length < 1 ) {
        if (usedForUserProducts) {
            return (
                <div className={ styles.bottomProductsEmpty }>
                    { brandName } has no other products for sale at the moment
                    
                </div>
            )
        }
        if (usedForSimilarProducts) {
            return (
                <div className={ styles.bottomProductsEmpty }>
                    {/* There are no similar products for sale at the moment */}
                    We couldnt find any similar products at the moment
                </div>
            )
        }
    }
    return (
        <div className={ styles.bottomProductsWrapper }>
        {
            products && products.map((product,i) =>
                <DisplayedProduct 
                key = { i }  
                product = { product } 
                panelClassName={ styles.bottomProductsPanel }
                productUsedOutsideLogin = { productUsedOutsideLogin }
                />
            )
        }
        </div>
    )
}