
import React from 'react';
import './leftSideBar.css';


export default function LeftSideBar(props) {
    let leftSidebarClassName;
    if (props.fixed && props.className) {
        leftSidebarClassName = `${props.className} fixed`;
    } else if(props.fixed && !props.className) {
        leftSidebarClassName = `left-side-bar-container fixed`;
    } else {
        leftSidebarClassName = `left-side-bar-container`;
    }
    
    return (
        <section className = { leftSidebarClassName }>
            <div className="left-side-bar-content">
                <section className="left-side-bar-top">{props.top}</section>
                <section className="left-side-bar-center">{props.center}</section>
                <section className="left-side-bar-bottom">{props.bottom}</section>
            </div>
        </section>
    )
}