






import React,{useState, useEffect} from 'react';
import { DisplayProducts, DisplayServices } from './displayProducts';
import { SearchProducts } from './searchProductsOrServices';
import {PostProduct} from './postProduct';
import './index.css';


export default function Index() {
    return (
        <div className="index-container">
           <PostProduct/>
           <SearchProducts/>
           <ToggleProductsOrServices/>
        </div>
    )
}




function ToggleProductsOrServices() {
    const [showProducts, setShowProducts]= useState(false);
    const [showServices, setShowServices] = useState(false);

    useEffect(()=> {
        setShowProducts(true);
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