
import React, { useState, useEffect, useRef } from 'react';
import './selectWithCheckboxes.css';


export default function SelectWithCheckboxes({ 
    labelClassName,
    id,
    name,
    label
}) {
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    let _toggleSelectBox = useRef();

    useEffect( ()=> {

        const closeSelect = (e) => {
            if (showCheckboxes && !_toggleSelectBox.current.contains(e.target)) {
               return setShowCheckboxes(false);
            }
        }
        const closeSelectBox = (e) => {
            if (_toggleSelectBox.current) {
                closeSelect(e);
            }
        }

        window.addEventListener('click', closeSelectBox)
        return  ()=> {
            window.removeEventListener('click', closeSelectBox)
        }
    }, [_toggleSelectBox, showCheckboxes]);
   
    const openCheckboxes = () => {
        setShowCheckboxes(prevState => !prevState);
    }

    return (
       <div className="multiselect">
            <div className = { labelClassName ? labelClassName : ''}>
                <label htmlFor = { id || name }>{ label }</label> 
            </div>
            <div className="selectBox" onClick = { openCheckboxes }>
                <select>
                    <option>Select</option>
                </select>
            <div className="overSelect"></div>
            </div>
            {showCheckboxes && (
                <div id="checkboxes"  ref = { _toggleSelectBox }>
                    <label htmlFor="one">
                        <input type="checkbox" id="one"/>First checkbox
                    </label>
                    <label htmlFor="two">
                        <input type="checkbox" id="two"/>Second checkbox
                    </label>
                    <label htmlFor="three">
                        <input type="checkbox" id="three"/>Third checkbox
                    </label>
                </div>
            )}
        </div>
    )
}