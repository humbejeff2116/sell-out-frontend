
import React, { useState, useEffect } from 'react';
import { RiListSettingsFill } from 'react-icons/ri'
import { LoaderSmall } from '../../../Loader/loader';
import { OrderDeliveries } from '../SharedComponents/sharedComponents';
import EmptyState from '../../../EmptyState/emptyState';
import useAuth from '../../../../Context/context';
import useOrderContext from '../../../../Context/Order/context';
import socket from '../../../Socket/socket';
import failureImage from '../../../../Images/failure9.jpg';
import styles from './Deliveries.module.css';

const userType = {
    buyer: "buyer",
    seller: "seller"
}
const tabs = [{name: "Pending"}, {name: "Delivered"}, {name: "Confirm Delivery"}];
const sellerTabs = [{name: "Pending"}, {name: "Delivered"}];
const tabsType = {
    pending: "Pending",
    delivered: "Delivered",
    confirm: "Confirm Delivery"
}

export default function Deliveries() {
    const [loadingOrderDeliveries, setLoadingOrderDeliveries] = useState(false);
    const [displayTab, setDisplayTab] = useState({name: tabsType.pending});
    const [userContext, setUserContext] = useState(userType.seller);
    const [error, setError] = useState({});
    const { user } = useAuth();
    const { 
        sellerOrderDeliveries, 
        buyerOrderDeliveries, 
        deliveriesSet, 
        setSalesDelivery 
    } = useOrderContext();

    useEffect(() => {
        let mounted = true;
        let timer = null;
        const data  = { user }
        
        if (mounted && user && !deliveriesSet) {
            if (!loadingOrderDeliveries) {
                setLoadingOrderDeliveries(true)
                socket.emit('getUserProductOrderDeliveries', data);
            }
        }

        socket.on('getUserProductOrderDeliveriesSuccess', (response) => {
            const { data } = response;
            if (mounted && user) {               
                setSalesDelivery(data) 
                setLoadingOrderDeliveries(false);
            }  
        });

        socket.on('getUserProductOrderDeliveriesError', (response) => {
            if (mounted && user) { 
                setError(response);             
                setSalesDelivery({})
                setLoadingOrderDeliveries(false);
            }  
        });

        socket.on('orderDataChange', () => {
            if (mounted && user) {
                timer = setTimeout(() => {
                    socket.emit('getUserProductOrderDeliveries', data);
                }, 2000);
            }                         
        });
     
        return ()=> {
            mounted = false;

            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [user, deliveriesSet, setSalesDelivery]);

    const handleUserContextChange = (e) => {
        setUserContext(e.target.value);
    }

    const displayTabChild = (name) => {
        setDisplayTab({name});
    }
   
    return (
        <div className={ styles.deliveriesContainer }>
            <TabsWithFilterWrapper
            handleChange  = { handleUserContextChange }
            selectName = "userContext"
            >
                <TabsWithFilterWrapperChild
                tabsData = { userContext === userType.seller ? sellerTabs : tabs}
                displayItem ={ displayTab }
                handleTabClick = { displayTabChild }
                />
            </TabsWithFilterWrapper>
            {(userContext.toLowerCase() === userType.seller) ? (
               <SellerOrderDeliveries
               loading = { loadingOrderDeliveries }
               showPending = { displayTab?.name === tabsType.pending }
               showDelivered = { displayTab?.name === tabsType.delivered }
               showDeliveryConfirmation = { displayTab?.name === tabsType.confirm }
               orders = { sellerOrderDeliveries }
               /> 
            ) : (
                <BuyerOrderDeliveries
                loading = { loadingOrderDeliveries }
                showPending = { displayTab?.name === tabsType.pending }
                showDelivered = { displayTab?.name === tabsType.delivered }
                showDeliveryConfirmation = { displayTab?.name === tabsType.confirm }
                orders = { buyerOrderDeliveries }
                />  
            )}
        </div>
    )
}

function SellerOrderDeliveries({ 
    showPending, 
    showDelivered, 
    showDeliveryConfirmation,
    orders,
    loading
}) {
    const { pending, delivered } = orders

    return (
        <>
        {(!pending || !delivered || loading) ? (
            <LoaderSmall/>
        ) : (showPending && pending.length > 0) ? (
            <OrderDeliveries
            orders = { pending } 
            />
        ) : (showDelivered && delivered.length > 0) ? (
            <OrderDeliveries
            orders = { delivered }
            /> 
        ) : (
            <EmptyOrders
            userContext = { userType.seller } 
            pending = { showPending }
            delivered = { showDelivered }
            confirmation = { showDeliveryConfirmation }
            />
        )}
        </>
    )
}

function BuyerOrderDeliveries({ 
    showPending,
    showDelivered,
    showDeliveryConfirmation,
    orders,
    loading  
}) {
    const { pending, delivered, orderDeliveryRequests } = orders;

    return (
        <>
        {(!pending || !delivered  || loading) ? (
            <LoaderSmall/>
        ) : (showPending && pending.length > 0) ? (
            <OrderDeliveries
            orders = { pending }
            />
        ) : (showDelivered && delivered.length > 0) ? (
            <OrderDeliveries
            orders = { delivered }
            />
        ) : (showDeliveryConfirmation && orderDeliveryRequests.length > 0) ? (
            <OrderDeliveries
            usedInConfirmDelivery
            orders = { delivered }
            />
        ) : (
            <EmptyOrders
            userContext = { userType.buyer } 
            pending = { showPending }
            delivered = { showDelivered }
            deliveryConfirmation = { showDeliveryConfirmation }
            />
        )}
        </>
    )
}

function EmptyOrders({
    userContext, 
    pending, 
    delivered  
}) {

    if (userContext === userType.seller) {
        const writeUp = pending ? (
            "You do not have any pending order to deliver at the moment"
        ) : delivered ? (
            "You have not delivered any order request at the moment"
        ) : (
            "You have not recieved any delivery confirmation request yet"
        )
        
        return (
            <EmptyDashboardState
            imageSrc={ failureImage }
            writeUp = { writeUp }
            />
        )
        
    } else if (userContext === userType.buyer) {
         const writeUp = pending ? (
            "You do not have any pending order to recieve at the moment"
        ) : delivered ? (
            "You have not recieved any order delivery at the moment"
        ) : (
            "You have not recieved any delivery confirmation request yet"
        )
        
        return (
            <EmptyDashboardState
            imageSrc={ failureImage }
            writeUp = { writeUp }
            />
        )
    }
}

export function EmptyDashboardState({
    heading,
    imageSrc,
    imageAlt,
    writeUp,
    children 
}) {
    return (
        <EmptyState
        emptyContainerClassName = {styles.emptyContainer}
        emptyContentWrapperClassName = {styles.emptyContentWrapper}
        emptyImageWrapperClassName = {styles.emptyImageWrapper}
        emptyHeaderclassName = {styles.emptyHeader}
        emptyBodyClassName = {styles.emptyContentWriteup}
        heading = { heading }
        imageSrc = { imageSrc }
        imageAlt = { imageAlt }
        writeUp = { writeUp }
        >
            {children}
        </EmptyState>
    )
}


export function TabsWithFilterWrapper({ 
    handleChange, 
    selectName,
    children 
}) {
    return (
        <div className={ styles.filterTabContainer }>
            <div className={ styles.filterNav }>
                { children }
            </div>
            <div className={ styles.userFilterContainer }>
                <div className={ styles.userFilterIconWrapper }>
                    <RiListSettingsFill className={ styles.userFilterIcon }/>
                </div>
                <div className={ styles.userFilterWrapper  }>
                    <select onChange = { handleChange } name={selectName} >
                        <option value= { userType.seller }>Seller</option>
                        <option value= {  userType.buyer }>Buyer</option>
                    </select>
                </div>
            </div>  
        </div>
    )
}

export function TabsWithFilterWrapperChild({
    tabsData,
    userContext,
    displayItem,
    handleTabClick
}) {
    if (userContext) {
        return (
            <>
            {tabsData[userContext].map(({name}, i) =>
                <TabItem 
                key = { i }
                name = { name }
                showItem = { displayItem?.name === name }
                handleClick ={ handleTabClick }
                /> 
            )}
            </>
        )
    }
    return (
        <>
        {tabsData.map(({name}, i) =>
            <TabItem 
            key = { i }
            name = { name }
            showItem = { displayItem?.name === name }
            handleClick ={ handleTabClick }
            /> 
        )}
        </>
    )
}

export function TabItem({
    name,
    showItem,
    handleClick
}) {
    return (
        <div 
        className={ showItem ? `${styles.tabNavItem} ${styles.active}` : styles.tabNavItem }
        onClick = { () => handleClick(name) }
        >
            { name } 
        </div>
    )
}