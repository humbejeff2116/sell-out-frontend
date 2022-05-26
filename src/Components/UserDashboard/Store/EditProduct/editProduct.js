
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiPencil } from "react-icons/bi";
import { RiAddFill, RiCloseLine } from "react-icons/ri";
import { ImWarning } from 'react-icons/im';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Select, TextAreaInput } from '../../../Formik/formik';
import { UploadProductDetailsTemplate } from '../UploadProductOrService/uploadProduct';
import useEditProductContext from '../../../../Context/EditProduct/context';
import './editProduct.css';


const categoryDataSet = [
    {
        category:"Electronics",
        type:[{name:"Phones"},{name:"Laptop"},{name:"Appliances"}]
    },
    {
        category:"Furniture",
        type:[{name:"Chair"}, {name:"Table"}, {name:"Stool"}]
    },
    {
        category:"Clothes",
        type:[]
    },
    {
        category:"Books",
        type:[]
    }
]

export default function EditProduct(props) {
    const { productToEdit, setProductToEdit } = useEditProductContext();

    useEffect(()=> {

       return ()=> {
            setProductToEdit(null)
       }
    },[setProductToEdit]);

    return (
        <>
        { 
            (productToEdit?.length > 0) ? (
                <EditProductCompWrapper 
                product = { productToEdit }
                images = { productToEdit.productImages }
                />
            ) : (
                <EmptyEditProductComp/>
            )
        }
        </>
    )
}

function EditProductCompWrapper({ product, images, ...props }) {
    return (
        <div className="placed-orders-container">
            <div className="store-edit-product-selector-container">
                <div className="store-edit-product-selector-link-wrapper">
                    <Link to="/home/dashboard/store/products">
                        <RiAddFill className="store-icon-edit"/>
                    </Link>
                </div>
            </div>
            <div className="placed-orders-header">
                <h3> Edit Product</h3>
            </div>
            <UploadProductDetailsTemplate
            formComponent = {
                <EditProductItems { ...product[0] } />
            }
            imageSelectorComponent = {
                // TODO... develop product image editor 
                <div className="store-product-edit-image-container">
                <p>product image</p>
                </div>
            }
            />
        </div>
    )
}

function EditProductItems({
    productName,
    productDescription,  
    productCategory, 
    productType, 
    productUsage, 
    productCurrency,
    productPrice,
    productDiscount,
}) {
    const [formValues, setFormValues] = useState({});
    const [editProductCategory, setEditProductCategory] = useState([]);
    const [editProductTypeOptions, setEditProductTypeOptions] = useState([]); 
    // const { user } = useAuth();

    useEffect(() => {
        setTypeOptions(editProductCategory, categoryDataSet, setEditProductTypeOptions);
    }, [editProductCategory])

    const handleInputChange = function(e) {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name] : 
            (e.target.type === "file" && e.target.files.length) ? [ ...e.target.files ] :
            (e.target.type === "file" && e.target.files.length < 1 ) ? [ e.target.files[0] ] :
            e.target.value
        }))
    }

    const setTypeOptions = (category, categoryDataSet, callback) => {
        let type = [];

        for (let i in categoryDataSet) {
            if (categoryDataSet[i].category === category) {
                type = categoryDataSet[i].type;
                break;
            }
        }

       callback(type);
    }

    return (
        <>
            <EditItem 
            keyName = "Product Name"  
            editingValue = { productName }
            initialValues = {{ productName: productName ?? "" }} 
            yupObject = {{ productName: Yup.string().required(`product name is required`) }}
            errorIcon = { <ImWarning/> }
            >
                <TextAreaInput 
                name="productName" 
                type="text"
                dontShowErrorText 
                /> 
            </EditItem>
            <EditItem 
            keyName = "Product Description" 
            noValueText = { "Product has no description yet" }
            editingValue = { productDescription }
            initialValues = {{ productDescription: productDescription ?? "" }} 
            yupObject = {{ productDescription: Yup.string().required(`product's description is required`) }}
            errorIcon = { <ImWarning/> }
            >
                <TextAreaInput 
                name="productDescription" 
                type="text"
                dontShowErrorText 
                />
            </EditItem>
            <EditItem 
            keyName = "Category"  
            editingValue = { productCategory } 
            initialValues = {{ productCategory: productCategory ?? "" }} 
            yupObject = {{ productCategory: Yup.string().required(`Product category is required`) }}
            errorIcon = { <ImWarning/> }
            >
                <Select 
                name = "productCategory" 
                dontShowErrorText 
                passValueUp = { setEditProductCategory }
                >
                    <option value="">Select</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option  value="Books">Books</option>
                    <option  value="Clothes">Clothes</option>
                </Select>
            </EditItem>
            {
                (editProductTypeOptions?.length > 0 ) && (
                    <EditItem 
                    keyName = "Type"
                    editingValue = { productType } 
                    initialValues = {{ productType: productType ?? "" }} 
                    yupObject = {{ productType: Yup.string().required(`Product type is required`) }}
                    errorIcon = { <ImWarning/> }
                    >
                        <Select 
                        name="productType"
                        dontShowErrorText 
                        >
                        <option value="">Select</option>
                        {
                            editProductTypeOptions.map((val,i) =>
                                <option key = { i } value = { val.name }>{ val.name }</option> 
                            )
                        }
                        </Select>
                    </EditItem>
                )
            } 
            <EditItem 
            keyName = "Usage"  
            editingValue = { productUsage }
            initialValues = {{ productUsage: productUsage ?? "" }}
            yupObject = {{ productUsage: Yup.string().required(`Product usage is required`) }} 
            errorIcon = { <ImWarning/> } 
            >
                <Select 
                name="productUsage" 
                dontShowErrorText
                >
                <option value="">Select</option>
                <option value="Never used">Never used</option>
                <option value="Fairly used">Fairly used</option>
                <option value="2 years +">2 years +</option>
                </Select>
            </EditItem>
            <EditItem 
            keyName = "Currency"  
            editingValue = { productCurrency }
            initialValues = {{ productCurrency: productCurrency ?? "" }}
            yupObject = {{ productCurrency: Yup.string().required(`Product currency is required`) }} 
            errorIcon = { <ImWarning/> }
            >
                <Select 
                name="productCurrency"
                dontShowErrorText 
                >
                <option value="">Select</option>
                <option value="Naira">Naira</option>
                <option value="pounds"> British Pounds</option>
                <option value="dollar">U.S Dollar</option>
                </Select>
            </EditItem>
            <EditItem 
            keyName = "Price" 
            editingValue = { productPrice }
            initialValues = {{ productPrice: productPrice ?? "" }}
            yupObject = {{ productPrice: Yup.string().required(`Product price is required`) }}
            errorIcon = { <ImWarning/> }
            >
                <TextAreaInput 
                name="productPrice" 
                placeholder="e.g 4000"
                dontShowErrorText  
                />
            </EditItem>
            <EditItem 
            keyName = "Discount" 
            noValueText = { "No discount has been set yet" }
            editingValue = { productDiscount } 
            initialValues = {{ productDiscount: productDiscount ?? "" }}
            yupObject = {{ productDiscount: Yup.string().required(`Product discount is required`) }}
            errorIcon = { <ImWarning/> }
            >
                <TextAreaInput 
                name="productDiscount" 
                placeholder="e.g 2000"
                dontShowErrorText  
                />
            </EditItem>
        </>
    )
   
}


