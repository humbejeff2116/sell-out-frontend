
import React from 'react';
// image credit https://svgrepo.com
import image from '../../../Images/avatar2.png';


export default function GettingStartedFormTemplate({headingText, children, ...props}) {

    return (
       
        <div className="getting-started-application-template-container">
        <div className="getting-started-application-template-panel">
            <div className="getting-started-application-template-heading-container">
                <div className="getting-started-application-template-heading">
                    <p>
                        { headingText }
                    </p>
                </div>
                <div className="getting-started-application-template-img">
                    <img src = { image } alt="avatar" />
                </div> 
            </div>
            { children }
        </div>
        </div>

    )

}

export function GettingStartedPrevAndNextButtons({
    customSubmit, 
    customSubmitButton, 
    handleSubmit, 
    goBack, 
    image, 
    ...props
}) {

    let SubmitButton = (

            <button type="submit" >
            Continue
            </button>
            
        )

    return (

        <div className="getting-started-application-template-buttons">

            <div className="getting-started-application-template-back-button">
                <button onClick = { goBack }>
                Back
                </button>
            </div>
            
            <div className="getting-started-application-template-next-button">
               { customSubmitButton ? customSubmitButton : SubmitButton }
            </div>

        </div>

    )

}