




import React, {useEffect, useState} from 'react';
import image from '../../../../Images/avatar.jpg';
import {FaRegEye} from 'react-icons/fa';
import {GiConfirmed} from 'react-icons/gi';
import { GoKebabHorizontal} from 'react-icons/go';
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
    let deliveryStatusSpanClass = props.delivered ? "delivered" : "pending"
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
                <div className="sold-products-profile-image-wrapper">
                    
                    <div className="sold-products-profile-details-wrapper">

                    <img src={image} alt="seller" />

                    <div className="sold-products-profile-details">
                        <div>
                            <span>John Doe joels omega</span>
                        </div>
                       
                    </div>

                    <div className="sold-products-profile-image-kebab-icon">
                        <GoKebabHorizontal className="nav-icon"/>
                    </div>
                    </div>
                    
                    {/* <div  className="sold-products-profile-button">
                        <button>view seller profile</button>
                    </div> */}
                </div>
               
            </div>
            <ViewProductDetails deliveryStatusSpanClass={deliveryStatusSpanClass} />
        </div>

            
        </div>

        <div className="placed-order-buttons-container">
            <div className="placed-order-view-order-product-button">
                <button>
                    {/* < FaRegEye className="nav-icon dashboard"/> */}
                    View order products
                </button>
            </div>
            <div className="placed-order-confirm-delivery-button">
                <button>
                    {/* <GiConfirmed className="nav-icon dashboard"/> */}
                    Confirm delivery
                </button>
            </div>
        </div>

        </div>
    )
}
function ViewProductDetails(props) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <div>
            <div className="placed-order-details-group show-more">
            <p>Delivery Status: <span className={props.deliveryStatusSpanClass}>Pending</span></p>
            <div className="sold-products-profile-image-kebab-icon">
                <GoKebabHorizontal className="nav-icon" onClick={()=>setShowDetails(prevstate => !prevstate)}/>
                {/* View more */}
            </div>
            </div>
            {
                showDetails && (
                    <>
                    <div className="placed-order-details-group">
                    <p>Number Of Products: <span>2</span></p>
                    </div>

                    <div className="placed-order-details-group">
                    <p>Total Order Amount: <span className="diff">£30068.00</span></p>
                    </div>
                    </>
                )
            } 
        </div>
    )
}