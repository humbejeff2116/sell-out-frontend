




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
    productPrice: 200,
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
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
];


export default function ViewProduct() {
    const [sellerProducts, setSellerProducts] = useState([]);
    useEffect(() => {
       

        return () => {}
    }, [])
    return (
        <>
        <div className="view-product-back-bttn-cntr">
            <div className="view-product-back-bttn"><button>Go back</button></div>
        </div>
        <div className="view-product-container">

            <div className="view-product-top">
                <ProductImage/>
                <ProductDetails/>
            </div>

            <div className="view-product-bottom">
               <SellerProducts sellerProducts={mockProducts}/>
            </div>

        </div>
        </>
    )
}

function ProductImage(props) {
    return (
        <div className="view-product-image-wrapper">
        {/* seller profile */}
        <div className="view-product-profile" >
            <div  className="view-product-profile-image">
                <img src={image} alt="avatar" />
                <span> User name</span>
                
            </div>
            <div className="view-product-seller-stars">
                seller stars
            </div>
        </div>
        {/* product images */}
        <div className="view-product-image-container">
            <div className="view-product-image-thumbnails">
                thumbnails
            </div>
            <div className="view-product-image">
                <img src={image2} alt="product"/>
            </div>
        </div>
        </div>
    )
}

function ProductDetails(props) {
    const [quantity, setQuantity] = useState("");
    const{ user } = useAuth();
    const { 
        cartState, 
        addProductToCart, 
        updateCartContextState,
    } = useCartContext();
    const {productSize} = props;


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
    }
    return (
        <div className="view-product-details-container">

            <div className="view-product-details-top">
            <div className="view-product-details">
                <div className="view-product-details-name-wrapper">
                    <div className="view-product-details-name">
                        <p>This Is The Name Of The Product <br />
                        <span>Product code:</span> <span>fzz1002</span>
                        </p>
                    </div>
                    
                </div>
                
                <div className="view-product-details-price">
                    <p>£300.00 (22% OFF) <span>£320.00</span></p>
                </div>

                <div className="view-product-details-usage">
                    <p>Usage: <span>Brand new</span></p>
                </div>
                <div  className="view-product-details-usage">
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
                    className="view-product-input" type="text" />
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