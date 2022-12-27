/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiPencil, BiSelection } from "react-icons/bi";
import { RiAddFill, RiCameraLine, RiCloseFill,  RiCursorLine,  RiDeleteBin7Fill, RiUpload2Line } from "react-icons/ri";
import { BsCursorFill, BsHandIndex } from 'react-icons/bs';
import * as Yup from 'yup';
import BackButton from '../../../BackButton/backButton';
import EmptyState, { EmptyStateButton } from '../../../EmptyState/emptyState';
import { UploadProductDetailsTemplate } from '../UploadProductOrService/uploadProduct';
import FormTemplate, { inputTypeConstant } from '../../../FormTemplate/formTemplate';
import { ModalBox } from '../../../ModalReviews/modalReviews';
import useEditProductContext from '../../../../Context/EditProduct/context';
import bell from '../../../../Images/bell3.png';
import image2 from '../../../../Images/product3.webp';
import styles from './EditProduct.module.css';
import './editProduct.css';
import { AiOutlineSelect } from 'react-icons/ai';


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


const options = {
    productCategory: [
        {value: "Select"},
        {value: "Electronics"},
        {value: "Furniture"},
        {value: "Books"},
        {value: "Clothing"},
        {value: "Jewelries"}
    ],
    productType: [
        {
            category:"Electronics",
            type:[{value:"Phones"},{value:"Laptop"},{value:"Appliances"}]
        },
        {
            category:"Furniture",
            type:[{value:"Chair"}, {value:"Table"}, {value:"Stool"}]
        },
        {
            category:"Clothes",
            type:[]
        },
        {
            category:"Books",
            type:[]
        }  
    ],
    productUsage: [ 
        {value: "Select"},
        {value: "Never used"},
        {value: "Fairly used"},
        {value: "2 years +"}
    ],
    productCurrency: [
        {value: "Select"},
        {value: "Naira"},
        {value: "British pounds"},
        {value: "US Dollar"}
    ],
}

const formdata = {
    productName:{
        id: "1",
        keyName: "Product Name",
        initial: {
            productName: '',
        },
        yupValidation: {
            productName: Yup.string().required('Name is required'),
        },
        formData: [
            {
                name: "productName",
                type: inputTypeConstant.textArea,
                label: "Product Name",
                labelText: "",
                dontShowErrorText: true
            }
        ]
    },
    productDescription: {
        id: "2",
        keyName: "Product Description",
        initial: {
            productDescription: '',
        },
        yupValidation: {
            productDescription: Yup.string().required('Name is required'),
        },
        formData: [
            {
                name: "productDescription",
                type: inputTypeConstant.textArea,
                label: "Product Description",
                labelText: "",
                dontShowErrorText: true
            }
        ]
    },
    productCategory: {
        id: "3",
        keyName: "Product Category",
        initial: {
            productCategory: '',
        },
        yupValidation: {
            productCategory: Yup.string().required('Name is required'),
        },
        passValueUp: true,
        formData: [
            {
                name: "productCategory",
                type: inputTypeConstant.select,
                options: options.productCategory,
                label: "Product Category",
                labelText: "",
                dontShowErrorText: true
            }
        ]
    },
    // productType: {
    //     id: "4",
    //     keyName: "Product Type",
    //     initial: {
    //         productType: '',
    //     },
    //     yupValidation: {
    //         productType: Yup.string().required('Name is required'),
    //     },
    //     useEditProductTypeOptions: true,
    //     formData: [
    //         {
    //             name: "productType",
    //             type: inputTypeConstant.select,
    //             options: options.productType,
    //             label: "",
    //             labelText: "",
    //             dontShowErrorText: true
    //         }
    //     ]
    // },
    productUsage: {
        id: "5",
        keyName: "Product Usage",
        initial: {
            productUsage: '',
        },
        yupValidation: {
            productUsage: Yup.string().required('Name is required'),
        },
        formData: [
            {
                name: "productUsage",
                type: inputTypeConstant.select,
                options: options.productUsage,
                label: "Product Usage",
                labelText: "",
                dontShowErrorText: true
            }
        ]
    },
    productCurrency: {
        id: "6",
        keyName: "Product Currency",
        initial: {
            productCurrency: '',
        },
        yupValidation: {
            productCurrency: Yup.string().required('Name is required'),
        },
        formData: [
            {
                name: "productCurrency",
                type: inputTypeConstant.select,
                options: options.productCurrency,
                label: "Product Currency",
                labelText: "",
                dontShowErrorText: true
            }
        ]
    },
    productPrice: {
        id: "7",
        keyName: "Product Price",
        initial: {
            productPrice: '',
        },
        yupValidation: {
            productPrice: Yup.string().required('Name is required'),
        },
        formData: [
            {
                name: "productPrice",
                type: inputTypeConstant.textArea,
                label: "Product Price",
                labelText: "",
                dontShowErrorText: true
            }
        ]
        
    },
    productDiscount:{
        id: "8",
        keyName: "Product Discount",
        initial: {
            productDiscount: '',
        },
        yupValidation: {
            productDiscount: Yup.string().required('Name is required'),
        },
        formData: [
            {
                name: "productDiscount",
                type: inputTypeConstant.textArea,
                label: "Product Discount",
                labelText: "",
                dontShowErrorText: true
            }
        ]
    },
}

