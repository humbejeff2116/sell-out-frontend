
import React from 'react';
import useNavContext from '../../Context/Navigation/context';
import './leftSideBar.css';


export default function LeftSideBar({
    ...props
}) {
    const { showLeftSideBar } = useNavContext()
    let leftSidebarClassName;

    if (props.fixed) {
        if (props.className) {
            leftSidebarClassName =  `${props.className} ${showLeftSideBar ? "left-side-bar-show" : ""} fixed`;
        }
        if (!props.className) {
            leftSidebarClassName = `left-side-bar-container ${showLeftSideBar ? "left-side-bar-show" : ""} fixed`;
        }
        
    } else {
        leftSidebarClassName = `left-side-bar-container ${showLeftSideBar ? "left-side-bar-show" : ""}`;
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