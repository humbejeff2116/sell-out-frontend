



import React, {useEffect, useState} from 'react';
import socket from '../Socket/socket';
import { DisplayedProduct } from '../Product/product';


 export function DisplayProducts(props) {
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


export function DisplayServices(props) {
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