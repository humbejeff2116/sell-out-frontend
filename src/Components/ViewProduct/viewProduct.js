/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdExpandMore, MdExpandLess }  from 'react-icons/md';
import { BottomPopUpBox, useBottomPopUpFor } from '../ModalBox/modalBox';
import BackButton from '../BackButton/backButton';
import { Price } from '../Product/product';
import Reviews from '../Reviews/reviews';
import ImageSLider from '../ImageSlider/imageSlider';
import ImageViewer from '../ImageViewer/imageViewer';
import BottomProductsWrapper from '../BottomProducts/bottomProducts';
import { addToCartActionPayload } from '../../Context/Cart/cartPayloads';
import StarGiver from '../StarGiver/starGiver';
import { 
    ShippingAddressInput, 
    ShippingAddressSelect,
    getShippingAddress 
} from './FormikComponents/formik';
import useViewContext from '../../Context/viewContext/context';
import useAuth from '../../Context/context';
import useCartContext from '../../Context/Cart/cartContext';
import useSocketIsConnected from '../Hooks/socketHooks';
import socket from '../Socket/socket';
import profileAvatar from '../../Images/avatar4.png';
import styles from './ViewProduct.module.css';
import './viewProduct.css';


export default function ViewProduct({ 
    usedOutsideLogin, 
    dontShowbackButton, 
}) {
    const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
    const [shippingAddressError, setShippingAddressError] = useState(false);
    const { viewState, setViewState } = useViewContext();

    useEffect(() => {
        let timer = null;
        let mounted = true;
        if (showAddToCartMessage && mounted) {
            timer = setTimeout(() => setShowAddToCartMessage(false), 4000);
        } 
        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
        }
    }, [showAddToCartMessage, setViewState]);

    const handleAddToCartMessage = (bool) => {
        setShowAddToCartMessage(bool);
    }

    const closeBottomPopUpBox = () => {
        setShippingAddressError(false);
    }

    return (
        <>
        <BottomPopUpBox 
        usedFor = { useBottomPopUpFor.error }
        showPopUp = { shippingAddressError }
        message = "Please enter a shipping address"
        closePopUp = { closeBottomPopUpBox }
        />
        {(showAddToCartMessage) && (
            <PopUpMessage
            usedForSuccess 
            message= "Product added to cart"
            />
        )}
        {dontShowbackButton ? "" : (
            <div className="view-product-back-bttn-cntr">
                <BackButton 
                buttonWrapperClassName="view-product-back-bttn" 
                clearSessionStorageWithKey = "view-product-location"
                buttonIconClassName = "view-product-back-bttn-icon"
                />
            </div>
        )} 
        <div className="view-product-container">
            <div className="view-product-top">
                <ProductImage { ...viewState }/>
                <ProductDetails 
                product = { viewState } 
                showAddToCartMessage = { handleAddToCartMessage }
                setShippingAddressError = { setShippingAddressError }
                />
            </div>
            <div className = { styles.viewProductCenter }>
                <Reviews 
                viewState = { viewState }
                />
                <AllProductDetails 
                product = { viewState }
                />
            </div>
            <BottomProductsWrapper
            viewState = { viewState }
            usedOutsideLogin = { usedOutsideLogin }
            />
        </div>
        </>
    )
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
            {children ? children : (
                <div className="pop-up-success-child">
                    <IoMdCheckmarkCircleOutline className="pop-up-icon"/>
                    <div className="pop-up-text-container">
                        <span>{ message }</span>
                    </div>
                </div>
            )}
            </div>
        )
    }

    if (usedForError) {
        return (
            <div className="pop-up-error-container">  
            {children ? children : (
                <div className="pop-up-success-child">
                    <IoMdCheckmarkCircleOutline className="pop-up-icon"/>
                    <div>
                        <div>Error</div>
                        <span>{ message }</span>
                    </div>
                </div>
            )}
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
    const [showImageViewer, setShowImageViewer] = useState(false);
    
    const viewImage = () => {
        setShowImageViewer(true);
    }

    const closeImageViewer = () => {
        setShowImageViewer(false);
    }

    return (
        <>
            {showImageViewer && (
                <ImageViewer
                closeImageViewer = { closeImageViewer }
                />
            )}
            <div className="view-product-image-wrapper">
                <div className="view-product-profile">
                    <div  className="view-product-profile-image">
                        <img src = { userProfileImage || profileAvatar } alt="avatar"/>
                        <span> { userName }</span>      
                    </div>
                    <div className="view-product-seller-stars">
                        <StarGiver
                        seller = { {userId: props.userId, userEmail: props.userEmail} }
                        />
                    </div>
                </div>
                <ImageSLider 
                images = { productImages }
                onClickImage = { viewImage }
                />
            </div>
        </>
    )
}

function ProductDetails({
    setShippingAddressError,
    showAddToCartMessage, 
    product
}) {
    const [quantity, setQuantity] = useState("");
    const [productSize, setProductSize] = useState(null);
    const { user } = useAuth();
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

    const reduceProductQuantity = () => {
        if (!quantity)  return setQuantity("1");
        
        if (quantity === "1") return;
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

    const addToCart = async (
        cartState, 
        product, 
        quantity, 
        productSize, 
        user
    ) => {
        if (productSize) {
            const addProduct = await addProductToCart(
                cartState, 
                addToCartActionPayload(product, quantity, productSize)
            );
            updateCartContextState(addProduct, user);
            return;
        }

        const addProduct = await addProductToCart(
            cartState, 
            addToCartActionPayload(product, quantity)
        );
        updateCartContextState(addProduct, user);
        showAddToCartMessage(true);
    }

    const  capitalize = (s="") => {
        const [first, ...rest] = [...s];
        return first.toUpperCase() + rest.join("");
    }

    return (
        <div className="view-product-details-container">
            <div className="view-product-details-child view-product-details-name">
                <div>{ capitalize(product.productName) }</div>
                <div className="view-product-details-code">
                    Product code: <span>{ product.productId }</span>
                </div> 
            </div>
            <Price { ...product } className="view-product-details-child view-product-details-price"/>
            <div className="view-product-details-child view-product-details-usage">
                <div>
                    Usage: <span>{ product.productUsage }</span>
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
                onClick={ ()=> reduceProductQuantity() }
                >
                    -
                </button>
                <input 
                value = { quantity } 
                onChange = { handleInputChange }
                className="view-product-input" type="text" 
                />
                <button 
                className="view-product-add-button-icon"
                onClick = { ()=> addProductQuantity() }
                >
                    +
                </button>
            </div>
            <div className="view-product-details-child view-product-details-add-to-cart">
                <button 
                onClick = { ()=> addToCart(cartState, product, parseInt(quantity), productSize, user) }
                >
                    Add to cart
                </button>
            </div>  
        </div>
    )
}



const operationRegions = [
    {state: "Benue", city: "makurdi", costOfDelivery: 200},
    {state: "Lagos", city: "Ikeja", costOfDelivery: 700},
]
// TODO>>> uncomment props.details
function AllProductDetails({
    // decscription,
    product,
    ...props
}) {
    const [seller, setSeller]= useState(null);
    const [error, setError] = useState(false);
    const socketIsConnected = useSocketIsConnected();

    useEffect(() => {
        let mounted = true;

        if (socketIsConnected && mounted) {
            // getSeller(product);   
        }
        return ()=> mounted = false;    
    }, [socketIsConnected, product]);

    useEffect(() => {
        let mounted = true;

        socket.on('getUserSuccess', function (response) {
            if (socketIsConnected && mounted) {
                const { data } = response;
                setSeller(data);  
            }
        })

        socket.on('getUserError', function (response) {
            if (socketIsConnected && mounted) {
                const { status, error, data } = response;
                setError(true);  
            }
        })
        
        return ()=> mounted = false;    
    }, [socketIsConnected, product]);

    const getSeller = async ({userId, userEmail}) => {
        socket.emit("getUser", {id: userId, userEmail});
    }

    return (
        <div className = { styles.allProductDetailsContainer }>
            <Detail 
            title="Description"
            showDetails
            >
                <div>
                    {product?.description || `
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        cet cat feit de nu lo ra pen t dala
                        rep sert tu la dress ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                        cet cat feit de nu lo ra pen t dala
                        rep sert tu la dress ra pen t dala
                    `}
                </div>
            </Detail>

            <Detail 
            title="Operational Regions"
            showDetails
            >
            {/* {seller?.operationalRegions.map((region, i) =>
                <OperationalRegion key = { i } {...region}/> 
            )} */}

            {operationRegions.map((region, i) =>
                <OperationalRegion key = { i } {...region}/> 
            )}
            </Detail>

            <Detail title="Return & Exchange">
                {/* {seller.shippingAndOperations?.acceptReturns} */}
                {/* {seller.shippingAndOperations?.conditionsForReturn} */}
                <ReturnAndExchange
                acceptReturns
                // conditionsForReturn
                />
            </Detail>

            {/* shipping and operations */}
            <Detail title="Delivery Strategy">
                {/* {seller.shippingAndOperations?.modeOfDelivery} */}
                {/* {seller.shippingAndOperations?.estimatedDeliveryDuration} */}
                {/* {seller.shippingAndOperations?.operationalTime} */}
                <DeliveryStrategy
                />
            </Detail>


            {/* get user location  */}
            <Detail 
            title={`Deliver to ${"Nigeria"}`}
            showDetails
            >
                {/* state */}
                {/* shipping addres */}
                {/* dispatch from */}

                <DeliverTo
                />
            </Detail>
        </div>
    )
}

function Detail({
    title,
    showDetails,
    children, 
    ...props
}) {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (showDetails) {
            setShowMore(true);
        }
    },[showDetails])

    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState);
    }

    const showMoreIcon = showMore ? ( 
        <MdExpandLess className = { styles.showMoreIcon }/>
    ) : (
        <MdExpandMore className = { styles.showMoreIcon } />
    )

    const itemClassName = `${styles.allProductDetailsBody} ${showMore ? styles.showMoreText : ""}`
    const itemHeaderClassName = `${styles.allProductDetailsheader} ${showMore ? styles.detailsOpen : ""}`

    return (
        <div className = { styles.allProductDetailsItem }>
            <div className = { itemHeaderClassName } onClick ={ viewMoreDetails }>
                <div className = { styles.allProductDetailsHeaderText }>
                    { title || "" }
                </div>
                <div className = { styles.allProductDetailsHeaderIconWrapper } >
                   { showMoreIcon }
                </div>
            </div>
            <div className = { itemClassName }>
                { children }
            </div>
        </div>
    )
}

