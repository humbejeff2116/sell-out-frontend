
import React, { useEffect, useState, useRef } from 'react';
import { RiCloseFill } from "react-icons/ri";
import { MdArrowForwardIos,MdArrowBackIosNew }  from 'react-icons/md';
import { ModalBox } from '../../../../ModalReviews/modalReviews';
import { ImageThumbnails } from '../../../../ImageSlider/imageSlider';
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
import './imageEditor.css'


export default function ImageEditor({ closeModal, images, ...props }) {
    const [sliderImages, setSliderImages] = useState([]);
    const [viewedImage, setViewedImage] = useState({});
    const [showCroppedImages, setShowCroppedImages] = useState(false);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({aspect: 16 / 9});
    const [result, setResult] = useState(null);
    const viewedImageIndex = useRef(0);
    const previewImagesLength = useRef(images.length);
    const cache = useRef({});

    useEffect(()=> {
        if (images.length > 0) {
            const imagesBlob = getImagesBlob(images);
            setViewedImage(imagesBlob[0]);
            setSliderImages(imagesBlob);
        }
    },[images])

    const getImagesBlob = (images) => {
        const imagesBlob = [];
        for (let i = 0; i < images.length; i++) {
            imagesBlob[i] = {src: URL.createObjectURL(images[i])}; 
        }
        return imagesBlob;
    }

    const nextImage = () => {
        if (isLastImage()) return;
        setViewedImage(sliderImages[++viewedImageIndex.current].src);
    }

    const prevImage = () => {
        if (isFirstImage()) return;
        setViewedImage(sliderImages[--viewedImageIndex.current].src);
    }

    const isFirstImage = () => {
        if (viewedImageIndex.current === 0) {
            return true;
        }
        return false;
    }

    const isLastImage = () => {
        if (viewedImageIndex.current === previewImagesLength.current - 1) {
            return true;
        }
        return false;
    }

    const setEditorUncroppedImage = (src) => {
        const imageIndex = getImageIndex(src, sliderImages);

        if (imageIndex < 0) {
            return;
        }
        viewedImageIndex.current = imageIndex;

        if (showCroppedImages) {
            setShowCroppedImages(false);
            setSliderImages(cache.current.unCroppedImagesBlob);
            cache.current = {}
        }
        return setViewedImage(src);
    }

    const setEditorCroppedImage = (src) => {
        const imageIndex = getImageIndex(src, result);

        if (imageIndex < 0) {
            return;
        }
        viewedImageIndex.current = imageIndex;

        if (!showCroppedImages) {
            setShowCroppedImages(true);
            cache.current.unCroppedImagesBlob = sliderImages;
            setSliderImages(result);
        }
        return setViewedImage(src);
    }

    const getImageIndex = (imageSrc, sliderImages) => {
        const index = sliderImages.findIndex(({src})=> src === imageSrc);
        return index;
    }

    const getCroppedImg = async () => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg", 1);
            setResult(prevState => prevState ? ([...prevState, {src: base64Image}]) : ([{src: base64Image}]));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {
                <ModalBox 
                handleModal = { closeModal }
                modalContainerWrapperName = "store-collection-products-modal-container" 
                modalContainer = "upload-product-editor-modal-container-wrapper"
                >
                    <ImageEditorPanel
                    handleClose = { closeModal }
                    next = { nextImage }
                    prev = { prevImage }
                    images = { sliderImages }
                    viewedImage = { viewedImage }
                    setImage=  { setImage }
                    crop = { crop }
                    setCrop = { setCrop }
                    result = { result }
                    getCroppedImg = { getCroppedImg }
                    setViewImage = { setEditorUncroppedImage }
                    setViewCropImage = { setEditorCroppedImage }
                    isFirstImage = { isFirstImage }
                    isLastImage = { isLastImage }
                    />
                </ModalBox>
            }
        </>
    )
}

function ImageEditorPanel({ 
    handleClose, 
    prev, 
    next,
    images,
    viewedImage,
    setViewImage,
    setImage,
    crop,
    setCrop,
    result,
    setViewCropImage,
    getCroppedImg,
    isFirstImage,
    isLastImage, 
    ...props 
}) {
    return (
        <div className="upload-product-editor-modal-child-wrapper">
            <div className="upload-product-editor-header">
                <div className="upload-product-editor-header-top">
                    <div className="upload-product-editor-header-top-close" onClick = { handleClose }>
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
                {/* TODO... Extract immage slider component */}
                <div className="upload-product-editor-body">
                    <div className="upload-product-editor-thumbnails">
                    {images?.length > 0 && images.map((image, i) =>
                        <ImageThumbnails 
                        key={i} 
                        {...image} 
                        currentlyViewedImage = { viewedImage } 
                        setViewImage = { setViewImage }
                        imageslength={ images.length }
                        />
                    )}
                    </div>
                    <div className="upload-product-editor-panel">
                        <div className="upload-product-editor-image">
                        {/* {props.viewedImage && (
                             <div>
                                <ReactCrop
                                style={{maxWidth: "50%"}}
                                src={props.viewedImage}
                                onImageLoaded={props.setImage}
                                crop={props.crop}
                                onChange={props.setCrop}
                                />
                             </div>
                         )} */}
                        </div>
                        <button 
                        className={`
                            upload-product-editor-button prev-button ${isFirstImage() ? "" : "showButton"}
                        `}
                        onClick = { prev }
                        >
                            <MdArrowBackIosNew className="buttonIcon"/>
                        </button>
                        <button 
                        className={`
                            upload-product-editor-button next-button ${isLastImage() ? "" : "showButton"}
                        `}
                        onClick = { next }
                        >
                            <MdArrowForwardIos className="buttonIcon"/>
                        </button>
                    </div>
                    <div className="upload-product-editor-thumbnails">
                        <div className="upload-product-editor-thumbnails-header">
                            Cropped Images
                        </div>
                        {result?.length > 0 && result.map((image, i) =>
                            <ImageThumbnails 
                            key={i} 
                            {...image} 
                            currentlyViewedImage = { viewedImage } 
                            setViewImage = { setViewCropImage }
                            imageslength = { result.length }
                            />
                        )}
                    </div>
                    
                </div>
            </div>
            <div className="upload-product-editor-footer">
                <div className="upload-product-editor-footer-bttn-wrrpr crop">
                    <button
                    onClick={ getCroppedImg }
                    >
                        Select
                    </button>
                </div>
                <div className="upload-product-editor-footer-bttn-wrrpr">
                    <button>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export function ImageEditorPanelTemplate({ 
    headerTopChild, 
    headerbottomChild, 
    children, 
    imageEditorPanelContainerClassName,
    imageEditorPanelHeaderClassName,
    imageEditorPanelHeaderTopClassName,
    imageEditorPanelHeaderbottomClassName,
    imageEditorPanelBodyClassName,
    ...props 
}) {  
    return (
        <div className={ imageEditorPanelContainerClassName || "upload-product-editor-modal-child-wrapper" }>
            <div className={ imageEditorPanelHeaderClassName || "upload-product-editor-header" }>
                <div className= { imageEditorPanelHeaderTopClassName || "upload-product-editor-header-top" }>
                   { headerTopChild }
                </div>
                <div className={ imageEditorPanelHeaderbottomClassName || "upload-product-editor-header-bottom" }>
                    { headerbottomChild }
                </div>
            </div>
            <div className={ imageEditorPanelBodyClassName || "upload-product-editor-body-wrapper" }>
                { children }
            </div>
        </div>
    )
}