




import React, {useEffect, useState} from 'react';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';
import image2 from '../../Images/product3.webp';
import './cart.css';
import useCartContext from '../../Context/Cart/cartContext';
import { reduceCartProductActionPayload,
        addCartProductQuantityActionPayload,
        removeFromCartActionPayload,
} from '../../Context/Cart/cartPayloads';

const cartData = [
    {
        userProfileImage:'',
        userName: 'jeffrey humbe',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""}]
    },
    {
        userProfileImage:'',
        userName: 'jude afah',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""}]
    },
    {
        userProfileImage:'',
        userName: 'mercy josh ',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""}]
    },
];


export default function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        let mounted = true;
        if (user && mounted) {
        }
        
        return () => {
            mounted = false;
        }
    }, [user])

  
    return (
        <div className="cart-container">
            
            <div className="cart-products-wrapper">
            <div className="cart-products-container">
                <div className="cart-header">
                {/* <h2>Cart</h2> */}
                <p>Cart</p>
                </div>
                <div className="cart-products-panel">
                {
                    cartData.length && (
                        cartData.map((interest, i) =>
                            <CartProduct key={i} {...interest} />
                        )
                    )
                }
                </div>
                <div className="cart-products-total-container">
                    <div className="cart-products-total-panel">
                    <div className="cart-products-total-amount">
                    <span className="cart-products-total-amount-span-bold">Total amount: </span> <span> £32323.00</span>
                </div>
                <div className="cart-products-total-checkout">
                    <button>Checkout</button>
                </div>
                    </div>
                </div>
            </div>
            <div className="cart-product-checkout">
                <CartCheckoutComp/>
            </div>
            </div>
        </div>
    )
}


function CartProduct(props) {
    const {
        cartState,
        addCartProductQuantity, 
        reduceCartProductQuantity, 
        removeProductFromCart,
        updateCartContextState,
    } = useCartContext();
    return (
        
            <div className="cart-product-panel">
                {/* product profile image */}
            <div className="cart-product-profile" >
                <div  className="cart-product-profile-image">
                    <img src={props.userProfileImage || image} alt="avatar" />
                </div>

                <div className="cart-product-profile-info">
                    <div> <span>{props.userName || 'unknown'}</span></div>
                </div>
            </div>
            {/* product image */}
            <div className="cart-product-images-panel">
                <div className="cart-product-images">
                {
                    props.productOrServiceImages.map((image, i) =>
                        <div key={i} className="cart-product-image-group">
                        <img src={image.src || image2} alt="product" />
                        </div>
                    )
                }
                </div>
                {/* product information */}

            <div className="cart-product-info" >
               <div className="cart-product-info-span-group">
                <p>This is the product name</p>
               </div>
               <div className="cart-product-info-span-group">
               <p>Price: <span>£300.00 (22% OFF)</span> <span className="original-price">£320.00</span></p>
               </div>
               <div className="cart-product-info-span-group">
               <p>Quantity: <span>5</span></p>
               </div>
               <div className="cart-product-info-span-group">
               <p>Sub total: <span>£320.00</span></p>
               </div>

               {/* product add/reduce/remove buttons */}

            <div className="cart-product-buttons" >
                <div className="cart-product-buttons-header">
                    <span>Quantity</span>
                </div>
                <div className="cart-product-button-top">
                    <div className="cart-product-add-button">
                    <div className="cart-product-add-button-icon">
                       {/* <i>-</i> */}
                       <button>-</button>
                    </div>
                    </div>
                    <input className="cart-product-input" type="text" />
                    <div className="cart-product-reduce-button">
                    <div className="cart-product-add-button-icon">
                    <button>+</button>
                    </div>
                    </div>
                </div>
                <div className="cart-product-button-bottom">
                    <div className="cart-product-remove-button">
                        {/* <span>Remove</span> */}
                        <button>Remove</button>
                    </div>
                </div>
            </div>

            </div>
            
            </div>
            
            
            </div>     
    )
}

function CartCheckoutComp(props) {
    return (
        <div className="cart-checkout-panel">
            <div className="cart-checkout-info">

                <div className="cart-checkout-span-group">
                <span className="cart-checkout-span-left">Total Price: <span className="cart-checkout-span-right">£3000.00</span></span>
                </div>

                <div  className="cart-checkout-span-group">
                <span className="cart-checkout-span-left">Total Items: <span className="cart-checkout-span-right">5</span></span>
                </div>

                <div className="cart-checkout-button-wrapper">
                    <div className="cart-checkout-button">
                        <button>Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}