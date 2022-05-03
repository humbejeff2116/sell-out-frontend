
import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import { ImWarning } from 'react-icons/im';
import { BsExclamationCircle } from 'react-icons/bs';
import { insertCommasToNumber } from '../../Library/index';

export const TextInput = ({ 
    label, 
    labelText, 
    dontCheckError, 
    labelTextClass, 
    errorClass, 
    labelClassName,
    dontShowErrorText, 
    ...props 
}) => {

    const [field, meta] = useField(props);

    const textInputClassName =  (
        (!meta.error && meta.value) ? "text-input not-empty" : 
        (meta.touched && meta.error) ? "text-input has-error" :
        "text-input"
    )

    return (

        <>
        <div className={ labelClassName }>
            <label htmlFor = { props.id ?? props.name }>
                { label }
                <span className = { labelTextClass || "" }> { labelText || "" } </span>
            </label>
        </div>

        <input 
        className = { textInputClassName } 
        {...field}
        {...props} 
        />

        <div className = { errorClass }>
        {  dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
        </div>
        </>

    )

}

export const TextAreaInput = ({ 
    label, 
    labelText, 
    labelTextClass, 
    errorClass, 
    labelClassName, 
    formatValue, 
    formatedValueClass,
    dontShowErrorText,
    ...props 
}) => {

    const [field, meta] = useField(props);

    const [formatedValue, setFormatedValue] = useState("");

    const textAreaClassName =  (
        (!meta.error && meta.value) ? "text-area-input not-empty" : 
        (meta.touched && meta.error) ? "text-area-input has-error" :
        "text-area-input"
    )

    useEffect(()=> {

        formatInputValue(formatValue, meta, setInputValue, setFormatedValue)

    }, [formatValue, meta]);


    const formatInputValue = (formatValue, meta, setInputValue = f => f, setFormatedValue = f => f) => {

        if (!formatValue || isNaN(parseFloat(formatValue))) return;
        
        if (meta.value && !meta.error) {

               return setInputValue(meta.value, setFormatedValue)

        } else if (meta.touched && meta.error) {

            return setInputValue("", setFormatedValue)

        }  

    }
    
    const setInputValue = (value, callback) => {

        const formatedValue = insertCommasToNumber(value);

        return callback(formatedValue);

    }
  
    return (
  
      <>
        <div className = { labelClassName }>

            <label htmlFor = { props.id ?? props.name }>
                { label }
                <span className = { labelTextClass || "" }> { labelText || "" } </span>
            </label>
            {
                (formatValue && formatedValue) && (

                    <span className={ formatedValueClass || "" }>
                        {formatedValue}
                    </span>

                )  

            }
        </div>
        <textarea 
        className = { textAreaClassName } 
        {...field} 
        {...props} 
        />
        <div className= { errorClass }>
        {  dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
        </div>
        </>
  
    )
  
}

function ErrorText({meta, ...props}) {
    return (
        <>
        {
            (meta.touched && meta.error ) ? (
                <>
                <i> {<BsExclamationCircle/>} </i> <span>{meta.error}</span>
                </>
            ) : null
        }
        </>

    )
}

export const PasswordInput = ({ 
    label, 
    labelClassName, 
    labelText,
    labelTextClass,
    errorClass,  
    dontShowErrorText, 
    ...props 
}) => {

    const [field, meta] = useField(props);

    const passwordInputClassName =  (
        (!meta.error && meta.value) ? "password-input not-empty" : 
        (meta.touched && meta.error) ? "password-input has-error" :
        "password-input"
    )
  
    return (
  
        <>
        <div className={ labelClassName || "" }>
        <label htmlFor={ props.id || props.name }>{ label }</label>
        <span className = { labelTextClass || "" }>{ labelText || "" }</span>
        </div>

        <input 
        className= { passwordInputClassName }
        {...field}
        {...props}
        />
        <div className = { errorClass }>
        {  dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
        </div>
      </>
  
    )
}

export const Checkbox = ({ 
    children, 
    errorClass, 
    labelClassName, 
    dontShowErrorText, 
    ...props 
}) => {

  const [field, meta] = useField({ ...props, type: 'checkbox' });

    return (

        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                { children }
            </label>
            <div className = { errorClass }>
            {  dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
            </div> 
        </div>
    )

}

export const Select = ({
    label, 
    labelClassName, 
    labelText,
    labelTextClass,
    errorClass,  
    dontShowErrorText,
    selectClassName,
    passValueUp,  
    ...props 
}) => {

    const [field, meta] = useField(props);

    const selectInputClassName =  (
        (!meta.error && meta.value) ? "select not-empty" : 
        (meta.touched && meta.error) ? "select has-error" :
        "select"
    )

    useEffect(()=> {
        
        if (passValueUp) {
            passValueUp(meta.value)
        }

    }, [meta.value]);

    return (

        <>
        <div className= { labelClassName || '' }>
            <label htmlFor = { props.id ?? props.name }>{ label }</label>
            <span className = { labelTextClass || "" }>{ labelText || "" }</span> 
        </div>

        <div  className = { selectClassName }> 
        <select 
        className = { selectInputClassName }
        {...field} 
        {...props}
        />
        </div>

        <div className={ errorClass }>
        {  dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
        </div>
        </>
   
    )

}

export const  AnimSelect = ({ 
    label, 
    labelClassName, 
    labelText,
    labelTextClass,
    errorClass,  
    dontShowErrorText,
    selectClassName,
    passFieldUp,  
    ...props 
}) => {

    const [showSelect, setShowSelect] = useState(false);

    const [field, meta] = useField(props);

    const selectInputClassName =  (
        (!meta.error && meta.value) ? "select not-empty" : 
        (meta.touched && meta.error) ? "select has-error" :
        "select"
    )

    useEffect(()=> {

        let timer;

        timer = setTimeout(() => setShowSelect(true), 1000);

        return ()=> {

            if (timer) clearTimeout(timer);
    
        }

    }, [])

    if (!showSelect) {

        return (

            <>
                { props.loader }
            </>

        )

    }

    return (

        <>
        <div className = { labelClassName || '' }>
        <label htmlFor = {  props.id ?? props.name}>{ label }</label>
        <span className = { labelTextClass || "" }>{ labelText || "" }</span>  
        </div>

        <div className = { selectClassName }> 
        <select 
        className = { selectInputClassName }
        {...field} 
        {...props} 
        />  
        </div>

        <div className={ errorClass }>
        {  dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
        </div>
        </>

    )
    
}

//  file input inspired by https://codepen.io/softopia/pen/LMmJLz
export const FileInput = React.forwardRef(({ 
    label,
    labelClassName, 
    numberofimages,
    errorClass, 
    labelSpanClassName,
    inputClassName,
    previewImagesButton, 
    ...props
}, ref) => {  

    return (

        <>
        <label className={labelClassName}>
        {(numberofimages > 0) && (

            <span className="length">{ numberofimages }</span>

        )}
        <i>{ props.icon }</i>
        <span className = { labelSpanClassName }>
        { label }
        </span>
        <input className = { props.inputClassName || "image-input" } ref = {ref} {...props} />
        </label>

        <div className = { errorClass }>
        </div>
        </>
  
    )

})