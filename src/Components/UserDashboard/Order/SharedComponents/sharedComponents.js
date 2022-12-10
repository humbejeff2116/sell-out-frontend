
import React, { useState, useEffect }  from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdExpandMore, MdExpandLess }  from 'react-icons/md';
import { RiEyeLine, RiCloseFill } from 'react-icons/ri';
import { Price } from '../../../Product/product';
import PlacedOrderModal from '../PlacedOrdersModal/placedOrdersModal';
import { ModalBox } from '../../../ModalReviews/modalReviews';
import { UserModalProfileWrapper } from '../../../ModalUserProfile/userProfile';
import { getTotalOrderAmount, getOrderSubAmount } from '../Lib/lib';
import useAuth from '../../../../Context/context';
import socket from '../../../Socket/socket';
import defaultAvatar from '../../../../Images/avatar4.png';
import styles from './SharedComponents.module.css';
import '../PlacedOrders/placedOrders.css';

export function OrderDeliveries({ 
    orders, 
    useBuyerProfile,
    usedInConfirmDelivery, 
    ...props 
}) {
    return (
        <>
        {orders.map((order, i) =>
            <Order 
            key = { i } 
            { ...order }
            useBuyerProfile = { useBuyerProfile }
            usedInConfirmDelivery = { usedInConfirmDelivery }
            />
        )}
        </>
    )
}

