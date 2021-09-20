




import React, {useEffect, useState} from 'react';
import './soldProducts.css';


const soldProducts = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function RecievedOrders(props) {
    useEffect(() => {
      
        return () => {

        }
    }, [])
    return (
        <div className="placed-orders-container">
            <div  className="placed-orders-header">
                <h3>Sold products</h3>
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
               soldProducts.map((order, i) =>
                    <SoldProducts key={i} {...order} />
                )
            }
        </div>
    )
}

function SoldProducts(props) {
    let deleveryStatusSpanClass = props.delivered ? "delivered" : "pending";
    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                    <div className="placed-order-details-group">
                        <p>Order date: <span>wed 04 sep 2021</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Order Id: <span>pss12845zf4</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Buyer name: <span>John Doe</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Buyer contact: <span>+444-464-4747-566</span></p>
                    </div>
                    <div className="placed-order-details-group">
                        <p>Delivery status: <span className={deleveryStatusSpanClass}>Pending</span></p>
                    </div>
                </div>
            </div> 
            <div  className="placed-order-container">
            {
                props.productsBoughtFromSeller && props.productsBoughtFromSeller.map((order, i) =>
                    <SoldProduct key={i} {...order} />
                )
            }
            </div>  
        </div>
    )
}


function SoldProduct(props) {
    let deleveryStatusSpanClass = props.delivered ? "delivered" : "pending";
    return (
        <div className="placed-order">
         <div className="placed-order-details-container">
             <div className="placed-order-details-image-container">
                 {/* image component goes here */}

             </div>
             <div className="placed-order-details-group-container">
                <div className="placed-order-details-group">
                    <p>Product name: <span>John Doe</span></p>
                </div>
                <div className="placed-order-details-group">
                    <p>Product id: <span>px223ffr4</span></p>
                </div>
                <div className="placed-order-details-group">
                    <p>Delivery status: <span className={deleveryStatusSpanClass}>Pending</span></p>
                </div>
                <div className="placed-order-details-group">
                    <p>Order quantity: <span>2</span></p>
                </div>
                <div className="placed-order-details-group">
                    <p>Total sub amount: <span className="diff">£68.00</span></p>
                </div>
             </div>
        </div>

        <div className="placed-order-buttons-container">
            <div className="sold-product-button-wrapper">
                <div className="sold-product-view-product-button">
                    <button>View  product</button>
                </div>
            </div>

        </div>

        </div>
    )
}