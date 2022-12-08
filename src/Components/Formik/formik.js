
import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import { BsExclamationCircle } from 'react-icons/bs';
import { insertCommasToNumber } from '../../Library/index';
import './formik.css';

export const TextInput = React.forwardRef(({ 
    label, 
    labelText, 
    dontCheckError, 
    labelTextClass, 
    errorClass,
    inputErrorClass,
    notEmptyClass, 
    labelClassName,
    dontShowErrorText,
    useOnlyTextInput, 
    ...props 
}, ref) => {
    const [field, meta] = useField(props);

    const textInputClassName = (
        (meta.value && !meta.error) ? `text-input ${notEmptyClass || "not-empty"}` : 
        (meta.touched && meta.error) ? `text-input ${inputErrorClass || "has-error"}` :
        "text-input"
    )

    if (useOnlyTextInput) {
        return (
            <div className='input-wrapper'>
                <input 
                className = { textInputClassName } 
                { ...field }
                { ...props }
                ref = { ref } 
                />
                {(meta.touched && meta.error) && (
                    <BsExclamationCircle className='error-icon'/>
                )}
            </div>
        )
    }

    return (
       <>
            <div className = { labelClassName }>
                <label htmlFor = { props.id ?? props.name }>
                { label }
                </label>
                <span className = { labelTextClass || "" }>{ labelText || "" }</span>   
            </div>
            <div className='input-wrapper'>
                <input 
                className = { textInputClassName } 
                { ...field }
                { ...props }
                ref = { ref } 
                />
                {(meta.touched && meta.error) && (
                    <BsExclamationCircle className='error-icon'/>
                )}
            </div>
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
            </div>
        </>
    )
})

export const TextAreaInput = ({ 
    label, 
    labelText, 
    labelTextClass, 
    errorClass, 
    notEmptyClass,
    inputErrorClass,
    labelClassName, 
    formatValue, 
    formatedValueClass,
    dontShowErrorText,
    useOnlyTextArea,
    ...props 
}) => {
    const [field, meta] = useField(props);
    const [formatedValue, setFormatedValue] = useState("");

    useEffect(() => {
        formatInputValue(formatValue, meta, setInputValue, setFormatedValue);
    }, [formatValue, meta]);

    const textAreaClassName = (
        (!meta.error && meta.value) ? `text-area-input ${notEmptyClass || "not-empty"}` : 
        (meta.touched && meta.error) ? `text-area-input ${inputErrorClass || "has-error"}` :
        "text-area-input"
    )

    const formatInputValue = (
        formatValue, 
        meta, 
        setInputValue = f => f, 
        setFormatedValue = f => f
    ) => {
        if (!formatValue || isNaN(parseFloat(formatValue))) return;
        if (meta.value && !meta.error) {
            return setInputValue(meta.value, setFormatedValue);
        } else if (meta.touched && meta.error) {
            return setInputValue("", setFormatedValue);
        }  
    }
    
    const setInputValue = (value, callback) => {
        const formatedValue = insertCommasToNumber(value);
        return callback(formatedValue);
    }

    if (useOnlyTextArea) {
        return (
            <textarea 
            className = { textAreaClassName } 
            { ...field } 
            { ...props } 
            />
        )
    }
  
    return (
        <>
            <div className = { labelClassName }>
                <label htmlFor = { props.id ?? props.name }>
                { label }
                </label>
                <span className = { labelTextClass || "" }> { labelText || "" } </span>
                {(formatValue && formatedValue) && (
                    <span className = { formatedValueClass || "" }>
                    { formatedValue }
                    </span>
                )}
            </div>
            <textarea 
            className = { textAreaClassName } 
            { ...field } 
            { ...props } 
            />
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
            </div>
        </>
    )
}

function ErrorText({ 
    meta, 
    ...props 
}) {
    return (
        <>
        {(meta.touched && meta.error) && (
            <span>{ meta.error }</span>
        )}
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

    const passwordInputClassName = (
        (!meta.error && meta.value) ? "password-input not-empty" : 
        (meta.error) ? "password-input has-error" :
        "password-input"
    )
  
    return (
        <>
            <div className = { labelClassName || "" }>
            <label htmlFor = { props.id || props.name }>{ label }</label>
            <span className = { labelTextClass || "" }>{ labelText || "" }</span>
            </div>
            <div className='input-wrapper'>
                <input 
                className = { passwordInputClassName }
                { ...field }
                { ...props }
                />
                {(meta.error) && (
                    <BsExclamationCircle className='error-icon'/>
                )}
            </div>
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
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
                <input type="checkbox" { ...field } { ...props }/>
                { children }
            </label>
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
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
    inputErrorClass, 
    notEmptyClass, 
    dontShowErrorText,
    selectClassName,
    passValueUp,
    useOnlySelect,  
    ...props 
}) => {
    const [field, meta] = useField(props);

    useEffect(() => {
        if (passValueUp) {
            passValueUp(meta.value)
        }
    }, [passValueUp, meta.value]);

    const selectInputClassName =  (
        (!meta.error && meta.value) ? `select ${notEmptyClass || "not-empty"}` : 
        (meta.touched && meta.error) ? `select ${inputErrorClass || "has-error"}` :
        "select"
    )

    if (useOnlySelect) {
        return (
            <select 
            className = { selectInputClassName }
            { ...field } 
            { ...props }
            />
        )
    }

    return (
        <>
            <div className = { labelClassName || '' }>
                <label htmlFor = { props.id ?? props.name }>{ label }</label>
                <span className = { labelTextClass || "" }>{ labelText || "" }</span> 
            </div>
            <div className = { selectClassName }> 
            <select 
            className = { selectInputClassName }
            { ...field } 
            { ...props }
            />
            </div>
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
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

    useEffect(() => {
        let timer;
        timer = setTimeout(() => setShowSelect(true), 1000);

        return ()=> {
            if (timer) clearTimeout(timer);
        }
    }, [])

    const selectInputClassName = (
        (!meta.error && meta.value) ? "select not-empty" : 
        (meta.touched && meta.error) ? "select has-error" :
        "select"
    )

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
            <label htmlFor = { props.id ?? props.name }>{ label }</label>
            <span className = { labelTextClass || "" }>{ labelText || "" }</span>  
            </div>
            <div className = { selectClassName }> 
            <select 
            className = { selectInputClassName }
            { ...field } 
            { ...props } 
            />  
            </div>
            <div className = { errorClass }>
            { dontShowErrorText ? "" : <ErrorText meta = { meta }/> }
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
            <label className = { labelClassName }>
            {(numberofimages > 0) && (
                <span className="length">{ numberofimages }</span>
            )}
            <i>{ props.icon }</i>
            <span className = { labelSpanClassName }>
            { label }
            </span>
            <input className = { props.inputClassName || "image-input" } ref = { ref } { ...props }/>
            </label>

            <div className = { errorClass }>
            </div>
        </>
    )
})