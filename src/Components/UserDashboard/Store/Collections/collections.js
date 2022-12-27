/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { HiDotsHorizontal } from 'react-icons/hi';
import { CgRename } from 'react-icons/cg';
import { 
    RiAddFill, 
    RiCloseFill, 
    RiDeleteBinLine, 
    RiEye2Line, 
    RiUpload2Line 
} from "react-icons/ri";
import { FiDelete } from 'react-icons/fi';
import { ModalBox } from '../../../ModalReviews/modalReviews';
import { AllStoreProducts } from '../Products/products';
import EmptyState, { EmptyStateButton } from '../../../EmptyState/emptyState';
import FormTemplate, { inputTypeConstant } from '../../../FormTemplate/formTemplate';
import { BottomPopUpBox, useBottomPopUpFor } from '../../../ModalBox/modalBox';
import { BottomSpinner, LoaderSmall } from '../../../Loader/loader';
import useAuth from '../../../../Context/context';
import socket from '../../../Socket/socket';
import failureImage from '../../../../Images/failure9.jpg';
import styles from './Collection.module.css';
import './collections.css';
import { IoMdTrendingUp } from 'react-icons/io';



const createCollectionForm = {
    id: "1",
    initial: {
        collectionName: '',
    },
    yupValidation: {
        collectionName: Yup.string().required('Name is required'),
    },
    formData: [
        {
            name: "collectionName",
            type: inputTypeConstant.text,
            label: "Collection Name",
            labelText: "",
            dontShowErrorText: true
        }
    ]
}

