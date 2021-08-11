




import React, {useEffect, useState} from 'react';
import useAuth from '../../Context/context';
import image from '../../Images/avatar.jpg';
import image2 from '../../Images/product3.webp';
import './cart.css';

const cartData = [
    {
        userProfileImage:'',
        userName: 'jeffrey humbe',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""},{src:""},{src:""}]
    },
    {
        userProfileImage:'',
        userName: 'jude afah',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""},{src:""},{src:""}]
    },
    {
        userProfileImage:'',
        userName: 'mercy josh ',
        productOrServiceName:'your product',
        productOrServiceImages:[{src:""},{src:""},{src:""}]
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
            <div className="cart-header">
            header
            </div>
            <div className="cart-products-wrapper">
            <div className="cart-products-container">
            {
                cartData.length && (
                    cartData.map((interest, i) =>
                        <CartProduct key={i} {...interest} />
                    )
                )
            }
            </div>
            <div className="cart-product-checkout">
                <CartCheckoutComp/>
            </div>
            </div>
        </div>
    )
}


function CartProduct(props) {
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
            {/* product images */}
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
                   <span>Product name:</span>
               </div>
               <div className="cart-product-info-span-group">
                   <span>Product price:</span>
               </div>
               <div className="cart-product-info-span-group">
                   <span>Product quantity:</span>
               </div>
               <div className="cart-product-info-span-group">
                   <span>Product total amount:</span>
               </div>
            </div>
            </div>
            
            {/* product add/reduce/remove buttons */}

            <div className="cart-product-buttons" >
                <div className="cart-product-button-left">
                    <div className="cart-product-add-button"><button>Add</button></div>
                    <div className="cart-product-input"><input type="text" /></div>
                    <div className="cart-product-reduce-button"><button>Reduce</button></div>
                </div>
                <div className="cart-product-button-right">
                    <div className="cart-product-remove-button"><button>Remove</button></div>
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
                <span>TOTAL PRICE: 3000</span>
                </div>

                <div  className="cart-checkout-span-group">
                <span>TOTAL ITEMS: 5</span>
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