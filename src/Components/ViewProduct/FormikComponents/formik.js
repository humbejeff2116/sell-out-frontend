
import React, { useEffect } from 'react';
import { useField } from 'formik';


const saveShippingAddress = (key, value) => {
    const shippingAddress = sessionStorage.getItem("shippingAddress") ? 
    JSON.parse(sessionStorage.getItem("shippingAddress")) : null;

    if (shippingAddress) {
        sessionStorage.setItem("shippingAddress", JSON.stringify({...shippingAddress, [key]: value}))
        return;
    }

    sessionStorage.setItem("shippingAddress", JSON.stringify({[key]: value}))
}

export const getShippingAddress = () => {
    return sessionStorage.getItem("shippingAddress") ? 
    JSON.parse(sessionStorage.getItem("shippingAddress")) : null;
}

export const ShippingAddressInput = ({ 
    notEmptyClass,
    inputErrorClass,
    ...props 
}) => {
    const [field, meta] = useField(props);
    const textAreaClassName =  (
        (!meta.error && meta.value) ? `text-area-input ${notEmptyClass || "not-empty"}` : 
        (meta.touched && meta.error) ? `text-area-input ${inputErrorClass || "has-error"}` :
        "text-area-input"
    )

    useEffect(()=> {
        if (meta.value) {
            saveShippingAddress("shippingAddress", meta.value);
        }
    }, [meta.value]);

    return (
        <textarea 
        className = { textAreaClassName } 
        {...field} 
        {...props} 
        />
    )
}

export const ShippingAddressSelect = ({
    notEmptyClass,
    inputErrorClass,
    shippingAddresskey,
    ...props 
}) => {
    const [field, meta] = useField(props);
    const selectInputClassName = (
        (!meta.error && meta.value) ? `select ${notEmptyClass || "not-empty"}` : 
        (meta.touched && meta.error) ? `select ${inputErrorClass || "has-error"}` :
        "select"
    )

    useEffect(()=> {
        if (meta.value) {
            saveShippingAddress(shippingAddresskey, meta.value);
        }
    }, [meta.value, shippingAddresskey]);

    return (
        <select 
        className = { selectInputClassName }
        {...field} 
        {...props}
        />
    )
}