export default function Collections({
    collections,
    loading,
    allStoreProducts,
    collectionsErr,
    setAllStoreProducts,
}) { 
    const [deleteProductResponseMessage, setDeleteProductResponseMessage] = useState('');
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [showModalChild, setShowModalChild] = useState(false);
    const [viewedCollection, setViewedCollection] = useState({});
    const [redirect, setRedirect] = useState('');
    const [productsSelected, setProductsSelected] = useState([]);
    const [showAllStoreProducts, setShowAllStoreProducts] = useState(false);
    const [loadingCollection, setLoadingCollection] = useState(false);
    
    let timer = null;
    const disableRemoveProductButton = !productsSelected || (productsSelected.length < 1)  ? true : false;
    const collectionNavItemClassName = `store-collection-modal-nav-item  ${disableRemoveProductButton ? "disabled"  : "enabled"}`;

    useEffect(()=> {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);

    const removeProductsFromCollection = () => {
        alert(true)
    }

    const addProductsToCollection = () => {
        alert(true)
    }
    const setCollectionSelectedProducts = (product) => {
        if (!productsSelected || productsSelected.length < 1) {
            setProductsSelected([product]);
            return;
        }
        const productExist = productsSelected.findIndex(prod => prod.productId === product.productId);
        // add product if it is not in productsSelected array
        if (productExist < 0) {
            setProductsSelected(prevState => ([...prevState, product]));
            return;
        }
        // remove product if it is in productsSelected array
        const newSelectedProducts = productsSelected.filter(prod => prod.productId !== product.productId);
        setProductsSelected(newSelectedProducts);
    }

    const toggleCollectionComponent = () => {
        setLoadingCollection(true);
        let temp = viewedCollection;
        let tempProducts = allStoreProducts;
        setViewedCollection(prevState => ({name: prevState.name}));
        setAllStoreProducts([]);
        setProductsSelected([]);
        timer = setTimeout(()=> {
            setViewedCollection(temp);
            setAllStoreProducts(tempProducts);
            setShowAllStoreProducts(prevState => !prevState);
            setLoadingCollection(false);
        }); 
        //  temp = null;
        //  tempProducts = null; 
    }

    const viewCollectionProducts = (e, collection) => {
        setViewedCollection(collection);
        setShowCollectionModal(true);
        timer = setTimeout(() => setShowModalChild(true), 500);
        e.stopPropagation();
    }

    const viewAllProducts = (e, collection) => {
        setViewedCollection(collection);
        setShowAllStoreProducts(true);
        setShowCollectionModal(true);
        timer = setTimeout(() => setShowModalChild(true), 200);
        e.stopPropagation();
    }

    const closeModal = () => {
        setShowModalChild(false);
        timer = setTimeout(() => setShowCollectionModal(false), 800);
    }

    const collectionProductsContainerClass = (`
        store-collection-modal-child-wrapper 
        ${showModalChild ? "store-collection-modal-child-wrapper-show" : ""}
    `);

    if (redirect) {
        return (
            <Redirect to = { redirect }/>
        )
    }

    return (
        <div className = "store-collections-container">
        {(showCollectionModal) && (
            <ModalBox 
            dontUseDefaultModalChildContainer
            handleModal = { closeModal }
            modalContainerWrapperName = "store-collection-products-modal-container" /*index.css*/
            modalContainer = "store-collection-products-modal-container-wrapper"
            >
            {showAllStoreProducts ? (                       
                <CollectionProducts
                containerClassName = { collectionProductsContainerClass }
                showSelect
                usedForAllStoreProducts
                header = {
                    <CollectionProductsHeading
                    headingText = "All Products"
                    buttonText = { `Add To ${viewedCollection?.name}` }
                    closeIcon = { <RiCloseFill className="nav-icon"/> }
                    onClick = { addProductsToCollection }
                    toggleCollectionComponent = { toggleCollectionComponent }
                    disableRemoveProductButton = { disableRemoveProductButton }
                    collectionNavItemClassName = { collectionNavItemClassName }
                    />
                }
                loading = { loadingCollection }
                products = { allStoreProducts }
                setProductsSelected = { setCollectionSelectedProducts }
                setDeleteProductResponseMessage = { setDeleteProductResponseMessage }
                setRedirect = { setRedirect }
                />                      
            ) : (
                <CollectionProducts
                containerClassName = { collectionProductsContainerClass }
                showSelect
                header = {
                    <CollectionProductsHeading
                    headingText = { viewedCollection?.name }
                    buttonText = { `Remove From ${viewedCollection?.name}` }
                    closeIcon = { <RiAddFill className="nav-icon"/> }
                    onClick = { removeProductsFromCollection }
                    toggleCollectionComponent = { toggleCollectionComponent }
                    disableRemoveProductButton = { disableRemoveProductButton }
                    collectionNavItemClassName = { collectionNavItemClassName }
                    />
                }
                loading = { loadingCollection }
                products = { viewedCollection?.products }
                setProductsSelected = { setCollectionSelectedProducts }
                setDeleteProductResponseMessage = { setDeleteProductResponseMessage }
                setRedirect = { setRedirect }
                addProductsToCollection = { toggleCollectionComponent }
                />
            )}
            </ModalBox>
        )}
        <div 
        className = {`
            store-collections-wrapper 
            ${collections?.length > 4 ? "store-collections-wrapper-box-shadow" : ""}
            ${!collections || loading || collections?.length < 1 ? "empty-collections" : ""}
        `}
        >
        {!collections || loading ? (
            <LoaderSmall/>
        ) : collections?.length > 0 ? (
            collections.map((collection, i) => 
                <Collection 
                key = { i } 
                { ...collection }
                totalCollections = { collections.length }
                setDeleteProductResponseMessage = { setDeleteProductResponseMessage } 
                setRedirect = { setRedirect }
                viewCollectionProducts = { viewCollectionProducts }
                viewAllProducts = { viewAllProducts }
                />
            )
        ) : (
            <EmptyState
            imageSrc = { failureImage }
            imageAlt = "Illustration of an empty cart"
            heading = "No store collections"
            writeUp = "It looks like You do not have any store collections at the moment"
            >
            </EmptyState>
        )}
        </div>
        <CreateCollection/>
        </div>
    )
}

function CollectionProducts({
    header,
    products,
    loading,
    setDeleteProductResponseMessage,
    setRedirect,
    setProductsSelected,
    showSelect,
    addProductsToCollection,
    usedForAllStoreProducts,
    containerClassName
}) {
    return (
        <div className = { containerClassName }>
        { header }
        {loading ? (
            <LoaderSmall/>
        ) : (
            <AllStoreProducts
            storeContainerClassName="store-collection-products-container"
            products = { products }
            setDeleteProductResponseMessage = { setDeleteProductResponseMessage }
            setRedirect = { setRedirect }
            setProductsSelected = { setProductsSelected }
            showSelect = { showSelect }
            >
                {usedForAllStoreProducts ? (
                    <EmptyState
                    imageSrc = { failureImage }
                    imageAlt = "Illustration of no products"
                    heading = "No products"
                    writeUp = "You do not have any product for sale at the moment"
                    >
                        <EmptyStateButton
                        useLinkButton
                        buttonIcon = {
                            <RiUpload2Line className="empty-store-products-icon"/>
                        }
                        emptyStateButtonText="Upload Product"
                        href = "/home/dashboard/store/sell-product"
                        /> 
                    </EmptyState>
                ) : (
                    <EmptyState
                    imageSrc = { failureImage }
                    imageAlt = "Illustration of no products"
                    heading = "No Products"
                    writeUp = "You have not added any product to this collection at the moment"
                    >
                        <EmptyStateButton
                        buttonIcon = {
                            <RiAddFill className = { styles.formIcon }/>
                        }
                        emptyStateButtonText="Add Products"
                        handleClick = { addProductsToCollection }
                        /> 
                    </EmptyState>
                )}

            </AllStoreProducts>
        )} 
        </div>
    )
}

function CollectionProductsHeading({
    headingText,
    collectionNavItemClassName,
    disableRemoveProductButton,
    onClick,
    buttonText,
    toggleCollectionComponent,
    closeIcon
}) {
    return (
        <div className="store-collection-modal-heading">
            <div>         
                <h3>{ headingText }</h3>
            </div> 
            <div className="store-collection-modal-nav">
                <button 
                className = { collectionNavItemClassName } 
                disabled =  { disableRemoveProductButton }
                onClick = { onClick }
                >
                   { buttonText }
                </button>
                <div 
                className="store-collection-modal-nav-item add"
                onClick = { toggleCollectionComponent }
                title="Close"
                >
                    { closeIcon }
                </div>
            </div>
        </div>
    )
}

function CreateCollection({ ...props }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [error, setError] = useState(false);
    const { user } = useAuth();
    let timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    },[timer])

    useEffect(()=> {
        let timer = null;
        let mounted = true;
        socket.on('createCollectionSuccess', function(response) {
            if (mounted) {
                const { data } = response;

                timer = setTimeout(()=> {
                    setShowCreateForm(false);
                    setCreating(false);
                }, 3000);
                timer = setTimeout(()=> {
                    setMessage("Collection created successfully");
                    setShowMessage(true);
                }, 4000);         
            }
        })

        socket.on('createCollectionError', function(response) {
            if (mounted) {
                const { message } = response;
                setShowCreateForm(false);
                setCreating(false);
                setError(true);                  
            }
        }) 

        return () => {
            mounted = false;
            if (timer) clearTimeout(timer);
        }     
    }, []);

    const showForm =() => {
        setShowMessage(false);
        setShowCreateForm(true);
    }

    const closeForm = () => {
        setShowCreateForm(false);
    }

    const closePopUp = () => {
        setShowMessage(false)
    }

    const createCollection = (values) => {
        if (!user) {
            return;
        }

        const createColllectionData = {userId: user.id, collection: {name: values.collectionName}};
        alert(JSON.stringify(createColllectionData, null, 2)) // TODO... remove alert 
        setCreating(true);
        
        try {
            socket.emit('createCollection', createColllectionData);
            // collectionCreated();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="store-create-collection-container">
            <BottomSpinner
            showLoader = { creating }
            >
            Creating Collection...
            </BottomSpinner>
            <BottomPopUpBox 
            usedFor = { error ? useBottomPopUpFor.error : useBottomPopUpFor.success }
            showPopUp = { showMessage }
            message = { message }
            closePopUp = { closePopUp }
            />
            <div className="store-create-collection-wrapper">
                <h3>Add collection</h3>
                {showCreateForm ? (
                    <CreateCollectionForm
                    close = { closeForm }
                    handleSubmit = { createCollection }
                    submitting = { creating }
                    />
                ) : (
                    <CreateCollectionWriteup
                    handleCreate = { showForm }
                    />
                )}
            </div>     
        </div>
    )
}

