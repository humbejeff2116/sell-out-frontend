import React, { useEffect, useState, useRef } from 'react';
import {  
    MdArrowForwardIos, 
    MdArrowBackIosNew 
}  from 'react-icons/md';
import image2 from '../../Images/product4.webp';
import styles from './ImageSlider.module.css';


export default function ImageSLider({ images, ...props }) {
    const [sliderImages, setSliderImages] = useState([]);
    const [viewedImage, setViewedImage] = useState("");
    const [loading, setloading] = useState(false);
    const sliderImagesLength = useRef(images.length);
    const currentViewedImageIndex = useRef(0);

    useEffect(()=> {
        if (images.length > 0) {
            setViewedImage(images[0].src);
            setSliderImages(images);
        }   
    }, [images])

    const setProductImage = (src) => {
        return setViewedImage(src);
    }

    const nextImage = () => {
        if (currentViewedImageIndex.current + 1 === sliderImagesLength) return;
        setViewedImage(sliderImages[++currentViewedImageIndex.current].src);
    }

    const prevImage = () => {
        if (currentViewedImageIndex.current === 0) return;
        setViewedImage(sliderImages[--currentViewedImageIndex.current].src);
    }

    return (
        <div className={ styles.imageSLiderContainer }>
            <div className={ styles.imageSLiderThumbnailsContainer }>
            {
                sliderImages.length > 0 && (
                    sliderImages.map((image, i)=>
                        <ImageSliderThumbnail 
                        key={ i } 
                        { ...image } 
                        currentlyViewedImage = { viewedImage } 
                        setViewImage = { setProductImage }
                        />
                    ) 
                )
            }
            </div>
            <div className={ styles.imageSLiderPanel }>
                <div className={ styles.imageSLiderImage }>
                    <img src = { viewedImage || image2 } alt="product"/>
                </div>
                <div className={ styles.imageSLiderPrevButton } onClick = { prevImage }>
                    <MdArrowBackIosNew className={ styles.imageSLiderButtonIcon }/>
                </div>
                <div className={ styles.imageSLiderNextButton } onClick = { nextImage }>
                    <MdArrowForwardIos className={ styles.imageSLiderButtonIcon }/>
                </div>
            </div>
        </div>
    )
}

function ImageSliderThumbnail({src, currentlyViewedImage, setViewImage}) {
    const thumbnailClassName = ( src === currentlyViewedImage ) ? (
        `${styles.imageSliderThumbnail} ${styles.focus}`
    ) : (
        `${styles.imageSLiderThumbnail}`
    )

    return (
        <div className={ thumbnailClassName } onClick={ ()=> setViewImage(src) }>
            <img src={src || image2} alt={ src }/>
        </div>
    )
}