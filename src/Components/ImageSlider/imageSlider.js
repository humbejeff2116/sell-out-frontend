import React, { useEffect, useState, useRef } from 'react';
import { MdArrowForwardIos,MdArrowBackIosNew }  from 'react-icons/md';
import image2 from '../../Images/product4.webp';
import image1 from '../../Images/product3.webp';
import image3 from '../../Images/product6.webp';
import image4 from '../../Images/product.webp';
import image5 from '../../Images/product5.webp';
import styles from './ImageSlider.module.css';

const images = [
    {src: image2}, 
    {src: image1},
    {src: image3},
    {src: image4},
    {src: image5},
]

export default function ImageSLider({ 
    // images, 
    dontShowThubnails,
    onClickImage,
    removeButtonBorder,
    ...props 
}) {
    const [sliderImages, setSliderImages] = useState([]);
    const [viewedImage, setViewedImage] = useState("");
    const currentViewedImageIndex = useRef(0);

    useEffect(()=> {
        if (images.length > 0) {
            setViewedImage(images[0].src);
            setSliderImages(images);
        }   
    }, [])

    const setProductImage = (src) => {
        const imageIndex = getImageIndex(src);
        if (imageIndex < 0) {
            return;
        }
        currentViewedImageIndex.current = imageIndex;
        return setViewedImage(src);
    }

    const getImageIndex = (imageSrc) => {
        const index = sliderImages.findIndex(({src})=> src === imageSrc);
        return index;
    }

    const nextImage = () => {
        if (isLastImage()) return;
        setViewedImage(sliderImages[++currentViewedImageIndex.current].src);
    }

    const prevImage = () => {
        if (isFirstImage()) return;
        setViewedImage(sliderImages[--currentViewedImageIndex.current].src);
    }

    const isFirstImage = () => {
        if (currentViewedImageIndex.current === 0) {
            return true;
        }
        return false;
    }

    const isLastImage = () => {
        if (currentViewedImageIndex.current === images.length - 1) {
            return true;
        }
        return false;
    }

    return (
        <div className={ styles.container }>
            {dontShowThubnails ? "" : (
                <div className={ styles.thumbnailsContainer }>
                {sliderImages.length > 0 && sliderImages.map((image, i)=>
                    <ImageThumbnails 
                    key={ i } 
                    { ...image } 
                    currentlyViewedImage = { viewedImage } 
                    setViewImage = { setProductImage }
                    imageslength={images.length}
                    />
                )}
                </div>
            )}
            <div className={ styles.panel }>
                <div className={ styles.imageWrapper }>
                    <img 
                    src = {viewedImage} 
                    alt="product"
                    onClick={onClickImage}
                    />
                </div>
                {sliderImages.length > 0 && ( 
                    <button 
                    className={`
                        ${styles.prevButton} 
                        ${removeButtonBorder ? styles.noBorder : ""} 
                        ${isFirstImage() ? "" : styles.showButton}
                    `} 
                    onClick = { prevImage }
                    >
                        <MdArrowBackIosNew className={styles.buttonIcon}/>
                    </button>   
                )}
                {sliderImages.length > 0 && (                        
                    <button 
                    className={`
                        ${styles.nextButton} 
                        ${removeButtonBorder ? styles.noBorder : ""}
                        ${isLastImage() ? "" : styles.showButton}
                    `} 
                    onClick = { nextImage }
                    >
                        <MdArrowForwardIos className={styles.buttonIcon}/>
                    </button>
                )}
            </div>
        </div>
    )
}

export function ImageThumbnails({
    src, 
    currentlyViewedImage, 
    setViewImage,
    imageslength,
    ...props
}) {
    const thumbnailClassName = (src === currentlyViewedImage) ? (
        `${styles.thumbnailWrapper} ${styles.focus} ${imageslength > 5 ? styles.thumbnailWrapperOverflow : ""}`
    ) : (
        `${styles.thumbnailWrapper} ${imageslength > 5 ? styles.thumbnailWrapperOverflow : ""}`
    )

    return (
        <div 
        className={thumbnailClassName} 
        onClick={ ()=> setViewImage(src) }
        >
            <img src={src} alt=""/>
        </div>
    )
}