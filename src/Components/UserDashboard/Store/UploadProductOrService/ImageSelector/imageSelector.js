import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FileInput } from '../../../../Formik/formik';
import { BsExclamationCircle, } from 'react-icons/bs';





    export default function ProductImagesSelector({
        productImages,
        numberofimages, 
        handleInputChange, 
        handleSubmit, 
        goBack, 
        uploadingProduct, 
        uploadingError,
        fileInputRef 
    }) {
    let labelClass = numberofimages ? "upload-images-label contains" : "upload-images-label";
    return (

        <div>
        <div className="upload-form-panel-heading">
            <p>NOTE:</p>
            <p>In order to enable buyers properly view your product,  
                atleast three(3) images of the product taken from 
                different angles/views should be selected.
            </p>
        </div>
            
        <Formik 
         initialValues = {{
            productImages: '',
              
        }}
        onSubmit =  { handleSubmit } 
        >
            {(formikProps) => {
                const { values, handleChange } = formikProps;
                return (
                    <Form>
                    <div>
                        <div className="upload-form-group-child-input-image">
                        
                                <FileInput
                                    label="Select Product Images"
                                    labelClassName={ labelClass }
                                    labelSpanClassName="title"
                                    numberofimages = { numberofimages }
                                    name="productImages"
                                    type="file"
                                    // TODO... replace icon with a proper image icon 
                                    icon="Icon"
                                    multiple ="multiple"
                                    onChange ={ handleInputChange }
                                    ref={ fileInputRef }
                                
                                    errorClass="upload-form-textarea-error"
                                />
                                
                        </div> 
                    </div>
                  
                    <div className="upload-product-preview-images-container">
                    {
                        (productImages && productImages.length > 0) ? (
                            productImages.map((dataurl, i)=>
                                <ImagePreview key = {i} { ...dataurl }/>
                            )   
                        ) : "" 
                    }
                    </div>
                    
                    <div className="upload-form-button-container">
                        <div className="upload-form-back-button-wrapper">
                            <button onClick={ goBack }>Back</button>
                        </div>
                        <div className="upload-form-button-wrapper next">
                            <button type="submit">
                                
                                {
                                    uploadingProduct ? <span>Uploading Product...</span> : 
                                    uploadingError ? <><BsExclamationCircle/> <span>Upload</span></> :
                                    <span>Upload</span>
                                }
                            </button>
                        </div>
                    </div>
                    </Form>
                );
            }}
        </Formik>
        </div>
    )      
}

function  ImagePreview({ dataurl }) {
 
    return (
      
        <div className="upload-product-preview-image-wrapper">
            <img src = { dataurl } alt="product" id="preview"/>
        </div>   
    )
}