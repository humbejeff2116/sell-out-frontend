




import React from 'react';
import './rightSideBar.css'

export default function RightSideBar(props) {
    if(!props.topComponent && !props.bottomComponent) {
        return (
            <section className="right-side-bar-container">
                <div className="right-side-bar-content">
                </div>
            </section>
        )

    }
    return (
        <section className="right-side-bar-container">
             <div className="right-side-bar-content">
                <section className="right-side-bar-top">{props.topComponent} </section>
                <section className="right-side-bar-bottom">{props.bottomComponent}</section>
            </div>
        </section>
    )
}