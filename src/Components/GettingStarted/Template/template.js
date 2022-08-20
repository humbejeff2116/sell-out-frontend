
import React from 'react';
import image from '../../../Images/avatar2.png';


export default function GettingStartedFormTemplate({
    headingText, 
    children, 
}) {
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
    customSubmitButton, 
    goBack, 
}) {

    const SubmitButton = (
        <button type="submit" className="next">
        Continue
        </button> 
    )

    return (
        <div className="getting-started-application-template-buttons">
            <div className="getting-started-application-template-back-button">
                <button onClick = { goBack } className="back">
                Back
                </button>
            </div>
            <div className="getting-started-application-template-next-button">
               { customSubmitButton ? customSubmitButton : SubmitButton }
            </div>
        </div>
    )
}