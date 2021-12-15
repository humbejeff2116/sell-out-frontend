import React, {useState, useEffect} from 'react';
import { Redirect, useLocation, useHistory  } from 'react-router-dom';
import ProductImagesSelector from './ImageSelector/imageSelector';
// import socket from '../../../Socket/socket';
import useAuth from '../../../../Context/context';
import { createProduct } from '../../../../Utils/http.services';
import UploadProductDetailsForm from './ProductDetailsForm/productDetailsForm';
import useUploadProductContext from '../../../../Context/UploadProductContext/context';
import './uploadProduct.css';


export default function UploadProduct() {
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    const [uploadingError , setUploadingError] = useState(false);
    const [response, setResponse] = useState('');
    const [redirect, setRedirect] = useState('');
    const [showImagesSelector, setShowImagesSelector] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [resizedImages, setResizedImages] = useState([]);
    const { user } = useAuth();
    const { productValues, setProductFormValues } = useUploadProductContext();
    const location = useLocation();
    const history = useHistory();
    let FormComponent;
   
    useEffect(() => {
        let timer = null;
        let mounted = true;
        if (response && mounted) {
            timer = setTimeout(() => {
                setResponse('');
                history.push(location.pathname);
                setRedirect("/home/dashboard/store/products");
            }, 3000);
        }
        return () => {
            mounted = false;
            if (timer) {
                clearTimeout(timer);
            }      
        }
    }, [response, history, location]);

    useEffect(()=> {
        if (formValues.productImages && formValues.productImages.length > 0) { 
            getResizedImages(formValues.productImages, setResizedImages);
        }
    },[formValues.productImages])

    const handleSubmitDetails = (values) => {
        // TODO... remove alert
        alert(JSON.stringify(values, null, 2))
        setProductFormValues(values);
        setShowImagesSelector(true);
        window.scrollTo(0, 0); 
    }

    const goBackToDetails = () => setShowImagesSelector(false); 

    const handleImageInputChange = (e) =>  setFormValues({ [e.target.name] : [...e.target.files ] }); 

    const getResizedImages = async (imageFiles = [], callback = f =>f) => {
        const imagesDataUrl = [];
        try {
            for (let i = 0; i < imageFiles.length; i++) { 
                const dataUrl = await resizeImage(imageFiles[i]);
                imagesDataUrl.push(dataUrl)
            } 
            return callback(imagesDataUrl)
            
        } catch (error) {
            // TODO... handle error
            
        }
        
        function resizeImage(imageFile = {}) {
            return new Promise((res, rej) => {
                try {
                    const reader = new FileReader(); 
                    // Set the image once loaded into file reader
                    reader.onload = function(e) {
                        const img = document.createElement("img");
                        img.src =  e.target.result; 
                        // resize image once it loads
                        img.addEventListener("load", (evt) => {
                            const canvas = document.createElement("canvas");
                            const ctx = canvas.getContext("2d");
                            let width = img.width;
                            let height = img.height;
                            let dataurl = null;
                            const MAX_WIDTH = 300;
                            const MAX_HEIGHT = 300; 
    
                            if (width > height) {
                                if (width > MAX_WIDTH) {
                                    height *= MAX_WIDTH / width;
                                    width = MAX_WIDTH;
                                }
                            } else {
                                if (height > MAX_HEIGHT) {
                                    width *= MAX_HEIGHT / height;
                                    height = MAX_HEIGHT;
                                }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);
                            dataurl = canvas.toDataURL(imageFile.type);
                            // resolve resized image dataurl
                            res({dataurl});
                        })
                    }
                    reader.readAsDataURL(imageFile);

                } catch(err) {
                    rej(err);
                }
            })
        }
    }


    const handleSubmit = async (values) => {
        try {
            if (user && productValues) {
                setUploadingError(false);
                setUploadingProduct(true);
                setResponse('');
                const formData = new FormData();
                const files = formValues.productImages;
                // TODO... remove console.log
                console.log("files are", files)
                // append files to form data
                for (let i = 0; i < files.length; i++) {
                    formData.append(`file${i}`, files[i]);
                }
                // append user to form data
                Object.keys(user).map( keys => formData.append(keys, user[keys]));
                // append product values from uploadProductContext to form data
                Object.keys(productValues).map( keys => formData.append(keys, productValues[keys]));
                // send form data to gateway server
                const createdProductResponse = await createProduct(formData);
                if (createdProductResponse.error) {
                    setUploadingError(true);
                    setResponse("An error occured while uploading product. Please wait and try again"); 
                    return;   
                }               
                setResponse("Product uploaded successfully");
                return;
            }
            // TODO... remove alert
            alert("no user or product values");
            
            
        } catch(e) {
            setUploadingError(true);
            setResponse("An error occured please wait and try again");   
        } finally {
           

        }   
    }

    if (redirect) {
        return (
            <Redirect to={redirect} />
        )
    }

    if (showImagesSelector) {

        FormComponent = (
            <ProductImagesSelector
            goBack={ goBackToDetails }
            handleInputChange = { handleImageInputChange }
            handleSubmit = { handleSubmit }
            uploadingProduct={ uploadingProduct }
            uploadingError = { uploadingError }
            numberofimages ={ formValues?.productImages?.length  || 0  }
            productImages={ resizedImages }
            />
        )

    } else {

         FormComponent = (
            <UploadProductDetailsForm 
            handleSubmit = { handleSubmitDetails } 
            productValues={productValues} 
            />
        )

    }
    return (
       
         <div className="upload-product-container">
            <div className="upload-details-heading">
                <h3> Upload Product </h3>
            </div>
            <div className="upload-form-container">
            <div className="upload-form-panel">
                {FormComponent}
            </div>
            </div>
        </div>
    )
}