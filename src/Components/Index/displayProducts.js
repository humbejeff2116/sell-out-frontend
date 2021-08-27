

import axios from 'axios'

import React, {useEffect, useState} from 'react';
import socket from '../Socket/socket';
import { DisplayedProduct } from '../Product/product';
import { getProducts } from '../../Utils/http.services';



 export function DisplayProducts(props) {
    const [products, setProducts] = useState([]);
   
    useEffect(()=> {
        let mounted = true;

        async function getAllProducts() {
            try {
                const productsResponse = await getProducts();
                const products = productsResponse.data;
                setProducts(products)
            }catch(err) {
                console.error(err.stack)
            }  
        }
        if (mounted) {
            getAllProducts();
        }

        socket.on('gottenProducts', function(response) {
            console.log("gotten products")
            const products = response.data;
            if(mounted){
                setProducts(products);
            }
        });
       
        socket.on('productDataChange', function() {
            if (mounted) {
                getAllProducts();
                
            }      
        });

        return ()=> {
            mounted = false;
            socket.off("getProducts");
        }
    }, []);
   

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
    // const {socket} = useSocket();
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
        socket.on('productDataChange', function() {
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
                services.map((service, i) =>
                    <DisplayedProduct 
                    key={i}  
                    product={service} 
                    panelClassName="index-product-panel"
                    />
                )
            }
        </div>
    )
}