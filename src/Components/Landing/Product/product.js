



import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { DisplayedProduct } from '../../Product/product';
import socket from '../../Socket/socket';
import './product.css';





export default function LandingProducts(props) {
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
       
        socket.on('productDataChange', function() {
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
        <>
        <div  className="landing-product-heading">
            <h3>Products</h3>
        </div>
        <div  className="landing-product-container">
        {
            products.map((product,i) =>
                <DisplayedProduct 
                key={i} 
                product={product} 
                panelClassName="landing-product-panel"
                productCommentPanelName="landing-product-comment-panel"
                />
            )
        }
        </div>
        <div className="landing-view-products-btn-cntr">
            <div className="landing-view-products-btn-wrapper">
            <button><Link to="/products">View more products</Link></button>
            </div>
        </div>
        </>
    )
}

export function LandingServices(props) {
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
    }, []);
    const getServicesData = ( ) => {  
        socket.emit('getServices');

    }
    return (
        <>
        <div className="landing-product-heading">
            <h3>Services</h3>
        </div>
        <div  className="landing-product-container">
        {
            services.map((service ,i) =>
            <DisplayedProduct 
                key={i} 
                product={service} 
                panelClassName="landing-product-panel"
                />
            )
        }
        </div>
        <div className="landing-product-heading">
            <div><button>View more services</button></div>
        </div>
        </>
    )
}