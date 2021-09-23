




import React, {useEffect} from 'react';
import useAuth from '../../../../Context/context';
import image from '../../../../Images/avatar.jpg';
import './soldProducts.css';
import '../PlacedOrders/placedOrders.css';


const soldProducts = [
    {
        productsBoughtFromSeller:[{},{}]
    }
]

export default function SoldProducts(props) {
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
                <div className="placed-orders-search">
                    <form>
                        <label htmlFor="order-search"> Filter by delivery status</label>
                        <select>
                        <option>Default</option>
                            <option>Pending</option>
                            <option>Delivered</option>
                        </select>
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
                        {...order}
                        buyerName={"Jeffrey"}
                        />
                    }
                    />
                )
            }
        </div>
    )
}

export function SoldProductsComp(props) {
    let deleveryStatusSpanClass = props.delivered ? "delivered" : "pending";
    return (
        <div className="placed-order-wrapper">
            <div className="placed-order-intro">
                <div>
                   {
                       props.orderProfile
                   }
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
                    <p>Total order amount: <span className="diff">£68.00</span></p>
                </div>
                    <div className="placed-order-details-group">
                        <p>Order products:</p>
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


export function OrderProfile(props) {
     const {user} = useAuth();
     if(user?.fullName === props.buyerName){
        return (
             <SellerOrderProfile {...props} />
        )
     }
    return (
        // TODO... component recieves shipping address as props from user object
        <BuyerOrderProfile  {...props} />
    )
}

export function SellerOrderProfile(props) {
    const {sellerName, sellerProfileImage, sellerContact} = props
    return (
        <>
        <div className="placed-order-details-group header">
            {
                props.usedInDeliveryPage ? <p>Recieved delivery from:</p> : 
                props.usedInPaymentsPage ? <p>Made payment to:</p> :
                <p>Bought products from: </p>
            }
            
        </div>
        <div className="sold-products-profile-container">
            <div className="sold-products-profile-image">
                <img src={image} alt="seller" />
                <div  className="sold-products-profile-button component">
                    <button>view seller profile</button>
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
        </>

    )
}

export function BuyerOrderProfile(props) {
    const {buyerrName, buyerProfileImage, buyerContact, shippingAddress} = props
    return (
        <>
        <div className="placed-order-details-group header">
        {
                props.usedInDeliveryPage ? <p>Delivered products to:</p> : 
                props.usedInPaymentsPage ? <p>Recieved payment from:</p> :
                <p>Made sales to: </p>
            }
        </div>
        <div className="sold-products-profile-container">
            <div className="sold-products-profile-image">
                <img src={image} alt="seller" />
                <div  className="sold-products-profile-button component">
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
                    <div className="placed-order-details-group">
                        <p>Shipping address: <span>state of art way, Johnson avenue </span></p>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}