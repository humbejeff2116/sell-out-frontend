
import { useState } from 'react';
import { OrderContext } from './context';

export function OrderContextProvider({children}) {
    const [placedOrders, setUserPlacedOrders] = useState(null);
    const [placedOrdersSet, setPlacedOrdersSet] = useState(false);
    const [sellerOrderDeliveries, setSellerOrderDeliveries] = useState({});
    const [buyerOrderDeliveries, setBuyerOrderDeliveries] = useState({});
    const [deliveriesSet, setDeliveriesSet] = useState(false);
    const [sellerPayments, setSellerPayments] = useState({});
    const [paymentsSet, setPaymentsSet] = useState(false);
    const [buyerPayments, setBuyerPayments] = useState({});

    const setPlacedOrders = ({ placedOrders }) => {
        if (!placedOrders) {
            setUserPlacedOrders(null);
            setPlacedOrdersSet(false);
            return;
        }
        setUserPlacedOrders(placedOrders);
        setPlacedOrdersSet(true);
    }

    const setSalesPayments = ({ sellerPayments, buyerPayments }) => {
        if (!sellerPayments || !buyerPayments) {
            setSellerPayments({});
            setBuyerPayments({});
            setPaymentsSet(false)
            return;
        }
        setSellerPayments(sellerPayments);
        setBuyerPayments(buyerPayments);
        setPaymentsSet(true)
    }

     const setSalesDelivery = ({ sellerOrderDeliveries, buyerOrderDeliveries }) => {
        if (!sellerOrderDeliveries || !buyerOrderDeliveries) {
            setSellerOrderDeliveries({});
            setBuyerOrderDeliveries({});
            setDeliveriesSet(false);
            return;
        }
        setSellerOrderDeliveries(sellerOrderDeliveries);
        setBuyerOrderDeliveries(buyerOrderDeliveries);
        setDeliveriesSet(true);
    }

    const values = {
        placedOrders,
        placedOrdersSet,
        sellerOrderDeliveries,
        buyerOrderDeliveries,
        deliveriesSet,
        sellerPayments,
        buyerPayments,
        paymentsSet,
        setPlacedOrders,
        setSalesPayments,
        setSalesDelivery
    }

    return (
        <OrderContext.Provider value={ values }>
            { children }
        </OrderContext.Provider>
    )
}