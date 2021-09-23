





import React from 'react';
import { BuyerOrderProfile } from '../../Orders/SoldProducts/soldProducts';
import {PaymentComp} from '../MadePayments/paymentsMade';
import './paymentsRecieved.css';


const paymentsMade = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function PaymentsRecieved(props) {
    return (
        <div className="placed-orders-container">
        <div  className="placed-orders-header">
            <h3> Recieved Payments</h3>
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
               <PaymentComp
               key={i}
               {...payment}
               paymentProfile={
                   <BuyerOrderProfile usedInPaymentsPage={true}/>

               } 
               />
            )
        }
    </div>
    )
}
