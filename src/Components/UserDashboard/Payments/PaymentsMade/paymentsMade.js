






import React from 'react';
import {SellerOrderProfile, BuyerOrderProfile} from '../../Orders/SoldProducts/soldProducts';
import './paymentsMade.css';

const paymentsMade = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function PaymentsMade(props) {
    return (
        <div className="placed-orders-container">
        <div  className="placed-orders-header">
            <h3>Payments made</h3>
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
        {
           
            paymentsMade.map((payment, i) =>
               <PaymentsMadeComp
               paymentProfile={
                   <SellerOrderProfile usedInPaymentsPage={true}/>

               } 
               />
            )
        }
    </div>
    )
}

function PaymentsMadeComp(props) {
    let deleveryStatusSpanClass = props.delivered ? "delivered" : "pending";
    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                   {
                       props.paymentProfile
                   }
                     <div className="placed-order-details-group">
                        <p>Order date: <span>wed 04 sep 2021</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Order Id: <span>pss12845zf4</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Payment date: <span>wed 04 sep 2021</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Payment amount: <span className="diff">£68.00</span></p>
                    </div>
                    
                </div>
            </div> 

            <div className="placed-order-buttons-container">
                <div className="payments-made-button-wrapper">
                    <div className="payments-made-view-product-button">
                        <button>View  product</button>
                    </div>
                </div>
            </div>

        </div>

    )
}