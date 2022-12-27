/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { MdExpandMore, MdExpandLess }  from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import PlacedOrderModal from '../PlacedOrdersModal/placedOrdersModal';
import { LoaderSmall } from '../../../Loader/loader';
import { SellerOrderProfile } from '../SharedComponents/sharedComponents';
import { getTotalOrderAmount } from '../Lib/lib';
import { UserAvatarWithKebabMenu } from '../SharedComponents/sharedComponents';
import { EmptyDashboardState } from '../../Order/Deliveries/deliveries';
import useAuth from '../../../../Context/context';
import useOrderContext from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import failureImage from '../../../../Images/failure9.jpg';
import './placedOrders.css';


export default function PlacedOrdersComponent(props) {
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersErrorMssg, setOrdersErrorMssg] = useState('');
    const { user } = useAuth();
    const { 
        placedOrders, 
        placedOrdersSet, 
        setPlacedOrders 
    } = useOrderContext();

    useEffect(() => {
        let mounted = true;
        let timer = null;
        const data  = { user };
        
        if (mounted && user && !placedOrdersSet) {
            if (!loadingOrders) {
                setLoadingOrders(true);
                socket.emit('getUserProductPlacedOrders', data);
            }
        }

        socket.on('getUserProductPlacedOrdersSuccess', (response) => {
            const { data } = response;

            if (mounted && user) { 
                setPlacedOrders(data);
                setLoadingOrders(false);
            }  
        });

        socket.on('getUserProductPlacedOrdersError', (response) => {
            const { message } = response; 

            if (mounted && user) {
                setPlacedOrders({});
                setOrdersErrorMssg(message);
                setLoadingOrders(false);
            }  
        });

        socket.on('orderDataChange', () => {
            if (mounted && user) {
                timer = setTimeout(() => {
                    socket.emit('getUserProductPlacedOrders', data);
                }, 2000)
            }                      
        });

        return ()=> {
            mounted = false;
            if (timer) clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placedOrdersSet, setPlacedOrders, user]);
   
    return (
        <div className="placed-orders-container">
        {(!placedOrders || loadingOrders) ? (
            <LoaderSmall/> 
        ) : (placedOrders?.length < 1) ? (
            <PlacedOrdersTemplate>
                    <EmptyPlacedOrders/>
            </PlacedOrdersTemplate>
        ) : (
            <PlacedOrdersTemplate>
            {placedOrders.map((order, i) =>
                <PlacedOrders 
                key = { i } 
                { ...order }
                />
            )}
            </PlacedOrdersTemplate> 
        )}
        </div>
    )
}

function PlacedOrdersTemplate({children}) {
    return (
        <>
        <div className="placed-orders-header">
            <h3>Placed orders</h3>
        </div>
        {children}
        </> 
    )
}

const PlacedOrders = ({ 
    orderTime, 
    products, 
    _id, 
}) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    const [viewedOrder, setViewedPlacedOrder] = useState({});
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [timer])

    const openPlacedOrderModal = (order) => {
        setViewedPlacedOrder(order);
        setShowModal(true);

        timer = setTimeout(() => {
            setShowModalChild(true);
        });
    }

    const closePlacedOrderModal = () => {
        setShowModalChild(false);
        
        timer = setTimeout(() => {
            setShowModal(false);
        }, 200);
    }

    const orderDate = useRef(new Date(Number(orderTime)));

    return (
        <>
        {showModal && (
            <PlacedOrderModal
            orderProducts = { viewedOrder }
            placedOrderId = { _id } 
            closeModal = { closePlacedOrderModal }
            userAvatar = { 
                <SellerAvatar { ...viewedOrder }/>
            }
            showModalChild = { showModalChild }
            />
        )}
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                    <div className="placed-order-details-group date">
                        <span>{orderDate.current.toDateString()}</span>  
                    </div>
                    <div className="placed-order-details-group">
                        Order
                    </div>
                </div>
            </div> 
            <div className="placed-order-container">
            {products.map((order, i) =>
                <PlacedOrder 
                key = { i } 
                { ...order }
                order = { order }
                placedOrderId = {  _id  }
                openModal = { openPlacedOrderModal }
                />
            )}
            </div> 
        </div>
        </>
    )
}

const PlacedOrder = ({
    products, 
    productsDelivered,
    order, 
    openModal,
    ...props 
}) => {
    const totalProductOrderAmount = useRef(getTotalOrderAmount(products));
    const deliveryStatusSpanClass = productsDelivered ? "delivered" : "pending";
    const deliveryStatus = productsDelivered ? "delivered" : "pending";

    return (
        <div>
            <div className="placed-order">
                <div className="placed-order-details-container">
                    <div className="placed-order-details-group-container">
                        <SellerOrderProfile 
                        { ...props } 
                        />
                        <ViewProductDetails 
                        productsDelivered = { productsDelivered }
                        deliveryStatusSpanClass = { deliveryStatusSpanClass }
                        deliveryStatus = { deliveryStatus }
                        totalProductOrderAmount = { totalProductOrderAmount.current } 
                        numberOfProductsOrdered = { products.length }
                        />
                    </div>
                </div>
                <div className="placed-order-buttons-container">
                    <div className="placed-order-view-order-product-button">
                        <button onClick = { ()=> openModal(order) }>
                            <RiEyeLine className="nav-icon dashboard"/>
                            View order 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { PlacedOrder }

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
                Delivery: <span className= { deliveryStatusSpanClass }>{ deliveryStatus }</span>
                <div 
                className="placed-order-show-more-icon-wrapper"
                onClick={ ()=> setShowDetails(prevstate => !prevstate) }
                >
                {showDetails ? ( 
                    <MdExpandLess className="placed-order-icon"/>
                ) : (
                    <MdExpandMore className="placed-order-icon" />
                )}
                </div>
            </div>
            {showDetails && (
                <>
                    <div className="placed-order-details-group">
                        Products: <span>{ numberOfProductsOrdered }</span>
                    </div>
                    <div className="placed-order-details-group">
                        Amount: <span className="diff">£{ totalProductOrderAmount }</span>
                    </div>
                </>
            )} 
        </div>
    )
}

function EmptyPlacedOrders(props) {
    return (
        <div>
            <EmptyDashboardState
            imageSrc={ failureImage }
            writeUp = "Looks like you've not placed an order yet"
            />
        </div>
    )
}

// headerbottom child 
export function SellerAvatar({ 
    avatarContainerClassName,
    products, 
    sellerName, 
    sellerProfilePicture,
    sellerId,
    sellerEmail,
    ...props
}) {
    return (
        <UserAvatarWithKebabMenu
        userName = { sellerName }
        avatarContainerClassName={avatarContainerClassName}
        userId={ sellerId }
        userEmail= { sellerEmail}
        //  image = { sellerProfilePicture }
        />
    )
}