function EditProductCompWrapper({ product, images, ...props }) {
    return (
        <div className="placed-orders-container">
            <div className="store-edit-product-selector-container">
                <BackButton
                buttonWrapperClassName="store-edit-product-back-button"
                />
                <Link 
                className="store-edit-product-selector-link"
                to="/home/dashboard/store/products">
                    <BsHandIndex className="store-icon-edit"/>
                </Link>
            </div>
            <div className="placed-orders-header">
                <h3> Edit Product</h3>
            </div>
            <UploadProductDetailsTemplate
            formComponent = {
                <EditProductItems {...product[0]} />
            }
            imageSelectorComponent = {
               <ProductImages images = {images}/>
            }
            />
        </div>
    )
}

function ProductImages({images, ...props}) {
    const [imageFile, setImageFile] = useState(null);
    const [imageBlob, setImageBlob] = useState("");

    const handleImageChange = (e) => {
        setImageFile({
            [e.target.name] : e.currentTarget.files[0]
        });
        setImageBlob(getImageBlob(e.currentTarget.files[0]));
    }

    const getImageBlob = (img={}) => {
        return URL.createObjectURL(img);
    }

    const cancelSelectedImage = (e) => {
        e.preventDefault();
        setImageBlob("");
        e.stopPropagation();
    }

    return (
        <div className="store-product-edit-image-container">
            <div>

            </div>
            <div className={styles.imageBody}>
                <label className={styles.imageInputWrapper}>
                    <div className={styles.imageInputIconWrapper}>
                        <RiCameraLine className={styles.imageInputIcon}/>
                    </div>
                    {
                        imageBlob && (
                            <div 
                            className={styles.imageInputIconWrapper}
                            onClick={cancelSelectedImage}
                            >
                                <RiDeleteBin7Fill className={styles.imageInputIcon}/>
                            </div>  
                        )
                    }
                    <input type="file" onChange={handleImageChange}/>
                </label>
                {/* // TODO... replace image2 with product image */}
                <img src={imageBlob || image2} alt=""/>
            </div>
        </div>
    )
}

