





import React, {useState, useEffect} from 'react';
import { useField } from 'formik';
import { ImWarning } from 'react-icons/im';




export const TextInput = ({ label, errorClass, labelClassName, ...props }) => {

  const [field, meta] = useField(props);

  return (

    <>
        <div className={labelClassName}>
            <label htmlFor={props.id || props.name}>{label}</label>
        </div>
            <input className="text-input" {...field} {...props} />
            <div className={errorClass}>
            {
                (meta.touched && meta.error ) ? (
                    <span><i> {<ImWarning/>} </i>{meta.error}*</span>
                ) : null
            }
            </div>
    </>

  );

};

export const TextAreaInput = ({ label, errorClass, labelClassName, ...props }) => {

    const [field, meta] = useField(props);
  
    return (
  
      <>
          <div className={labelClassName}>
              <label htmlFor={props.id || props.name}>{label}</label>
          </div>
              <textarea className="text-area-input" {...field} {...props} />
              <div className={errorClass}>
              {
                  (meta.touched && meta.error ) ? (
                      <span><i> {<ImWarning/>} </i>{meta.error}*</span>
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
              <input className="password-input" {...field} {...props} />
                  <div className={errorClass}>
                    {
                        (meta.touched && meta.error ) ? (
                            <span><i> {<ImWarning/>} </i>{meta.error}*</span>
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



export const Select = ({ label, errorClass, labelClassName, ...props }) => {

  const [field, meta] = useField(props);

  return (

   <>
        <div className={labelClassName ? labelClassName : ''}>
            <label htmlFor={props.id || props.name}>{label}</label> 
        </div>

        <div> 
            <select {...field} {...props} />
        </div>

        <div className={errorClass}>
        {
            (meta.touched && meta.error ) ? (
                <span><i> {<ImWarning/>} </i>{meta.error}*</span>
            ) : null
        }
        </div>

    </>
   
  );
};

export const  AnimSelect = ({ label, errorClass, labelClassName, ...props }) => {
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
        <div>
            <label htmlFor={props.id || props.name}>{label}</label> 
        </div>

        <div> 
            <select {...field} {...props} />  
        </div>
        <div className={errorClass}>
            {
                (meta.touched && meta.error ) ? (
                    <span><i> {<ImWarning/>} </i>{meta.error}*</span>
                ) : null

            }
        </div>
        </>
    )
}

export const FileInput = ({ label, errorClass, labelClassName, ...props }) => {

    const [field, meta] = useField(props);
  
    return (
  
      <>
          <div className={labelClassName}>
              <label htmlFor={props.id || props.name}>{label}</label>
          </div>
              <input className="product-images" {...field} {...props} />
              <div className={errorClass}>
              {
                  (meta.touched && meta.error ) ? (
                      <span><i> {<ImWarning/>} </i>{meta.error}*</span>
                  ) : null
              }
              </div>
      </>
  
    );
  
  };