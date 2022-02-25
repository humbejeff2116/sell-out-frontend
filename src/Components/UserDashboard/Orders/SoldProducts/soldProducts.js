
import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../../Utils/http.services';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import image from '../../../../Images/avatar.jpg';
import { GoKebabHorizontal } from 'react-icons/go';
import './soldProducts.css';
import '../PlacedOrders/placedOrders.css';


export default function SoldProducts() {

    const { user } = useAuth();

    const { soldProducts, setOrders } = useOrder();

    let SoldProductsComponent;

    useEffect(() => {

        let mounted = true;

         // TODO... remove useGetUserFunctionality when ready to use functionality
         let useGetUserFunctionality = true

        const getUserOrder = async () => {

            try {

                const orders = await getOrders(user);

                setOrders(orders)

            }catch(err) {

                console.error(err.stack)

            }  
    
        }

         const data  = { user }

         // TODO... remove useGetUserFunctionality when ready to use functionality
        if ((mounted && user && useGetUserFunctionality ) && !soldProducts ) {
           
            // getUserOrder(user);
            socket.emit('getUserProductOrders', data);

        }  

        socket.on('getUserProductOrdersSuccess', function(response) {

            if (mounted && user) {

                setOrders(response.data)

            }  

        });

        socket.on('orderDataChange', function() {

            if (mounted && user) {

                // getUserOrder(user);
                socket.emit('getUserProductOrders', data);

            }   

        });

        return ()=> {

            mounted = false;

        }

    }, [user, soldProducts, setOrders]);

    if (soldProducts && soldProducts?.length > 0) {

        SoldProductsComponent = (
            
            <SoldProductsCompWrapper
            soldProducts = { soldProducts }
            />

        )

    } else {

        SoldProductsComponent = (

            <NoSoldProducts/>

        )

    }

    return (

        <div className="placed-orders-container">
            <div  className="placed-orders-header">
                <h3>Sold Products</h3>
            </div>
            <div className="placed-orders-search-container">
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search"> Search by user name or brand</label>
                        <input type="text" />
                    </form>
                </div>
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search"> Search by date</label>
                        <input type="text" />
                    </form>
                </div>
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search"> Filter by delivery status</label>
                        <select>
                        <option>Default</option>
                            <option>Pending</option>
                            <option>Delivered</option>
                        </select>
                    </form>
                </div>
            </div>

            { SoldProductsComponent }

        </div>

    )

}

function SoldProductsCompWrapper({ soldProducts }) {

    return (

        <>
        {

            soldProducts.map((order, i) =>

                <SoldProductsComp 
                key = { i } 
                {...order} 
                />

            )
            
        }
        </>

    )

}

export function SoldProductsComp({delivered, ...props}) {

    const deliveryStatusSpanClass = delivered ? "delivered" : "pending";

    const deliveryStatus = delivered ? "delivered" : "pending";

    let ViewOrderDetailsComp = (

        <ViewOrderDetails 
        deliveryStatusSpanClass = { deliveryStatusSpanClass }
        deliveryStatus = { deliveryStatus } 
        {...props} 
        />

    )

    let OrderProfileComp = (

        <OrderProfile { ...props }  />

    )

    return (

        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                   { OrderProfileComp }
                   { ViewOrderDetailsComp }
                </div>
            </div> 
            <div  className="placed-order-container">
            {

                props.productsSold.length > 0 && props.productsSold.map((order, i) =>

                    <SoldProduct key = { i } { ...order } />

                )

            }
            </div>  
        </div>

    )

}


function SoldProduct(props) {

    let ViewProductDetailsComp = (

        <ViewProductDetails { ...props } />

    )

    return (

        <div className="placed-order">
         <div className="placed-order-details-container">
             <div className="placed-order-details-image-container">
                 {/* image component goes here */}

             </div>
             <div className="placed-order-details-group-container">
               { ViewProductDetailsComp }
             </div>
        </div>

        <div className="placed-order-buttons-container">
            <div className="sold-product-button-wrapper">
                <div className="sold-product-view-product-button">
                    <button>
                        {/* <FaRegEye className="nav-icon dashboard"/> */}
                        View  product
                    </button>
                </div>
            </div>

        </div>

        </div>

    )

}


export function OrderProfile(props) {

    const { user } = useAuth();

    if (user?.fullName === props.buyerUserName) {

        return (

            <SellerOrderProfile { ...props } />

        )

    }

    return (

        // TODO... component recieves shipping address as props from user object
        <BuyerOrderProfile  { ...props } />

    )

}

