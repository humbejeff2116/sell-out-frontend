




import React, {useEffect, useState} from 'react';
import './viewProduct.css';
import image2 from '../../Images/product4.webp';
import image from '../../Images/avatar.jpg';
import useCartContext from '../../Context/Cart/cartContext';
import { addToCartActionPayload } from '../../Context/Cart/cartPayloads';
import useAuth from '../../Context/context';
import { DisplayedProduct } from '../Product/product';
import {  AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {
    reduceCartProductActionPayload,
    addCartProductQuantityActionPayload,
} from '../../Context/Cart/cartPayloads';
import useViewContext from '../../Context/viewContext/context';
import { Star } from '../Product/Fragments/productFragments';
import { useLocation, useHistory } from 'react-router-dom';
import BackButton from '../BackButton/backButton';

// import { getProducts } from '../../Utils/http.services';


const product = {
    userId: 2234343,
    userName: "hummbe jeffrey",
    userEmail: "humbejeff@gmail.com",
    userProfilePicture: "",
    productId: 232323,
    productName: "short nikka",
    productCategory: "furniture",
    productCountry: "Nigeria",
    productState: "Benue",
    productUsage: "never used",
    productCurrency: "naira",
    productPrice: 210,
    productContactNumber: "334039438493",
    productImages: [{}],
    stars: [],
    unstars: [],
    comments: [],
    interests: [],
}

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
    const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);
    const { viewState, setViewState } = useViewContext();
    const location = useLocation();
    useEffect(() => {
       

        return () => {
            if((location.pathname === "/home/view-product")){
               return;
            } 
            setViewState(null);  
        }
    }, [location.pathname, setViewState])

    useEffect(() => {
        let timer = null;
        let mounted = true;
        if (showAddToCartMessage && mounted) {
            timer = setTimeout(() => {
                setShowAddToCartMessage(false)
            }, 4000);
        }
        return () => {
            // setViewState(null);
            mounted = false;
            if (timer) {
                clearTimeout(timer)
            }   
        }
    }, [showAddToCartMessage, setViewState])
    const handleAddToCartMessage = (bool) => {
        setShowAddToCartMessage(bool);
    }
    return (
        <>
        {
            (showAddToCartMessage) && (
                <div className="add-to-cart-mssg">
                    <span>Product added to cart </span>
                </div>
            )
        } 
        <div className="view-product-back-bttn-cntr">
            <BackButton buttonWrapperClassName="view-product-back-bttn"/>
        </div>
        <div className="view-product-container">

            <div className="view-product-top">
                <ProductImage product={viewState} />
                <ProductDetails product={ viewState } showAddToCartMessage={handleAddToCartMessage}/>
            </div>

            <div className="view-product-bottom">
               <SellerProducts sellerProducts={mockProducts}/>
            </div>

        </div>
        </>
    )
}

function ProductImage(props) {
    const [viewedProductImage, setViewedProductImage] = useState("");
    const { product } = props;
    useEffect(()=> {
        setViewedProductImage(product.productImages[0].src);
    },[product.productImages])
    const setProductImage = (src) => {
      return setViewedProductImage(src);
    }
    return (
        <div className="view-product-image-wrapper">
        {/* seller profile */}
        <div className="view-product-profile" >
            <div  className="view-product-profile-image">
                <img src={product.userProfilePicture || image} alt="avatar" />
                <span> {product.userName}</span>
                
            </div>
            <div className="view-product-seller-stars">
                seller stars
            </div>
        </div>
        {/* product images */}
        <div className="view-product-image-container">
            <div className="view-product-image-thumbnails">
                {
                    product.productImages.length > 0 ? (
                        product.productImages.map((image, i)=>
                            <Thumbnail 
                            key={i} 
                            {...image} 
                            currentlyViewedImage ={viewedProductImage} 
                            setViewImage ={setProductImage}
                            />
                        ) 
                    ) : ""    
                }  
            </div>
            <div className="view-product-image">
                <img src={viewedProductImage || image2} alt="product"/>
            </div>
        </div>
        </div>
    )
}
function Thumbnail(props) {
    const {src, currentlyViewedImage} = props;
    const thumbnailClass = ( src === currentlyViewedImage ) ? "view-product-thumbnail focus" : "view-product-thumbnail" 
    return (
        <div className={ thumbnailClass } onClick={()=>props.setViewImage(src)}>
            <img src={src || image2} alt="product"/>
        </div>
    )
}

function ProductDetails(props) {
    const [quantity, setQuantity] = useState("");
    const [productSize, setProductSize] = useState(null);
    const{ user } = useAuth();
    const { 
        cartState, 
        addProductToCart, 
        updateCartContextState,
    } = useCartContext();
    const { 
        showAddToCartMessage, 
        product,
    } = props;
    useEffect(()=> {
        setQuantity("1");
    },[]);

    const addProductQuantity = () => {
        if (!quantity) { 
            return setQuantity("1");
        }
        setQuantity(prevState => (parseInt(prevState) + 1).toString());
    }
    const reduceProductQuantity =  () => {
        if (!quantity) { 
            return  setQuantity("1");
        }
        if (quantity <= 1) {   
            return;
        }
        setQuantity(prevState => (prevState - 1).toString());
    }
    
    const handleInputChange = (e) => {
        let value = e.target.value.split("");
        if (isNaN(e.target.value)) { 
            return;
        }
        if (e.target.value < 1) {
            return  setQuantity("");
        }
        // check and return if entered value contains a decimal
        for (let i = 0; i < value.length; i++) {
            if (value[i] === ".") {
                return;
            }
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
                
                <div className="view-product-details-price">
                    <p>{`£${product.productPrice}`} (22% OFF) <span>{`£${product.productPrice}`}</span></p>
                </div>

                <div className="view-product-details-usage">
                    <p>Usage: <span>{product.productUsag}</span></p>
                </div>
                <div className="view-product-details-usage">
                    <p>Supply Region('s): <span>Benue, Lagos, Abuja</span></p>
                </div> 
            </div>  
            </div>
           
           <div className="view-product-details-bottom">
                <div className="view-product-details-bottom-top">
                   <div className="view-product-details-bottom-quantity-header">
                       <span>Quantity</span>
                   </div>
                   <div className="view-product-details-bottom-quantity-buttons">
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
                    <div className="view-product-reduce-button">
                        <div  className="view-product-add-button-icon">
                        <button onClick={()=> addProductQuantity()}>+</button>
                       </div>
                    </div>
                   </div>
                </div>

                <div className="view-product-details-bottom-bottom">
                    <div className="view-product-details-bottom-add-to-cart">
                    <button onClick={()=> addToCart(cartState, product, parseInt(quantity), productSize, user)}>Add to cart</button>
                    </div>
                    <div className="view-product-details-bottom-heart">
                        <span>
                        <AiOutlineHeart className="view-product-heart-icon"/>
                        </span>
                    </div>
                </div> 
           </div>
            
        </div>
    )
}


function SellerProducts(props) {
   
    return (
        <div className="view-product-bottom-products-wrapper">
            <div className="view-product-bottom-products-header">
                <p>Other Products From Seller Name</p>
            </div>
            <div className="view-product-bottom-products-container">
            {
                    props.sellerProducts && props.sellerProducts.map((product,i) =>
                        <DisplayedProduct 
                        key={i}  
                        product={product} 
                        panelClassName="view-product-bottom-products-panel"
                        />
                    )
            }
            </div>
        </div>
    )
}