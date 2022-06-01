
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess }  from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import { 
    SellerOrderProfile, 
    BuyerOrderProfile 
} from '../../Order/SharedComponents/sharedComponents';
import './paymentsMade.css';

export function PaymentMadeCompWrapper({ payments }) {
    return (
        <>
            {
                payments.map((payment, i) =>
                    <PaymentComp 
                    key={ i } 
                    { ...payment } 
                    useSellerOrderProfile={ true } 
                    />
                )
            }
        </>
    )
}

export function PaymentComp(props) {
    let PaymentProfileComp = (
        <PaymentProfile { ...props }/>
    )

    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                    { PaymentProfileComp }
                    <ViewPaymentDetails { ...props }/>    
                </div>
            </div> 
            <div className="placed-order-buttons-container">
                <div className="payments-made-button-wrapper">
                    <div className="payments-made-view-product-button">
                        <button>
                            <RiEyeLine className="nav-icon dashboard"/>
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
    sellerName,
    buyerName, 
    sellerId,
    buyerId,
    ...props 
}) {
    if (useSellerOrderProfile) {
        return (
            <SellerOrderProfile 
            usedInPaymentsPage={ true } 
            sellerUserName={ sellerName }
            sellerId={ sellerId }
            />
        )
    } else if (useBuyerOrderProfile) {
        return (
            <BuyerOrderProfile 
            usedInPaymentsPage={ true } 
            buyerUserName={ buyerName }
            buyerId={ buyerId }
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
                <div className="placed-order-details-group">
                    <p><span>{ orderDate.toUTCString() }</span></p>
                </div>
                <div 
                className="placed-order-show-more-icon-wrapper"
                onClick={ ()=> setShowDetails(prevstate => !prevstate) }
                >
                   { showMoreIcon }
                </div>
            </div>
            {
                showDetails && (
                    <>
                        <div className="placed-order-details-group">
                            <p>Ref: <span>{ ref || 'no ref yet' }</span></p>
                        </div>
                        <div className="placed-order-details-group">
                            <p>Payment Released: <span className= { paymentReleaseStatusSpanClass }>{ paymentReleaseStatus }</span> </p>
                        </div>
                        <div className="placed-order-details-group">
                            <p>Payment Amount: <span className="diff">£{ paymentAmount }</span></p>
                        </div>
                    </>
                )
            }   
        </div>
    )
}