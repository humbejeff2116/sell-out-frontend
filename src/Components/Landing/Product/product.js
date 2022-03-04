

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { DisplayedProduct } from '../../Product/product';
import { getProducts } from '../../../Utils/http.services';
import socket from '../../Socket/socket';
import './product.css';


export default function LandingProducts(props) {

    const [products, setProducts] = useState([]);

    const [socketConnected, setSocketConnected] = useState(false);
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
   
    return (

        <>
        <div  className="landing-product-heading">
            <h3>Products</h3>
        </div>
        <div  className="landing-product-container">
        {

           products.length > 0 && products.map((product,i) =>

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