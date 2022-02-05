


import React, { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { DisplayedProduct } from '../../../Product/product';
import { ModalBox } from '../../../ModalComments/modalComments';
import { deleteProduct } from '../../../../Utils/http.services';
import { BiTrash, BiEdit } from "react-icons/bi";
import useEditProductContext from '../../../../Context/EditProduct/context';
import './products.css';

const mockProducts = [
    {
        userId: 2234343,
        userName: "hummbe jeffre",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short black shirt",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe j",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe jj",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "hummbe effrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
];


export default function StoreProducts(props) {
   
    const [deleteProductResponseMessage, setDeleteProductResponseMessage] = useState('');
    const [redirect, setRedirect] = useState('')
    
    if (redirect) {
        return (
            <Redirect to = {redirect} />
        )
    }
    return (
        
        <div className="placed-orders-container">
            
        <div className="placed-orders-header">
            <h3> Store Products</h3>
        </div>
        <div className="store-products-search-container">
            <div className="store-products-search">
                <form>
                    <label htmlFor="order-search"> Search by product name</label>
                    <div className="store-products-search-input">
                        <input type="text" />
                        <button>Search</button>
                    </div>
                   
                </form>
            </div>
        </div>

        <div className="store-products-container">
        {
            mockProducts.map((product, i)=>
                <StoreProduct 
                key = {i}
                product = {product}
                setDeleteProductResponseMessage={setDeleteProductResponseMessage}
                setRedirect={setRedirect}
                deleteProduct = {deleteProduct}
                />
            )
        }
        </div>
        </div>
    )
}



function StoreProduct({ setDeleteProductResponseMessage, setRedirect, product }) {
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { setProductToEdit } = useEditProductContext();
    let deleteModalChild;
    const deleteStoreProduct = async (product) => {
        
        try {
            setDeletingProduct(true);
            const deleteProductResponse = await deleteProduct(product);
            setDeletingProduct(false);
            setShowDeleteProductModal(false);
            setDeleteProductResponseMessage(deleteProductResponse.message);
        } catch(err) {
        

        }   
    }
    const editProduct = (product) => {

        setProductToEdit([product]);
        history.push(location.pathname);
        setRedirect("/home/dashboard/store/edit-product");
    }
    const closeModal = () => {
        setShowDeleteProductModal(false);
    }
    const openModal =() => {
        setShowDeleteProductModal(true);
    }
    if (deletingProduct) {
        deleteModalChild = (
            <DeleteModalChildLoader />
        )
    } else {
        deleteModalChild = (
            <DeleteModalChild removeProduct = {()=>deleteStoreProduct(product)} cancel={closeModal} />
        )

    }
    

   
    return (
        <div className="store-product-edit-panel">
            {
                (showDeleteProductModal) && (
                    <ModalBox 
                    handleModal={closeModal} 
                    modalContainerWrapperName={"store-products-modal-container-wrapper"}
                    modalContainer={"store-products-modal-container"}
                    >
                        {deleteModalChild}
                    </ModalBox>
                )

            }
            <div className="store-product-edit-icon-panel">
                <div className="store-product-edit-group">
                    <div className="store-product-edit-icon">
                        <BiEdit title="Edit" className="store-icon" onClick={()=> editProduct(product)}/>
                    </div>
                </div>

                <div className="store-product-edit-group">
                    <div className="store-product-edit-icon">
                    <BiTrash title="Delete" className="store-icon" onClick={openModal}/>
                    </div>
                </div>
            </div>
            <DisplayedProduct 
            product={product}
            panelClassName="store-product-panel"
            />
        </div>
    )
}

function DeleteModalChild({cancel, removeProduct}) {
    return (
        <div className="store-products-modal-body-container">
        <div className="store-products-modal-content">
            <p>
                Are you sure you want to delete product?
            </p>
        </div>
        <div className="store-products-modal-button-container">
            <div className="store-products-modal-button">
                <button onClick={cancel}>Cancel</button>
            </div>

            <div className="store-products-modal-button">
                <button onClick={removeProduct}>Delete</button>
            </div>
        </div>
        </div>
    )
}
function DeleteModalChildLoader({onClick}) {
    return (
        <div className="store-products-modal-body-container">
        deleting...
        </div>
    )
}