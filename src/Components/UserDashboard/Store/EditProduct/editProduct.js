






import React, {useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom'
import {TextInput,FileInput, AnimSelect, Select, TextAreaInput } from '../../../Formik/formik';
import './editProduct.css';

const mockProduct = [
    {
        userId: 2234343,
        userName: "hummbe jeffrey",
        userEmail: "humbejeff@gmail.com",
        userProfilePicture: [],
        productId: 232323,
        productName: "short nikka",
        productCategory: "Furniture",
        productType: "Chairs",
        productCountry: "Nigeria",
        productState: "Benue",
        productUsage: "Never used",
        productCurrency: "Naira",
        productPrice: "200",
        productDiscount: "",
        productContactNumber: "334039438493",
        productImages: [{}],
        stars: [],
        unstars: [],
        comments: [],
        interests: []
    },
]
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
const transformProductData = async (product) => {
    const transformedProduct = product.flatMap(prod => {
        return transformProduct(prod); 
    }).filter(prod => typeof prod.value !== "object" );

    function transformProduct(prod = {}) {
        return Object.keys(prod).map(keys => ({ keyName: keys, value: prod[keys] }));
    }
    return transformedProduct;
}


export default function EditProduct(props) {
    const [editProduct, setEditProduct] = useState([]);
   
    let EditProductComponent;

    useEffect(()=> {
        transformProductData(mockProduct)
        .then(product => {
            console.log("product is ",product)
            setEditProduct(product);
        })
    },[]);

    if (editProduct.length) {
        EditProductComponent = <EditProductCompWrapper 
                                product={mockProduct}
                                images ={mockProduct.productImages}
                                />;

    } else {
        EditProductComponent = <EmptyEditProductComp/>;

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



function EditProductCompWrapper(props) {

    return (
        <div className="store-product-edit-wrapper">
        <div className="store-product-edit-details-container">
        {
            props.product && props.product.map((product, i)=>
                <EditProductItems
                key={i} 
                {...product}
                />
            )
        }
       
        </div>
            <div className="store-product-edit-image-container">
            <p>product image</p>
           </div>
        </div>
    )
}

function EditProductItems(props) {
    const [formValues, setFormValues] = useState({});
    const [type , setType] = useState([]);
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    const [uploadingError , setUploadingError] = useState(false);
    const [response, setResponse] = useState('');
    // const { user } = useAuth();

    const handleInputChange = function(e) {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name] : 
            (e.target.type === "file" && e.target.files.length) ? e.target.files :
            (e.target.type === "file" && e.target.files.length < 1 ) ? e.target.files[0] :
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
        <EditItem keyName={"Product name or description"} value={props.productName} EditBar= {
            <EditBar 
            initialValues ={{productName: props.productName}}
            >
                <TextAreaInput
                    name="productName"
                    type="text"
                    />
            </EditBar>
        }
        />

        <EditItem keyName={"Category"} value={props.productCategory} EditBar= {
            <EditBar 
            initialValues ={{deliveryRegion: props.productCategory}} 
            >
                <Select 
                onChange={handleInputChange} 
                name="productCategory" 
                value={formValues?.productCategory} 
                >
                    <option value="">Select</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option  value="Books">Books</option>
                    <option  value="Clothes">Clothes</option>
                </Select>
            </EditBar>
        }
        />

        {
            ( type.length > 0 ) && (
                <EditItem keyName={"Type"} value={props.productType} EditBar= {
                    <EditBar 
                    initialValues ={{productType: props.productType}}
                    // yupObject={{ productType: Yup.string().required('product type is Required')}}
                    >
                        <Select name="productType" >
                        {
                            type.map((val,i) =>
                                (val.name ==="--Select--") ?                                      
                                <option key={i} value="">{val.name}</option> :
                                <option key={i} value={val.name}>{val.name}</option>  
                            )
                        }
                        </Select>
                    </EditBar>
                }
                />
            )
        }
        

        <EditItem keyName={"Usage"} value={props.productUsage} EditBar= {
            <EditBar initialValues ={{productUsage: props.productUsage}}
            // yupObject={{ productUsage: Yup.string().required(`product's usage is is Required`)}}
            >
                <Select name="productUsage" >
                    <option value="">Select</option>
                    <option value="Never used">Never used</option>
                    <option value="Fairly used">Fairly used</option>
                    <option value="2 years +">2 years +</option>
                </Select>
            </EditBar>
        }
        />

        <EditItem keyName={"Currency"} value={props.productCurrency} EditBar= {
            <EditBar initialValues ={{productCurrency:props.productCurrency}}>
               <Select name="productCurrency" >
                    <option value="">Select</option>
                    <option value="Naira">Naira</option>
                    <option value="pounds"> British Pounds</option>
                    <option value="dollar">U.S Dollar</option>
                </Select>
            </EditBar>
        }
        />

        <EditItem keyName={"Price"} value={props.productPrice} EditBar= {
            <EditBar initialValues ={{productPrice: props.productPrice}}>
                <TextAreaInput
                    name="productPrice"
                    type="text"
                    placeholder="e.g 2000"
                />
            </EditBar>
        }
        />

        <EditItem 
        keyName={"Discount"} 
        noValue={"No discount has been set yet" }
        value={props.productDiscount } 
        EditBar= {
            <EditBar initialValues ={{productDiscount: props.productDiscount}}>
                 <TextAreaInput
                    name="productDiscount"
                    type="text"
                    placeholder="e.g 2000"
                />
            </EditBar>
        }
        />

        </>
    )
   
}



function EditItem(props) {
    const [showEditBar, setShowEditBar] = useState(false);
    let Button;
    const openEditBar = ( ) => {
        setShowEditBar(state => !state);
    }
    if (showEditBar) {
            Button = <button onClick={openEditBar}> Close</button>
    } else {
        Button = <button onClick={openEditBar}> Edit</button>
    }
    return (
        <div className="store-product-edit-details-group-container">
            <div className="store-product-edit-details-group">
            <div className="store-product-edit-details-group-left">
                <div className="label"><span>{props.keyName}</span></div>
                <div className="edit-product-detail"><span>{props.value || props.noValue }</span></div>
            </div>

            <div className="store-product-edit-details-group-right">     
            {
                
                <div className="store-product-edit-details-group-edit-button">
                    { (!props.value && !showEditBar) ?  <button onClick={openEditBar}>Add</button> :  Button }
                   
                </div>
            }
            </div>
            </div>
            {/* edit bar */}
            {
                showEditBar && ( props.EditBar )
            }
        </div>
    )
}

function EditBar(props) {
    const submitForm =()=>{

    }
    return (
         <div className="store-product-edit-details-group">
         <div className="store-product-edit-details-group-left">

         <Formik
         initialValues = { props.initialValues }
         validationSchema = { Yup.object(props.yupObject)}
         onSubmit = { submitForm }
         >
             <Form>
                 {
                    props.children
                 }
             </Form>
         </Formik>
         </div>

         <div className="store-product-edit-details-group-right">
             <div className="store-product-edit-details-group-edit-button save">
                 <button onClick={submitForm}>Save</button>
             </div>
         </div>
         </div>
    )
}

function EmptyEditProductComp(props) {
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