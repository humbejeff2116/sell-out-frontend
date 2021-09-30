




import React from 'react';
import './modalComments.css';
import {RiCloseFill} from "react-icons/ri";
import {CommentBox} from '../Product/CommentBox/commentBox';


export default function ModalComment({ handleClose, show,  modalDisplayedProduct, commentBox }) {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return(
        <div className="modal-comment-product-wrapper">

            <div className="modal-comment-product-container">
                <div className="modal-comment-product-comment-bttn-container">
                    <div className="modal-comment-product-comment-bttn-wrapper">
                    <RiCloseFill className="nav-icon"  onClick={ handleClose }/>
                    </div>
                </div>

                <div className="modal-comment-product-comment-panel">
                { modalDisplayedProduct}
                { commentBox}
               

                    {/* <div className="modal-comment-product-comment-product">
                       { modalDisplayedProduct}
                    </div>
                    <div className="modal-comment-product-comments-container">
                       { commentBox}
                    </div> */}

                </div>
            </div>

        </div> 

    )
}