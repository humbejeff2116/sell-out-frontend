




import React, {useEffect} from 'react';
import { SoldProductsComp,  OrderProfile } from '../SoldProducts/soldProducts';
import './deliveredProducts.css';
import '../PlacedOrders/placedOrders.css';


const soldProducts = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function DeliveredProducts(props) {
    useEffect(() => {
      
        return () => {

        }
    }, [])
    return (
        <div className="placed-orders-container">
            <div  className="placed-orders-header">
                <h3>Delivered Products</h3>
            </div>
            <div className="placed-orders-search-container">
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search"> Search by buyer name or brand</label>
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
                //  {/* TODO... replace buyerName with buyer name from order */}
               soldProducts.map((order, i) =>
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
            }
        </div>
    )
}