function EditProductItems({
    productName,
    productDescription,  
    productCategory, 
    // productType, 
    productUsage, 
    productCurrency,
    productPrice,
    productDiscount,
}) {
    const [editProductCategory, setEditProductCategory] = useState([]);
    const [editProductTypeOptions, setEditProductTypeOptions] = useState([]); 

    useEffect(() => {
        setTypeOptions(editProductCategory, categoryDataSet, setEditProductTypeOptions);
    }, [editProductCategory])

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

    const getProductDetailData = (details) => {
        const editDetails = Object.keys(details).map(key => ({
            name: key,
            keyName: formdata[key].keyName,
            keyValue: details[key],
            formData: formdata[key],
        }))
        return editDetails;
    }

    return (
        <>
        {
            getProductDetailData({
                productName,
                productDescription,  
                productCategory, 
                // productType, 
                productUsage, 
                productCurrency,
                productPrice,
                productDiscount,
            }).map((values, i)=>
                <EditItem
                key={i}
                {...values}
                />     
            )
             
        }
        </>
    )
}


function EditItem({ 
    keyName,
    name,
    noValueText,
    keyValue,
    formData,
    passValueUp,
    children,
    ...props
}) {
    // const [updateProductResponse, setUpdateProductResponse] = useState('');
    // const [updatingProduct, setUpdatingProduct ] = useState(false);
    // const [updatingProductError, setUpdatingProductError] = useState(false);
    const [showEditBar, setShowEditBar] = useState(false);
    
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

    const closeEditBar = () => {
        setShowEditBar(false);
    }

    return (
        <>
            {
                showEditBar &&  (  
                    <ModalBox
                    dontUseDefaultModalChildContainer
                    handleModal={closeEditBar}
                    >
                        <div className="edit-product-form-container">
                            <div className="edit-product-form-close">
                                <button 
                                onClick={closeEditBar}
                                className="edit-product-form-close-button">
                                    <RiCloseFill className="edit-product-icon"/>
                                </button>
                            </div>
                            <div className="edit-product-form-body">
                                <FormTemplate
                                {...formData}
                                initial={ keyValue ? {[name]: keyValue } :  formData.initial}
                                handleSubmit={submitForm}
                                passValueUp={passValueUp}
                                >
                                    <button 
                                    className="store-edit-product-save-button"
                                    type= "submit" 
                                    >
                                        <RiUpload2Line className="store-icon-save"/>
                                        update
                                    </button>
                                </FormTemplate>
                            </div>
                        </div>
                    </ModalBox>
                )  
            }
            <EditItemdetail {...{keyName, keyValue, noValueText, openEditBar}}/>
        </>
    )
}

function EditItemdetail({
    keyName, 
    keyValue, 
    noValueText, 
    openEditBar, 
    ...props
}) {
    return (
        <div className="store-edit-product-detail-container">
            <div className="store-edit-product-details-group-left">
                <div className="store-edit-product-detail-label"><span>{ keyName }</span></div>
                <div className="store-edit-product-detail"><span>{ keyValue || noValueText || "No value set yet" }</span></div>    
            </div>
            <div className="store-edit-product-details-group-right">
            { 
                keyValue ? (
                    <button 
                    className="store-edit-product-button"
                    onClick = { openEditBar } 
                    title="Edit"
                    >
                        <BiPencil  className="store-icon-edit"/>
                    </button>
                ) : (
                     <button
                    className="store-edit-product-button" 
                    type="button" 
                    onClick={openEditBar} 
                    title="Add">
                        <RiAddFill className="store-icon-edit"/>
                    </button>
                ) 
            }
            </div>
        </div>
    )
}

function EmptyEditProductComp({
    emptyCartContainerClassName,
    href ,
    ...props
}) {
    return (
        <div className="store-product-empty-edit-container">
            <EmptyState
            // emptyContainerClassName = { containerClassName }
            imageSrc = { bell }
            imageAlt = "Edit product illustration"
            heading ="Edit your Product"
            writeUp ="Make changes to any of your product and give it a fresh look"
            // writeUp ="Please select any of your product you would like to edit"
            >
                <EmptyStateButton
                useLinkButton
                buttonIcon = {
                    <AiOutlineSelect className="empty-edit-button-icon"/>
                }
                emptyStateButtonText="Select Product"
                href = { href || "/home/dashboard/store/products" }
                />
            </EmptyState>
        </div>   
    )  
}