function EditItem({ 
    keyName,
    noValueText,
    editingValue,
    editBarComponent,
    initialValues, 
    yupObject, 
    errorIcon,
    setProductCategory,
    children 
}) {
    const [updateProductResponse, setUpdateProductResponse] = useState('');
    const [updatingProduct, setUpdatingProduct ] = useState(false);
    const [updatingProductError, setUpdatingProductError] = useState(false);
    const [showEditBar, setShowEditBar] = useState(false);
    let button;

    const transformUpdateValue = (value = {}) => { 
        const newObj = {}

        for(let props in value) {
            newObj.key = props;
            newObj.value = value[props];
        }

        return newObj;
    }

    function submitForm(values) {
        alert(JSON.stringify(values, null, 2))
        // setUpdatingProduct(true)
        // setUpdatingProductError(true)
        // setUpdateProductResponse("update successful")
        const transformedVal = transformUpdateValue(values)
        alert(JSON.stringify(transformedVal, null, 2));
    }
    
    const openEditBar = (e) => {
        e.preventDefault();
        setShowEditBar(state => !state);
        e.stopPropagation();
    }

    if (showEditBar) {
        button = (
            <button onClick = { openEditBar }> 
                <RiCloseLine className="store-icon-edit"/>
            </button>
        )
    } else {
        button = (
            <button onClick = { openEditBar } title="Edit">
                <BiPencil  className="store-icon-edit"/>
            </button>
        )
    }
 
    return (
        <div className="store-product-editbar-container">
            <div><span>{ updateProductResponse || '' }</span></div>
            <Formik
            initialValues = { initialValues }
            validationSchema = { Yup.object(yupObject) }
            onSubmit = { submitForm }
            > 
            {(formikProps)=> {   
                return (
                    <Form className="store-edit-product-form">
                        <div className="store-edit-product-details-container">
                            <EditItemTop 
                            { ...{ keyName, editingValue, noValueText, showEditBar, button, openEditBar } }
                            />
                            {   
                                showEditBar &&  (  
                                    <div className="store-product-editbar-input-cntr">
                                        { children }
                                    </div>
                                )  
                            }
                        </div>
                    </Form>
                )
            }}
            </Formik>
        </div>
    )
}

function EditItemTop({keyName, editingValue, noValueText, showEditBar, button, openEditBar, ...props}) {
    return (
        <div className="store-edit-product-details-group">
            <div className="store-edit-product-details-group-left">
                <div className="store-edit-product-detail-label"><span>{ keyName }</span></div>
                <div className="store-edit-product-detail"><span>{ editingValue || noValueText || "No value set yet" }</span></div>    
            </div>
            <div className="store-edit-product-details-group-right">
                {
                    (showEditBar) && (
                        <div className="store-edit-product-save-button-wrapper">
                            <button type= "submit" title="Save">
                            {/* <RiSave2Line className="store-icon-edit"/> */}
                            Save
                            {/* {
                                updatingProduct ? <span>Saving...</span> : 
                                updatingProductError ? <> { errorIcon } <span>Save</span></> :
                                <span>Save</span>
                            } */}
                            </button>    
                        </div>   
                    )
                }
                <div className="store-edit-product-button-wrapper">
                { 
                    (!editingValue && !showEditBar) ? (
                        <button type="button" onClick={openEditBar} title="Add">
                            <RiAddFill className="store-icon-edit"/>
                        </button>
                    )  :  button 
                }
                </div>
            </div>
        </div>
    )
}

function EmptyEditProductComp() {
    return (
        <div className="store-product-empty-edit-container">
            <div className="edit-product-empty-container"> 
                <div className="edit-product-empty-content">
                    <h3>
                        Edit Product   
                    </h3>
                    <div className="edit-product-empty-content-writeup">
                        Make changes and updates to any of your product,
                        and give your customers a fresh and updated look. 
                    </div>
                </div>
                <div className="edit-product-empty-button-container">
                    <div className="edit-product-empty-button-wrapper">
                        <Link to="/home/dashboard/store/products">Select product</Link>
                    </div>
                </div>
            </div>
        </div>  
    )  
}