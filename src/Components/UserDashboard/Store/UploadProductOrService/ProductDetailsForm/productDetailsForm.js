
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Select, TextAreaInput } from '../../../../Formik/formik';
import UploadProductData from '../Data/uploadProductData'


export default function UploadProductDetails({ 
    type, 
    handleSubmit, 
    setTypeOptions, 
    setType, 
    categoryDataSet 
}) {

    return (

        <Formik
        initialValues = {{
            productName: '',
            productDescription: '', 
            productPrice:  '',
            productDiscount: '',
            productUsage: '',
            productCurrency: '',
            productCategory: '', 
            productType: '',   
        }}

        validationSchema = { Yup.object({
            productName: Yup.string().required('Product name is required'),
            productPrice: Yup.string().required('Product price is required'),
            productUsage: Yup.string().required('Product usage is required'),
            productCurrency: Yup.string().required('Product currency is required'),
            productCategory: Yup.string().required('Product category is required'), 
            productType: Yup.string().required('Product type is required'),            
        })}

        onSubmit =  { handleSubmit }
        >
            {(formikProps) => {

                const { values } = formikProps;

                return (

                    <Form>
                        
                        <TextAreaInput
                        label="Product name"
                        labelClassName="upload-form-textarea-label"
                        name="productName"
                        type="text"
                        placeholder="Example: Nokia 3310"
                        errorClass="upload-form-textarea-error"
                        dontShowErrorText
                        />

                        <TextAreaInput
                        label="Product description"
                        labelText=" (optional)"
                        labelTextClass ="upload-form-textarea-label-text"
                        labelClassName="upload-form-textarea-label"
                        name="productDescription"
                        type="text"
                        placeholder="Example: A phone manufactured by Nokia"
                        errorClass="upload-form-textarea-error"
                        dontShowErrorText
                        />

                        <TextAreaInput
                        label="Product price"
                        labelClassName="upload-form-textarea-label"
                        name="productPrice"
                        type="text"
                        placeholder="Example: 2000"
                        errorClass="upload-form-textarea-error"
                        formatValue= { true }
                        formatedValueClass="upload-form-textarea-formated-value"
                        dontShowErrorText
                        />

                        <TextAreaInput
                        label="Product discount"
                        labelClassName="upload-form-textarea-label"
                        labelText=" (optional)"
                        labelTextClass ="upload-form-textarea-label-text"
                        name="productDiscount"
                        type="text"
                        placeholder="Example: 100"
                        errorClass="upload-form-textarea-error"
                        dontShowErrorText
                        />

                        <Select 
                        label="Product usage" 
                        name="productUsage" 
                        errorClass="upload-form-error"
                        labelClassName="upload-form-select-label"
                        selectClassName="upload-form-select"
                        >
                            <option value="">Select</option>
                            <option value="Never used">Never used</option>
                            <option value="Fairly used">Fairly used</option>
                            <option value="2 years +">2 years +</option>
                        </Select>

                        <Select 
                        label="Product currency" 
                        name="productCurrency" 
                        errorClass="upload-form-error"
                        labelClassName="upload-form-select-label"
                        selectClassName="upload-form-select"
                        >
                            <option value="">Select</option>
                            <option value="Naira">Naira</option>
                            <option value="pounds"> British Pounds</option>
                            <option value="dollar">U.S Dollar</option>
                        </Select>

                        <Select 
                        label="Product category" 
                        name="productCategory" 
                        errorClass="upload-form-error"
                        labelClassName="upload-form-select-label"
                        selectClassName="upload-form-select"
                        >
                            <option value="">Select</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option  value="Books">Books</option>
                            <option  value="Clothes">Clothes</option>
                        </Select>

                        {
                            ( values.hasOwnProperty("productCategory") && values.productCategory) && (

                                <div className="upload-form-group">
                                <ProductTypeComp
                                values = { values } 
                                type = { type } 
                                setTypeOptions = { setTypeOptions }
                                categoryDataSet = { categoryDataSet }
                                setType  = { setType }
                                />
                                </div>

                            )
                        } 
                        <div className="upload-form-button-container">
                            <div className="upload-form-button-wrapper">
                                <button type="submit">Save</button>
                            </div>
                        </div>
                    
                    </Form>

                )

            }}
            
        </Formik>

    )

}

function ProductTypeComp({ values}) {

    const [type , setType] = useState([]);

    useEffect(()=> {

        const categoryDataSet = UploadProductData.getCategoryData();

        setTypeOptions(values.productCategory, categoryDataSet, setType)

    }, [setType, values.productCategory]);
    
    const setTypeOptions = function setTypeOptions(category, categoryDataSet, callback) {

        let type;

        for (let i = 0; i < categoryDataSet.length; i++) {

            if (categoryDataSet[i].category.toLowerCase() === category.toLowerCase()) { 

                type = categoryDataSet[i].type;

                break;

            }

        }

        return callback(type);

    }

    return (

        <>
         <div className="upload-form-group-child">
            { 
                (type?.length > 0 ) && (

                    <Select
                    label="Product type"
                    name="productType"
                    errorClass="upload-form-error"
                    labelClassName="upload-form-select-label"
                    selectClassName="upload-form-select"
                    >
                    {
                        type.map((val,i) =>

                            (val.name === "Select") ?                                      
                            <option key={i} value="">{val.name}</option> :
                            <option key={i} value={val.name}>{val.name}</option> 

                        )
                    }
                    </Select>

                )
            }                            
        </div>
        </>

    )

}