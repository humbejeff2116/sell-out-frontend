






import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import socket from '../Socket/socket';
import { DisplayedProduct } from '../Product/product';
import './index.css';


const products = [
    {
        name:"first product",
        price:"23",
        number:"04934384",
        category:"phone"
    },
    {
        name:"first product",
        price:"23",
        number:"04934384",
        category:"phone"
    }
] 

export default function Index() {
    return (
        <div className="index-container">
           <PostProduct/>
           <SearchProducts/>
           <ToggleProductsOrServices/>
        </div>
    )
}

function PostProduct(props) {
    return (
        <div className="index-post-container">
            <div className="index-post-writeup-container">
                <div className="index-post-writeup">
                    <h4>
                        Got a Product to sell or a service to offer?
                        someone might just be needing it.
                    </h4>
                    

                </div>
            </div>
            <div className="index-post-upload">
            <Link to="/upload-product"><button>Upload Details</button></Link>
            </div>
        </div>
    )
}


const states =[
    {name:'State'},
    {name:'Abia'},
    {name:'Adamawa'},
    {name:'Akwaibom'},
    {name:'Anambra'}
]
function SearchProducts(props) {
    return (
        <div className="index-search-container">
            <div className="index-search-header-panel">
                <div className="index-search-header">
                    <h5>
                        Select any option below to filter your search, 
                        or leave as is to use default search behaviour


                    </h5>
                </div>
            </div>
            <div className="index-search-select">

                <div className="index-search-select-btn">
                   
                    <select>
                    <option>
                        Country
                    </option>
                        <option>
                            Nigeria
                        </option>
                    </select>
                </div>

                <div className="index-search-select-btn">
                   
                    <select>
                    {
                        states.map((state,i)=>
                        <option key={i} value="state.name">
                            {state.name}
                        </option>
                        )
                    }
                    </select>
                </div>


                <div className="index-search-select-btn">
                   
                   <select>
                   <option>
                       Category
                   </option>
                       <option>
                           All
                       </option>
                       <option>
                           Electronics
                       </option>
                       <option>
                           Furniture
                       </option>
                   </select>
               </div>




            </div>
            <div className="index-search-form">
               <form>
                        <input type="search" placeholder="search for products or services"   name="searchproduct" />
                            <button type="submit" >
                            {/* {this.state.Searching ? 'Searching...' : 'Search'} */}
                            search
                            </button>
                        {/* error reporting div */}
                   
               </form>
               <div className="index-search-form-error">
                        <span className="index-search-error">this is search error</span>
                    </div>
            </div>
        </div>
    )
}




// TODO... uncomment code below to use products
 function DisplayProducts(props) {
    const [products, setProducts] = useState([]);
   
    useEffect(()=> {
        let mounted = true;
        if(mounted) {
            getProductsData();
        }
        socket.on('gottenProducts', function(response) {
            const products = response.data;
            if(mounted){
                setProducts(products);
            }
            
  
        });
       
        socket.on('productsDataChange', function() {
            if(mounted){
                getProductsData(); 
            }
             
        });
        return ()=> {
            mounted = false
        }
    }, []);
    const getProductsData = ( ) => { 
        socket.emit('getProducts');
    }

    return (
        <div className="index-products-container">
            {
                products.map((product,i) =>
                    <DisplayedProduct 
                    key={i}  
                    product={product} 
                    panelClassName="index-product-panel"
                    />
                )
            }
        </div>
    )
}

function DisplayServices(props) {
    const [services, setServices] = useState([]);
   
    useEffect(()=> {
        let mounted = true;
        if(mounted){
            getServicesData();
        }
        socket.on('gottenServices', function(response) {
            const services = response.data;
            if(mounted) {
                setServices(services);
            }
            
        })
        socket.on('serviceDataChange', function() {
            if(mounted){
                getServicesData(); 
            }    
        });
        return ()=> {
            mounted = false
        } 
    },[]);
    const getServicesData = ( ) => {  
        socket.emit('getServices');

    }

    return (
        <div className="index-products-container">
            {
                services.map((product,i) =>
                    <DisplayedProduct 
                    key={i}  
                    product={product} 
                    panelClassName="index-product-panel"
                    />
                )
            }
        </div>
    )
}

function ToggleProductsOrServices() {
    const [showProducts, setShowProducts]= useState(false);
    const [showServices, setShowServices] = useState(false);

    useEffect(()=> {
        setShowProducts(true);
        setShowServices(false);
    }, []);

    const displayProducts = function() {
        setShowProducts(true);
        setShowServices(false);
    }
    const displayServices = function() {
        setShowServices(true);
        setShowProducts(false);    
    }
    return (
        <>
        <div className="index-toggle-buttons">
            <div className="index-product-button">
                <button onClick={()=> displayProducts()}>View products</button>
            </div>
            <div className="index-service-button">
                <button onClick ={()=> displayServices()}>View services</button>
            </div>
        </div>
        {
            ( showProducts && !showServices ) ? ( <DisplayProducts/> ) : 
            (!showProducts && showServices) ? ( <DisplayServices/> ) : ''
        }
        </>
               
    )
}