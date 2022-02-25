
import React, { useState, useEffect } from 'react';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import { getPayments } from '../../../../Utils/http.services';
import { SellerOrderProfile, BuyerOrderProfile } from '../../Orders/SoldProducts/soldProducts';
import { GoKebabHorizontal } from 'react-icons/go';
import './paymentsMade.css';


export default function PaymentsMade() {

    const { user } = useAuth();

    const { paymentsMade, setPayments } = useOrder();

    let PaymentsMadeComponent;

    useEffect(() => {

        let mounted = true;
         // TODO... remove useGetUserFunctionality when ready to use functionality
         let useGetUserFunctionality = true

        const getUserPayments = async (user) => {

            try {

                const payments = await getPayments(user);

                setPayments(payments);

            }catch(err) {

                console.error(err.stack)

            }  
    
        }

        const userData = { user }

         // TODO... remove useGetUserFunctionality when ready to use functionality
        if ( (mounted && user && useGetUserFunctionality ) && !paymentsMade ) {

            // getUserPayments(user);
            socket.emit('getUserPayments', userData);

        } 

        socket.on('getUserPaymentsSuccess', function(response) {

            // alert(JSON.stringify(response, null, 2))
            setPayments(response.data);

        }) 

        socket.on('orderDataChange', function() {

            if (mounted && user) {

                // getUserPayments(user);
                socket.emit('getUserPayments', userData);

            } 

        });

        return ()=> {

            mounted = false;

        }

    }, [user, paymentsMade, setPayments]);

    if (paymentsMade && paymentsMade?.length > 0) {

        PaymentsMadeComponent = (
            
            <PaymentMadeCompWrapper
            paymentsMade = { paymentsMade }
            />

        )

    } else {

        PaymentsMadeComponent = (

            <NoPaymentsMade/>

        )

    }

    return (

        <div className="placed-orders-container">
        <div  className="placed-orders-header">
            <h3> Made Payments</h3>
        </div>
        <div className="placed-orders-search-container">
            <div className="placed-orders-search">
                <form>
                    <label htmlFor="order-search"> Search by username or brand </label>
                    <input type="text" />
                </form>
            </div>
            <div className="placed-orders-search">
                <form>
                    <label htmlFor="order-search"> Search by date </label>
                    <input type="text" />
                </form>
            </div>
        </div>
        { PaymentsMadeComponent }
        </div>

    )

}

function PaymentMadeCompWrapper({ paymentsMade }) {

    return (

        <>
        {
           
            paymentsMade.map((payment, i) =>

                <PaymentComp key={i} {...payment} useSellerOrderProfile = { true } />

            )

        }
        </>

    )

}



export function PaymentComp(props) {

    let PaymentProfileComp = (

        <PaymentProfile { ...props } />

    );

    return (

        <div className="placed-order-wrapper">

            <div className="placed-order-intro">
                <div>
                { PaymentProfileComp }
                <ViewPaymentDetails { ...props } />    
                </div>
            </div> 

            <div className="placed-order-buttons-container">
                <div className="payments-made-button-wrapper">
                    <div className="payments-made-view-product-button">
                        <button>View  order</button>
                    </div>
                </div>
            </div>

        </div>

    )
    
}

function PaymentProfile(props) {

    if (props.useSellerOrderProfile) {

        return (

            <SellerOrderProfile 
            usedInPaymentsPage = { true } 
            sellerUserName = { props.sellerName }
            sellerId = { props.sellerId }
            />

        )

    } else if (props.useBuyerOrderProfile) {

        return (

            <BuyerOrderProfile 
            usedInPaymentsPage = { true } 
            buyerUserName = { props.buyerName }
            buyerId = { props.buyerId }
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

    const orderDate = new Date(Number(orderTime))

    const paymentReleaseStatus = sellerRecievedPayment ? "Released" : "Unreleased"

    const paymentReleaseStatusSpanClass  = sellerRecievedPayment ? "released" : "unreleased"

    return (

        <div>
            <div className="placed-order-details-group show-more">
            <div className="placed-order-details-group">
                <p>Date: <span>{ orderDate.toUTCString() }</span></p>
            </div>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={ ()=>setShowDetails(prevstate => !prevstate)}/>
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

function NoPaymentsMade(props) {

    return (

        <div>
            no payments made yet
        </div>

    )

}