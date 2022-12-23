
import React, { useEffect, useState } from 'react';
import { ModalBox } from '../../../ModalReviews/modalReviews';
import { LoaderSmall } from '../../../Loader/loader';
import { ImageEditorPanelTemplate } from '../../Store/UploadProductOrService/index';
import { OrderProductDetails, ConfirmOrderDeliveryModal } from '../SharedComponents/sharedComponents';
import ImageSLider from '../../../ImageSlider/imageSlider';
import useAuth from '../../../../Context/context';
import socket from '../../../Socket/socket';
import './placedOrdersModal.css';

export default function PlacedOrderModal({ 
    orderProducts, 
    placedOrderId,
    showModalChild, 
    closeModal, 
    dontShowConfirmButton,
    ...props 
}) {
    const modalChildClassName = showModalChild ? (
        `placed-order-products-modal-wrapper transform`
    ) :(
        `placed-order-products-modal-wrapper`
    )

    return (
        <ModalBox 
        handleModal = { closeModal }
        modalContainerWrapperName = "placed-order-products-modal-container" 
        dontUseDefaultModalChildContainer 
        >
            <PlacedOrderModalChild
            modalChildWrapperClassName = { modalChildClassName }
            orderProducts ={ orderProducts }
            placedOrderId = { placedOrderId }
            headerBottomChild = { props.userAvatar }
            dontShowConfirmButton={ dontShowConfirmButton }
            />
        </ModalBox>
    )
}

export function PlacedOrderModalChild({ 
    orderProducts, 
    placedOrderId,
    modalChildWrapperClassName,
    dontShowConfirmButton, 
    ...props 
}) {
    const [showConfirmOrderDeliveryModal, setShowConfirmOrderDeliveryModal] = useState(false);
    const [showConfirmOrderDeliveryModalChild, setShowConfirmOrderDeliveryModalChild] = useState(false);
    const [orderToConfirmDelivery, setOrderToConfirmDelivery] = useState(null);
    const [confirmingOrderDelivery, setConfirmingOrderDelivery] = useState(false);
    const [confirmOrderDeliveryResponse, setConfirmOrderDeliveryResponse] = useState('');
    const [confirmOrderDeliveryErrorMssg, setConfirmOrderDeliveryErrorMssg] = useState('');
    const [showModalLoader, setShowModalLoader] = useState(false)
    const [showProducts, setShowProducts] = useState(false)
    const { user } = useAuth();
    let timer = null;

    useEffect(() => {
        let mounted = true;
        
        socket.on('confirmDeliverySuccess', (response) => {
            // TODO... set confirm delivery success or error message
            const { message } = response;

            if (mounted && user) {
                setShowConfirmOrderDeliveryModal(false);
                setOrderToConfirmDelivery(null);
                setConfirmingOrderDelivery(false);
                setConfirmOrderDeliveryResponse(message);
                setConfirmOrderDeliveryErrorMssg('false');
            }    
        })

        socket.on('confirmDeliveryError', (response) => {
            const { message } = response;

            if (mounted && user) {
                setShowConfirmOrderDeliveryModal(false);
                setOrderToConfirmDelivery(null);
                setConfirmOrderDeliveryResponse('');
                setConfirmOrderDeliveryErrorMssg(message); 
                setConfirmingOrderDelivery(false);
            }
        })

        return ()=> {
            mounted = false;
            if (timer) clearTimeout(timer)
        }
    }, [timer, user]);

    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => setShowModalLoader(true), 900)
        if (showModalLoader) {
            timer = setTimeout(()=> setShowProducts(true), 3000)
        }
        return () => {
            if (timer) {
                setShowProducts(false)
                clearTimeout(timer)
            }
        }
    }, [showModalLoader]);

    const openConfirmOrderDeliveryModal = (order, placedOrderId) => {
        order.placedOrderId = placedOrderId;
        setOrderToConfirmDelivery(order);
        setShowConfirmOrderDeliveryModal(true);
        timer = setTimeout(() => {
            setShowConfirmOrderDeliveryModalChild(true);
        });   
    }

    const closeConfirmOrderDeliveryModal = () => {
        setShowConfirmOrderDeliveryModalChild(false);
        setConfirmingOrderDelivery(false);
        setOrderToConfirmDelivery(null);
        timer = setTimeout(() => {
            setShowConfirmOrderDeliveryModal(false);
        }, 300);
    }

    const confirmOrderDelivery = async (order, user) => {
        alert(JSON.stringify(order, null, 2))
        // const confirmOrderData = { order, user }
        // socket.emit('confirmDelivery', confirmOrderData)
    }

    return (
        <div className = { modalChildWrapperClassName }>
            <ImageEditorPanelTemplate
                headerTopChild = {
                    <HeaderTitle
                    title = "Ordered products from:"
                    />
                }
                headerbottomChild = { props.headerBottomChild } 
                imageEditorPanelContainerClassName = "placed-order-products-modal-child-container"
                imageEditorPanelHeaderClassName = "placed-order-products-modal-child-header-container"
                imageEditorPanelHeaderTopClassName = "placed-order-products-modal-child-header-top"
                imageEditorPanelHeaderbottomClassName = "placed-order-products-modal-child-header-bottom"
                imageEditorPanelBodyClassName = "placed-order-products-modal-child-body-wrapper"
                >
                {!showModalLoader ? (
                    <> </>
                ) : !showProducts && showModalLoader ? (
                    <LoaderSmall/>
                ) : (
                    <PlacedOrderProducts
                    { ...orderProducts }
                    modalBox = { 
                        <ConfirmOrderDeliveryModal
                        dontShowModalCloseButton
                        usedInPlacedOrderModal
                        handleModal = { closeConfirmOrderDeliveryModal }
                        showConfirmOrderDeliveryModalChild = { showConfirmOrderDeliveryModalChild }
                        confirmDelivery = { confirmOrderDelivery }
                        cancelConfirmDelivery = { closeConfirmOrderDeliveryModal }
                        order = { orderProducts }
                        user = { user } 
                        /> 
                    }
                    showConfirmOrderDeliveryModal= { showConfirmOrderDeliveryModal }
                    />
                )}
            </ImageEditorPanelTemplate> 
            {dontShowConfirmButton ? "" : (
                showProducts && (
                    <div className="placed-order-products-modal-child-confirm-bttn-cntr">
                        <button 
                        onClick = {()=> openConfirmOrderDeliveryModal(
                            orderProducts, 
                            placedOrderId
                        )}
                        >
                            Confirm Delivery
                        </button>
                    </div>
                )  
            )}   
       </div>
    )
}

function HeaderTitle({ 
    title, 
}) {
    return (
        <div className="placed-order-products-modal-child-heading">
            { title } 
        </div> 
    )
}

function PlacedOrderProducts({ 
    products,
    modalBox,
    showConfirmOrderDeliveryModal
}) {
    return  (
        <>
        { showConfirmOrderDeliveryModal && modalBox }
        {products.length > 0 && products.map((product, i) =>
            <PlacedOrderProductTemplate
            key = { i }
            { ...product }
            />
        )}
        </>
    )
}

function PlacedOrderProductTemplate({ ...props }) {
    return (
        <div className="placed-order-product-template-container">
            <div className="placed-order-product-template-left">
                <PlacedOrderProductImage { ...props }/>
            </div>
            <div className="placed-order-product-template-right">
                <OrderProductDetails 
                dontUseShowMoreIcon
                order = { props }
                { ...props }
                />
            </div>
        </div>
    )
}

function PlacedOrderProductImage({ 
    productImages, 
    ...props 
}) {
    return (
        <div>
            <ImageSLider/>
        </div>
    )
}