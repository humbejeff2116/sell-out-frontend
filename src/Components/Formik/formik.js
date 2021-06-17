





import React from 'react';
import { useField } from 'formik';
import { ImWarning } from 'react-icons/im'




export const LoginTextInput = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (

    <>
        <div className="login-form-group">
            <label htmlFor={props.id || props.name}>{label}</label>
        </div>
            <input className="password-input" {...field} {...props} />
            <div className={props.errorClassName}>
            {
                (meta.touched && meta.error ) ? (
                    <span><i> {<ImWarning/>} </i>{meta.error}*</span>
                ) : null
            }
            </div>
    </>

  );

};

export const LoginPasswordInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
  
    return (
  
      <>
          <div className="login-form-group">
            <label htmlFor={props.id || props.name}>{label}</label>
          </div>
              <input className="text-input" {...field} {...props} />
                  <div className={props.errorClassName}>
                    {
                        (meta.touched && meta.error ) ? (
                            <span><i> {<ImWarning/>} </i>{meta.error}*</span>
                        ) : null

                    }
                  </div>
      </>
  
    );
};



export const MyCheckbox = ({ children, ...props }) => {

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



export const MySelect = ({ label, ...props }) => {

  const [field, meta] = useField(props);

  return (

    <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {
            meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null
        }
    </div>
  );
};