






import React, { useState, useEffect } from 'react';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import { getPayments } from '../../../../Utils/http.services';
import { SellerOrderProfile } from '../../Orders/SoldProducts/soldProducts';
import { GoKebabHorizontal} from 'react-icons/go';
import './paymentsMade.css';

const paymentsMade = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function PaymentsMade(props) {
    const { user } = useAuth();
    const { paymentsMade, setPayments } = useOrder();
    let PaymentsMadeComponent;
    useEffect(() => {
        let mounted = true;
         // TODO... remove useGetUserFunctionality when ready to use functionality
         let useGetUserFunctionality = false
        const getUserPayments = async (user) => {
            try {
                const payments = await getPayments(user);
                setPayments(payments);
            }catch(err) {
                console.error(err.stack)
            }  
    
        }
         // TODO... remove useGetUserFunctionality when ready to use functionality
        if ( (mounted && user && useGetUserFunctionality ) && !paymentsMade ) {
            getUserPayments(user);
        }  
        socket.on('orderDataChange', function() {
            if (mounted && user) {
                getUserPayments(user);
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
                    <label htmlFor="order-search"> Search by seller name or brand </label>
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
              <PaymentComp
              key={i}
              {...payment}
              paymentProfile={
                  <SellerOrderProfile usedInPaymentsPage={true}/>

              } 
              />
           )
       }
        </>
    )
}

export function PaymentComp(props) {
    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                {
                    props.paymentProfile
                }
                <ViewPaymentDetails />    
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

function ViewPaymentDetails(props) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div>
            <div className="placed-order-details-group show-more">
            <div className="placed-order-details-group">
                <p>Order date: <span>wed 04 sep 2021</span></p>
            </div>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={()=>setShowDetails(prevstate => !prevstate)}/>
                {/* View more */}
            </div>
            </div>

            {
                showDetails && (
                    <>
                    <div className="placed-order-details-group">
                        <p>Order Id: <span>pss12845zf4</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Payment date: <span>wed 04 sep 2021</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Payment amount: <span className="diff">£68.00</span></p>
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