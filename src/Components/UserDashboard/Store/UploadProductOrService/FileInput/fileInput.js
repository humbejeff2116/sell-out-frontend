
import React from 'react';


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
        {
            (numberofimages > 0) && (

                <span className="length">{ numberofimages }</span>

            )

        }
        <i>{ props.icon }</i>
        <span className = { labelSpanClassName }>
        { label }
        </span>
        <input className = { props.inputClassName || "product-images" } ref = {ref} {...props} />
        { (numberofimages > 0) &&  previewImagesButton }
        </label>

        <div className = { errorClass }>
        </div>
        </>
  
    )

})