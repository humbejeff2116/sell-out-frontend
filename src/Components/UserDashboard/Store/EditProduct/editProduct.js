






import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Select, TextAreaInput } from '../../../Formik/formik';
import { BiEdit } from "react-icons/bi";
import { RiAddFill, RiCloseLine, RiSave2Line } from "react-icons/ri";
import useEditProductContext from '../../../../Context/EditProduct/context';
import { ImWarning } from 'react-icons/im';
import './editProduct.css';


const categoryDataSet = [
    {
        category:"Electronics",
        type:[{name:"Select"},{name:"Phones"},{name:"Laptop"},{name:"Appliances"}]
    },
    {
        category:"Furniture",
        type:[{name:"Select"},{name:"Chair"},{name:"Table"},{name:"Stool"}]
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
    let EditProductComponent;

    useEffect(()=> {

       return ()=> {
        setProductToEdit(null)
       }
    },[setProductToEdit]);

    if (productToEdit && productToEdit.length > 0) {
        
        EditProductComponent = (
            <EditProductCompWrapper 
            product={ productToEdit }
            images ={ productToEdit.productImages }
            />
        );

    } else {
        EditProductComponent = ( <EmptyEditProductComp/> );
    }
    return (
        <div className="placed-orders-container">
        <div className="placed-orders-header">
            <h3> Edit Product</h3>
        </div>
        <div className="store-products-search-container">
            <div className="store-products-search">
                <form>
                    <label htmlFor="order-search"> Search by product name or description</label>
                    <div className="store-products-search-input">
                        <input type="text" />
                        <button>Search</button>
                    </div>
                   
                </form>
            </div>
        </div>

        <div className="store-product-edit-container">
            { EditProductComponent }
        </div>
        </div>
    )
}


function EditProductCompWrapper({product}) {

    return (
        <div className="store-product-edit-wrapper">
        <div className="store-product-edit-details-container">
        {
    
            product && ( <EditProductItems {...product[0]} /> )
        
        }
        </div>
            <div className="store-product-edit-image-container">
            <p>product image</p>
           </div>
        </div>
    )
}

function EditProductItems({
    productName,  
    productCategory, 
    productType, 
    productUsage, 
    productCurrency,
    productPrice,
    productDiscount,
}) {
    const [formValues, setFormValues] = useState({});
    const [type , setType] = useState([]);
   
    // const { user } = useAuth();

    const handleInputChange = function(e) {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name] : 
            (e.target.type === "file" && e.target.files.length) ? [ ...e.target.files ] :
            (e.target.type === "file" && e.target.files.length < 1 ) ? [ e.target.files[0] ] :
            e.target.value
        }))
        if (e.target.name === "productCategory") {
            if (e.target.value) {
                setTypeOptions(e.target.value, categoryDataSet, setType);
            }
        }
    }
    const setTypeOptions = function setTypeOptions(category, categoryDataSet, callback) {
        let type;
        for (let i = 0; i < categoryDataSet.length; i++) {
            if(categoryDataSet[i].category === category) { 
                type = categoryDataSet[i].type;
                break;
            }
        }
        return callback(type);
    }
    return (
        <>
        <EditItem 
        keyName = { "Product name or description" } 
        value = { productName } 
        initialValues = { { productName: productName } }
        editBarChildren = { 

            <TextAreaInput 
            name="productName" 
            type="text" 
            /> 

        }
        />

        <EditItem 
        keyName={ "Category" } 
        value={ productCategory } 
        initialValues ={ {deliveryRegion: productCategory} }
        editBarChildren = {

            <Select 
            onChange={ handleInputChange } 
            name="productCategory" 
            value={ formValues?.productCategory } 
            >
                <option value="">Select</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option  value="Books">Books</option>
                <option  value="Clothes">Clothes</option>

            </Select>

        }
        />

        {
            ( type.length > 0 ) && (
                <EditItem 
                keyName={"Type"} 
                value={ productType } 
                initialValues ={ { productType: productType } }
                editBarChildren = {
                  
                    <Select name="productType" >
                    {
                        type.map((val,i) =>
                            (val.name ==="--Select--") ?                                      
                            <option key={i} value="">{val.name}</option> :
                            <option key={i} value={val.name}>{val.name}</option>  
                        )
                    }
                    </Select>

                }
                />
            )
        }
        

        <EditItem 
        keyName={ "Usage" } 
        value={ productUsage } 
        initialValues ={ { productUsage: productUsage } }
        // yupObject={{ productUsage: Yup.string().required(`product's usage is is Required`)}}
        editBarChildren = {
          
            <Select name="productUsage" >

                <option value="">Select</option>
                <option value="Never used">Never used</option>
                <option value="Fairly used">Fairly used</option>
                <option value="2 years +">2 years +</option>

            </Select>

        }
        />

        <EditItem 
        keyName={ "Currency" } 
        value={ productCurrency }
        initialValues ={ { productCurrency: productCurrency } } 
        editBarChildren = {

            <Select name="productCurrency" >

                <option value="">Select</option>
                <option value="Naira">Naira</option>
                <option value="pounds"> British Pounds</option>
                <option value="dollar">U.S Dollar</option>

            </Select>

        }
        />

        <EditItem 
        keyName={ "Price" } 
        value={ productPrice }
        initialValues ={ { productPrice: productPrice } } 
        editBarChildren = {
           
            <TextAreaInput
            name="productPrice"
            type="text"
            placeholder="e.g 2000"
            />
        }
        />

        <EditItem 
        keyName={ "Discount" } 
        noValueText={ "No discount has been set yet" }
        value={ productDiscount } 
        initialValues = { { productDiscount: productDiscount } }

        editBarChildren= { 
            <TextAreaInput 
            name="productDiscount" 
            type="text" 
            placeholder="e.g 2000" /> 
        }
        />

        </>
    )
   
}



