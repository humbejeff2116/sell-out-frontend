
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess }  from 'react-icons/md';
import { GoKebabHorizontal } from 'react-icons/go';
import { Price } from '../../../Product/product';
import { getTotalOrderAmount, getOrderSubAmount } from '../Lib/lib';
import useAuth from '../../../../Context/context';
import image from '../../../../Images/avatar.jpg';
import './soldProducts.css';
import '../PlacedOrders/placedOrders.css';


//TODO... use below  code in deliveries
export function OrderDeliveries({ 
    orders, 
    useBuyerProfile, 
    ...props 
}) {
    return (
        <>
            {
                orders.map((order, i) =>
                    <Order 
                    key = { i } 
                    { ...order }
                    useBuyerProfile = { useBuyerProfile }
                    />
                )   
            }
        </>
    )
}

export function Order({ delivered, useBuyerProfile, ...props }) {
    const deliveryStatusSpanClass = delivered ? "delivered" : "pending";
    const deliveryStatus = delivered ? "delivered" : "pending";

    const orderDetails = (
        <OrderDetails 
        deliveryStatusSpanClass = { deliveryStatusSpanClass }
        deliveryStatus = { deliveryStatus } 
        {...props} 
        />
    )

    const orderProductsDetails = (
        <>
            {
                props.productsSold.length > 0 && props.productsSold.map((order, i) =>
                    <OrderProductDetails 
                    key = { i } 
                    { ...order }
                    order = { order }
                    />
                )
            }
        </>
    )

    const orderProfile = (
        <OrderDeliveryProfile
        orderDelivered = { delivered }
        useBuyerProfile = { useBuyerProfile }
        { ...props }
        />
    )

    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                   { orderProfile }
                   { orderDetails }
                </div>
            </div> 
            <div  className="placed-order-container">
            { orderProductsDetails }
            </div>  
        </div>
    )

}

function OrderDetails({
    orderTime,
    productsSold,
    ref,
    deliveryStatusSpanClass,
    deliveryStatus,
}) {
    const [showDetails, setShowDetails] = useState(false);
    const orderDate = new Date(Number(orderTime));
    const totalProductOrderAmount = getTotalOrderAmount(productsSold);
    const showMoreIcon = showDetails ? ( 
        <MdExpandLess className="placed-order-icon"/>
    ) : (
        <MdExpandMore className="placed-order-icon" />
    )

    return (
        <div>
            <div className="placed-order-details-group show-more">
            <div className="placed-order-details-group">
                <p>Delivery status: <span className = { deliveryStatusSpanClass }>{ deliveryStatus }</span></p>
            </div>
            <div 
            className="sold-products-profile-image-kebab-icon"
            onClick={ ()=> setShowDetails(prevstate => !prevstate) }
            >
               { showMoreIcon }
            </div>
            </div>
            {
                showDetails && (
                    <>
                        <div className="placed-order-details-group">
                            <p>Date: <span>{ orderDate.toUTCString() }</span></p>
                        </div>
                        <div className="placed-order-details-group">
                            <p>Ref: <span>{ ref || 'no ref yet' }</span></p>
                        </div>
                        <div className="placed-order-details-group">
                            <p>Number Of Products: <span>{ productsSold.length }</span></p>
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

// TODO... use price with percentageoff component
function OrderProductDetails({
    productName,
    productId,
    productPrice,
    percentageOff,
    productQty,
    order,
    ...props
}) {
    const [showDetails, setShowDetails] = useState(false);
    const orderSubAmount = getOrderSubAmount(order)
    const showMoreIcon = showDetails ? ( 
        <MdExpandLess className="placed-order-icon"/>
    ) : (
        <MdExpandMore className="placed-order-icon" />
    )

    return (
        <div className="placed-order">
            <div className="placed-order-details-container">
                <div className="placed-order-details-group-container">
                    <div className="placed-order-details-group show-more">
                        <div className="placed-order-details-group">
                            <p>Product Name: <span>{ productName }</span></p>
                        </div>
                        <div 
                        className="sold-products-profile-image-kebab-icon"
                        onClick={ ()=> setShowDetails(prevstate => !prevstate) }
                        >
                            { showMoreIcon }
                        </div>
                    </div>
                    {
                        showDetails && (
                            <>
                                <Price { ...order } className="placed-order-details-group" showPriceTag = { true } />
                                <div className="placed-order-details-group">
                                    <p>Order quantity: <span>{ productQty }</span></p>
                                </div>
                                <div className="placed-order-details-group">
                                    <p>Total sub amount: <span className="diff">£{ orderSubAmount }</span></p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export function OrderProfile({ buyerUserName, ...props }) {
    const { user } = useAuth();

    if (user?.fullName === buyerUserName) {
        return (
            <SellerOrderProfile { ...props } />
        )
    }

    return (
        // TODO... component recieves shipping address as props
        <BuyerOrderProfile  { ...props } />
    )
}

export function OrderDeliveryProfile({ orderDelivered, useBuyerProfile, ...props }) {
    if (useBuyerProfile) {
        return (
            <BuyerOrderProfile 
            orderDelivered ={ orderDelivered }
            usedInSellerDeliveries 
            { ...props } 
            />      
        )
    }

    return (
        <SellerOrderProfile 
        orderDelivered ={ orderDelivered } 
        usedInBuyerDeliveries 
        { ...props } 
        />
    )
}

export function SellerOrderProfile({ 
    usedInDeliveryPage,
    usedInPaymentsPage,
    usedInBuyerDeliveries,
    orderDelivered,
    sellerUserName
}) {
    return (
        <>
            <div className="placed-order-details-group header">
            {
                usedInDeliveryPage ? <p>Recieved delivery from:</p> : 
                usedInPaymentsPage ? <p>Made payment to:</p> :
                (usedInBuyerDeliveries && orderDelivered) ? <p>Recieved order delivery from:</p> :
                (usedInBuyerDeliveries && !orderDelivered) ? <p>Yet to recieve order delivery from:</p> :
                <p>Bought products from: </p>
            }
            </div>
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
        </>
    )
}

export function BuyerOrderProfile({
    usedInDeliveryPage,
    usedInPaymentsPage,
    usedInSellerDeliveries,
    orderDelivered,
    buyerUserName
}) {

    // const { buyerName, buyerProfileImage, buyerContact, shippingAddress } = props;
    return (
        <>
            <div className="placed-order-details-group header">
            {
                usedInDeliveryPage ? <p>Delivered products to:</p> : 
                usedInPaymentsPage ? <p>Recieved payment from:</p> :
                (usedInSellerDeliveries && orderDelivered) ? <p>Delivered order to:</p> :
                (usedInSellerDeliveries && !orderDelivered) ? <p>Yet to delivere order to:</p> :
                <p>Made sales to: </p>
            }
            </div>
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
            </div>  
        </>
    )
}