function DeliverTo({
    // state,
    // city,
    // shippingAddress,
    setShippingAddress,
    handleSubmit
}) {
    const [sessionStoredShippingAddress, setSessionStoredShippingAddress] = useState(null);
    const { user } = useAuth();
    const { legalAddress, state, city } = user || {}; //user?.shippingAddress
    const { shippingAddress } = user || {}; //user?.shippingAndOperations;

    useEffect(() => {
        const sessionStoredShippingAddress = getShippingAddress();

        if (sessionStoredShippingAddress) {
            setSessionStoredShippingAddress(prevState => ({...prevState, ...sessionStoredShippingAddress}));
            return;
        }
        setSessionStoredShippingAddress({});
    }, []);
 
    return (
        <div className = { styles.operationalRegionContainer }>
            {sessionStoredShippingAddress && (
                <Formik
                initialValues = {{
                    state: state || sessionStoredShippingAddress?.state || '',
                    city: city || sessionStoredShippingAddress?.city || '',
                    shippingAddress: shippingAddress || legalAddress || sessionStoredShippingAddress?.shippingAddress || '',
                }}
                validationSchema = {Yup.object({ 
                    state: Yup.string().required('State is required'),
                    city: Yup.string().required('City is required'),
                    shippingAddress: Yup.string().required('Shipping Address is required'),
                })}
                onSubmit = { handleSubmit }
                >
                <Form id="contactForm">
                    <div className = {`${styles.operationalRegionChild} ${styles.noBorder}`}>
                        State
                        <div className = {`${styles.operationalRegionText}`}>
                            <ShippingAddressSelect
                            shippingAddresskey = "state"
                            name = "state"
                            inputErrorClass = { styles.error }
                            notEmptyClass = { styles.notEmpty }
                            >
                                <option value="">Select</option>
                                <option>Benue</option>
                                <option>Abuja</option>
                                <option>Lagos</option>
                            </ShippingAddressSelect>
                        </div>
                    </div>
                    <div className = {`${styles.operationalRegionChild} ${styles.noBorder}`}>
                        City
                        <div className = {`${styles.operationalRegionText}`}>
                            <ShippingAddressSelect
                            shippingAddresskey = "city"
                            name = "city"
                            inputErrorClass = { styles.error }
                            notEmptyClass = { styles.notEmpty }
                            >
                                <option value="">Select</option>
                                <option>Makurdi</option>
                                <option>Ikeja</option>
                                <option>Benue</option>
                            </ShippingAddressSelect>
                        </div>
                    </div>
                    <div className = {`${styles.operationalRegionChild} ${styles.noBorder}`}>
                        Shipping Address
                        <div className = {`${styles.operationalRegionText}`}>
                            <ShippingAddressInput
                            name="shippingAddress"
                            type="text"
                            inputErrorClass = { styles.error }
                            notEmptyClass = { styles.notEmpty }
                            />
                        </div>
                    </div>
                </Form>
                </Formik>
            )} 
        </div>
    )
}

