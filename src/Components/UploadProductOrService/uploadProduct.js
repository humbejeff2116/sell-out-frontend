








import React, {useState, useEffect} from 'react';
import {Loader} from '../Loader/loader';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {TextInput, AnimSelect, Select} from '../Formik/formik';
import './uploadProduct.css';


export default function UploadProductOrService(props) {
    const [showProductForm, setShowProductForm]= useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);

    const displayProductForm = function() {
        setShowProductForm(true);
        setShowServiceForm(false);
    }
    const displayServiceForm = function() {
        setShowServiceForm(true);
        setShowProductForm(false);    
    }
    return (
        <div className="upload-product-container">
            <div className="upload-details-type">

                <div className="upload-details-heading">
                   <h3> what details are we uploading today?</h3>
                </div>
                <div className="upload-details-buttons">
                    <div className="upload-product-button">
                        <button onClick={()=> displayProductForm()}>Product</button>
                    </div>
                    <div className="upload-product-or">
                       <span>or</span>
                    </div>
                    <div className="upload-service-button">
                        <button onClick ={()=> displayServiceForm()}>Service</button>
                    </div>

                </div>

            </div>
            <div className="upload-form-container">
                {
                    ( showProductForm && !showServiceForm ) ? ( <ProductForm/> ) :
                     (!showProductForm && showServiceForm) ? ( <ServiceForm/> ) : ''
                }
              
            </div>
        </div>
    )
}


