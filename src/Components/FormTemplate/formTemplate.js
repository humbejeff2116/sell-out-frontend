
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Select, TextAreaInput, TextInput } from '../Formik/formik';
import styles from './FormTemplate.module.css';



export const inputTypeConstant = {
    text: "text",
    select: "select",
    textArea: "textArea",
    file: "file",
    checkBox: "checkbox",
    date: "date"
}

export default function FormTemplate({
    initial,
    yupValidation,
    handleSubmit,
    formData,
    type,
    handleImageChange,
    showForm,
    formChild,
    passValueUp,
    editProductTypeOptions,
    labelClassName,
    inputErrorClass,
    notEmptyClass,
    inputRef,
    children,
    ...props
}) {


    return (
        <Formik
        initialValues = {initial}
        validationSchema = {Yup.object(yupValidation)}
        onSubmit = {handleSubmit}
        >
            <Form>
            {
                formData.map((input, i)=> {
                    if (input.type === inputTypeConstant.file) {
                        return (
                            <FormInput
                            key={i}
                            {...input}
                            handleImageChange={handleImageChange}
                            labelClassName={labelClassName}
                            />
                        )
                    } else {
                        return (
                            <FormInput 
                            key={i} 
                            {...input}
                            passValueUp={passValueUp}
                            labelClassName={labelClassName}
                            inputErrorClass={inputErrorClass}
                            notEmptyClass={notEmptyClass}
                            inputRef = {inputRef}
                            />
                        )
                    }
                })
            }
            {children}
            </Form>
        </Formik>
    )
}


function FormInput({
    type,
    handleImageChange,
    passValueUp,
    inputRef,
    ...props
}) {
    if (type === inputTypeConstant.text) {
        return (
            <TextInput
            label={props.label}
            labelClassName={props.labelClassName || styles.formGroup}
            labelText={props.labelText}
            name={props.name}
            type={type}
            errorClass={styles.uploadFormError}
            inputErrorClass={props.inputErrorClass}
            notEmptyClass={props.notEmptyClass}
            dontShowErrorText={props.dontShowErrorText}
            ref = {inputRef}
            />
        )
    } if (type === inputTypeConstant.textArea) {
        return (
            <TextAreaInput
            label={props.label}
            labelClassName={props.labelClassName || styles.formGroup}
            labelText={props.labelText}
            name={props.name}
            type={type}
            errorClass={styles.uploadFormError}
            inputErrorClass={props.inputErrorClass}
            notEmptyClass={props.notEmptyClass}
            dontShowErrorText={props.dontShowErrorText}
            />
        )
    } else if (type === inputTypeConstant.select) {
        return (
            <Select
            label={props.label}
            labelClassName={props.labelClassName || styles.formGroup}
            name={props.name}
            errorClass={styles.uploadFormError}
            inputErrorClass={props.inputErrorClass}
            notEmptyClass={props.notEmptyClass}
            passValueUp={passValueUp}
            dontShowErrorText={props.dontShowErrorText}
            >
            {
                props.options.map((value, i)=>
                    <Option key={i} {...value} />
                )
            }
            </Select>
        )
    } else if (type === inputTypeConstant.date) {
        return (
            <TextInput
            label={props.label}
            labelClassName={props.labelClassName || styles.formGroup}
            name={props.name}
            type={type}
            errorClass={styles.uploadFormError}
            inputErrorClass={props.inputErrorClass}
            notEmptyClass={props.notEmptyClass}
            />
        )
    } else if (type === inputTypeConstant.file) {
        return (
            <div className="course-reg-input-file">
                <label htmlFor="passport">{props.label}</label>
                <input type={type}  name={props.name} onChange={handleImageChange}  />
            </div>
        )
    }
}

function Option({value , ...props}) {
    return(
        <>
            {
                (value === "Select") ? (
                    <option value="">{value}</option> 
                ) : (
                    <option value={value}>{value}</option>  
                )  
            }
        </>
    )
}


