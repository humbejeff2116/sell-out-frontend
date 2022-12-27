import React from 'react';
import './rightSideBar.css'

export default function RightSideBar({ topComponent, bottomComponent}) {
    if(!topComponent && !bottomComponent) {
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
                <section className="right-side-bar-top">{ topComponent } </section>
                <section className="right-side-bar-bottom">{ bottomComponent}</section>
            </div>
        </section>
    )
}