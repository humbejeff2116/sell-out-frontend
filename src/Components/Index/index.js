
import React,{ useState, useEffect } from 'react';
import socket from '../Socket/socket';
import { SearchProducts } from './searchProductsOrServices';
import { PostProduct } from './postProduct';
import { ErrorModal } from '../ModalBox/errorModal';
import { DisplayedProduct } from '../Product/product';
import { getProducts } from '../../Utils/http.services';
import { NavLink } from 'react-router-dom';
import Links from '../../Data/links';
import './index.css';



const mockProducts = [
    {
        userId: 2234343,
        userName: "Humbe jeffrey",
        userEmail: "jeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "short nikka",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "214",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
    {
        userId: 2234343,
        userName: "Bottega",
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
        userName: "Splash Collections",
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


export default function Index() {

    const [insideLoginError, setinsideLoginError] = useState('');
    
    useEffect(()=> {

        let timer = null;

        let mounted = true;

        if (insideLoginError && mounted) {

            timer = setTimeout(() => {

                setinsideLoginError(''); 

            }, 12000);

        }

        return ()=> {

            mounted = false;

            if (timer) {

                clearTimeout(timer)

            } 

        }  

    }, [insideLoginError]);

    return (

        <div className="index-container">
            {
                insideLoginError && (

                    <ErrorModal 
                    errorMessage = { insideLoginError }
                    errorContainerClassName={"index-error-container"}
                    panelClassName = {"index--error-modal"}
                    />

                )
            }
           <PostProduct/>
           <SearchProducts/>
           <FilterDisplayedProducts/>
        </div>

    )

}

function FilterDisplayedProducts(props) {

    const [products, setProducts] = useState([]);

    const [queryValues, setQueryValue] = useState({});

    const [queryValueChange, setQueryValueChange] = useState(false);

    const [showClothingLinks, setShowClothingLinks] = useState(false);

    const [socketConnected, setSocketConnected] = useState(false);

    const clothingLinks = Links.getClothingLinks()

    const maleClothingLinks = Links.getMaleClothingLinks()

    useEffect(()=> {

        let mounted = true;

        async function getAllProducts() {

            try {

                const productsResponse = await getProducts();

                const products = productsResponse.data;

                setProducts(products)

            } catch(err) {

                console.error(err.stack)

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
           
            getAllProducts();

        }
   
        

        return ()=> {

            mounted = false;
            
        }

    }, [socketConnected]);  

    useEffect(()=> {

        let mounted = true;

        async function getAllProducts() {

            try {

                const productsResponse = await getProducts();

                const products = productsResponse.data;

                setProducts(products)

            } catch(err) {

                console.error(err.stack)

            }

        }

        socket.on('productDataChange', function() {

            if (mounted) {

                getAllProducts();

            } 

        });


        return ()=> {

            mounted = false;
            
        }

    }, [])


    useEffect(()=> {

        if (queryValues?.category === "clothes") {

            setQueryValue(prevValues => (prevValues.gender ? {...prevValues, gender:"female" } : {...prevValues, gender:"female"}))

            setShowClothingLinks(true)

        } else {

            setShowClothingLinks(false)

        } 

    }, [queryValues.category])
   
    const queryProducts = async (queryValues) => {

        try {

            setQueryValueChange(false);

            const productsResponse = await getProducts(queryValues);

            const products = productsResponse.data;

            setProducts(products)

        } catch(err) {

            console.error(err.stack)

        } 

    }

    const handleInputChange = function(e) {

        setQueryValue(prevValues => ({ ...prevValues, [e.target.name] : e.target.value }))

        setQueryValueChange(true) 

    }

    return (

        <>
        <div className="index-products-filter-heading">
            <p>Products</p>
        </div>
        <div className="index-products-filter-buttons">
            <div className="index-products-filter-select">
                <label>Gender</label>
                <select  name="gender" value = { queryValues.gender } onChange = { handleInputChange }>
                    <option value="all">Default</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>
            <div className="index-products-filter-select">
                <label>Category</label>
                <select name="category" value = { queryValues.category } onChange = { handleInputChange }>
                    <option value="all"> Default</option>
                    <option value="electronics"> Electronics </option>
                    <option value="clothes">Clothes</option>
                    <option value="accessories"> Accessories</option>
                    <option value="others"> Others</option>
                </select>
            </div>
            <div className="index-products-filter-select">
                <label>Usage</label>
                <select name="usage" value = { queryValues.usage } onChange = { handleInputChange }>
                    <option value="all"> Default </option>
                    <option value="new"> New </option>
                    <option value="fairly used"> Fairly used </option>
                    <option value="1 year+"> 1 year+ </option>
                    <option value="2 years+"> 2 years+ </option>
                    <option value="others"> Others </option>
                </select>
            </div>
        </div>
        <div className="index-clothing-category-links-container">
            {

                showClothingLinks && (queryValues?.gender === "female" || queryValues?.gender === "all") && 
                (<ClothingCategoryLinks clothingLinks={clothingLinks}/>)

            }

            {

                showClothingLinks && queryValues?.gender === "male" && 
                (<ClothingCategoryLinks clothingLinks={maleClothingLinks}/>)

            }
        </div>
        <div className="index-products-container">
        {

            mockProducts.map((product, i) =>

                <DisplayedProduct 
                key = { i }  
                product = { product } 
                panelClassName="index-product-panel"
                />

            )

        }
        </div>
        </>

    )

}


function ClothingCategoryLinks(props) {

    return (

        <div className="index-clothing-category-links">
        {
            props.clothingLinks.map((links, i) =>

                <ClothingLinks key = { i } { ...links } />

            )
        }
        </div>

    )

}

function ClothingLinks(props) {

    return (

        <div classname="index-clothing-category-links-item">
            <NavLink
            exact 
            to = { props.href } 
            activeClassName="main-link-active"
            className="main-nav-link" 
            title = { props.name } >
                <i>{ props.icon }</i><span>{ props.name }</span> 
            </NavLink> 
        </div>

    )

}