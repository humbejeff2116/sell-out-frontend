






import React,{useState, useEffect} from 'react';
import socket from '../Socket/socket';
import { DisplayProducts, DisplayServices } from './displayProducts';
import { SearchProducts } from './searchProductsOrServices';
import {PostProduct} from './postProduct';
import { ErrorModal } from '../ModalBox/errorModal';
import './index.css';


export default function Index() {
    const [insideLoginError, setinsideLoginError] = useState('');
    useEffect(()=> {
        let timer = null;
        let mounted = true;
        socket.on('showInterestError', function(response) {
            const { message } = response;
            if (mounted) {
                setinsideLoginError(message);
            }
            
        });
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
                        errorMessage={insideLoginError}
                        errorContainerClassName={"index-error-container"}
                        panelClassName = {"index--error-modal"}
                        />
                    )

            }
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