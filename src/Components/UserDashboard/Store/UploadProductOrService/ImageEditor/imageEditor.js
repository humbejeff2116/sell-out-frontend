
import React, { useEffect, useState } from 'react';
import { RiCloseFill } from "react-icons/ri";
import { ModalBox } from '../../../../ModalComments/modalComments';
import './imageEditor.css'


export default function ImageEditor({ closeModal, images, ...props }) {

    const [unCropedImages, setUnCropedImages] = useState([]);

    const [cropedImages, setCropedImages] = useState([]);

    const [currentViewedImage, setCurrentViewedImage] = useState({});

    let currentViewedImageIndex = React.useRef(0);

    let previewImagesLength = React.useRef(images.length);

    // useEffect(()=> {

    //     if (images?.length > 0) { 

    //         getResizedImages(images, setResizedImages);

    //     }

    // },[images])

    useEffect(()=> {

        setCurrentViewedImage(images[0]);

        return () => {


        }

    },[images])

    const nextImage = () => {
        
        // stop the increment of currentViewedImage 
        if (currentViewedImageIndex.current === previewImagesLength.current - 1) {

            alert(true)

            return;
        }

        ++currentViewedImageIndex.current

        alert(currentViewedImageIndex.current)

    }

    const prevImage = () => {

        if (currentViewedImageIndex.current === 0) {

            alert(true)

            return;
        }

        --currentViewedImageIndex.current

        alert(currentViewedImageIndex.current)

    }


    return (

        <>
        {
            <ModalBox 
            handleModal = { closeModal }
            modalContainerWrapperName = {"store-collection-products-modal-container"} 
            modalContainer = {"upload-product-editor-modal-container-wrapper"}
            >
                <ImageEditorPanel
                next = { nextImage }
                prev = { prevImage }
                />

            </ModalBox>
        }
        </>

    )

}


function ImageEditorPanel({ close, previous, next, ...props }) {
    
    return (

        <div className="upload-product-editor-modal-child-wrapper">
            <div className="upload-product-editor-header">

                <div className="upload-product-editor-header-top">
                    <div className="upload-product-editor-header-top-close" onClick = { close }>
                        <RiCloseFill className="upload-product-editor-close-icon"/>
                    </div>
                </div>

                <div className="upload-product-editor-header-bottom">
                    <div className="upload-product-editor-nav-item">
                        Image crop
                    </div>
                </div>
            </div>

            <div className="upload-product-editor-body-wrapper">
                <div className="upload-product-editor-hint">
                    <div> Expand and drag the box region above any part of image and click "Select" to crop </div>
                </div>

                <div className="upload-product-editor-body">
                    <div className="upload-product-editor-thumbnails">

                    </div>

                    <div className="upload-product-editor-panel">
                        <div className="upload-product-editor-image">

                        </div>

                        <div className="upload-product-editor-prev-button" onClick = { previous } >
                            -
                        </div>
                        <div className="upload-product-editor-next-button" onClick = { next } >
                            +
                        </div>
                    </div>
                </div>
            </div>

            <div className="upload-product-editor-footer">
                <div className="upload-product-editor-footer-bttn-wrrpr crop">
                    <button>Select</button>
                </div>

                <div className="upload-product-editor-footer-bttn-wrrpr">
                    <button>Cancel</button>
                </div>
            </div>
        </div>

    )

}