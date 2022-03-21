
import React, { useState, useEffect } from 'react';
import socket from '../Socket/socket';
import { SearchProducts } from './searchProductsOrServices';
import { PostProduct } from './postProduct';
import { ErrorModal } from '../ModalBox/errorModal';
import { DisplayedProduct } from '../Product/product';
import { getProducts } from '../../Utils/http.services';
import { NavLink } from 'react-router-dom';
import Links from '../../Data/links';
import { RiListSettingsFill } from 'react-icons/ri'
import './index.css';


const mockProducts = [
    {
        userId: 2234343,
        userName: "Humbe jeffrey",
        userEmail: "jeff@gmail.com",
        userProfilePicture: "",
        productId: 232323,
        productName: "Denim blue shirt",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "214",
        percentageOff: 5,
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
        productName: "Fur pants",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        percentageOff: 7,
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
        productName: "Sweat shirt",
        productCategory: "furniture",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "never used",
        productCurrency: "naira",
        productPrice: "200",
        percentageOff: 2,
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

            timer = setTimeout(() =>  setinsideLoginError(''), 12000);

        }

        return () => {

            mounted = false;

            if (timer)  clearTimeout(timer)

        }  

    }, [ insideLoginError ]);

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

        <FilterButtons
        handleInputChange = { handleInputChange }
        queryValues = { queryValues }
        />

        <FilterLinks
        showClothingLinks = { showClothingLinks }
        queryValues = { queryValues  }
        clothingLinks = { clothingLinks }
        maleClothingLinks = { maleClothingLinks }
        />

        <div className="index-products-container">
        {

            mockProducts.map((product, i) =>

                <DisplayedProduct 
                key = { i } 
                {...product} 
                product = { product } 
                panelClassName="index-product-panel"
                />

            )

        }
        </div>
        </>

    )

}

function FilterLinks({ showClothingLinks, queryValues, clothingLinks, maleClothingLinks}) {

    return (

        <div className="index-clothing-category-links-container">
        {

            showClothingLinks && (queryValues?.gender === "female" || queryValues?.gender === "all") && (
            
                <ClothingCategoryLinks links = { clothingLinks }/>
            
            )

        }

        {

            showClothingLinks && queryValues?.gender === "male" && (

                <ClothingCategoryLinks links = { maleClothingLinks }/>

            )

        }
        </div>

    )
}


function  FilterButtons({ handleInputChange, queryValues }) {

    const filterButtons = {

        usageOptions : [
            {name:'Usage', value: 'all'},
            {value: 'New'},
            { value: 'Fairly used'},
            { value: '1 year+'},
            { value: '2 years+'},
            { value: 'Others'},
        ],

        genderOptions : [
            {name:'Gender', value: 'all'},
            {value: 'Female'},
            { value: 'Male'},
        ],

        categoryOptions : [
            {name:'Category', value: 'all'},
            {value: 'Electronics '},
            { value: 'Clothes'},
            { value: 'Accessories'},
            { value: '2 years+'},
            { value: 'Others'},
        ],

    }

    return (

        <div className="index-products-filter-buttons">

            <div className="index-search-select-filter">               
                <RiListSettingsFill className="index-search-filter-icon"/>
            </div>
            <div className="index-products-filter-select">
                <Select
                name = { 'gender' } 
                queryValues = { queryValues } 
                handleInputChange = { handleInputChange } 
                options = { filterButtons.genderOptions }
                />
            </div>
            <div className="index-products-filter-select">
                <Select
                name = { 'category' } 
                queryValues = { queryValues } 
                handleInputChange = { handleInputChange } 
                options = { filterButtons.categoryOptions }
                />

            </div>
            <div className="index-products-filter-select">
               <Select
               name = { 'usage' } 
               queryValues = { queryValues } 
               handleInputChange = { handleInputChange } 
               options = { filterButtons.usageOptions }
               />
            </div>
        </div>
    )
}


function Select ({ name, queryValues, handleInputChange, options, ...props }) {

    return (

        <select name={ name } value = { queryValues?.name } onChange = { handleInputChange }>
        {

            options.map((option, i) =>

                <option 
                key = { i } 
                value = { option.name  ? option.name.toLowerCase() : option.value.toLowerCase() }
                >

                    { option.name  ? option.name : option.value }
                    
                </option>

            )

        }
        </select>

    )

}


function ClothingCategoryLinks({ links }) {

    return (

        <div className="index-clothing-category-links">
        {
            links.map((links, i) =>

                <ClothingLinks key = { i } { ...links } />

            )
        }
        </div>

    )

}

function ClothingLinks({href, name, icon, ...props}) {

    return (

        <div classname="index-clothing-category-links-item">
            <NavLink
            exact 
            to = { href } 
            activeClassName="main-link-active"
            className="main-nav-link" 
            title = { name } >
                <i>{ icon }</i><span>{ name }</span> 
            </NavLink> 
        </div>

    )

}