export function SellerOrderProfile({ 
    usedInDeliveryPage,
    usedInPaymentsPage,
    sellerUserName
}) {

    return (

        <>
        <div className="placed-order-details-group header">

            {
                usedInDeliveryPage ? <p>Recieved delivery from:</p> : 
                usedInPaymentsPage ? <p>Made payment to:</p> :
                <p>Bought products from: </p>
            }
            
        </div>
        <div className="sold-products-profile-container">
                <div className="sold-products-profile-image-wrapper">
                    
                    <div className="sold-products-profile-details-wrapper">

                    <img src={ image } alt="seller" />

                    <div className="sold-products-profile-details">
                        <div>
                            <span>{ sellerUserName }</span>
                        </div>
                       
                    </div>

                    <div className="sold-products-profile-image-kebab-icon">
                        <GoKebabHorizontal className="nav-icon"/>
                    </div>
                    </div>
                    
                   
                </div>
               
            </div>
        </>

    )
}

export function BuyerOrderProfile({
    usedInDeliveryPage,
    usedInPaymentsPage,
    buyerUserName
}) {

    // const { buyerName, buyerProfileImage, buyerContact, shippingAddress } = props;
    return (
        <>
        <div className="placed-order-details-group header">
        {
            usedInDeliveryPage ? <p>Delivered products to:</p> : 
            usedInPaymentsPage ? <p>Recieved payment from:</p> :
            <p>Made sales to: </p>
        }
        </div>
        <div className="sold-products-profile-container">
                <div className="sold-products-profile-image-wrapper">
                    
                    <div className="sold-products-profile-details-wrapper">

                    <img src={ image } alt="seller" />

                    <div className="sold-products-profile-details">
                        <div>
                            <span>{ buyerUserName }</span>
                        </div>
                       
                    </div>

                    <div className="sold-products-profile-image-kebab-icon">
                        <GoKebabHorizontal className="nav-icon"/>
                    </div>
                    </div>
                    
                    {/* <div  className="sold-products-profile-button">
                        <button>view seller profile</button>
                    </div> */}
                </div>
               
            </div>
        </>

    )
}

function ViewOrderDetails({
    orderTime,
    productsSold,
    ref,
    deliveryStatusSpanClass,
    deliveryStatus
}) {

    const [showDetails, setShowDetails] = useState(false);

    const orderDate = new Date(Number(orderTime));

    const totalProductOrderAmount = getTotalAmount(productsSold);

    function getTotalAmount(arr) {

        let totalOrderAMount = 0.00;

        for (let i = 0; i < arr.length; i++) {

            totalOrderAMount += arr[i].productPrice * arr[i].productQty
          
        }

        return totalOrderAMount;

    }

    return (

        <div>
            <div className="placed-order-details-group show-more">
            <div className="placed-order-details-group">
                <p>Date: <span>{ orderDate.toUTCString() }</span></p>
            </div>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={ ()=> setShowDetails(prevstate => !prevstate) }/>
                {/* View more */}
            </div>
            </div>

            {

                showDetails && (

                    <>
                    <div className="placed-order-details-group">
                        <p>Ref: <span>{ ref || 'no ref yet' }</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Delivery status: <span className = { deliveryStatusSpanClass }>{ deliveryStatus }</span></p>
                    </div>
                    <div className="placed-order-details-group">
                    <p>Total Order Amount: <span className="diff">£{ totalProductOrderAmount }</span></p>
                    </div>
                    
                    <div className="placed-order-details-group">
                        <p>Order products:</p>
                    </div>
                    </>

                )

            }

        </div>

    )

}

function ViewProductDetails({
    productName,
    productId,
    productPrice,
    productQty
}) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        
        <div>
            <div className="placed-order-details-group show-more">
            <div className="placed-order-details-group">
                <p>Product Name: <span>{ productName }</span></p>
            </div>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={ ()=> setShowDetails(prevstate => !prevstate) }/>
                {/* View more */}
            </div>
            </div>

            {

                showDetails && (

                    <>
                    <div className="placed-order-details-group">
                        <p>Product id: <span>{ productId }</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Price: <span>£{ productPrice }</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Order quantity: <span>{ productQty }</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Total sub amount: <span className="diff">£{ productPrice * productQty }</span></p>
                    </div>
                    </>

                )

            }

           
        </div>

    )

}


function NoSoldProducts(props) {
    return (
        <div>
            no sold products
        </div>
    )

}