function CreateCollectionForm({ ...props }) {
    const  inputRef = React.useRef();

    useEffect(() => {
        inputRef.current.focus();
    },[])

    return (
        <div className = { styles.createContainer }>
            <div className = { styles.createCloseContainer }>
               <div onClick = { props.close } className = { styles.createClose }>
                <RiCloseFill className = { styles.formIcon }/>
               </div>
            </div>
            <div className = { styles.formContainer }>
                <FormTemplate
                {...createCollectionForm}
                initial = { createCollectionForm.initial }
                handleSubmit = { props.handleSubmit }
                labelClassName = { styles.label }
                inputErrorClass = { styles.inputError }
                notEmptyClass = { styles.notEmpty }
                inputRef = { inputRef }
                >
                    <button 
                    className = { `${styles.formButton} ${props.submitting ? styles.disableButton : ""}` }
                    type="submit" 
                    disable = { props.submitting ? true : null }
                    >
                        <RiAddFill className = { styles.formIcon }/>
                        Create
                    </button>
                </FormTemplate>
            </div>
        </div>
    )
}

function CreateCollectionWriteup({
    handleCreate,
    ...props
}) {
    return (
        <>
            <div className="store-create-collection-writeup">
                Organize and group your products into 
                collections for an effective management 
                process
            </div>
            <div className="store-create-collection-bttn-wrpr">
                <div 
                className="store-create-collection-bttn"
                onClick = { handleCreate }
                >
                    Create Collection
                </div>
            </div>
        </>
    )
}


