import React  from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FileInput } from '../../../../Formik/formik';
import { BsExclamationCircle, } from 'react-icons/bs';




 export default function ProductImagesSelector({productImages,numberofimages, handleInputChange, handleSubmit, goBack, uploadingProduct, uploadingError, }) {
    return (
        <div>
        <div className="upload-form-panel-heading">
            <p>NOTE:</p>
            <p>In order to enable buyers properly view your product,  
                atleast three(3) images of the product taken from 
                different angles/views should be selected below.
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
                                    labelClassName="upload-images-label"
                                    labelSpanClassName="title"
                                    numberofimages = { numberofimages }
                                    name="productImages"
                                    type="file"
                                    // TODO... replace icon with a proper image icon
                                    icon="Icon"
                                    multiple ="multiple"
                                    onChange ={ handleInputChange }
                                
                                    errorClass="upload-form-textarea-error"
                                />
                        </div> 
                    </div>
                    {
                        productImages && productImages.length && (
                            <ImagePreview productImages={productImages} />
                        ) 
                    }

                    <div className="upload-form-button-container">
                        <div className="upload-form-back-button-wrapper">
                            <button onClick={ goBack }>Back</button>
                        </div>
                        <div className="upload-form-button-wrapper next">
                            <button type="submit">
                                
                                {
                                    uploadingProduct ? <span>Uploading Product...</span> : 
                                    uploadingError ? <><BsExclamationCircle/> <span>Submit</span></> :
                                    <span>Submit</span>
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

function  ImagePreview({productImages}) {
    return (
        <div className="upload-product-preview-images-container">
            {
                productImages && productImages.length && productImages.map((image, i) => 
                <ImageWrapper key={i} {...image} />
                ) 
            }
        </div>
    )
}


function ImageWrapper({src}) {
    return (
        <div className="upload-product-preview-image-wrapper">
            <img src = { src } alt="product" />
        </div>
    )
}




