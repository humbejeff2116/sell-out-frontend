





import React, {useState, useEffect} from 'react';
import { useField } from 'formik';
import { ImWarning } from 'react-icons/im';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsExclamationCircle } from 'react-icons/bs';
import { insertCommasToNumber } from '../../Library/index';
// BsExclamationCircle
// AiOutlineExclamationCircle




export const TextInput = ({ label, labelText, dontCheckError, labelTextClass, errorClass, labelClassName, ...props }) => {

  const [field, meta] = useField(props);

  return (

    <>
        <div className={labelClassName}>
            <label htmlFor={props.id || props.name}>
                {label}
                <span className={ labelTextClass || ""}>{labelText || ""}</span>
            </label>
        </div>
            <input 
            className={
                (meta.touched && !meta.error && meta.value) ? "text-input not-empty" : "text-input"
            } 
            {...field} 
            {...props} 
            />
            <div className={errorClass}>
            {
                (meta.touched && meta.error ) ? (
                    <>
                    <i> {<BsExclamationCircle/>} </i> <span>{meta.error}</span>
                    </> 
                ) : null
            }
            </div>
    </>

  );

};

export const TextAreaInput = ({ 
    label, 
    labelText, 
    labelTextClass, 
    errorClass, 
    labelClassName, 
    formatValue, 
    formatedValueClass, 
    ...props 
}) => {

    const [field, meta] = useField(props);
    const [formatedValue, setFormatedValue] = useState("")
    useEffect(()=> {
        if (formatValue) {
            if ( meta.value) {
               return setInputValue(meta.value)
            } else if(meta.touched && meta.error) {
                return setInputValue("")
            }   
        }   
    }, [formatValue, meta.touched, meta.value, meta.error]);
    
    const setInputValue = (value) => {
        let formatedValue = insertCommasToNumber(value);
        return setFormatedValue(formatedValue)
    }
  
    return (
  
      <>
          <div className={labelClassName}>
            <label htmlFor={props.id || props.name}>
                {label}{ (formatValue && formatedValue) && (<span>:</span>) }

                <span className={ labelTextClass || ""}>{labelText || ""}</span>
            </label>
                {
                    (formatValue && formatedValue) ? (
                        <span className={ formatedValueClass || "" }>
                            {formatedValue}
                        </span>
                    ) : "" 
                }
          </div>
              <textarea 
                className= {
                  (meta.touched && !meta.error && meta.value) ? "text-area-input not-empty" : "text-area-input"
                } 
                {...field} 
                {...props} 
              />
              <div className={errorClass}>
              {
                  (meta.touched && meta.error ) ? (
                    <>
                    <i> {<BsExclamationCircle/>} </i> <span>{meta.error}</span>
                    </>
                  ) : null
              }
              </div>
      </>
  
    );
  
  };

export const PasswordInput = ({ label, errorClass, labelClassName, ...props }) => {

    const [field, meta] = useField(props);
  
    return (
  
      <>
          <div className={labelClassName}>
            <label htmlFor={props.id || props.name}>{label}</label>
          </div>
              <input 
              className= {
                (meta.touched && !meta.error && meta.value) ? "password-input not-empty" : "password-input"
              } 
              {...field} 
              {...props} 
              />
                  <div className={errorClass}>
                    {
                        (meta.touched && meta.error ) ? (
                           <>
                           <i> {<BsExclamationCircle/>} </i> <span>{meta.error}</span>
                           </> 
                        ) : null

                    }
                  </div>
      </>
  
    );
};



export const Checkbox = ({ children, errorClass, labelClassName, ...props }) => {

  const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {
            meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null
            }
        </div>
    );
};



export const Select = ({ label, errorClass, labelClassName, selectClassName, ...props }) => {

  const [field, meta] = useField(props);

  return (

   <>
        <div className={labelClassName ? labelClassName : ''}>
            <label htmlFor={props.id || props.name}>{label}</label> 
        </div>

        <div  className={selectClassName}> 
            <select 
             className= {
                (meta.touched && !meta.error && meta.value) ? "select not-empty" : "select"
              } 
            {...field} 
            {...props} 
            />
        </div>

        <div className={errorClass}>
        {
            (meta.touched && meta.error ) ? (
                <>
                <i> {<BsExclamationCircle/>} </i> <span>{meta.error}</span>
                </> 
            ) : null
        }
        </div>

    </>
   
  );
};

export const  AnimSelect = ({ label, errorClass, labelClassName, selectClassName, ...props }) => {
    const [showSelect, setShowSelect] = useState(false);
    const [field, meta] = useField(props);
    useEffect(()=> {
        let timer;
        timer = setTimeout(()=> {
            return setShowSelect(true)
        }, 1000);

        return ()=>{
            if(timer) {
                clearTimeout(timer);
            }

        }
    },[])
    if(!showSelect) {
        return (
            <>
                { props.loader }
            </>
        )
    }
    return (
        <>
        <div className={labelClassName ? labelClassName : ''}>
            <label htmlFor={props.id || props.name}>{label}</label> 
        </div>

        <div className={selectClassName}> 
            <select {...field} {...props} />  
        </div>
        <div className={errorClass}>
            {
                (meta.touched && meta.error ) ? (
                    <>
                    <i> {<BsExclamationCircle/>} </i> <span>{meta.error}</span>
                    </> 
                ) : null

            }
        </div>
        </>
    )
}

//  file input inspired by https://codepen.io/softopia/pen/LMmJLz
export const FileInput = React.forwardRef(({ label, errorClass, labelClassName, labelSpanClassName, ...props}, ref) => {  
    const [field, meta] = useField(props);
  
    return (
      <>
        <label className={labelClassName}>
           {
               props.numberofimages > 0 && (
                <span className="length">{props.numberofimages}</span>
               )
           }
            <i>{props.icon}</i>
            <span className={labelSpanClassName}>
            {label}
            </span>
            <input className={ props.inputClassName || "product-images" } ref ={ref}  {...field} {...props} />
        </label>
        <div className={errorClass}>
        {
            (meta.touched && meta.error ) ? (
                <span><i> {<ImWarning/>} </i>{meta.error}</span>
            ) : null
        }
        </div>
      </>
  
    );
});