
import React from 'react';
import { RiCloseFill } from "react-icons/ri";
import './modalComments.css';

export default function ModalComment({ handleClose, show,  modalDisplayedProduct, commentBox }) {

    return(

        <div className="modal-comment-product-wrapper">

            <div className="modal-comment-product-comment-bttn-wrapper">
                <RiCloseFill className="nav-icon"  onClick={ handleClose }/>
            </div>
             
            <div className="modal-comment-product-container">

                <div className="modal-comment-product-comment-panel">                   
                { modalDisplayedProduct }
                { commentBox}
                </div>

            </div>

        </div> 

    )

}



export function ModalBox({ modalContainerWrapperName, handleModal, modalContainer, children }) {
   
    return(

        <div className={ modalContainerWrapperName || "modal-comment-product-wrapper" }>
             <div className="modal-comment-product-comment-bttn-wrapper">
                <RiCloseFill className="nav-icon"  onClick={ handleModal }/>
            </div>
            <div className={ modalContainer || "modal-comment-product-container" }>
               
                { children }

            </div>
        </div>

    )

}