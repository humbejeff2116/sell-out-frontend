import React, {useState, useEffect}  from 'react';
import { Link, Redirect, useLocation, useHistory  } from 'react-router-dom';
import useUploadProductContext from '../../../../../Context/UploadProductContext/context';
import useAuth from '../../../../../Context/context';
import { createProduct } from '../../../../../Utils/http.services';
import ProductImagesSelector from '../ProductImagesSelector/productImagesSelector';






export default function UploadImage(props) {
    const [formValues, setFormValues] = useState({});
    const [uploadingProduct , setUploadingProduct ] = useState(false);
    const [uploadingError , setUploadingError] = useState(false);
    const [response, setResponse] = useState('');
    const [redirect, setRedirect] =useState('');
    const { user } = useAuth();
    const { productValues } = useUploadProductContext();
    const location = useLocation();
    const history = useHistory();

    const handleInputChange = function(e) {
        setFormValues(prevValues => ({
            ...prevValues,
            [e.target.name] : 
            (e.target.type === "file" && e.target.files.length) ? e.target.files :
            (e.target.type === "file" && e.target.files.length < 1 ) ? e.target.files[0] :
            e.target.value
        }))
       
    }

    const handleSubmit = () => {
        try {
            setUploadingError(false);
            setUploadingProduct(true);
            setResponse('');
            const formData = new FormData();
            const files = formValues.productImages;
            for (let i = 0; i < files.length; i++) {
                formData.append(`file${i}`, files[i]);
            }
            Object.keys(user).map( keys => formData.append(keys, user[keys]));
            Object.keys(productValues).map( keys => formData.append(keys, productValues[keys]));
            
            createProduct(formData)
            .then(response => console.log(response))
            .catch(err => console.error(err.stack));

            history.push(location.pathname);
            setRedirect("/home/dashboard/store/products")
        } catch(e) {
            setUploadingError(true);
            setResponse("An error occured please wait and try again");   
        } finally {
           

        }   
    }

    if (redirect) {
        return (
            <Redirect  to={redirect} />
        )
    }  
    return (
        <div>
           <ProductImagesSelector 
           handleInputChange = { handleInputChange } 
           handleSubmit = { handleSubmit }
           />
        </div>
    )
}