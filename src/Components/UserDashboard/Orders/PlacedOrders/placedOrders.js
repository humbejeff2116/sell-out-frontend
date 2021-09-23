




import React, {useEffect} from 'react';
import image from '../../../../Images/avatar.jpg';
import './placedOrders.css';


const placedOrders = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function PlacedOrdersContainer(props) {
    useEffect(() => {
      
        return () => {

        }
    }, [])
    return (
        <div className="placed-orders-container">
            <div  className="placed-orders-header">
                <h3>Placed Orders</h3>
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
                placedOrders.map((order, i) =>
                    <PlacedOrders key={i} {...order} />
                )
            }
           
        </div>
    )
}

function PlacedOrders(props) {
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
                <p>Ordered products:</p>
                </div>
                </div>
            </div> 
            <div  className="placed-order-container">
                {
                props.productsBoughtFromSeller && props.productsBoughtFromSeller.map((order, i) =>
                    <PlacedOrder key={i} {...order} />
                )
            }
            </div>
            
        </div>
    )
}

function PlacedOrder(props) {
    let deleveryStatusSpanClass = props.delivered ? "delivered" : "pending"
    return (
        <div className="placed-order">
        <div className="placed-order-details-container">
        <div className="placed-order-details-image-container">
            {/* image component goes here */}

        </div>
        <div className="placed-order-details-group-container">
            <div className="placed-order-details-group">
                <p>Bought products from: </p>
            </div>
            <div className="sold-products-profile-container">
                <div className="sold-products-profile-image">
                    <img src={image} alt="seller" />
                    <div  className="sold-products-profile-button">
                        <button>view buyer profile</button>
                    </div>
                </div>
                <div className="sold-products-profile-details-container">
                    <div className="sold-products-profile-details">
                        <div className="placed-order-details-group">
                            <p>Name: <span>John Doe</span></p>
                        </div>
                        <div className="placed-order-details-group">
                            <p>Contact: <span>+444-464-4747-566</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="placed-order-details-group">
            <p>Order date: <span>wed 04 sep 2021</span></p>
            </div>
            <div className="placed-order-details-group">
            <p>Order Id: <span>pss12845zf4</span></p>
            </div>
            <div className="placed-order-details-group">
            <p>Delivery status: <span className={deleveryStatusSpanClass}>Pending</span></p>
            </div>
            <div className="placed-order-details-group">
            <p>Total number of products: <span>2</span></p>
            </div>
            <div className="placed-order-details-group">
            <p>Total order amount: <span className="diff">£30068.00</span></p>
            </div>
        </div>

            
        </div>

        <div className="placed-order-buttons-container">
            <div className="placed-order-view-order-product-button">
                <button>View order products</button>
            </div>
            <div className="placed-order-confirm-delivery-button">
                <button>Confirm delivery</button>
            </div>
        </div>

        </div>
    )
}