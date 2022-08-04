import React, { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { 
    MdExpandMore, 
    MdExpandLess, 
}  from 'react-icons/md';
import { Star, Heart } from '../Product/Fragments/productFragments';
import BackButton from '../BackButton/backButton';
import { Price } from '../Product/product';
import Reviews from '../Reviews/reviews';
import ImageSLider from '../ImageSlider/imageSlider';
import BottomProductsWrapper from '../BottomProducts/bottomProducts';
import { addToCartActionPayload } from '../../Context/Cart/cartPayloads';
import useViewContext from '../../Context/viewContext/context';
import useAuth from '../../Context/context';
import useCartContext from '../../Context/Cart/cartContext';
import profileAvatar from '../../Images/avatar4.png';
import styles from './ViewProduct.module.css';
import './viewProduct.css';



export default function ViewProduct({ 
    usedOutsideLogin, 
    dontShowbackButton, 
    ...props 
}) {
    const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
    const { viewState, setViewState } = useViewContext();
  
    useEffect(() => {
        let timer = null;
        let mounted = true;

        if (showAddToCartMessage && mounted) timer = setTimeout(() => setShowAddToCartMessage(false) ,4000);
        return () => {
            mounted = false;
            if (timer) clearTimeout(timer)
        }
    }, [showAddToCartMessage, setViewState])

    const handleAddToCartMessage = (bool) => {
        setShowAddToCartMessage(bool);
    }

    return (
        <>
        {
            (showAddToCartMessage) && (
                <PopUpMessage
                usedForSuccess 
                message= "Product added to cart"
                />
            )
        }
        {
            dontShowbackButton ? "" : (
                <div className="view-product-back-bttn-cntr">
                    <BackButton 
                    buttonWrapperClassName="view-product-back-bttn" 
                    clearSessionStorageWithKey = "view-product-location"
                    buttonIconClassName = "view-product-back-bttn-icon"
                    />
                </div>
            )
        } 
        <div className="view-product-container">
            <div className="view-product-top">
                <ProductImage { ...viewState } />
                <ProductDetails 
                product = { viewState } 
                showAddToCartMessage = { handleAddToCartMessage }
                />
            </div>
            <div className={ styles.viewProductCenter }>
                <Reviews viewState={ viewState }/>
                <AllProductDetails viewState={ viewState }/>
            </div>
            <BottomProductsWrapper
            viewState={ viewState }
            usedOutsideLogin ={ usedOutsideLogin }
            />
        </div>
        </>
    )
}


const popUpMessageUsedFor  = {
    success: "success",
    error: "error"
}


function PopUpMessage({ 
    usedForSuccess, 
    usedForError, 
    message, 
    children,
    ...props
}) {

    if (usedForSuccess) {
        return (
            <div className="pop-up-success-container">
                { 
                    children ? children : (
                        <div className="pop-up-success-child">
                            <IoMdCheckmarkCircleOutline className="pop-up-icon"/>
                            <div className="pop-up-text-container">
                                <span>{ message }</span>
                            </div>
                            
                        </div>
                    )
                }
            </div>
        )
    }

    if (usedForError) {
        return (
            <div className="pop-up-error-container">  
                { 
                    children ? children : (
                        <div className="pop-up-success-child">
                            <IoMdCheckmarkCircleOutline className= "pop-up-icon"/>
                            <div>
                                <div>Error</div>
                                <span>{ message }</span>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    
}
export { PopUpMessage }

function ProductImage({ 
    userProfileImage, 
    userName, 
    productImages, 
    product, 
    ...props 
}) {
    return (
        <div className="view-product-image-wrapper">
            <div className="view-product-profile" >
                <div  className="view-product-profile-image">
                    <img src={ userProfileImage || profileAvatar } alt="avatar" />
                    <span> { userName }</span>      
                </div>
                <div className="view-product-seller-stars">
                    {/* TODO... use Star component and implement star user functionality */}
                    seller stars
                </div>
            </div>
            <ImageSLider images = {  productImages }/>
        </div>
    )
}

function ProductDetails({showAddToCartMessage, product}) {
    const [quantity, setQuantity] = useState("");
    const [productSize, setProductSize] = useState(null);
    const{ user } = useAuth();
    const { 
        cartState, 
        addProductToCart, 
        updateCartContextState,
    } = useCartContext();

    useEffect(()=> {
        setQuantity("1");
    }, []);

    const addProductQuantity = () => {
        if (!quantity) {
            return setQuantity("1");
        }
        setQuantity(prevState => (parseInt(prevState) + 1).toString());
    }

    const reduceProductQuantity =  () => {
        if (!quantity)  return  setQuantity("1");
        
        if (quantity <= 1)return;
        setQuantity(prevState => (prevState - 1).toString());
    }
    
    const handleInputChange = (e) => {
        let value = e.target.value.split("");
        if (isNaN(e.target.value)) return;
        if (e.target.value < 1) return setQuantity("");
        
        for (let i = 0; i < value.length; i++) {
            if (value[i] === ".") return;
        }
        setQuantity(e.target.value); 
    }

    const addToCart = async (cartState, product, quantity, productSize, user) => {
        if (productSize) {
            const addedProduct = await addProductToCart(cartState, addToCartActionPayload(product, quantity, productSize));
            updateCartContextState(addedProduct, user);
            return;
        }

        const addedProduct = await addProductToCart(cartState, addToCartActionPayload(product, quantity));
        updateCartContextState(addedProduct, user);
        showAddToCartMessage(true);
    }

    const  capitalize = (s="") => {
        let [first, ...rest] = [...s];
       return first.toUpperCase() + rest.join("");
    }

    return (
        <div className="view-product-details-container">
            <div className="view-product-details-child view-product-details-name">
                <div>{capitalize(product.productName)}</div>
                <div className="view-product-details-code">
                    Product code: <span>{product.productId}</span>
                </div> 
            </div>
            <Price {...product} className="view-product-details-child view-product-details-price" />
            <div className="view-product-details-child view-product-details-usage">
                <div>
                    Usage: <span>{product.productUsage}</span>
                </div>
            </div>
            <div className="view-product-details-child view-product-details-usage">
                <div>
                    Supply Region('s): <span>Benue, Lagos, Abuja</span>
                </div>
            </div>  
            <div className="view-product-details-child view-product-details-qnty-wrpper">
                <button 
                className="view-product-add-button-icon"
                onClick={()=> reduceProductQuantity()}
                >
                    -
                </button>
                <input 
                value={quantity} 
                onChange={handleInputChange}
                className="view-product-input" type="text" 
                />
                
                <button 
                className="view-product-add-button-icon"
                onClick={()=> addProductQuantity()}
                >
                    +
                </button>
            </div>
            <div className="view-product-details-child view-product-details-add-to-cart">
                <button 
                onClick={()=> addToCart(cartState, product, parseInt(quantity), productSize, user)}
                >
                    Add to cart
                </button>
            </div>  
        </div>
    )

}


// TODO>>> uncomment prodps.details
function AllProductDetails(props) {
    return (
        <div className = { styles.allProductDetailsContainer }>
            {/* {
                props.details.map((detail, i) => 
                    <Detail key={ i } { ...detail } />
                )
            } */}

            <Detail/>
            <Detail/>
             <Detail/>
              <Detail/>
        </div>
    )
}

function Detail(props) {
    const [showMore, setShowMore] = useState(false);
    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState)
    }
    const showMoreIcon = showMore ? ( 
        <MdExpandLess className={ styles.showMoreIcon }/>
    ) : (
        <MdExpandMore className={ styles.showMoreIcon } />
    )

    const itemClassName = showMore ? (
        `${styles.allProductDetailsBody} ${styles.showMoreText}`
    ) : (
        `${styles.allProductDetailsBody}` 
    )

    const itemHeaderClassName = showMore ? (
        `${styles.allProductDetailsheader} ${styles.detailsOpen}`
    ) : (
        `${styles.allProductDetailsheader}` 
    )

    return (
        <div className ={ styles.allProductDetailsItem }>

            <div className ={ itemHeaderClassName } onClick ={ viewMoreDetails }>
                <div className ={ styles.allProductDetailsHeaderText }>
                    Description
                </div>
                <div className ={ styles.allProductDetailsHeaderIconWrapper } >
                   { showMoreIcon }
                </div>
            </div>

            <div className ={ itemClassName }>
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
            </div>
        </div>
    )
}

function DeliveryRegions({ loading, error, deliveryRegions, reloadDeliveryRegions, product }) {
    let DeliveryRegionsComp;

    if (loading) {
        DeliveryRegionsComp = (
            <div className="view-product-details-usage">
                <p>Supply Region('s): <span>Loading...</span></p>
            </div> 
        )
    } else if (error) {
        DeliveryRegionsComp = (
            // TODO... return error icon with functionality to reload delivery regions
             <div className="view-product-details-usage">
                <p>Supply Region('s): <span onClick = {() => reloadDeliveryRegions(product.userId) }>Error</span></p>
            </div> 
        )
    } else {
         DeliveryRegionsComp = (
            <div className="view-product-details-usage">
                <p>Supply Region('s): 
                    <span>
                    {
                        deliveryRegions.map((region, i) =>
                            <span key={i}> { region } </span>
                        )
                    }
                    </span>
                </p>
            </div> 
        )
    }
    return ( <> { DeliveryRegionsComp } </> )
}