function Collection({
    totalCollections,
    name, 
    products, 
    totalProducts,
    viewCollectionProducts,
    viewAllProducts

}) {
    const [showCollectionMenu, setShowCollectionMenu] = useState(false);
    const collectionMenu = React.useRef();

    const toggleCollectionMenu = () => {
        setShowCollectionMenu(prevState => !prevState);
    }

    const onClickOutsideHandler = (e) => { 
        const { current } = collectionMenu;   
        if (showCollectionMenu && current && !current.contains(e.target)) {      
            setShowCollectionMenu(false);    
        }  
    }

    return ( 
        <>       
        <div className={ `store-collection ${totalCollections > 2 ? "store-collection-no-bottom-margin" : ""}`}>
            <div className="store-collection-kebab-contr-wrapper">
                <div className="store-collection-kebab-contr">
                    <div className="store-collection-total-products"> 
                        {/* <FiBookmark className="store-collection-icon"/> */}
                        { products?.length }
                    </div>
                    <div className="store-collection-kebab" onClick = { toggleCollectionMenu }>
                        <HiDotsHorizontal className="store-collection-icon"/>
                    </div>
                </div>
                <div className="store-collection-kebab-wrapper">
                    <PopupMenu 
                    totalProducts = { totalProducts }
                    ref = { collectionMenu } 
                    showMenu = { showCollectionMenu }
                    onClickOutside = { onClickOutsideHandler }
                    >
                        <button className = { styles.collectionMenuButton }>
                            <CgRename className = { styles.formIcon }/>
                            Rename 
                        </button>
                        <button className = { styles.collectionMenuButton }>
                            <RiDeleteBinLine className = { styles.formIcon }/>
                            Delete
                        </button>
                        <button className = { styles.collectionMenuButton }>
                            <RiAddFill className = { styles.formIcon }/>
                            Add Products
                        </button>
                        <button className = { styles.collectionMenuButton }>
                            <FiDelete className = { styles.formIcon }/>
                            Remove Products
                        </button>
                    </PopupMenu>
                </div>
            </div>
            <div className="store-collection-name">
                <h3>{ name }</h3>   
            </div>
            <div className="store-collection-bttn-contr">
            {totalProducts > 0 ? (
                <div 
                className="store-collection-bttn" 
                onClick=  { (e)=> viewCollectionProducts(e, {name, products}) }
                >
                    <RiEye2Line className = { styles.formIcon }/>
                    View Products
                </div>
            )  : (
                <div 
                className="store-collection-bttn" 
                onClick = { (e) => viewAllProducts(e, {name, products}) }
                >
                    <RiAddFill className = { styles.formIcon }/>
                    Add Products
                </div>
            )}
            </div>
        </div>
         </>
    )
}

export const PopupMenuWrapper = React.forwardRef(({
    menus,
    showMenu,
    onClickOutsideMenu,
    handleClick,
    filter,
    setMenuFilter,
    ...props
}, ref) => {

    const handleMenuClick = (filter) => {
        return setMenuFilter(filter);
    }

    return (
        <PopupMenu 
        ref = { ref } 
        showMenu = { showMenu }
        onClickOutside = { onClickOutsideMenu }
        >
        {menus?.map((menu, i) =>
            <PopupMenuButton 
            key = { i }
            { ...menu }
            handleClick = { handleMenuClick }
            filter = { filter }
            />
        )}
        </PopupMenu>
    )
})

export const PopupMenu = React.forwardRef(({
    showMenu,
    onClickOutside,
    children
}, ref) => {

    useEffect(()=> {
        window.addEventListener('click', onClickOutside);
        return () => window.removeEventListener('click', onClickOutside);
    }, [onClickOutside]);

    return (
        <div 
        ref = { ref }
        className = {`
        ${styles.collectionMenuContainer} 
        ${showMenu ? styles.showCollectionMenu : ""}`
        }>
            { children }
        </div>
    )
})

export function PopupMenuButton({
    icon,
    name,
    filter,
    handleClick
}) {
    const isActive = (filter, name) => {
        return filter === name;
    }

    return (
        <button 
        className = { `${styles.collectionMenuButton} ${isActive(filter, name) ? styles.activeMenu : ""}` } 
        onClick = { ()=> handleClick(name) }
        >
        { icon } 
        { name } 
        </button>
    )
}