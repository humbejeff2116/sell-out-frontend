



import React, {useState, useEffect, createRef} from 'react';
import './selectWithCheckboxes.css';





export default function SelectWithCheckboxes(props) {
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    let _toggleSelectBox = createRef();
    useEffect( ()=> {
        const closeSelectBox = (e) => {
            if (_toggleSelectBox.current) {
                closeSelect();
            }
            function closeSelect() {
                if (showCheckboxes && !_toggleSelectBox.current.contains(e.target)) {
                   return setShowCheckboxes(false);
                }
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
       <>
       <div class="multiselect">
       <div className={props.labelClassName ? props.ReactlabelClassName : ''}>
            <label htmlFor={props.id || props.name}>{props.label}</label> 
        </div>
            <div class="selectBox" onClick={openCheckboxes}>
            <select>
                <option>Select</option>
            </select>
            <div class="overSelect"></div>
            </div>
            {
                showCheckboxes && (
                    <div id="checkboxes"  ref={_toggleSelectBox}>
                        <label for="one">
                        <input type="checkbox" id="one" />First checkbox</label>
                        <label for="two">
                        <input type="checkbox" id="two" />Second checkbox</label>
                        <label for="three">
                        <input type="checkbox" id="three" />Third checkbox</label>
                    </div>
                )
            }
        </div>
       </>
    )
}