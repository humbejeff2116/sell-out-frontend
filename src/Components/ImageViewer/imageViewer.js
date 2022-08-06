
import React from 'react';
import ImageSLider from '../ImageSlider/imageSlider';
import { ModalBox } from '../ModalReviews/modalReviews';
import styles from './ImageViewer.module.css';



export default function ImageViewer({ 
    closeImageViewer,
    ...props
}) { 
    return (
        <ModalBox 
        handleModal={closeImageViewer}
        dontUseDefaultModalChildContainer
        >
            <div className={styles.container}>
                <div className={styles.containerChild}>
                    <ImageSLider
                    removeButtonBorder
                    />
                </div>
            </div>
        </ModalBox>
    )
}