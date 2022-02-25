
import React, { useEffect, useState } from 'react';
import { getOrders, confirmDelivery } from '../../../../Utils/http.services';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import { ModalBox } from '../../../ModalComments/modalComments';
import socket from '../../../Socket/socket';
import image from '../../../../Images/avatar.jpg';
import { GiConfirmed } from 'react-icons/gi';
import { GoKebabHorizontal } from 'react-icons/go';
import { ImWarning } from 'react-icons/im';
import './placedOrders.css';


export default function PlacedOrdersContainer(props) {

    const [showConfirmOrderDeliveryModal, setShowConfirmOrderDeliveryModal] = useState(false);

    const [orderToConfirm, setOrderToConfirm] = useState(null);

    const [confirmingOrderDelivery, setConfirmingOrderDelivery] = useState(false);

    const [confirmOrderDeliveryResponse, setConfirmOrderDeliveryResponse] = useState("");

    const [confirmOrderDeliveryError,setConfirmOrderDeliveryError] = useState(false);

    const { user } = useAuth();

    const { placedOrders, setOrders } = useOrder();

    let PlaceOrdersComponent;

    useEffect(() => {

        let mounted = true;
         // TODO... remove useGetUserFunctionality when ready to use functionality

         let useGetUserFunctionality = true;

        const getUserOrder = async () => {

            try {

                const orders = await getOrders(user);

                alert(JSON.stringify(orders, null, 2));

                setOrders(orders)

            }catch(err) {

                console.error(err.stack)

            }  
    
        }

        const data  = { user }

         // TODO... remove useGetUserFunctionality when ready to use functionality
        if ((mounted && user && useGetUserFunctionality ) && !placedOrders) {
            
            socket.emit('getUserProductOrders', data);
            
            // getUserOrder(user);
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

        socket.on('confirmDeliverySuccess', function(response) {
            

        })

        return ()=> {

            mounted = false;

        }

    }, [user, placedOrders, setOrders]);
 
    const closeConfirmDeliveryModal = () => {

        setShowConfirmOrderDeliveryModal(false);

        setOrderToConfirm(null);

        setConfirmingOrderDelivery(false);

    }

    const openConfirmDeliveryModal = (order, placedOrderId) => {

        order.placedOrderId = placedOrderId;

        setOrderToConfirm(order);

        setShowConfirmOrderDeliveryModal(true);

    }

    const confirmOrderDelivery = async (order, user) => {

        // alert(JSON.stringify(order, null, 2))
        // setConfirmingOrderDelivery(true);
        // const confirmDeliveryResponse = await confirmDelivery({ order, user });
        // if (confirmDeliveryResponse.error) {
        //     setConfirmOrderDeliveryResponse(confirmDeliveryResponse.message);
        //     setConfirmOrderDeliveryError(true);
        //     setConfirmingOrderDelivery(false); 
        //     return;
        // }

        // setConfirmOrderDeliveryResponse(confirmDeliveryResponse.message);
        // setConfirmingOrderDelivery(false);
        // setConfirmOrderDeliveryError(false);

        const confirmOrderData = { order, user }

        socket.emit('confirmDelivery', confirmOrderData)
    }

    const cancelConfirmDelivery = () => {

        setConfirmingOrderDelivery(false);

        setShowConfirmOrderDeliveryModal(false);

        setOrderToConfirm(null);

    }

    if (placedOrders && placedOrders?.length > 0) {

        PlaceOrdersComponent = (
            
            <PlacedOrdersWrapper
            placedOrders = { placedOrders }
            openConfirmDeliveryModal = { openConfirmDeliveryModal }
            />

        )

    } else {

        PlaceOrdersComponent = (

            <NoPlacedOrders />

        )

    }
   
    return (

        <div className="placed-orders-container">
            {
                (showConfirmOrderDeliveryModal) && (

                    <ModalBox 
                    handleModal={closeConfirmDeliveryModal} 
                    modalContainerWrapperName={"cart-checkout-modal-container-wrapper"}
                    modalContainer={"cart-checkout-modal-container"}
                    >
                       <ConfirmDeliveryModalChild
                       confirmDelivery = { confirmOrderDelivery }
                       cancelConfirmDelivery = { cancelConfirmDelivery }
                       order = { orderToConfirm }
                       user = { user }
                       confirmingOrderDelivery = { confirmingOrderDelivery }
                       />
                    </ModalBox>

                )

            }
            <div  className="placed-orders-header">
                <h3>Placed Orders</h3>
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
            </div>

            { PlaceOrdersComponent }
           
        </div>

    )

}

function PlacedOrdersWrapper({ placedOrders, openConfirmDeliveryModal }) {

    return (

        <>
        {

            placedOrders.map((order, i) =>

                <PlacedOrders 
                key = { i } 
                {...order} 
                openConfirmDeliveryModal = { openConfirmDeliveryModal }
                />

            )

        }
        </>

    )

}

function PlacedOrders({ orderTime, ref, productsBought,_id, openConfirmDeliveryModal }) {

    const orderDate = new Date(Number(orderTime))
    return (

        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                <div className="placed-order-details-group">
                <p>Date: <span>{ orderDate.toUTCString() }</span></p>
                </div>
                <div className="placed-order-details-group">
                <p>Ref: <span>{ ref || 'no ref yet' }</span></p>
                </div>
                <div className="placed-order-details-group">
                <p>Ordered Products:</p>
                </div>
                </div>
            </div> 
            <div  className="placed-order-container">
            {
                (productsBought && productsBought.length > 0) && productsBought.map((order, i) =>

                    <PlacedOrder 
                    key = { i } 
                    { ...order }
                    order ={ order }
                    placedOrderId = {  _id  } 
                    openConfirmDeliveryModal = { openConfirmDeliveryModal } 
                    />

                )
            }
            </div>
            
        </div>

    )
}

function PlacedOrder({
    productsUserBoughtFromSeller, 
    productsDelivered, 
    sellerName, 
    openConfirmDeliveryModal, 
    order, 
    placedOrderId
}) {

    const totalProductOrderAmount = getTotalAmount(productsUserBoughtFromSeller);

    const deliveryStatusSpanClass = productsDelivered ? "delivered" : "pending";

    const deliveryStatus = productsDelivered ? "delivered" : "pending";

    const disableConfirmButton = productsDelivered ? true : false

    function getTotalAmount(arr) {

        let totalOrderAMount = 0.00;

        for (let i = 0; i < arr.length; i++) {

            totalOrderAMount += arr[i].productPrice * arr[i].productQty
          
        }

        return totalOrderAMount;

    }
   
    let ViewProductDetailsComp = (

        <ViewProductDetails 
        productsDelivered = { productsDelivered }
        deliveryStatusSpanClass = { deliveryStatusSpanClass }
        deliveryStatus = { deliveryStatus }
        totalProductOrderAmount = { totalProductOrderAmount } 
        numberOfProductsOrdered = { productsUserBoughtFromSeller.length }
        />

    )
   
    return (

        <div className="placed-order">
        <div className="placed-order-details-container">
        <div className="placed-order-details-image-container">
            {/* image component goes here */}

        </div>
        <div className="placed-order-details-group-container">
            <div className="placed-order-details-group">
                <p>Bought products from: </p>
            </div>
            <div className="sold-products-profile-container">
                <div className="sold-products-profile-image-wrapper">
                    
                    <div className="sold-products-profile-details-wrapper">

                    <img src={ image } alt="seller" />

                    <div className="sold-products-profile-details">
                        <div>
                            <span>{ sellerName }</span>
                        </div>
                       
                    </div>

                    <div className="sold-products-profile-image-kebab-icon">
                        <GoKebabHorizontal className="nav-icon"/>
                    </div>
                    </div>
                    
                </div>
               
            </div>
            { ViewProductDetailsComp }
        </div>
   
        </div>

        <div className="placed-order-buttons-container">
            <div className="placed-order-view-order-product-button">
                <button>
                    {/* < FaRegEye className="nav-icon dashboard"/> */}
                    View order 
                </button>
            </div>
            <div className = { `placed-order-confirm-delivery-button ${ deliveryStatus }` }>
                <button 
                onClick = { ()=> openConfirmDeliveryModal(order, placedOrderId) } 
                disabled = { disableConfirmButton } 
                >
                    
                { 
                    disableConfirmButton ?

                    <><GiConfirmed className="nav-icon dashboard" /> <span> Delivered</span></> : 

                    "Confirm delivery" 
                }

                </button>
            </div>
        </div>

        </div>

    )

}

function ViewProductDetails({
    deliveryStatusSpanClass, 
    deliveryStatus, 
    numberOfProductsOrdered, 
    totalProductOrderAmount
}) {

    const [showDetails, setShowDetails] = useState(false);

    return (

        <div>
            <div className="placed-order-details-group show-more">
            <p>Delivery Status: <span className= { deliveryStatusSpanClass }>{ deliveryStatus }</span></p>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={ ()=>setShowDetails(prevstate => !prevstate) }/>
                {/* View more */}
            </div>
            </div>
            {
                showDetails && (
                    <>
                    <div className="placed-order-details-group">
                    <p>Number Of Products: <span>{ numberOfProductsOrdered }</span></p>
                    </div>

                    <div className="placed-order-details-group">
                    <p>Total Order Amount: <span className="diff">£{ totalProductOrderAmount }</span></p>
                    </div>
                    </>
                )
            } 
        </div>

    )

}


function ConfirmDeliveryModalChild({
    cancelConfirmDelivery, 
    confirmDelivery, 
    order, 
    user, 
    confirmingOrderDelivery, 
    confirmingOrderDeliveryError 
}) {

    return (

        <div className="cart-checkout-modal-body-container">
        <div className="cart-checkout-modal-content">
            <p>
                Are you sure you want to confirm delivery?
            </p>
        </div>
        <div className="cart-checkout-modal-buttons-container">
            <div className="cart-checkout-modal-button">
                <button onClick = { cancelConfirmDelivery }>Cancel</button>
            </div>
            <div className="cart-checkout-modal-button">
               
                <button onClick = { ()=> confirmDelivery(order, user) } >
                    {
                        confirmingOrderDelivery ? <span>Confirming Delivery...</span> : 
                        confirmingOrderDeliveryError ? <><ImWarning/> <span>Confirm</span></> :
                        <span>Confirm</span>
                    }
                </button>
                   
            </div>
        </div>
    </div>

    )

}

function NoPlacedOrders(props) {

    return (

        <div >
            not placed orders yet
        </div>

    )

}