export function Order({ 
    delivered,
    deliveryRequestSent, 
    useBuyerProfile, 
    _id,
    closeModal,
    usedInConfirmDelivery,
    ...props 
}) {
    const [showViewedPreOrder, setShowViewedPreOrder] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    const [viewedPreOrder, setViewedPreOrder] = useState({});
    const [showConfirmOrderDeliveryModal, setShowConfirmOrderDeliveryModal] = useState(false);
    const [showConfirmOrderDeliveryModalChild, setShowConfirmOrderDeliveryModalChild] = useState(false);
    const { user } = useAuth();
    let timer = null;
    const deliveryStatusSpanClass = deliveryRequestSent && !delivered ? (
        "request-sent"
    ) : delivered ? (
        "delivered"
    ) : (
        "pending"
    );
    const deliveryStatus = delivered ? "delivered" : "pending";

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer)
        }
    },[timer])

    const viewOrder = (order) => {    
        setViewedPreOrder(order);
        setShowViewedPreOrder(true);
        timer = setTimeout(() => {
            setShowModalChild(true);
        });
    }

    const closePreOrderModal = () => {
        setShowModalChild(false);
        timer = setTimeout(() => {
            setShowViewedPreOrder(false);
        }, 200);
    }

    const openConfirmOrderDeliveryModal = (e) => {
        setShowConfirmOrderDeliveryModal(true);
        // setShowConfirmOrderDeliveryModalChild(true);
        timer = setTimeout(() => {
            setShowConfirmOrderDeliveryModalChild(true);
        });  
    }

    const closeConfirmOrderDeliveryModal = () => {
        setShowConfirmOrderDeliveryModalChild(false);
        timer = setTimeout(() => {
            setShowConfirmOrderDeliveryModal(false);
        }, 300);
    }

    const cancelConfirmDelivery = () => {
        // setConfirmingOrderDelivery(false);
        setShowConfirmOrderDeliveryModalChild(false);
        timer = setTimeout(() => {
            setShowConfirmOrderDeliveryModal(false);
        }, 300);
        // setOrderToConfirmDelivery(null);
    }

    const confirmOrderDelivery = async (order, user) => {
        const { products, ...rest } = order;
        const confirmOrderData = { rest, user: {id: user.id, userEmail: user.userEmail}};
        socket.emit('confirmDelivery', confirmOrderData);
    }

    const orderDate = new Date(Number(props.orderTime));

    if (usedInConfirmDelivery) {
        return (
            <>
            {showViewedPreOrder && (
                <PlacedOrderModal
                orderProducts = { viewedPreOrder }
                placedOrderId = {  _id  } 
                closeModal = { closePreOrderModal }
                userAvatar = { 
                    <OrderDeliveryProfile
                    orderDelivered = { delivered }
                    useBuyerProfile = { useBuyerProfile }
                    dontShowWriteup
                    { ...props }
                    />
                }
                showModalChild = { showModalChild }
                />
            )}
            {showConfirmOrderDeliveryModal && (
                <ConfirmOrderDeliveryModal
                handleModal = { closeConfirmOrderDeliveryModal }
                showConfirmOrderDeliveryModalChild = { showConfirmOrderDeliveryModalChild }
                // dontShowCloseButton
                confirmDelivery = { confirmOrderDelivery }
                cancelConfirmDelivery = { cancelConfirmDelivery }
                order = { props }
                user = { user } 
                />
            )}
            <div className="placed-order-wrapper">
                <div className="placed-order-details-group date">
                    <span>{ orderDate.toDateString() }</span>
                </div>
                <div className="placed-order-intro">
                    <div>
                        <SellerOrderProfile  
                        usedInConfirmDelivery
                        {...{sellerName: props.sellerUserName}} 
                        { ...props } 
                        />
                        <OrderDetails 
                        deliveryStatusSpanClass = { deliveryStatusSpanClass }
                        deliveryStatus = { deliveryStatus } 
                        { ...props } 
                        />
                    </div>
                </div> 
                <div className={ styles.confirmationButtonsContainer }>
                    <div className={ styles.confirmationButtonWrapper }>
                        <button onClick ={ ()=> viewOrder(props) }>
                            <RiEyeLine className={ styles.confirmButtonIcon }/>
                            View order 
                        </button>
                    </div>
                    <div className={ `${ styles.confirmationButtonWrapper } ${ styles.confirm } `}>
                        <button onClick ={ openConfirmOrderDeliveryModal }>
                            <RiEyeLine className={ styles.confirmButtonIcon }/>
                            Accept 
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
        {showViewedPreOrder && (
            <PlacedOrderModal
            orderProducts = { viewedPreOrder }
            placedOrderId = {  _id  } 
            closeModal = { closePreOrderModal }
            userAvatar = { 
                <OrderDeliveryProfile
                orderDelivered = { delivered }
                useBuyerProfile = { useBuyerProfile }
                dontShowWriteup
                { ...props }
                />
            }
            showModalChild = { showModalChild }
            />
        )}
        {showConfirmOrderDeliveryModal && (
            <ConfirmOrderDeliveryModal
            handleModal = { closeConfirmOrderDeliveryModal }
            showConfirmOrderDeliveryModalChild = { showConfirmOrderDeliveryModalChild }
            // dontShowCloseButton
            confirmDelivery = { confirmOrderDelivery }
            cancelConfirmDelivery = { cancelConfirmDelivery }
            order = { props }
            user = { user } 
            />
        )}
        <div className="placed-order-wrapper">
            <div className="placed-order-details-group date">
                <span>{ orderDate.toDateString() }</span>
            </div>
            <div className="placed-order-intro">
                <div>
                    <OrderDeliveryProfile
                    orderDelivered = { delivered }
                    useBuyerProfile = { useBuyerProfile }
                    { ...props }
                    />
                    <OrderDetails 
                    deliveryStatusSpanClass = { deliveryStatusSpanClass }
                    deliveryStatus = { deliveryStatus } 
                    {...props} 
                    />
                </div>
            </div> 
            <div  className="placed-order-container">
            {props.products.length > 0 && props.products.map((order, i) =>
                <OrderProductDetails 
                key = { i } 
                { ...order }
                order = { order }
                />
            )}
            </div>
            <div className={ styles.confirmationButtonsContainer }>
                <div className={ styles.confirmationButtonWrapper }>
                    <button onClick ={ ()=> viewOrder(props) }>
                        <RiEyeLine className={ styles.confirmButtonIcon }/>
                        View order 
                    </button>
                </div>
                <div className={ `${ styles.confirmationButtonWrapper } ${ styles.confirm } `}>
                    <button onClick ={ openConfirmOrderDeliveryModal }>
                        <RiEyeLine className={ styles.confirmButtonIcon }/>
                        Confirm Delivery 
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export function ConfirmOrderDeliveryModal({ 
    handleModal,
    modalContainerClassName,
    modalWrapperClassName,
    modalChildWrapperClassName,
    dontShowModalCloseButton,
    showConfirmOrderDeliveryModalChild,
    dontShowCloseButton,
    confirmOrderDeliveryModalChildClassName,
    confirmDelivery,
    cancelConfirmDelivery,
    order,
    user, 
    ...props 
}) {
    const confirmOrderDeliveryModalClassName = showConfirmOrderDeliveryModalChild ? (
        `${styles.modalWrapper} ${styles.transform}`
    ) :(
        `${styles.modalWrapper}`
    )

    return (
        <ModalBox 
        handleModal = { handleModal }
        dontUseDefaultModalChildContainer
        dontShowCloseButton = { dontShowModalCloseButton } 
        >
            <ModalChild
            dontShowCloseButton = { dontShowCloseButton }
            modalChildWrapperClassName = { modalChildWrapperClassName  || confirmOrderDeliveryModalClassName }
            modalChildClassName =  { confirmOrderDeliveryModalChildClassName || styles.modalWrapperChildContainer }
            confirm = { confirmDelivery }
            cancel = { cancelConfirmDelivery }
            item = { order }
            user = { user }
            // confirming = { confirmingOrderDelivery }
            />
        </ModalBox>
    )
}

export function ModalChild({
    cancel,
    confirm,
    modalChildWrapperClassName,
    modalChildClassName,
    item, 
    user,
    dontShowCloseButton, 
    confirming, 
    confirmingError, 
}) {
    return (
        <div className={ modalChildWrapperClassName  }>
            <div className={ modalChildClassName }>
                {dontShowCloseButton ? "" : (
                    <div className="placed-order-modal-confirm-delivery-close-container">
                        <div 
                        className="placed-order-modal-confirm-delivery-close-wrapper"
                        onClick = { cancel }
                        >
                        <RiCloseFill className="upload-product-editor-close-icon"/>
                        </div>
                    </div>
                )}
                <div className="placed-order-modal-content">
                    Order was delivered to you successfully?
                </div>
                <div className="placed-order-modal-note">
                    By accepting, all funds relating to this order will be
                    released to the appropriate brand, business or organization.
                </div>
                <div className="placed-order-modal-buttons-container">
                    <div className="placed-order-modal-button cancel">
                        <button onClick = { cancel }>Cancel</button>
                    </div>
                    <div className="placed-order-modal-button">
                        <button onClick = { ()=> confirm(item, user) } >
                            <span>Yes</span>
                        </button>     
                    </div>
                </div>
            </div>
        </div>
    )
}


function OrderDetails({
    orderTime,
    products,
    ref,
    deliveryStatusSpanClass,
    deliveryStatus,
}) {

    const [showDetails, setShowDetails] = useState(false);
    const totalProductOrderAmount = getTotalOrderAmount(products);

    return (
        <div>
            <div className="placed-order-details-group show-more">
                Delivery: <span className = { deliveryStatusSpanClass }>{ deliveryStatus }</span>
                <div 
                className="placed-order-show-more-icon-wrapper"
                onClick={ ()=> setShowDetails(prevstate => !prevstate) }
                >
                {showDetails ? ( 
                    <MdExpandLess className="placed-order-icon"/>
                ) : (
                    <MdExpandMore className="placed-order-icon" />
                )}
                </div>
            </div>
            {showDetails && (
                <>
                    <div className="placed-order-details-group">
                        Products: <span>{ products.length }</span>
                    </div>
                    <div className="placed-order-details-group">
                        Amount: <span className="diff">£{ totalProductOrderAmount }</span>
                    </div>
                </>
            )}
        </div>
    )
}

export function OrderProductDetails({
    productName,
    productId,
    productPrice,
    percentageOff,
    productQty,
    order,
    ...props
}) {

    const [showDetails, setShowDetails] = useState(false);
    const orderSubAmount = getOrderSubAmount(order)

    if (props.dontUseShowMoreIcon) {
        return (
            <div className="placed-order no-show-more-icon">
                <div className="placed-order-details-group">
                    <span>{ productName }</span>
                </div>
                <Price { ...order } className="placed-order-details-group" />
                <div className="placed-order-details-group">
                    Quantity: <span>{ productQty }</span>
                </div>
                <div className="placed-order-details-group">
                    Amount: <span className="diff">£{ orderSubAmount }</span>
                </div>
            </div>
        )
    }
    
    return (
        <div className="placed-order">
            <div className="placed-order-details-container">
                <div className="placed-order-details-group-container">
                    <div className="placed-order-details-group show-more">
                        <span>{ productName }</span>
                        <div 
                        className="placed-order-show-more-icon-wrapper"
                        onClick={ ()=> setShowDetails(prevstate => !prevstate) }
                        >
                        {showDetails ? ( 
                            <MdExpandLess className="placed-order-icon"/>
                        ) : (
                            <MdExpandMore className="placed-order-icon" />
                        )}
                        </div>
                    </div>
                    {showDetails && (
                        <>
                            <Price { ...order } className="placed-order-details-group"/>
                            <div className="placed-order-details-group">
                                Quantity: <span>{ productQty }</span>
                            </div>
                            <div className="placed-order-details-group">
                                Amount: <span className="diff">£{ orderSubAmount }</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export function OrderDeliveryProfile({ 
    orderDelivered, 
    useBuyerProfile, 
    ...props 
}) {
    if (useBuyerProfile) {
        return (
            <BuyerOrderProfile 
            orderDelivered ={ orderDelivered }
            usedInSellerDeliveries 
            {...{buyerName: props.buyerUserName}}
            { ...props }
            />
        )
    }

    return (
        <SellerOrderProfile 
        orderDelivered ={ orderDelivered } 
        usedInBuyerDeliveries
        {...{sellerName: props.sellerUserName}} 
        { ...props } 
        />
    )
}

export function SellerOrderProfile({ 
    usedInDeliveryPage,
    usedInPaymentsPage,
    usedInBuyerDeliveries,
    usedInConfirmDelivery,
    orderDelivered,
    dontShowWriteup,
    sellerId,
    sellerEmail,
    sellerName 
}) {
    return (
        <>
        {dontShowWriteup ? "" : (
            <div className="placed-order-details-group header">
            {usedInDeliveryPage ? (
                <>Recieved delivery from:</>
            ) : usedInPaymentsPage ? (
                <>Made payment to:</>
            ) : usedInBuyerDeliveries && orderDelivered ? (
                <>Recieved order delivery from:</>
            ) : usedInBuyerDeliveries && !orderDelivered ? (
                <>Yet to recieve order delivery from:</>
            ) : usedInConfirmDelivery ? (
                <>Successfully recieved order from:</>
            ) : (
                <>From: </>
            )}
            </div>
        )}
        {/* TODO... pass appropriate image prop */}
        <UserAvatarWithKebabMenu 
        userName = {sellerName}
        userId ={sellerId}
        userEmail={sellerEmail}
        // image = { defaultAvatarImage }
        /> 
        </>
    )
}

export function BuyerOrderProfile({
    usedInDeliveryPage,
    usedInPaymentsPage,
    usedInSellerDeliveries,
    orderDelivered,
    buyerName,
    dontShowWriteup,
    buyerId,
    buyerEmail,
    ...props
}) {
    // alert(JSON.stringify(props, null, 2))
    return (
        <>
            {dontShowWriteup ? "" : (
                <div className="placed-order-details-group header">
                {
                    usedInDeliveryPage ? <>Delivered products to:</> : 
                    usedInPaymentsPage ? <>Recieved payment from:</> :
                    (usedInSellerDeliveries && orderDelivered) ? <>Delivered order to:</> :
                    (usedInSellerDeliveries && !orderDelivered) ? <>Yet to delivere order to:</> :
                    <>Made sales to: </>
                }
                </div>
            )}  
            {/* TODO... pass appropriate image prop */}
            <UserAvatarWithKebabMenu 
            userName = {buyerName}
            userId ={buyerId}
            userEmail={buyerEmail}
            // image = { defaultAvatarImage }
            /> 
        </>
    )
}

export function UserAvatarWithKebabMenu({ 
    avatarContainerClassName,
    userName, 
    userId,
    userEmail,
    image, 
    ...props 
}) {
    const [showUserProfileModal, setShowuserProfileModal] = useState(false);
    const [showUserProfileModalChild, setShowUserProfileModalChild] = useState(false);
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);

    const showUserProfile = () => {
        setShowuserProfileModal(true);
        timer = setTimeout(() => setShowUserProfileModalChild(true));
    }

    const closeUserProfile = () => {
        setShowUserProfileModalChild(false);
        timer = setTimeout(() => setShowuserProfileModal(false), 200);
    }
    return (
        <>
        {showUserProfileModal && (
            <UserModalProfileWrapper
            handleClose = { closeUserProfile }
            userId = { userId }
            userEmail = { userEmail }
            showModalChild = { showUserProfileModalChild }
            />
        )}
        <div className= { avatarContainerClassName || styles.storeUserAvatarWrapper }>        
            <div className= { styles.storeUserAvatrDetailsWrapper }>
                <img src={ image || defaultAvatar } alt="user avatar" />
                <div className= { styles.storeUserAvatarDetails }>
                    <div>
                        <span>{ userName }</span>
                    </div> 
                </div>
                <div className= { styles.storeUserAvatarKebabIcon }>
                    <GoKebabHorizontal onClick = { showUserProfile } className="nav-icon"/>
                </div>
            </div>
        </div>
        </>
    )
}