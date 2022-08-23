
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight }  from 'react-icons/fi'
import { DisplayedProduct } from '../../Product/product';
import useSocketIsConnected from '../../Hooks/socketHooks'
import socket from '../../Socket/socket';
import { getProducts } from '../../../Utils/http.services';
import './product.css';


export default function LandingProducts(props) {
    const [products, setProducts] = useState([]);
    const socketIsConnected = useSocketIsConnected();

    useEffect(()=> {
        let mounted = true;
        if (socketIsConnected && mounted) {  
            getAllProducts(setProducts);
        }
        return ()=> {
            mounted = false;   
        }
    }, [socketIsConnected]);  

    useEffect(()=> {
        let mounted = true;
        socket.on('productDataChange', function() {
            if (mounted) {
                getAllProducts(setProducts);
            } 
        });
        return ()=> {
            mounted = false;   
        }
    }, []);

    async function getAllProducts(setProducts) {
        try {
            const { data } = await getProducts();
            setProducts(data);
        } catch(err) {
            console.error(err)
        }
    }
   
    return (
        <>
            <div className="landing-product-heading">
                <h3>Products</h3>
                <div className="landing-view-products-btn-wrapper">
                    <button>
                        <Link to="/products">View more products</Link>
                        <FiArrowRight className="landing-view-products-btn-icon"/>
                    </button> 
                </div>
            </div>
            <div className="landing-product-container">
            {products.length > 0 && products.map((product, i) =>
                <DisplayedProduct 
                key = { i } 
                product = { product } 
                productCommentPanelName = "landing-product-comment-panel"
                productUsedOutsideLogin
                />
            )}
            </div>
        </>
    )
}