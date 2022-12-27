/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BiBuildings, BiStats } from "react-icons/bi";
import { RiEyeFill, RiMap2Line, RiMapLine, RiMapPinAddLine, RiMapPinLine, RiMessage3Line, RiStarFill } from "react-icons/ri";
import {FiTruck} from 'react-icons/fi';
import { LoaderSmall } from '../Loader/loader';
import EmptyState, { EmptyStateButton }  from '../EmptyState/emptyState';
import { Region } from '../GettingStarted/ShippingAndOperations/shippingAndOperations';
import StarGiver from '../StarGiver/starGiver';
import { ModalBox } from '../ModalReviews/modalReviews';
import useSocketIsConnected from '../Hooks/socketHooks';
import socket from '../Socket/socket';
import image from '../../Images/avatar4.png';
import errorImage from '../../Images/error2.png';
import styles from './UserProfile.module.css';
import { RiMessageLine } from 'react-icons/ri';
import { ImStatsBars } from 'react-icons/im';



const user = {
    fullName: "Humbe Jeffrey",
    companyOrBusiness: {},
    legalAddress:"Behind Child Evangelical ministries makurdi benue state",
    shippingAndOperations: { },
    operationalRegions: ["benue", "kogi"]
}
export function UserModalProfileWrapper({
    handleClose,
    userId,
    userEmail,
    showModalChild
}) {
    const modalChildClassName = (
        `${styles.modalChildWrapper} ${showModalChild ? styles.scaleDown : ""}`
    )

    return (
        <ModalBox
        handleModal = { handleClose }
        dontUseDefaultModalChildContainer
        >
            <UserModalProfile 
            {...{id: userId, email: userEmail}}
            userProfileWrapper = {  modalChildClassName }
            />
        </ModalBox>
    )
}

export default function UserModalProfile({ 
    id,
    email,
    userProfileWrapper
}) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const socketIsConnected = useSocketIsConnected();

    useEffect(() => {
        let mounted = true;
        let timer = null;
        if (socketIsConnected && mounted) {
            timer = setTimeout(() => getUser({id, email}), 600);  
        }
        return ()=> {
            mounted = false;
            if(timer) {
                clearTimeout(timer);
            }
        }
    }, [socketIsConnected, id, email]);

    useEffect(() => {
        let mounted = true;

        socket.on('getUserSuccess', function (response) {
            if (socketIsConnected && mounted) {
                const { data } = response;
                setUser(data);
                setError(false);
                setLoading(false);  
            }
        })

        socket.on('getUserError', function (response) {
            if (socketIsConnected && mounted) {
                const { message, data } = response;
                setMessage(message);
                setUser({});
                setError(true);
                setLoading(false);  
            }
        })
        return ()=> mounted = false;    
    }, [socketIsConnected]);

    const getUser = ({id, email}) => {
        setLoading(true);
        socket.emit('getUser', {id: id, userEmail: email})
    }

    return (
        <div className={ userProfileWrapper || styles.modalChildWrapper }>
        {
        !user && !loading ? (
           <>
           </>
        ) : loading ? (
            <LoaderSmall/>
        ) : 
        // : error ? (
        //     <EmptyState
        //     imageSrc = { errorImage }
        //     heading = "Error!"
        //     writeUp = { message }
        //     >
        //         <EmptyStateButton
        //         buttonIcon = {
        //             <AiOutlineReload className = { styles.reloadIcon }/>
        //         }
        //         emptyStateButtonText = "Reload"
        //         handleClick = { () => getUser({id, email}) }
        //         />
        //     </EmptyState>
        // ) : 
        (
            // <UserDetails { ...user } userId ={ id } userEmail = { email }/>
            <UserDetails
            userId = { id }
            userEmail = { email }
            />
        )} 
        </div>
    )
}


