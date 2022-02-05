
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Select, TextAreaInput } from '../../../../Formik/formik';
import UploadProductData from '../Data/uploadProductData'


export default function UploadProductDetails({ 
    type, 
    handleSubmit, 
    productValues, 
    setTypeOptions, 
    setType, 
    categoryDataSet 
}) {
    return (
        <Formik
        initialValues = {{
            productName: productValues?.productName ?? '',
            productPrice:productValues?.productPrice ?? '',
            productDiscount: productValues?.productDiscount ?? '',
            productUsage: productValues?.productUsage ?? '',
            productCurrency:productValues?.productCurrency ?? '',
            productCategory: productValues?.productCategory ?? '', 
            productType: productValues?.productType ?? '',   
        }}

        validationSchema = { Yup.object({
            productName: Yup.string().required('product name is Required'),
            productPrice: Yup.string().required('Price is required'),
            productUsage: Yup.string().required('Usage is required'),
            productCurrency: Yup.string().required('Currency is required'),
            productCategory: Yup.string().required('Category is required'), 
            productType: Yup.string().required('Type is required'),            
        })}

        onSubmit =  { handleSubmit }
        >
            {(formikProps) => {
                const { 
                    values, 
                    // handleChange 
                } = formikProps;
                return (
                    <Form>
                    <div className="upload-form-group">
                        {/* description */}
                        <div className="upload-form-group-child-input">
                            <TextAreaInput
                            label="Name/Description"
                            labelClassName="upload-form-textarea-label"
                            name="productName"
                            type="text"
                            placeholder="e.g Nokia 3310"
                            errorClass="upload-form-textarea-error"
                            />
                        </div>
                        {/* price */}
                        <div className="upload-form-group-child-input">
                        <TextAreaInput
                            label="Price"
                            labelClassName="upload-form-textarea-label"
                            name="productPrice"
                            type="text"
                            placeholder="e.g 2000"
                            errorClass="upload-form-textarea-error"
                            formatValue= { true }
                            formatedValueClass="upload-form-textarea-formated-value"
                        />
                        </div> 
                        {/* discount */}
                        <div className="upload-form-group-child-input">
                            <TextAreaInput
                                label="Discount"
                                labelClassName="upload-form-textarea-label"
                                labelText=" (optional)"
                                labelTextClass ="upload-form-textarea-label-text"
                                name="productDiscount"
                                type="text"
                                placeholder="e.g 2000"
                                errorClass="upload-form-textarea-error"
                            />
                        </div>   
                    
                    </div>

                    <div className="upload-form-group">
                        {/* usage */}
                        <div className="upload-form-group-child">
                            <Select 
                            label="Usage" 
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
                        </div>
                        {/* currency */}
                        <div className="upload-form-group-child">
                            <Select 
                            label="Currency" 
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
                        </div>
                    
                        {/* category */}
                        <div className="upload-form-group-child">                     
                            <Select 
                            label="Category" 
                            // onChange={handleInputChange} 
                            name="productCategory" 
                            // value={formValues.productCategory} 
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
                        </div>
                    
                    </div>
                   
                        {
                            ( values.hasOwnProperty("productCategory") && values.productCategory) && (
                                <div className="upload-form-group">
                                <ProductTypeComp
                                values={values} 
                                type ={type} 
                                setTypeOptions ={setTypeOptions}
                                categoryDataSet= {categoryDataSet}
                                setType  = {setType}
                                />
                                </div>
                            )
                        }
                       
                    <div className="upload-form-button-container next-only">
                        <div className="upload-form-button-wrapper">
                            <button type="submit">Next</button>
                        </div>
                    </div>
                    
                    </Form>
                );
            }}
            
        </Formik>
    )
}

function ProductTypeComp({ values}) {
    const [type , setType] = useState([]);

    useEffect(()=>{
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
                    label="Type"
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