function EditItem({ 
    initialValues, 
    editBarChildren, 
    keyName, 
    value, 
    noValueText,

}) {
    const [showEditBar, setShowEditBar] = useState(false);
    const [updatingProduct , setUpdatingProduct ] = useState(false);
    const [updatingProductError , setUpdatingProductError] = useState(false);
    const [updateProductResponse, setUpdateProductResponse] = useState('');
    let Button;
    let EditBarComponent = (
        <EditBar 
        initialValues = { initialValues } 
        submitForm = { submitForm }
        updatingProduct = { updatingProduct } 
        updatingProductError = { updatingProductError }
        response = { updateProductResponse }
        errorIcon = { <ImWarning/> }
        >
            { editBarChildren }
        </EditBar>
    )

    function submitForm(values) {
        setUpdatingProduct(true)
        // setUpdatingProductError(true)
        // setUpdateProductResponse("update successful")
        alert(JSON.stringify(values, null, 2))
    }

    const openEditBar = ( ) => {
        setShowEditBar(state => !state);
    }

    if (showEditBar) {
            Button = (
                <button onClick = { openEditBar }> 
                    <RiCloseLine className="store-icon-edit"/>
                    Close
                </button>
            )
    } else {
        Button = (
            <button onClick = { openEditBar }>
                <BiEdit title="Edit" className="store-icon-edit"/> 
                Edit
            </button>
        )
    }
    
    return (
        <div className="store-product-edit-details-group-container">
            <div className="store-product-edit-details-group">
            <div className="store-product-edit-details-group-left">
                <div className="label"><span>{ keyName }</span></div>
                <div className="edit-product-detail"><span>{ value || noValueText }</span></div>    
            </div>

            <div className="store-product-edit-details-group-right">     
            {
                
                <div className="store-product-edit-details-group-edit-button">
                { 
                    (!value && !showEditBar) ? (
                        <button onClick={openEditBar}>
                        <RiAddFill className="store-icon-edit"/>
                        Add</button>
                    )  :  Button 
                }
                </div>
            }
            </div>
            </div>
            {/* edit bar */}
            {
                showEditBar && ( EditBarComponent )
            }
        </div>
    )
}

function EditBar({ 
    initialValues, 
    yupObject, 
    submitForm,
    updatingProduct, 
    updatingProductError,
    response,
    errorIcon,
    children 
}) {
 
    return (
         <div className="store-product-edit-details-group">
         <div className="store-product-edit-details-group-left">
         <div><span>{ response }</span></div>

         <Formik
         initialValues = { initialValues }
         validationSchema = { Yup.object(yupObject)}
         onSubmit = { submitForm }
         >
             <Form>
                 {
                    children
                 }
                 {/* TODO... move submit button in here */}
             </Form>
         </Formik>
         </div>

         <div className="store-product-edit-details-group-right">
             <div className="store-product-edit-details-group-edit-button save">
                 <button type= "submit">
                    <RiSave2Line className="store-icon-edit"/>
                    {
                        updatingProduct ? <span>Updating Product...</span> : 
                        updatingProductError ? <> { errorIcon } <span>Update</span></> :
                        <span>Update</span>
                    }
                </button>
             </div>
         </div>
         </div>
    )
}

function EmptyEditProductComp() {
    return (
        <div className="edit-product-empty-container">
          
               <div className="edit-product-empty-content">
                   <p>
                       If you wish to edit any of your product ? You can easily carry out that action by:
                       
                   </p>
                   <ol>
                        <li> Simply searching for it using the search bar above. Or</li>
                        <li> Selecting it from your products collection</li>
                    </ol>

               </div>
               <div className="edit-product-empty-button-container">
                   <div className="edit-product-empty-button-wrapper">
                   <Link to="/home/dashboard/store/products"><button> Select Product To Edit</button></Link>
                   </div>
               </div>
           
        </div>
    )
}