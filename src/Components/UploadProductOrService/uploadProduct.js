








import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { ImWarning } from 'react-icons/im';
import { Loader } from '../Loader/loader';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, AnimSelect, Select } from '../Formik/formik';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import './uploadProduct.css';


export default function UploadProductOrService(props) {
    const [showProductForm, setShowProductForm]= useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const { user } = useAuth();

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
        type:[{name:"--Select--"},{name:"phones"},{name:"laptop"},{name:"appliances"}]
    },
    {
        category:"Furniture",
        type:[{name:"--Select--"},{name:"chairs"},{name:"table"},{name:"stool"}]
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
    const [uploadingError , setUploadingError] = useState(false);
    const [response, setResponse] = useState('');
    const [redirect, setRedirect] =useState('');
    const { user } = useAuth();
    

    useEffect(() => {
        let timer = null;
        let mounted = true;
        timer = setTimeout(()=> setShowForm(true), 1000);
        socket.on('createProductUserError', function (response) {   
            if(mounted) {
                setUploadingError(true);
                setResponse(response.message);
                setUploadingProduct(false);
            }
        });

        socket.on('createProductNetworkError', function(response) {
            if(mounted) {
                setUploadingError(true);
                setResponse(response.message);
                setUploadingProduct(false);
            }
        });

        socket.on('productCreated', function (response) {
            if(mounted) {
                setUploadingError(false);
                setUploadingProduct(false);
                setResponse(response.message);
               timer = setTimeout(()=> setRedirect('/home'), 2000);
            }

        });

        return ()=> {
            mounted = false;
            if(timer) {
                setShowForm(false);
                return  clearTimeout(timer);
            }
        }
    },[]);

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

    function handleSubmit  (values) {
        try {
             setUploadingError(false);
            setUploadingProduct(true);
            setResponse('');
            values.productCategory = formValues.productCategory;
            const productData = {
                product: values,
                user: user
            }
            socket.emit('createProduct',productData);
        } catch(e) {
            setUploadingError(true);
            setResponse("An error occured please wait and try again");
            
        } finally {

        }    
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
    if(redirect) {
        return (
            <Redirect to={redirect} />
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
                    productCountry: Yup.string().required('Field is required'),
                    productState: Yup.string().required('State is required'),
                    productUsage: Yup.string().required('usage duration is required'),
                    productCurrency: Yup.string().required('currency is required'),
                    productPrice: Yup.string().required('price is required'),
                    contactNumber: Yup.string().required('contact number is required'),
                })}

                onSubmit =  {handleSubmit}
            >
                <Form>
                <div className="upload-form-group">
                    <div className="upload-form-group-child">                     
                        <Select 
                        label="product Category" 
                        onChange={handleInputChange} 
                        name="productCategory" 
                        value={formValues.productCategory} 
                        errorClass="upload-form-error"
                        >
                            <option value="">--Select--</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option  value="Books">Books</option>
                            <option  value="Clothes">Clothes</option>
                        </Select>
                    </div>
                    <div className="upload-form-group-child input">
                        <TextInput
                        label="Product Name"
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
                        <Select label="product Country" name="productCountry" errorClass="login-modal-form-error">
                            <option value="">--Select--</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>   
                    </div>
                    <div className="upload-form-group-child">
                        <Select label="product State" name="productState" errorClass="upload-form-error">
                            <option value="">--Select--</option>
                            <option value="Abia">Abia</option>
                            <option value="Abia">Furniture</option>
                            <option value="Abia">Book</option>
                            <option value="Abia">Clothes</option>
                        </Select> 
                    </div>
                    <div className="upload-form-group-child">
                        <Select label="product Usage" name="productUsage" errorClass="upload-form-error">
                            <option value="">--Select--</option>
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
                                label="Product type"
                                name="productType"
                                errorClass="upload-form-error"
                            >
                            {
                                type.map((val,i) =>
                                    (val.name ==="--Select--") ?                                      
                                    <option key={i} value="">{val.name}</option> :
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
                        <Select label="product Currency" name="productCurrency" errorClass="upload-form-error">
                            <option value="">--Select--</option>
                            <option value="Naira">Naira</option>
                            <option value="pounds"> British Pounds</option>
                            <option value="dollar">U.S Dollar</option>
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
                    <div className="upload-product-message">
                    {
                        ( <span>{response || '' }</span> )
                    }
                    </div>
                    <button type="submit">
                    {
                        uploadingProduct ? 'uploading...' : 
                        uploadingError ? <><ImWarning/> Upload</> :
                        'Upload'
                    }
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
    const [uploadingService , setUploadingService ] = useState(false);
    const [type , setType] = useState([]);
    const [uploadingError , setUploadingError] = useState(false);
    const [response, setResponse] = useState('');
    const [redirect, setRedirect] =useState('');
    
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

      const handleSubmit = function() {

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
    if(redirect) {
        return (
            <Redirect to={redirect} />
        )
    }

    return (
       <div className="upload-form-panel">
            <div className="upload-form-panel-heading">
                <h4>Upload service details</h4>
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
                    productCountry: Yup.string().required('Field is required'),
                    productState: Yup.string().required('State is required'),
                    productUsage: Yup.string().required('usage duration is required'),
                    productCurrency: Yup.string().required('currency is required'),
                    productPrice: Yup.string().required('price is required'),
                    contactNumber: Yup.string().required('contact number is required'),
                })}

                onSubmit =  {handleSubmit}
            >
                <Form>
                <div className="upload-form-group">
                    <div className="upload-form-group-child">                     
                        <Select 
                        label="product Category" 
                        onChange={handleInputChange} 
                        name="productCategory" 
                        value={formValues.productCategory} 
                        errorClass="upload-form-error"
                        >
                            <option value="">--Select--</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option  value="Books">Books</option>
                            <option  value="Clothes">Clothes</option>
                        </Select>
                    </div>
                    <div className="upload-form-group-child input">
                        <TextInput
                        label="Product Name"
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
                        <Select label="product Country" name="productCountry" errorClass="login-modal-form-error">
                            <option value="">--Select--</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Congo">Congo</option>
                        </Select>   
                    </div>
                    <div className="upload-form-group-child">
                        <Select label="product State" name="productState" errorClass="upload-form-error">
                            <option value="">--Select--</option>
                            <option value="Abia">Abia</option>
                            <option value="Abia">Furniture</option>
                            <option value="Abia">Book</option>
                            <option value="Abia">Clothes</option>
                        </Select> 
                    </div>
                    <div className="upload-form-group-child">
                        <Select label="product Usage" name="productUsage" errorClass="upload-form-error">
                            <option value="">--Select--</option>
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
                                label="Product type"
                                name="productType"
                                errorClass="upload-form-error"
                            >
                            {
                                type.map((val,i) =>
                                    (val.name ==="--Select--") ?                                      
                                    <option key={i} value="">{val.name}</option> :
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
                        <Select label="product Currency" name="productCurrency" errorClass="upload-form-error">
                            <option value="">--Select--</option>
                            <option value="Naira">Naira</option>
                            <option value="pounds"> British Pounds</option>
                            <option value="dollar">U.S Dollar</option>
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
                       
                    </div>
                   
                </div>

                <div className="upload-form-button">
                    <button type="submit">
                    {
                        uploadingService  ? 'uploading...' : 
                        uploadingError ? <><ImWarning/> Upload</> :
                        'Upload'
                    }
                    </button>
                </div>
                </Form>
            </Formik> 
            </div>        
        </div>
    )
}