function DeliveryStrategy({
    modeOfDelivery,
    estimatedDeliveryDuration,
    operationalTime
}) {
    return (
        <div className = { styles.operationalRegionContainer }> 
            <div className = { styles.operationalRegionChild }>
                Mode Of Delivery
                <div className = { `${styles.operationalRegionText}` }>
                    { modeOfDelivery }
                    lorem ispium lo ra pen t dala
                    lorem ispium lo ra pen t dala
                </div>
            </div>
            <div className = { styles.operationalRegionChild }>
                Estimated Delivery Duration
                <div className = { `${styles.operationalRegionText}` }>
                    { estimatedDeliveryDuration }
                    lorem ispium lo ra pen t dala
                </div>
            </div>
            <div className = { styles.operationalRegionChild }>
                Operational Time
                <div className = { `${styles.operationalRegionText}` }>
                    { operationalTime }
                    lorem ispium lo ra pen t dala
                </div>
            </div>
        </div>
    )
}

function ReturnAndExchange({
    acceptReturns,
    conditionsForReturn
}) {
    return (
        <div className = { styles.operationalRegionContainer }>
            <div className = { styles.operationalRegionChild }>
                Returns and exchanges
                <div className = { `${styles.operationalRegionText} ${styles.textLarger}` }>
                    { acceptReturns ? "Accepted" : "Not Accepted" }
                </div>
            </div>
            {acceptReturns && (
                <div className = { styles.operationalRegionChild }>
                    Conditions 
                    <div className = { styles.operationalRegionText }>
                    { conditionsForReturn }
                    lorem ispium lo ra pen t dala
                        cet cat feit de nu lo ra pen t dala
                        rep sert tu la dress ra pen t dala
                        lorem ispium lo ra pen t dala
                        lorem ispium lo ra pen t dala
                    </div>
                </div>
            )} 
        </div>
    )
}

function OperationalRegion({
    state,
    city,
    costOfDelivery
}) {
    return (
        <div className = { styles.operationalRegionContainer }>
            <div className = { styles.operationalRegionChild }>
                State
                <div className = { styles.operationalRegionText }>
                    { state }
                </div>
            </div>
            <div className = { styles.operationalRegionChild }>
                City
                <div className = { styles.operationalRegionText }>
                    { city } 
                </div>
            </div>
            <div className = { styles.operationalRegionChild }>
                Cost of Delivery
                <div className = { styles.operationalRegionText }>
                    £{ costOfDelivery } 
                </div>
            </div>
        </div>
    )
}           