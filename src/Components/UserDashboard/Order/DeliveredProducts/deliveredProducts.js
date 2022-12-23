
import React, {useEffect} from 'react';
// import { SoldProductsComp,  OrderProfile } from '../SoldProducts/soldProducts';
import { getOrders } from '../../../../Utils/http.services';
import useAuth from '../../../../Context/context';
import useOrder from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import './deliveredProducts.css';
import '../PlacedOrders/placedOrders.css';


export default function DeliveredProducts(props) {
    const { user } = useAuth();
    const { deliveredProducts, setOrders } = useOrder();
    let DeliveredProductsComponent;

    useEffect(() => {
        let mounted = true;
         // TODO... remove useGetUserFunctionality when ready to use functionality
        let useGetUserFunctionality = false

        const getUserOrder = async ()=> {
            try {
                const orders = await getOrders(user);
                setOrders(orders);
            } catch (err) {
                console.error(err.stack);
            }  
        }
        // TODO... remove useGetUserFunctionality when ready to use functionality
        if ( (mounted && user && useGetUserFunctionality) && !deliveredProducts ) {
            getUserOrder(user);
        }

        socket.on('orderDataChange', function() {
            if (mounted && user) {
                getUserOrder(user);
            }         
        });
        
        return ()=> {
            mounted = false;
        }
    }, [user, deliveredProducts, setOrders]);
    if (deliveredProducts && deliveredProducts?.length > 0) {
        DeliveredProductsComponent = (
            <DeliveredProductWrapper
            deliveredProducts = { deliveredProducts }
            />
        )
    } else {
        DeliveredProductsComponent = (
            <NoDeliveredProducts />
        )
    }
    return (
        <div className="placed-orders-container">
            <div className="placed-orders-header">
                <h3>Delivered Products</h3>
            </div>
            <div className="placed-orders-search-container">
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search">Search by buyer name or brand</label>
                        <input type="text" />
                    </form>
                </div>
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search">Search by date</label>
                        <input type="text" />
                    </form>
                </div>
            </div>
            { DeliveredProductsComponent }
        </div>
    )
}

function DeliveredProductWrapper({
    deliveredProducts
}) {
    return (
        <>
        {/* {
        deliveredProducts?.map((order, i) =>
            <SoldProductsComp 
            key={i} 
            {...order}
            orderProfile={ 
                <OrderProfile 
                buyerName={"Jeffrey"}
                usedInDeliveryPage={true}
                />
            } 
            />
        )
        
        } */}
        </>
    )
}
function NoDeliveredProducts(props) {
    return (
        <div>
            not yet delivered any product
        </div>
    )
}