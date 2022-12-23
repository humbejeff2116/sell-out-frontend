
import React, { useState, useEffect } from 'react';
import { LoaderSmall } from '../../../Loader/loader';
import { PaymentWrapper } from '../MadePayments/paymentsMade';
import { 
    EmptyDashboardState, 
    TabsWithFilterWrapper,
    TabsWithFilterWrapperChild 
} from '../../Order/Deliveries/deliveries';
import useOrderContext from '../../../../Context/Order/context';
import useAuth from '../../../../Context/context';
import socket from '../../../Socket/socket';
import failureImage from '../../../../Images/failure9.jpg';
import styles from '../../Order/Deliveries/Deliveries.module.css';

const userType = {
    buyer: "buyer",
    seller: "seller"
}

const tabs = {
    seller: [{name: "Pending"}, {name: "Recieved"}],
    buyer: [{name: "Unreleased"}, {name: "Released"}]
}

const tabsType = {
    buyer: {
        released: "Released",
        unReleased: "Unreleased"
    },
    seller: {
        pending: "Pending",
        recieved: "Recieved"
    }
}

export default function Payments(props) {
    const [loadingPayments, setLoadingPayments] = useState(false);
    const [displayTab, setDisplayTab] = useState({name: tabsType.seller.pending});
    const [userContext, setUserContext] = useState(userType.seller);
    const { user } = useAuth();
    const { 
        sellerPayments, 
        buyerPayments, 
        paymentsSet, 
        setSalesPayments 
    } = useOrderContext();

    useEffect(() => {
        if (userContext !== userType.seller) {
            setDisplayTab({name: tabsType.buyer.unReleased});   
        } else {
            setDisplayTab({name: tabsType.seller.pending}); 
        }
    }, [userContext])

    useEffect(() => {
        let mounted = true;
        let timer = null;
        

        if (mounted && user && !paymentsSet) {
            setLoadingPayments(true)
            socket.emit('getUserProductOrderPayments', { user });    
        }

        socket.on('getUserProductOrderPaymentsSuccess', (response) => {
            const { data } = response;
            if (mounted && user) {         
                setSalesPayments(data)
                setLoadingPayments(false);
            }  
        });

        socket.on('getUserProductOrderPaymentsError', (response) => {
            const { message } = response;      
            if (mounted && user) {         
                setSalesPayments({})
                setLoadingPayments(false);
            }  
        });

        socket.on('orderDataChange', () => {
            if (mounted && user) {
                timer = setTimeout(() => {
                    socket.emit('getUserProductOrderPayments', { user });
                }, 2000)
            }                          
        });
        
        return ()=> {
            mounted = false;
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [user]);

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
                tabsData = { tabs }
                userContext = { userContext }
                displayItem ={ displayTab }
                handleTabClick = { displayTabChild }
                />
            </TabsWithFilterWrapper>
            {(userContext.toLowerCase() === userType.seller) ? (
                <SellerPayments
                loading = { loadingPayments }
                showPending = { displayTab?.name === tabsType.seller.pending }
                showRecieved = { displayTab?.name === tabsType.seller.recieved }
                payments = { sellerPayments }
                />
                
            ) : (
                <BuyerPayments
                loading = { loadingPayments }
                showUnReleased = { displayTab?.name === tabsType.buyer.unReleased }
                showReleased = { displayTab?.name === tabsType.buyer.released }
                payments = { buyerPayments }
                />
            )}
        </div>
    )
}

function SellerPayments({
    showPending,
    showRecieved,
    payments,
    loading 
}) {
    const { pending, recieved } = payments;

    return (
        <>
        {(!pending || !recieved || loading) ? (  
            <LoaderSmall/>
        ) : (showPending && pending.length > 0) ? (
            <PaymentWrapper
            payments = { pending }
            />
        ) : (!showPending && recieved.length > 0) ? (
            <PaymentWrapper
            payments = { recieved}
            />
        ) : (
            <EmptyOrders
            userContext ={ userType.seller }
            pending = { showPending }
            recieved = { showRecieved }
            />
        )}
        </>
    )
}

function BuyerPayments({ 
    payments,
    loading, 
    showUnReleased,
    showReleased 
}) {
    const { unReleased, released } = payments;

    return (
        <>
        {(!unReleased || !released  || loading) ? (
            <LoaderSmall/>
        ) : (showUnReleased && unReleased.length > 0) ? (
            <PaymentWrapper
            payments = { unReleased }
            />
        ) : (!showUnReleased && released.length > 0) ? (
            <PaymentWrapper
            payments = { released }
            />
        ) : (
            <EmptyOrders
            userContext ={ userType.buyer }
            unReleased = { showUnReleased }
            released = { showReleased }
            />
        )}
        </>
    )
}

function EmptyOrders({ 
    userContext,
    pending, 
    recieved, 
    unReleased, 
    released 
}) {

    if (userContext.toLowerCase() === userType.seller) {
        const writeUp = pending ? (
            "You do not have any pending funds to recieve at the moment"
        ) : recieved ? (
            "You have not recieved any funds at the moment"
        ) : (
            ""
        )

        return (
            <EmptyDashboardState
            imageSrc={ failureImage }
            writeUp = { writeUp }
            />
        )
    } else if (userContext.toLowerCase() === userType.buyer) {
        const writeUp = unReleased ? (
            "You've not made any transaction involving funds on this platform yet"
        ) : released ? (
            "You've not released any funds on this platform yet"
        ) : (
            ""
        )
        return (
            <EmptyDashboardState
            imageSrc={ failureImage }
            writeUp = { writeUp }
            />
        )
    }
}