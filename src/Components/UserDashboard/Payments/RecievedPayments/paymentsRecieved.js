
import React, { useEffect } from 'react';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import { getPayments } from '../../../../Utils/http.services';
import { PaymentComp } from '../MadePayments/paymentsMade';
import './paymentsRecieved.css';


export default function PaymentsRecieved() {

    const { user } = useAuth();

    const { recievedPayments, setPayments } = useOrder();

    let RecievedPaymentsComponent;

    useEffect(() => {

        let mounted = true;

         // TODO... remove useGetUserFunctionality when ready to use functionality
         let useGetUserFunctionality = true;

        const getUserPayments = async () => {

            try {

                const payments = await getPayments(user);

                setPayments(payments);

            } catch(err) {

                console.error(err.stack)

            }  
    
        }

        const userData = { user }
         // TODO... remove useGetUserFunctionality when ready to use functionality
        if ((mounted && user && useGetUserFunctionality ) && !recievedPayments ) {

            // getUserPayments(user);
            socket.emit('getUserPayments', userData);

        } 

        socket.on('getUserPaymentsSuccess', function(response) {

            // alert(JSON.stringify(response, null, 2))
            setPayments(response.data);

        })

        socket.on('orderDataChange', function() {

            if (mounted && user) {

                getUserPayments(user);

            } 

        })

        return ()=> {

            mounted = false;

        }

    }, [user, recievedPayments, setPayments]);

    if (recievedPayments && recievedPayments?.length > 0) {

        RecievedPaymentsComponent = (
            
            <RecievedPaymentsCompWrapper
            recievedPayments = { recievedPayments }
            />

        )

    } else {

        RecievedPaymentsComponent = (

            <NoRecievedPayments/>

        )

    }

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
        { RecievedPaymentsComponent }
        </div>

    )

}

function RecievedPaymentsCompWrapper({ recievedPayments }) {

    return (

        <>
         {
           
            recievedPayments.map((payment, i) =>

              <PaymentComp key = { i } { ...payment } useBuyerOrderProfile= { true }/>
            )

        }
        </>

    )

}

function NoRecievedPayments(props) {

    return (

        <div>
            not recieved any payments yet
        </div>

    )

}