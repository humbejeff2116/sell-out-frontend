import React from 'react';
import { Formik, Form } from 'formik';
import { FileInput } from '../FileInput/fileInput';
import { BiImageAdd } from 'react-icons/bi';

export default function ProductImagesSelector({
    numberofimages, 
    handleInputChange, 
    fileInputRef,
    noProductImageHasBeenSelected, 
    previewImagesButton 
}) {
    const labelClass = (
        (numberofimages > 0) ?  "upload-images-label contains" : 
        noProductImageHasBeenSelected ? "upload-images-label error" : 
        "upload-images-label"
    )

    return (
        <>
            <div className="upload-image-form-panel-heading">
                <div>
                    Not more than four(4) images should be selected 
                </div>
            </div>    
            <Formik>
            <Form className="upload-product-image-form">
                <div>
                    <div className="upload-form-group-child-input-image">
                    <FileInput
                        label="Select Product Images"
                        labelClassName = { labelClass }
                        labelSpanClassName="title"
                        numberofimages = { numberofimages }
                        previewImagesButton = { previewImagesButton }
                        name="productImages"
                        type="file"
                        icon = { <BiImageAdd className="upload-product-image-icon"/> }
                        multiple = "multiple"
                        onChange = { handleInputChange }
                        ref = { fileInputRef }
                        errorClass="upload-form-textarea-error"
                    />
                    </div> 
                </div>
            </Form>
            </Formik>
        </>
    )
}