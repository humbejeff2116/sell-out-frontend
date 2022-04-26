
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ModalBox } from '../../../ModalComments/modalComments';
import { AllStoreProducts} from '../Products/products';
import useAuth from '../../../../Context/context';
import { HiDotsHorizontal } from 'react-icons/hi';
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
          
        ],
        totalProducts: 4
    }
  
]

export default function Collections() {

    const [collections, setCollections] = useState(null);

    const [collectionsErr, setCollectionsErr] = useState('');

    const [deleteProductResponseMessage, setDeleteProductResponseMessage] = useState('');

    const [showCollectionModal, setShowCollectionModal] = useState(false);

    const [viewedCollection, setViewedCollection] = useState({})

    const [redirect, setRedirect] = useState('');

    const { user } = useAuth();

    let timer = null;

    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(()=> {

        let mounted = true;

        const getUserCollections = async ({userId, userEmail, userCollections}) => {

            try {
    
                socket.emit('getUserCollections', {userId, userEmail, userCollections})
    
                socket.on('getUserCollectionsResponse', function(response) {
    
                    if (mounted) {

                        const { error, message, data } = response;
    
                        if (error) {
        
                            return setCollectionsErr(message);
            
                        }
            
                        setCollections(data)
    
                    }
    
                })
               
            } catch(err) {
    
                console.error(err)
    
            }
    
        }

        if (socket.connected) {

            setSocketConnected(true)
           
        } else {

            socket.on('connect', ()=> {

                setSocketConnected(true)
               
            })

        }

        if (socketConnected && mounted) {
           
            getUserCollections(user);

        }
   
        return ()=> {

            mounted = false;
            
        }

    }, [socketConnected]);

    useEffect(()=> {

        return () => {

            if (timer) {

                clearTimeout(timer);
            }

        }

    }, [timer]);


    const MoadlBoxChild = (

        <div className="store-collection-modal-child-wrapper">
        <div className="store-collection-modal-heading">
            <h3>{ viewedCollection?.name } </h3>
        </div>
        <AllStoreProducts
        storeContainerClassName ={"store-collection-products-container"}
        productEditPanel={"store-collection-product-edit-panel"}
        products = {viewedCollection?.products}
        setDeleteProductResponseMessage={setDeleteProductResponseMessage}
        setRedirect={setRedirect}
        />
        </div>
    )

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
                handleModal = {closeModal}
                modalContainerWrapperName = {"store-collection-products-modal-container"} 
                modalContainer={"store-collection-products-modal-container-wrapper"}
                >
                    { MoadlBoxChild }
                </ModalBox>
            )

        }

        <div className="store-collections-wrapper">
        {
            // TODO... refactor to remove mock collections when API data fetch complete
           collections ? collections.map((collection, i) => 

                <Collection key ={i} {...collection}
                setDeleteProductResponseMessage={setDeleteProductResponseMessage} 
                setRedirect={setRedirect}
                viewCollectionProducts ={ viewCollectionProducts }
                />

            ) : mockCollections.map((collection, i) => 

                <Collection key ={i} {...collection}
                setDeleteProductResponseMessage={setDeleteProductResponseMessage} 
                setRedirect={setRedirect}
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
            <h3>{name}</h3>
            
        </div>

        <div className="store-collection-tags">

            <div className="store-collection-tags-child"> 
                <FiBookmark className="store-collection-icon"/>
                {/* {totalProducts} */}
                {products?.length}
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