const categoryDataSet = [
    {
        category:"Electronics",
        type:[{name:"phones"},{name:"laptop"},{name:"appliances"}]
    },
    {
        category:"Furniture",
        type:[{name:"chairs"},{name:"table"},{name:"stool"}]
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
  

const selectData = {
    countries:[{name:""}]
}


function ProductForm () {
    const [showForm , setShowForm ] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [type , setType] = useState([]);
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    

    useEffect(() => {
        let timer = null;
        timer = setTimeout(()=> setShowForm(true), 1000);
        return ()=> {
            if(timer) {
                setShowForm(false);
                return  clearTimeout(timer);
            }
        }
    },[])

    const handleInputChange = function(e) {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name] :e.target.value
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

    if(!showForm ) {
        return (
            <div className="upload-form-loader-panel">
                <Loader 
                loaderContainer={"upload-form-loader-container"} 
                loader={"upload-form-loader"} 
                />
            </div> 
        )
    }
    return (
        <div className="upload-form-panel">
            <div className="upload-form-panel-heading">
                <h4>Upload product details</h4>
            </div>

            <div className="upload-form-panel-body">
            <Formik
                initialValues = {{
                    productName:'',
                    productCountry: '',
                    productState: '',
                    productUsage:'',
                    productCurrency:'',
                    productPrice:'',
                    contactNumber:'',
                    productType:'',    
                }}

                validationSchema = { Yup.object({
                    productType: Yup.string().required('product type is Required'),
                    productName: Yup.string().required('product name is Required'),
                    productCountry: Yup.string().required('Your country is required'),
                    productState: Yup.string().required('Your password is required'),
                    productUsage: Yup.string().required('Your password is required'),
                    productCurrency: Yup.string().required('Your password is required'),
                    productPrice: Yup.string().required('Your password is required'),
                    contactNumber: Yup.string().required('Your password is required'),
                })}

                onSubmit =  {(values, { setSubmitting }) => {
                    alert("submitting")
                    const productValue = values;
                    productValue.productCategory = formValues.productCategory;

                    setTimeout(() => {
                        alert(JSON.stringify(productValue, null, 2));
                        setSubmitting(false);
                    }, 400);  
                }}
            >
                <Form>
                <div className="upload-form-group">
                    <div className="upload-form-group-child">                     
                        <Select 
                        label="Category" 
                        onChange={handleInputChange} 
                        name="productCategory" 
                        value={formValues.productCategory} 
                        errorClass="upload-form-error"
                        >
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option  value="Books">Books</option>
                            <option  value="Clothes">Clothes</option>
                        </Select>
                    </div>
                    <div className="upload-form-group-child input">
                        <TextInput
                        label="Name"
                        labelClassName="upload-label"
                        name="productName"
                        type="text"
                        placeholder="e.g Nokia 3310"
                        errorClass="login-modal-form-error"
                        />
                    </div>
                   
                </div>

                <div className="upload-form-group">
                    <div className="upload-form-group-child">
                        <Select label="productCountry" name="productCountry" errorClass="upload-form-error">
                            <option value="Nigeria">Nigeria</option>
                            <option value="Nigeria">Ghana</option>
                            <option value="Nigeria">Congo</option>
                            <option value="Nigeria">Clothes</option>
                        </Select>   
                    </div>
                    <div className="upload-form-group-child">
                        <Select label="productState" name="productState" errorClass="upload-form-error">
                            <option value="Abia">Abia</option>
                            <option value="Abia">Furniture</option>
                            <option value="Abia">Book</option>
                            <option value="Abia">Clothes</option>
                        </Select> 
                    </div>
                    <div className="upload-form-group-child">
                        <Select label="productUsage" name="productUsage" errorClass="upload-form-error">
                            <option value="Never used">Never used</option>
                            <option value="Fairly used">Fairly used</option>
                            <option value="2 years +">2 years +</option>
                        </Select>
                    </div>
                </div>

                <div className="upload-form-group">
                    <div className="upload-form-group-child input">
                        <div>
                        <label htmlFor="email address">Picture</label>   
                        </div>
                    </div>
                    <div className="upload-form-group-child">
                    { 
                        (type.length > 0 ) && (
                        < AnimSelect
                        loader= {
                            <Loader 
                                loaderContainer={"upload-form-select-loader-container"} 
                                loader={"upload-form-select-loader"} 
                             />
                            }
                            label="Type"
                            name="productType"
                            errorClass="upload-form-error"
                        >
                        {
                            type.map((val,i) =>                                      
                                <option key={i} value={val.name}>{val.name}</option>   
                            )
                        }
                        </AnimSelect>
                        )
                    }                            
                    </div>   
                </div>

                <div className="upload-form-group">
                    <div className="upload-form-group-child">
                        <Select label="productCurrency" name="productCurrency" errorClass="upload-form-error">
                            <option value="Naira">Naira</option>
                            <option value="Naira"> British Pounds</option>
                            <option value="Naira">U.S Dollar</option>
                        </Select>
                    </div>
                    <div className="upload-form-group-child input">
                        <TextInput
                            label="Price"
                            labelClassName="upload-label"
                            name="productPrice"
                            type="text"
                            placeholder="e.g 2000"
                            errorClass="login-modal-form-error"
                        />
                    </div> 
                </div>

                <div className="upload-form-group">
                    <div className="upload-form-group-child input">
                        <TextInput
                            label="Contact number"
                            labelClassName="upload-label"
                            name="contactNumber"
                            type="text"
                            placeholder="e.g +2348010000000"
                            errorClass="login-modal-form-error"
                        />
                    </div>
                    <div className="upload-form-group-child ">
                        {/* <TextInput
                            label="not decided"
                            labelClassName="upload-label"
                            name=""
                            type="text"
                            placeholder="e.g not yet decided"
                            errorClassName="login-modal-form-error"
                        /> */}
                    </div>
                   
                </div>

                <div className="upload-form-button">
                    <button type="submit">
                    {uploadingProduct ? 'uploading...' : 'Upload'}
                    </button>
                </div>
                </Form>
            </Formik>
            </div>        
        </div>

    )
}




function ServiceForm(props) {
    const [showForm , setShowForm ] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    const [type , setType] = useState([]);
    
    useEffect(()=> {
        let timer = null;
        timer = setTimeout(()=> setShowForm(true), 1000);
        return ()=> {
            if(timer) {
                setShowForm(false);
                return  clearTimeout(timer);
            }
        }
    },[])

      const submitProduct = function() {

    }
    const handleInputChange = function(e) {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name] :e.target.value
        }))
        if (e.target.name === "category") {
            if (e.target.value) {
                setTypeOptions(e.target.value, categoryDataSet, setType);

            }
        }

    }
    const setTypeOptions = function setTypeOptions(category, categoryDataSet, callback) {
        let type;
        for (let i = 0; i< categoryDataSet.length; i++) {
            if(categoryDataSet[i].category === category) { 
                type = categoryDataSet[i].type;
                break;
            }
        }
        return callback(type);
    
    }

    if(!showForm ) {
        return (
            <div className="upload-form-loader-panel">
                <Loader 
                loaderContainer={"upload-form-loader-container"} 
                loader={"upload-form-loader"} 
                />
            </div> 
        )
    }

    return (
       <div className="upload-form-panel">
            <div className="upload-form-panel-heading">
                <h4>Upload service details</h4>
            </div>

            <div className="upload-form-panel-body">
                <form action="upload-product" onSubmit={submitProduct} method="POST" autoComplete="off">
                {/* row */}
                <div className="upload-form-group">
                    <div className="upload-form-group-child">
                        <div>
                        <label htmlFor="email address">Category</label>   
                        </div>
                        <div>
                            <select onChange={handleInputChange} name="category" value={formValues.category}>
                                <option>Electronics</option>
                                <option>Furniture</option>
                                <option>Books</option>
                                <option>Clothes</option>
                            </select>
                        </div>
                    </div>
                    <div className="upload-form-group-child input">
                        <div>
                        <label htmlFor="email address">Name</label>   
                        </div>
                        <input type="text" name="productName" placeholder="e.g Nokia 3310" />
                    </div>
                   
                </div>
                {/* row */}
                <div className="upload-form-group">
                    <div className="upload-form-group-child">
                        <div>
                        <label htmlFor="email address">Country</label>   
                        </div>
                        <div>
                            <select>
                                <option>Nigeria</option>
                                <option>Ghana</option>
                                <option>Congo</option>
                                <option>Clothes</option>
                            </select>
                        </div>
                        
                    </div>
                    <div className="upload-form-group-child">
                        <div>
                        <label htmlFor="email address">State</label>   
                        </div>
                        <div>
                            <select>
                                <option>Abia</option>
                                <option>Furniture</option>
                                <option>Book</option>
                                <option>Clothes</option>
                            </select>
                        </div>
                    </div>
                    <div className="upload-form-group-child">
                        <div>
                        <label htmlFor="email address">Usage</label>   
                        </div>
                        <div>
                            <select>
                                <option>Never used</option>
                                <option>Fairly used</option>
                                <option>2 years +</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* row */}
                <div className="upload-form-group">
                    <div className="upload-form-group-child input">
                        <div>
                        <label htmlFor="email address">Picture</label>   
                        </div>
                    </div>
                    <div className="upload-form-group-child">
                    { 
                        (type.length > 0) && ( <Select type={type} /> )
                    }                            
                    </div>
                    
                </div>


                <div className="upload-form-group">
                    <div className="upload-form-group-child">
                        <div>
                        <label htmlFor="email address">Currency</label>   
                        </div>
                        <div>
                            <select>
                                <option>Naira</option>
                                <option> British Pounds</option>
                                <option>U.S Dollar</option>
                               
                            </select>
                        </div>
                    </div>
                    <div className="upload-form-group-child input">
                        <div>
                        <label htmlFor="email address">Price</label>   
                        </div>
                        <input type="text" name="price" placeholder="e.g 2000" />
                    </div>
                   
                </div>

                <div className="upload-form-group">
                    <div className="upload-form-group-child input">
                        <div>
                        <label htmlFor="email address">Contact number</label>   
                        </div>
                        <input type="text" name="contact" placeholder="e.g +2348010000000" />
                    </div>
                    <div className="upload-form-group-child ">
                        <div>
                        <label htmlFor="email address">2</label>   
                        </div>
                    </div>
                   
                </div>

                <div className="upload-form-button">
                    <button type="submit" className="btn btn-success">
                    {uploadingProduct ? 'uploading...' : 'Upload'}
                    </button>
                </div>
                </form>
            </div>        
        </div>
    )
}