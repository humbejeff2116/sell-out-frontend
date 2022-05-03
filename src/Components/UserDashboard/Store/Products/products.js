
import React, { useState } from 'react';
import { Redirect, Link, useLocation, useHistory } from 'react-router-dom';
import { BiTrash, BiPencil } from "react-icons/bi";
import { DisplayedProduct } from '../../../Product/product';
import { ModalBox } from '../../../ModalComments/modalComments';
import { FilterButtonComponent } from '../../../Index/filter';
import Collections from '../Collections/collections';
import useEditProductContext from '../../../../Context/EditProduct/context';
import { deleteProduct } from '../../../../Utils/http.services';
import './products.css';

const mockProducts = [
    {
        userId: 2234343,
        userName: "hummbe jeffre",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short black shirt",
        productCategory: "Furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "Never used",
        productCurrency: "Naira",
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
        productCategory: "Furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "Never used",
        productCurrency: "Naira",
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
        productCategory: "Furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "Never used",
        productCurrency: "Naira",
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
        productCategory: "Furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "Never used",
        productCurrency: "Naira",
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

    const [showAllProducts, setShowAllProducts] = useState(true);

    const [redirect, setRedirect] = useState('');

    let storeProductsComponent;

    const displayAllProducts = () => {

        setShowAllProducts(true);
            
    }

    const displayMyCollections = () => {

        setShowAllProducts(false);

    }

    if (showAllProducts) {

        storeProductsComponent = (

            <AllStoreProducts
            products = { mockProducts }
            setDeleteProductResponseMessage = { setDeleteProductResponseMessage }
            setRedirect = { setRedirect }
            />
        )

    } else { 

        storeProductsComponent = (

            <Collections/>

        )

    }
    
    if (redirect) {

        return (

            <Redirect to = {redirect} />

        )

    }
    
    return (
        
        <div className="placed-orders-container">

        <div className="store-products-stats-container">
            <div className="store-products-stats-child left">

                <div className="store-products-stats-showcase-product">
                    <h3>List a product</h3>
                    <div className="store-products-showcase-writeup">
                     Showcase more of your products to potential cutomers
                    </div>
                    <div className="store-products-showcase-link-wrapper">
                        <Link to="/home/dashboard/store/upload-product">
                            Upload Product Details
                        </Link>
                    </div>
                </div>

            </div>
            <div className="store-products-stats-child">

            </div>
        </div>

        <div className="placed-orders-header">
            <h3> Store Items</h3>
        </div>

        <div className="store-products-filter-container">
            <div className="store-products-filter-nav">

                <div 
                className={ showAllProducts ? "store-products-filter-nav-item active" : "store-products-filter-nav-item"}
                onClick = { displayAllProducts }
                >
                All products 
                </div>

                <div 
                className={ !showAllProducts ? "store-products-filter-nav-item active" : "store-products-filter-nav-item"}
                onClick = { displayMyCollections }
                >
                My collections  
                </div>

            </div>
            <FilterButtonComponent
            filterButtonClassName={"store-products-filter"}
            filterIconClassName={"store-products-filter-icon"}
            title={"Filter products"}
            />
        </div>

        { storeProductsComponent }

        </div>

    )

}

export function AllStoreProducts({ 
    products, 
    storeContainerClassName, 
    productEditPanel, 
    setDeleteProductResponseMessage, 
    setRedirect,
    setProductsSelected,
    showSelect, 
    ...props
}) {
    
    return (

        <div className={ storeContainerClassName || "store-products-container"}>
        {
            products?.length > 0 && products.map((product, i)=>
                <StoreProduct 
                key = { i }
                product = { product }
                setDeleteProductResponseMessage = { setDeleteProductResponseMessage }
                setRedirect = { setRedirect }
                productEditPanel = { productEditPanel }
                setProductsSelected = { setProductsSelected }
                showSelect = { showSelect }
                />
            )
        }
        </div>

    )

}


export function StoreProduct({ setDeleteProductResponseMessage, setProductsSelected, showSelect, productEditPanel, setRedirect, product }) {

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

            <DeleteModalChild 
            removeProduct = { ()=> deleteStoreProduct(product) } 
            cancel = { closeModal } />

        )

    }
    

    return (
        <div className={ productEditPanel || "store-product-edit-panel" }>
            {
                (showDeleteProductModal) && (

                    <ModalBox 
                    handleModal = { closeModal } 
                    // modalContainerWrapperName={"store-products-modal-container-wrapper"}
                    modalContainer = { "store-products-modal-container" }
                    >
                        { deleteModalChild }
                    </ModalBox>

                )

            }
            <div className="store-product-edit-icon-panel">
                {

                    showSelect && (

                        <div className="store-product-edit-group">
                            <div 
                            className="store-product-edit-icon checkbox"
                            >
                                <input type="checkbox" onClick={ (e)=> setProductsSelected(product) }/>
                            </div>
                        </div>

                    )

                }
                <div className="store-product-edit-group">
                    <div className="store-product-edit-icon" onClick={ ()=> editProduct(product) }>
                        <BiPencil title="Edit" className="store-icon" />
                    </div>
                </div>

                <div className="store-product-edit-group">
                    <div className="store-product-edit-icon" onClick = { openModal }>
                    <BiTrash title="Delete" className="store-icon"/>
                    </div>
                </div>
            </div>
            <DisplayedProduct 
            product = { product }
            panelClassName="store-product-panel"
            />
        </div>

    )

}

function DeleteModalChild({ cancel, removeProduct }) {

    return (

        <div className="store-products-modal-body-container">
        <div className="store-products-modal-content">
            <p>
                Are you sure you want to delete product?
            </p>
        </div>
        <div className="store-products-modal-button-container">
            <div className="store-products-modal-button left">
                <button onClick = { cancel }>Cancel</button>
            </div>

            <div className="store-products-modal-button">
                <button onClick = { removeProduct }>Delete</button>
            </div>
        </div>
        </div>

    )

}

function DeleteModalChildLoader({ onClick }) {

    return (

        <div className="store-products-modal-body-container">
        deleting...
        </div>

    )

}