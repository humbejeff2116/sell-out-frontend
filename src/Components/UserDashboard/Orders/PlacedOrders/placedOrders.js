




import React, {useEffect, useState} from 'react';
import { getOrders, confirmDelivery } from '../../../../Utils/http.services';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import {ModalBox} from '../../../ModalComments/modalComments';
import socket from '../../../Socket/socket';
import image from '../../../../Images/avatar.jpg';
import {FaRegEye} from 'react-icons/fa';
import {GiConfirmed} from 'react-icons/gi';
import { GoKebabHorizontal} from 'react-icons/go';
import './placedOrders.css';


 


const mockPlacedOrders = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function PlacedOrdersContainer(props) {
    const [showConfirmOrderModal, setShowConfirmOrderModal] = useState(false);
    const [orderToConfirm, setOrderToConfirm] = useState(null);
    const [confirmingOrder, setConfirmingOrder] = useState(false);
    const [confirmOrderResponse, setConfirmOrderResponse] = useState("");
    const [confirmOrderError,setConfirmOrderError] = useState(false)
    const { user } = useAuth();
    const {placedOrders, setOrders  } = useOrder();
    let PlaceOrdersComponent;

    useEffect(() => {
        let mounted = true;
         // TODO... remove useGetUserFunctionality when ready to use functionality
         let useGetUserFunctionality = false
        const getUserOrder = async () => {
            try {
                const orders = await getOrders(user);
                setOrders(orders)
            }catch(err) {
                console.error(err.stack)
            }  
    
        }
         // TODO... remove useGetUserFunctionality when ready to use functionality
        if ((mounted && user & useGetUserFunctionality ) && !placedOrders) {
            getUserOrder(user);
        }  
        socket.on('productDataChange', function() {
            if (mounted && user) {
                getUserOrder(user);
            }         
        });

        return ()=> {
            mounted = false;
        }
    }, [user, placedOrders, setOrders]);
 
    const closeConfirmDeliveryModal = () => {
        setShowConfirmOrderModal(false);
        setOrderToConfirm(null);
        setConfirmingOrder(true)
    }

    const openConfirmDeliveryModal = (order) => {
        setOrderToConfirm(order);
        setShowConfirmOrderModal(true)

    }

    const confirmOrderDelivery = async (order, user) => {
        setConfirmingOrder(true);
        const confirmDeliveryResponse = await confirmDelivery({ order, user });
        if (confirmDeliveryResponse.error) {
            setConfirmOrderResponse(confirmDeliveryResponse.message);
            setConfirmOrderError(true);
            setConfirmingOrder(false);
            return;
        }

        setConfirmOrderResponse(confirmDeliveryResponse.message);
        setConfirmingOrder(false);
        setConfirmOrderError(false);
    }

    const cancelConfirmDelivery = () => {
        setShowConfirmOrderModal(false);
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
                (showConfirmOrderModal) && (
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
                    <label htmlFor="order-search"> Search by seller name or brand</label>
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

function PlacedOrdersWrapper({placedOrders, openConfirmDeliveryModal}) {
    return (

        <>
        {
            placedOrders.map((order, i) =>
                <PlacedOrders key={i} {...order} openConfirmDeliveryModal = { openConfirmDeliveryModal }/>
            )
        }
        </>

    )
}

function PlacedOrders(props) {
    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                <div className="placed-order-details-group">
                <p>Order date: <span>wed 04 sep 2021</span></p>
                </div>
                <div className="placed-order-details-group">
                <p>Order Id: <span>pss12845zf4</span></p>
                </div>
                <div className="placed-order-details-group">
                <p>Ordered products:</p>
                </div>
                </div>
            </div> 
            <div  className="placed-order-container">
            {
                (props.productsBoughtFromSeller && props.productsBoughtFromSeller.length > 0) && props.productsBoughtFromSeller.map((order, i) =>
                    <PlacedOrder key={i} order = {order} openConfirmDeliveryModal = {props.openConfirmDeliveryModal} />
                )
            }
            </div>
            
        </div>
    )
}

function PlacedOrder(props) {
    let deliveryStatusSpanClass = props.delivered ? "delivered" : "pending";
 
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

                    <img src={image} alt="seller" />

                    <div className="sold-products-profile-details">
                        <div>
                            <span>John Doe joels omega</span>
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
            <ViewProductDetails deliveryStatusSpanClass={deliveryStatusSpanClass} />
        </div>

            
        </div>

        <div className="placed-order-buttons-container">
            <div className="placed-order-view-order-product-button">
                <button>
                    {/* < FaRegEye className="nav-icon dashboard"/> */}
                    View order products
                </button>
            </div>
            <div className="placed-order-confirm-delivery-button">
                <button onClick = {()=> props.openConfirmDeliveryModal(props.order)}>
                    {/* <GiConfirmed className="nav-icon dashboard"/> */}
                    Confirm delivery
                </button>
            </div>
        </div>

        </div>
    )
}
function ViewProductDetails(props) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div>
            <div className="placed-order-details-group show-more">
            <p>Delivery Status: <span className={props.deliveryStatusSpanClass}>Pending</span></p>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={()=>setShowDetails(prevstate => !prevstate)}/>
                {/* View more */}
            </div>
            </div>
            {
                showDetails && (
                    <>
                    <div className="placed-order-details-group">
                    <p>Number Of Products: <span>2</span></p>
                    </div>

                    <div className="placed-order-details-group">
                    <p>Total Order Amount: <span className="diff">£30068.00</span></p>
                    </div>
                    </>
                )
            } 
        </div>
    )
}


function ConfirmDeliveryModalChild(props) {
    return (
        <div className="cart-checkout-modal-body-container">
        <div className="cart-checkout-modal-content">
            <p>
                Are you sure you want to confirm delivery?
            </p>
        </div>
        <div className="cart-checkout-modal-buttons-container">
            <div className="cart-checkout-modal-button">
                <button onClick = { props.cancelConfirmDelivery }>Cancel</button>
            </div>
            <div className="cart-checkout-modal-button">
               
                <button onClick = { ()=> props.confirmDelivery(props.order, props.user) }>
                    Confirm
                </button>
                   
            </div>
        </div>
    </div>
    )

}

function NoPlacedOrders(props) {
    return (
        <div>
            not paced orders yet
        </div>
    )
}