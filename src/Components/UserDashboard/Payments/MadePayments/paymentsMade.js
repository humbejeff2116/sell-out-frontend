
import React, { useState, useEffect } from 'react';
import { MdExpandMore, MdExpandLess }  from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import { 
    SellerOrderProfile, 
    BuyerOrderProfile 
} from '../../Order/SharedComponents/sharedComponents';
import { SellerAvatar } from '../../Order/PlacedOrders/placedOrders';
import PlacedOrderModal from '../../Order/PlacedOrdersModal/placedOrdersModal';
import './paymentsMade.css';

export function PaymentWrapper({ payments }) {
    const [showModal, setShowModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    const [viewedOrder, setViewedPlacedOrder] = useState({});
    const [sellerRecievedPayment, setSellerRecievedPayment] = useState(false)
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [timer])

    const openPlacedOrderModal = (order, sellerRecievedPayment) => {
        setViewedPlacedOrder(order);
        setSellerRecievedPayment(sellerRecievedPayment);
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

    return (
        <>
        {showModal && (
            <PlacedOrderModal
            dontShowConfirmButton={ sellerRecievedPayment }
            orderProducts = { viewedOrder }
            closeModal = { closePlacedOrderModal }
            userAvatar = { 
                <SellerAvatar  { ...viewedOrder }/>
            }
            showModalChild = { showModalChild }
            />
        )}
        {payments.map((payment, i) =>
            <PaymentComp 
            key={ i } 
            { ...payment } 
            useSellerOrderProfile
            viewOrder= { openPlacedOrderModal } 
            />
        )}
        </>
    )
}

export function PaymentComp({ 
    viewOrder,
    productsSellerSold,
    ...props 
}) {
    const orderDate = new Date(Number(props.orderTime));
    // alert(JSON.stringify(props, null, 2));
    const order = {
        sellerId: props.sellerId,
        sellerName: props.sellerName,
        sellerEmail: props.sellerEmail,
        products: productsSellerSold
    }

    return (
        <div className="placed-order-wrapper">
             <div className="placed-order-details-group date">
                    <span>{ orderDate.toDateString() }</span>
                </div>
            <div className="placed-order-intro">
                <div>
                    <PaymentProfile { ...props }/>
                    <ViewPaymentDetails { ...props }/>    
                </div>
            </div> 
            <div className="placed-order-buttons-container">
                <div className="payments-made-button-wrapper">
                    <div className="payments-made-view-product-button">
                        <button onClick = {()=> viewOrder(order, props.sellerRecievedPayment)}>
                            <RiEyeLine className="payments-made-button-icon"/>
                            View  order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )   
}

function PaymentProfile({ 
    useSellerOrderProfile, 
    useBuyerOrderProfile,
    // sellerName,
    // buyerName, 
    // sellerId,
    // buyerId,
    ...props 
}) {
    if (useSellerOrderProfile) {
        return (
            <SellerOrderProfile 
            usedInPaymentsPage={ true } 
            { ...props }
            />
        )
    } else if (useBuyerOrderProfile) {
        return (
            <BuyerOrderProfile 
            usedInPaymentsPage={ true } 
            { ...props }
            />
        )
    }
}

function ViewPaymentDetails({
    orderTime,
    sellerRecievedPayment,
    ref,
    paymentAmount
}) {
    const [showDetails, setShowDetails] = useState(false);
    const orderDate = new Date(Number(orderTime));
    const paymentReleaseStatus = sellerRecievedPayment ? "Released" : "Unreleased"
    const paymentReleaseStatusSpanClass  = sellerRecievedPayment ? "released" : "unreleased"
    const showMoreIcon = showDetails ? ( 
        <MdExpandLess className="placed-order-icon"/>
    ) : (
        <MdExpandMore className="placed-order-icon" />
    )

    return (
        <div>
            <div className="placed-order-details-group show-more">
                <span className= { paymentReleaseStatusSpanClass }>{ paymentReleaseStatus }</span>
                <div 
                className="placed-order-show-more-icon-wrapper"
                onClick={()=> setShowDetails(prevstate => !prevstate)}
                >
                   { showMoreIcon }
                </div>
            </div>
            {showDetails && (
                <>
                <div className="placed-order-details-group">
                        Time: <span className="placed-order-details-date">{ orderDate.getHours() > 12 ?  orderDate.getHours() - 12 : orderDate.getHours() }</span>
                        <span className="placed-order-details-date">:</span>
                        <span className="placed-order-details-date">{ orderDate.getMinutes() }</span>
                        <span className="placed-order-details-date">{ orderDate.getHours() > 12 ? "PM" : "AM "}</span>                           
                </div>
                {/* <div className="placed-order-details-group">
                    Ref: <span>{ ref || 'no ref yet' }</span>
                    </div>*/}
                <div className="placed-order-details-group">
                    Amount: <span className="diff">£{ paymentAmount }</span>
                </div>
                </>
            )}   
        </div>
    )
}