function UserDetails({
    fullName,
    userId,
    userEmail,
    companyOrBusiness,
    legalAddress,
    shippingAndOperations,
    operationalRegions,
}) {
    return (
        <div className={styles.modalChild}>
           <UserAvatar userId = { userId } userEmail = { userEmail }/>
           <UserStats/>
            <div className={styles.detailsWrapper}>
                {/* <UserStats/> */}
                <UserDetailTemplate
                icon = {
                    <BiBuildings className={styles.detailIcon}/>
                }
                title = "Company/Business"
                >
                    <>
                        Lush Collections
                    </>
                    {/* <UserCompanyOrBusinessDetails companyOrBusiness ={ companyOrBusiness }/> */}
                </UserDetailTemplate>

                <UserDetailTemplate
                icon = {
                    <RiMapPinLine className={styles.detailIcon}/>
                }
                title = "Legal Address"
                >
                    <>
                        Behind Child Evangelical Ministries, off
                        Goerge Akume way, Makurdi Benue state 
                    </>
                    {/* <UserLegalAddress legalAddress ={ legalAddress }/> */}
                </UserDetailTemplate>
            </div>
            <UserViewButton 
            userId = { userId }
            userEmail = { userEmail }
            />
        </div>
    )
}

function UserStats({...props}) {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statWrapper}>
                <div className={styles.stat}>
                    <RiEyeFill className={`${styles.statIcon} ${styles.views}`}/>
                    <div>
                        views
                    </div>
                    3
                </div>
            </div>
            <div className={styles.statWrapper}>
                <div className={styles.stat}>
                    <ImStatsBars className={`${styles.statIcon} ${styles.sales}`}/>
                    <div>
                        sales
                    </div>
                    34
                </div>
            </div>
            <div className={styles.statWrapper}>
                <div className={styles.stat}>
                    <RiStarFill className={`${styles.statIcon} ${styles.stars}`}/>
                    <div>
                       stars
                    </div>
                    34
                </div>
            </div>
        </div>
    )
}

function UserViewButton(props) {
    return (
        <div className={styles.viewProductsWrapper}>
            {/* <div className={styles.avatarUserStars}>
                <StarGiver 
                iconWrapperClassName ={ styles.starContainer }
                starIconClassName = { styles.starIcon }
                seller = { props }
                />233
            </div> */}
            <div className = {styles.viewProductsChild}>
                <button>
                    View Reviews
                </button>
            </div>
            <div className={styles.viewProductsChild}>
                <button>
                    View Products
                </button>
            </div>
        </div>
    )
}

function UserAvatar({
    fullName,
    userId, 
    userEmail, 
    ...props
}) {
    return (
        <div className={styles.avatarWrapper}>

            <div className={styles.imageWrapper}>
                <img src={ image } alt=""/>
            </div>

            <div className={styles.avatarDetailsWrapper}>
                <div className={styles.avatarUserName}>
                   { fullName || "Humbe Jeffrey" }
                </div>
                <div className={styles.avatarUserEmail}>
                   { userEmail || "terdoo@gmail.com" }
                </div>
            </div>

            <div className={styles.avatarUserMessageButtonWrapper}>
                <button>
                    <RiMessageLine className={styles.avatarUserMessageButtonIcon}/>
                </button>
            </div>
        </div>  
    )
}

function UserDetailTemplate({ 
    icon, 
    title, 
    children
}) {
    return (
        <div className={styles.detailChild}>
            <div className={styles.detailTextHeader}>
                { icon }
                { title }
            </div>
            <div className={styles.detailText}>
                { children }
            </div>
        </div>
    )
}

function UserCompanyOrBusinessDetails({
    companyOrBusiness, 
    ...props
}) {
    const { registered } = companyOrBusiness;
    return (
        <>
        {registered ? (
            <div>
                { companyOrBusiness?.legalCompanyName }
            </div>
        ) : (
            <div>
                { companyOrBusiness?.businessOrBrandName}
            </div>
        )}
        </>
    )
}

function UserLegalAddress({
    legalAddress, 
}) {
    return (
        <div>
            {legalAddress?.address}
        </div>
    )
}

function UserRegions({
    operationalRegions, 
    ...props
}) {
    return (
        <>
        {operationalRegions?.length > 0 && (
            operationalRegions.map((region, i) =>
                <Region
                key = { i }
                { ...region }
                dontShowDelete
                />
            )
        )}
        </>
    )
}
