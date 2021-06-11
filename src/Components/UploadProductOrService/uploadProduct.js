








import React, {useState, useEffect} from 'react';
import {Loader} from '../Loader/loader';
import './uploadProduct.css';


function setTypeOptions(category, categoryDataSet, callback) {
    let type;
    for (let i = 0; i< categoryDataSet.length; i++) {
        if(categoryDataSet[i].category === category) { 
            type = categoryDataSet[i].type;
            break;
        }
    }
    return callback(type);

}

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
            {/* flex column */}
            <div className="upload-details-type">

                <div className="upload-details-heading">
                   <h3> what details are we uploading today?</h3>
                </div>
                {/* flex row */}
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
            {/* flex column */}
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


function ProductForm(props) {
    const [showForm , setShowForm ] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [type , setType] = useState([]);
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    

    useEffect(()=> {
        let timer = null;
        timer = setTimeout(()=> setShowForm(true), 1000);
        return ()=>{
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
                        (type.length >0) && (< Select type={type} />)
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




function  Select(props) {
    const [showSelect, setShowSelect] = useState(false);
    useEffect(()=> {
        let timer = null;
        timer = setTimeout(()=> setShowSelect(true), 1000);
        return ()=>{
            if(timer) {
                setShowSelect(false);
                return  clearTimeout(timer);
            }
        }
    },[])
    if(!showSelect) {
        return (
            <Loader 
            loaderContainer={"upload-form-select-loader-container"} 
            loader={"upload-form-select-loader"} 
            />  
        )
    }
    return (
        <>
        <div>
            <label htmlFor="email address">Type</label>   
        </div>

        <div>   
        <select >
            {
                props.type.map((val,i) =>                                      
                    <option key={i}>{val.name}</option>   
                )
            }
        </select>  
        </div>
        </>
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