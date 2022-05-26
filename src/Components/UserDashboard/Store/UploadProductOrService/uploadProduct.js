import React, { useState, useEffect, useRef } from 'react';
import { Redirect, useLocation, useHistory  } from 'react-router-dom';
import { RiEyeLine } from 'react-icons/ri';
import ProductImagesSelector from './ImageSelector/imageSelector';
import UploadProductDetailsForm from './ProductDetailsForm/productDetailsForm';
import ImageEditor from './ImageEditor/imageEditor';
import useUploadProductContext from '../../../../Context/UploadProductContext/context';
import useAuth from '../../../../Context/context';
import { createProduct } from '../../../../Utils/http.services';
import './uploadProduct.css';

export default function UploadProduct() {
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    const [uploadingError , setUploadingError] = useState(false);
    const [response, setResponse] = useState('');
    const [redirect, setRedirect] = useState('');
    const [formValues, setFormValues] = useState({});
    const [resizedImages, setResizedImages] = useState([]);
    const [noProductImageHasBeenSelected, setNoProductImageHasBeenSelected] = useState(false);
    const [showImageEditorModal, setShowImageEditorModal] = useState(false);
    const { user } = useAuth();
    const { productValues, setProductFormValues } = useUploadProductContext();
    const location = useLocation();
    const history = useHistory();
    let isMounted = useRef(false);

    useEffect(()=> {
        isMounted.current = true;

        return ()=> {
            isMounted.current = false;
        }
    }, []);
   
    useEffect(() => {
        let timer = null;

        if (response && isMounted.current) {
            timer = setTimeout(() => {
                setResponse('');
                history.push(location.pathname);
                setRedirect("/home/dashboard/store/products");
            }, 3000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [response, history, location]);


    const handleImageInputChange = (e) =>  setFormValues({ [e.target.name] : [...e.target.files ] }); 


    const handleSubmit = async (values) => {
        const { productImages:files } = formValues;
        const formData = new FormData();

        if (!user) {
            // TODO... remove alert
            alert("no user")
            return;
        }

        if (!files) {
            setNoProductImageHasBeenSelected(true)
            return;
        }

        setUploadingError(false);
        setUploadingProduct(true);
        setResponse('');
        // TODO... remove console.log
        console.log("files are", files)

        for (let i = 0; i < files.length; i++) { 
            formData.append(`file${i}`, files[i]) 
        }

        for (let keys in user) { 
            formData.append(keys, user[keys]) 
        }

        for (let keys in values) { 
            formData.append(keys, values[keys]) 
        }

        try {
            const { error } = await createProduct(formData);

            if (error) {
                setUploadingError(true);
                setResponse("An error occured while uploading product details. Please wait and try again");
                return;
            } 

            setResponse("Product added successfully");
            return;
        } catch(err) {
            // TODO... remove console.log
            console.error(err)
            setUploadingError(true);
            setResponse("An error occured please wait and try again"); 
        }
    }

    const closeModal = () => {
        setShowImageEditorModal(false);
    }

    const openProductImagesEditor = () => {
        setShowImageEditorModal(true);
    }

    const ProductPreviewImagesButtonComp = (
        <PreviewImagesButton
        numberofimages = { formValues?.productImages?.length  || 0  }
        handleButtonClick = { openProductImagesEditor }
        />
    )

    if (redirect) {
        return (
            <Redirect to={ redirect }/>
        )
    }

    return ( 
         <div className="upload-product-container">
            <div className="upload-details-heading">
                <h3> Upload Product</h3>
            </div>
            <div className="upload-form-container">
                {
                    showImageEditorModal && (
                        <ImageEditor
                        closeModal = { closeModal }
                        images = { formValues?.productImages }
                        />
                    )
                }
                <UploadFormTemplate
                formComponent = {
                    <UploadProductDetailsForm 
                    handleSubmit = { handleSubmit }  
                    />
                }
                imageSelectorComponent = { 
                    <ProductImagesSelector
                    handleInputChange = { handleImageInputChange }
                    numberofimages = { formValues?.productImages?.length  || 0  }
                    noProductImageHasBeenSelected = { noProductImageHasBeenSelected }
                    previewImagesButton = { ProductPreviewImagesButtonComp }
                    />
                }
                />
            </div>
        </div>
    )
}

function UploadFormTemplate({
    formComponent, 
    imageSelectorComponent, 
    ...props
}) {
    return (
        <>
            <div className="upload-form-panel">
                <div className="upload-form-panel-left">
                    { formComponent }
                </div>
                <div className="upload-form-panel-right">
                    { imageSelectorComponent }
                </div>
            </div>
        </>   
    )
}

function PreviewImagesButton ({
    numberofimages, 
    handleButtonClick, 
    ...props
}) {
    const buttonText = numberofimages > 1 ?  "Preview images" : "Preview image";

    return (
        <div className="file-input-preview-button-container">
           <div className="file-input-preview-button-wrapper">
               <button type ="button" onClick = { handleButtonClick }>
                   <RiEyeLine className="file-input-preview-button-icon"/>
                   { buttonText }
                </button>
           </div>
        </div>
    )
}

export function UploadProductDetailsTemplate({
    formComponent, 
    imageSelectorComponent, 
    ...props 
}) {
    return (
        <div className="upload-form-container">
            <UploadFormTemplate
            formComponent = { formComponent }
            imageSelectorComponent = { imageSelectorComponent }
            />
        </div>
    )
}