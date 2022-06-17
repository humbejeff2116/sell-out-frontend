import React, { useEffect, useState, useRef } from 'react';
import { DisplayedProduct } from '../Product/product';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline, IoMdCheckmark } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { GoSettings } from 'react-icons/go';
import { 
    MdExpandMore, 
    MdExpandLess, 
    MdArrowForwardIos, 
    MdArrowBackIosNew 
}  from 'react-icons/md';
import { Star, Heart } from '../Product/Fragments/productFragments';
import BackButton from '../BackButton/backButton';
import { Price } from '../Product/product';
import { addToCartActionPayload } from '../../Context/Cart/cartPayloads';
import useViewContext from '../../Context/viewContext/context';
import useAuth from '../../Context/context';
import useCartContext from '../../Context/Cart/cartContext';
import { getSellerProducts } from '../../Utils/http.services';
import image2 from '../../Images/product4.webp';
import profileAvatar from '../../Images/avatar4.png';
import styles from './ViewProduct.module.css';
import './viewProduct.css';


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


export default function ViewProduct() {
    const [sellerProducts, setSellerProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [noSellerProductsFound, setNoSellerProdcutsFound] = useState(false);
    const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
    const { viewState, setViewState } = useViewContext();
    let BottomProducts;

    useEffect(() => {
        const getBottomProducts = async (queryData) => {
            try {
                const { 
                    sellerProductsFound, 
                    sellerProducts, 
                    similarProducts
                } = await getSellerProducts(queryData);

                if (!sellerProductsFound) {
                   setNoSellerProdcutsFound(true);
                   return setSimilarProducts(similarProducts);
                }
                setNoSellerProdcutsFound(false);
                return setSellerProducts(sellerProducts);
            } catch(err) {
                console.error(err)
            } 
        }
        
        if (viewState) {
            const {userId, userEmail, productCategory } = viewState
            const queryData = {
                userId,
                userEmail,
                productCategory,
            }

            return getBottomProducts(queryData);
        }
    }, [viewState]);

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

    if (noSellerProductsFound) {
        BottomProducts = (
            <SimilarProducts
            similarProducts = { similarProducts }
            />
        )
    } else {
        BottomProducts = (
            <SellerProducts 
            sellerProducts = { mockProducts || sellerProducts }
            />
        )
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
        <div className="view-product-back-bttn-cntr">
            <BackButton 
            buttonWrapperClassName="view-product-back-bttn" 
            clearSessionStorageWithKey = "view-product-location"
            buttonIconClassName = "view-product-back-bttn-icon"
            />
        </div>
        <div className="view-product-container">

            <div className="view-product-top">
                <ProductImage { ...viewState } />
                <ProductDetails 
                product = { viewState } 
                showAddToCartMessage = { handleAddToCartMessage }
                />
            </div>

            <div className={ styles.viewProductCenter }>
                <Reviews />
                <AllProductDetails/>
            </div>

            <div className="view-product-bottom">
              { BottomProducts }
            </div>
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
                { 
                    children ? children : (
                        <div className="pop-up-success-child">
                            <IoMdCheckmarkCircleOutline className="pop-up-icon"/>
                            <div className="pop-up-text-container">
                                {/* <div className="pop-up-text-header">Success</div> */}
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
    // alert(JSON.stringify(props))
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

function ImageSLider({ images, ...props }) {
    const [sliderImages, setSliderImages] = useState([]);
    const [viewedImage, setViewedImage] = useState("");
    const [loading, setloading] = useState(false);
    const sliderImagesLength = useRef(images.length);
    const currentViewedImageIndex = useRef(0);

    useEffect(()=> {
        if (images.length > 0) {
            setViewedImage(images[0].src);
            setSliderImages(images);
        }   
    }, [images])

    const setProductImage = (src) => {
        return setViewedImage(src);
    }

    const nextImage = () => {
        if (currentViewedImageIndex.current + 1 === sliderImagesLength) return;
        setViewedImage(sliderImages[++currentViewedImageIndex.current].src);
    }

    const prevImage = () => {
        if (currentViewedImageIndex.current === 0) return;
        setViewedImage(sliderImages[--currentViewedImageIndex.current].src);
    }

    return (
        <div className={ styles.imageSLiderContainer }>
            <div className={ styles.imageSLiderThumbnailsContainer }>
            {
                sliderImages.length > 0 && (
                    sliderImages.map((image, i)=>
                        <ImageSliderThumbnail 
                        key={ i } 
                        { ...image } 
                        currentlyViewedImage = { viewedImage } 
                        setViewImage = { setProductImage }
                        />
                    ) 
                )
            }
            </div>
            <div className={ styles.imageSLiderPanel }>
                <div className={ styles.imageSLiderImage }>
                    <img src = { viewedImage || image2 } alt="product"/>
                </div>
                <div className={ styles.imageSLiderPrevButton } onClick = { prevImage }>
                    <MdArrowBackIosNew className={ styles.imageSLiderButtonIcon }/>
                </div>
                <div className={ styles.imageSLiderNextButton } onClick = { nextImage }>
                    <MdArrowForwardIos className={ styles.imageSLiderButtonIcon }/>
                </div>
            </div>
        </div>
    )
}

function ImageSliderThumbnail({src, currentlyViewedImage, setViewImage}) {
    const thumbnailClassName = ( src === currentlyViewedImage ) ? (
        `${styles.imageSliderThumbnail} ${styles.focus}`
    ) : (
        `${styles.imageSLiderThumbnail}`
    )

    return (
        <div className={ thumbnailClassName } onClick={ ()=> setViewImage(src) }>
            <img src={src || image2} alt={ src }/>
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

    return (
        <div className="view-product-details-container">
            <div className="view-product-details-top">
            <div className="view-product-details">
                <div className="view-product-details-name-wrapper">
                    <div className="view-product-details-name">
                        <p>{product.productName} <br />
                        <span>Product code:</span> <span>{product.productId}</span>
                        </p>
                    </div> 
                </div>  
                <Price {...product} className = "view-product-details-price" />
                <div className="view-product-details-usage">
                    <p>Usage: <span>{product.productUsage}</span></p>
                </div>
                <div className="view-product-details-usage">
                    <p>Supply Region('s): <span>Benue, Lagos, Abuja</span></p>
                </div> 
            </div>  
            </div> 
           <div className="view-product-details-bottom">
                <div className="view-product-details-bottom-top">
                   <div className="view-product-details-bottom-quantity-header">
                       {/* <span>Quantity</span> */}
                   </div>
                   <div className="view-product-quantity-buttons-container">
                    <div className="view-product-add-button">
                            <div className="view-product-add-button-icon">
                                <button onClick={()=> reduceProductQuantity()}>-</button>
                            </div>
                        </div>
                        <input 
                        value={quantity} 
                        onChange={handleInputChange}
                        className="view-product-input" type="text" 
                        />
                        <div className="view-product-add-button">
                            <div className="view-product-add-button-icon">
                                <button onClick={()=> addProductQuantity()}>+</button>
                            </div>
                        </div>
                   </div>
                </div>
                <div className="view-product-details-bottom-bottom">
                    <div className="view-product-details-bottom-add-to-cart">
                    <button onClick={()=> addToCart(cartState, product, parseInt(quantity), productSize, user)}>Add to cart</button>
                    </div>  
                </div> 
           </div>   
        </div>
    )

}

// {/* <div className="view-product-details-bottom-heart">
//                         <span>
//                         <AiOutlineHeart className="view-product-heart-icon"/>
//                         </span>
//                     </div> */}


function SellerProducts({ sellerProducts }) {
    const{ user } = useAuth();
    const brandName = user.brandName ? user.brandName : user.fullName;
   
    return (
        <div className="view-product-bottom-products-wrapper">
            <div className="view-product-bottom-products-header">
                <p>Other Products From { brandName }</p>
            </div>
            <div className="view-product-bottom-products-container">
            {
                sellerProducts && sellerProducts.map((product,i) =>
                    <DisplayedProduct 
                    key = { i }  
                    product = { product } 
                    panelClassName="view-product-bottom-products-panel"
                    />
                )
            }
            </div>
        </div>
    )
}

function SimilarProducts({similarProducts}) {
    return (
        // TODO... build Similar products component
        <div>
            similar products here
        </div>
    )
}

function Reviews(props) {
    return (
        <div className={ styles.productReviewsContainer }>
           <div className={ styles.productReviewsHeader }>
            <div className={ styles.productReviewsHeaderText }>
                200 shop reviews
            </div>

            <div className={ styles.productReviewsHeaderSortContainer }>
                
                <Sort/>
            </div>
            
           </div>

            <div className={ styles.productReviews }>
                {/* {
                props.reviews.map((review, i) => 
                    <Review key={ i } { ...review } />
                )
            } */}

            <Review />
           </div>
        </div>
    )
}


function Sort(props) {
    const [showMore, setShowMore] = useState(false);
    const viewMoreDetails = () => {
        setShowMore(prevState => !prevState)
    }
    const showMoreIcon = showMore ? ( 
        <TiArrowSortedUp className={ styles.showMoreIcon }/>
    ) : (
        <TiArrowSortedDown className={ styles.showMoreIcon } />
    )

    const sortContainerClassName = showMore ? (
        `${styles.reviewsSortContainer} ${styles.reviewsSortContainerOpen}`
    ) : (
        `${styles.reviewsSortContainer}` 
    )

    const sortheaderClassName = showMore ? (
        `${styles.reviewsSortHeader} ${styles.reviewsSortHeaderOpen}`
    ) : (
        `${styles.reviewsSortHeader}` 
    )

    const reviewSortBodyClassName = showMore ? (
        `${styles.reviewsSortBody} ${styles.reviewsSortBodyOpen}`
    ) : (
        `${styles.reviewsSortBody}` 
    )
    return (
        <div className={ sortContainerClassName }>
            <div className={ styles.reviewsSortWrapper }>
                <div className={ sortheaderClassName } onClick ={ viewMoreDetails }>
                    <div className={ styles.sortIconWrapper }>
                        <GoSettings/>
                        <span>Recomended</span>
                        {showMoreIcon}
                    </div>
                    
                </div>
                
                <div className={ styles.reviewsSortBodyContainer }>
                    <div className={ reviewSortBodyClassName }>
                        <div>Recomended <IoMdCheckmark/></div>
                        <div>Newest <IoMdCheckmark/></div>
                        <div>Oldest <IoMdCheckmark/></div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

function Review(props) {
    return (
        <div className ={styles.reviewContainer}>

            <div className ={styles.reviewAvatarContainer}>
               <ReviewAvatar/>
            </div>

            <div className ={ styles.reviewContentContainer }>
                <div className ={ styles.reviewContent }>
                    <div className ={ `${styles.reviewContentChild} ${styles.userNameWrapper}` }>
                        <div className={ styles.reviewContentUserName }>Humbe Jeffrey</div>
                        <div>9, March 2022</div>
                    </div>

                    <div className ={ styles.reviewContentChild }>
                        review stars
                    </div>

                    <div className ={ `${styles.reviewContentChild} ${styles.reviewText}` }>
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                        this is description of the product which is beign sold
                    </div>      
                </div>

                <ReviewReply/>
                <ReviewItem/>
                <div className ={ styles.reviewHelpfulContainer }>
                    Was this review helpful?
                    <div className ={ styles.reviewHelpfulButtons }>
                        <button>Yes</button>
                        <button>No</button>
                    </div>
                    {/* <MdThumbUpAlt className ={ styles.reviewHelpfulIcon }/> */}
                </div>
                
            </div>

        </div>
    )
}

function ReviewAvatar(props) {
    return (
        <div  className={ styles.reviewAvatarWrapper }>
            <img src={ profileAvatar } alt="avatar" />    
        </div>
    )
}

function ReviewItem(props) {
    return (
        <div className ={ styles.reviewItemContainer }>                  
            <div className ={ styles.reviewItemHeader }> 
                Purchased Item:
            </div>
            <div className ={ styles.reviewItem }> 
                <div className ={ styles.reviewItemImageWrapper }>
                    <img src={ profileAvatar } alt="avatar" />
                </div> 
                <span>product name</span> 
            </div>
        </div>
    )
}

function ReviewReply(props) {
    return (
        <div className ={styles.reviewReply}>
            <div className ={styles.reviewReplyAvatarContainer}>
                <ReviewAvatar/>
                <span className={ styles.replyUserName }>Reply from { props.useName || "user" }</span>
            </div>

            <div className ={styles.reviewReplyText}>
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
                this is description of the product which is beign sold
            </div> 
        </div>
    )
}

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