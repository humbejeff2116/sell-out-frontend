





import React from 'react';
import './leftSideBar.css';




export default function LeftSideBar(props) {
    
    return (
        <section className={props.fixed ? "left-side-bar-container fixed": "left-side-bar-container" }>
            <div className="left-side-bar-content">
                <section className="left-side-bar-top">{props.top}</section>
                <section className="left-side-bar-center">{props.center}</section>
                <section className="left-side-bar-bottom">{props.bottom}</section>
            </div>
        </section>
    )
}