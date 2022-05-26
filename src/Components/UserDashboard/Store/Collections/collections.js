
import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { ModalBox } from '../../../ModalComments/modalComments';
import { AllStoreProducts} from '../Products/products';
import useAuth from '../../../../Context/context';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { FiBookmark } from 'react-icons/fi';
import socket from '../../../Socket/socket';
import './collections.css'

const mockCollections = [ 
    
    {
        name: "Default",
        products: [
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 23232343,
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
                productId: 237672323,
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
                userId: 2237684343,
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
            {
                userId: 223409343,
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
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 2398785672323,
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
          
        ],
        totalProducts: 3
    },


    {
        name: "Clothes",
        products: [
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 2323676923,
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
                productId: 232387854523,
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
                productId: 23237670223,
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
          
        ],
        totalProducts: 4
    },


    {
        name: "Shoes",
        products: [
            {
                userId: 2234343,
                userName: "hummbe effrey",
                userEmail: "humbejeff@gmail.com",
                userProfilePicture: "",
                productId: 232232890323,
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
                productId: 232324343,
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
                productId: 65232323,
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
          
        ],
        totalProducts: 4
    }
  
]

export default function Collections() {
    const [collections, setCollections] = useState([]);
    const [allStoreProducts, setAllStoreProducts] = useState([]);
    const [collectionsErr, setCollectionsErr] = useState('');
    const [deleteProductResponseMessage, setDeleteProductResponseMessage] = useState('');
    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [viewedCollection, setViewedCollection] = useState({})
    const [redirect, setRedirect] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [productsSelected, setProductsSelected] = useState([]);
    const [showAddProductsToCollectionComp, setShowAddProductsToCollectionComp] = useState(false);
    let isMounted = useRef(false);
    const { user } = useAuth();
    let timer = null;
    let MoadlBoxChild;
    const disableRemoveProductButton = (!productsSelected || productsSelected.length < 1 ) ? true : false
    const collectionNavItemClassName = disableRemoveProductButton ? ( 
        "store-collection-modal-nav-item disabled"
    ) : (
        "store-collection-modal-nav-item enabled"
    )

    useEffect(()=> {
        isMounted.current = true;

        return ()=> {
          isMounted.current = false;
        }
    }, []);

    useEffect(()=> {
        if (socket.connected) {
            setSocketConnected(true)           
        } else {
            socket.on('connect', ()=> {
                setSocketConnected(true)     
            })
        }

        if (socketConnected && isMounted.current && user) {    
            getUserCollections(user);
        }
    }, [socketConnected, user]);

    useEffect(()=> {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);

    const getUserCollections = ({ userId, userEmail, userCollections }) => {
        try {
            socket.emit('getUserCollections', { userId, userEmail, userCollections })

            socket.on('getUserCollectionsSuccess', function(response) {
                if (isMounted.current) {
                    const { data } = response;       
                    setCollections(data)
                }
            })

            socket.on('getUserCollectionsError', function(response) {
                if (isMounted.current) {
                    const { message } = response;
                    return setCollectionsErr(message);                   
                }
            })           
        } catch(err) {
            console.error(err)
        }
    }

    const removeProductsFromCollection = () => {
        alert(true)
    }

    const addProductsToCollection = () => {
        alert(true)
    }
    const setCollectionProducts = (product) => {
        if (!productsSelected || productsSelected.length < 1) {
            setProductsSelected([product]);
            return;
        }

        const productExist = productsSelected.findIndex( prod => prod.productId === product.productId)
        if (productExist < 0) {
            setProductsSelected( prevState => ([ ...prevState, product ]))
            return
        }
        
        const newSelectedProducts = productsSelected.filter(prod => prod.productId !== product.productId)
        setProductsSelected(newSelectedProducts)
    }

    const showAddToCollectionComponent = () => {
        setProductsSelected([])
        setShowAddProductsToCollectionComp(prevState => !prevState)
    }

    if (showAddProductsToCollectionComp) {
        MoadlBoxChild = (
            <div className="store-collection-modal-child-wrapper">
                <div className="store-collection-modal-heading">
                    <div>         
                        <h3>All Products </h3>
                    </div> 
                    <div className="store-collection-modal-nav">
                        <div 
                        className={ collectionNavItemClassName } 
                        disabled={ disableRemoveProductButton }
                        onClick={ addProductsToCollection }
                        >
                            Add Selected
                        </div>
                        <div 
                        className="store-collection-modal-nav-item add"
                        onClick = { showAddToCollectionComponent }
                        title ="Close"
                        >
                            <RiCloseFill className="nav-icon"/>
                        </div>
                    </div>
                </div>
                <AllStoreProducts
                storeContainerClassName ="store-collection-products-container"
                productEditPanel= "store-collection-product-edit-panel"
                products = { viewedCollection?.products }
                setDeleteProductResponseMessage={ setDeleteProductResponseMessage }
                setRedirect={ setRedirect }
                setProductsSelected = { setCollectionProducts }
                showSelect
                />
            </div>
        )
    } else {
        MoadlBoxChild = (
            <div className="store-collection-modal-child-wrapper">
                <div className  ="store-collection-modal-heading">
                    <h3>{ viewedCollection?.name } </h3>
                    <div className="store-collection-modal-nav">
                        <div 
                        className={ collectionNavItemClassName } 
                        disabled={ disableRemoveProductButton }
                        onClick={ removeProductsFromCollection }
                        >
                            Remove Selected
                        </div>
                        <div 
                        className="store-collection-modal-nav-item add"
                        onClick = { showAddToCollectionComponent }
                        title = "Add products"
                        >
                            <RiAddFill className="nav-icon"/>
                        </div>
                    </div>
                </div>
                <AllStoreProducts
                storeContainerClassName ="store-collection-products-container"
                productEditPanel="store-collection-product-edit-panel"
                products = { viewedCollection?.products }
                setDeleteProductResponseMessage={ setDeleteProductResponseMessage }
                setRedirect={ setRedirect }
                setProductsSelected = { setCollectionProducts }
                showSelect
                />
            </div>
        )
    }

    const viewCollectionProducts = (e, collection) => {
        setViewedCollection(collection)
        setShowCollectionModal(true);
        timer = setTimeout(()=> {

        }, 1000)
        e.stopPropagation();
    }

    const closeModal = () => {
        setShowCollectionModal(false);
    }

    if (redirect) {
        return (
            <Redirect to = {redirect} />
        )
    }

    return (
        <div className="store-collections-container">
        {
            (showCollectionModal) && (
                <ModalBox 
                handleModal = { closeModal }
                modalContainerWrapperName = "store-collection-products-modal-container" 
                modalContainer= "store-collection-products-modal-container-wrapper"
                >
                    { MoadlBoxChild }
                </ModalBox>
            )

        }
        <div className="store-collections-wrapper">
            {
                // TODO... refactor to remove mock collections when API data fetch complete
                (collections && collections.length > 0) ? collections.map((collection, i) => 
                    <Collection key ={ i } { ...collection }
                    setDeleteProductResponseMessage={ setDeleteProductResponseMessage } 
                    setRedirect={ setRedirect }
                    viewCollectionProducts ={ viewCollectionProducts }
                    />
                ) : mockCollections.map((collection, i) => 
                    <Collection key ={ i } { ...collection }
                    setDeleteProductResponseMessage={ setDeleteProductResponseMessage } 
                    setRedirect={ setRedirect }
                    viewCollectionProducts ={ viewCollectionProducts }
                    />
                )
            }
            </div>
            <div className="store-create-collection-wrapper">
                <div className="store-create-collection-cntr">
                    <div className="store-create-collection-wrpr">
                        <h3>Add collection</h3>
                        <div className="store-create-collection-writeup">
                            Organize and group your products into 
                            collections for an effective management 
                            process
                        </div>
                        <div className="store-create-collection-bttn-wrpr">
                            <div className="store-create-collection-bttn">Create Collection</div>
                        </div>
                    </div>     
                </div>
            </div>
        </div>
    )
}


function Collection({
    name, 
    products, 
    totalProducts,
    viewCollectionProducts, 
    ...props
}) {

    return ( 
        <div className="store-collection">
            <div className="store-collection-kebab-contr">
                <div className="store-collection-kebab">
                    <HiDotsHorizontal className="store-collection-icon"/>
                </div>
            </div>
            <div className="store-collection-name">
                <h3>{ name }</h3>   
            </div>
            <div className="store-collection-tags">
                <div className="store-collection-tags-child"> 
                    <FiBookmark className="store-collection-icon"/>
                    { products?.length }
                </div>
            </div>
            <div className="store-collection-bttn-contr">
                <div className="store-collection-bttn" onClick={ (e)=> viewCollectionProducts(e, {name, products}) }>
                    View Products
                </div>
            </div>
        </div>
    )
}