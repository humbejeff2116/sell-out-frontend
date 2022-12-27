/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useRef, useState} from "react";
import autosize from 'autosize';


const style = {
    maxHeight:'75px',
    minHeight:'38px',
      resize:'none',
      padding:'9px',
      boxSizing:'border-box',
      fontSize:'15px'
};

function Text(props) {
    const textareaRef = useRef();
    useEffect(() => {
        textareaRef.focus();
        autosize(textareaRef);
    }, [])

    return (
          <div>Textarea autosize <br/><br/>
            <textarea
            style={style} 
            ref={textareaRef}
            placeholder="type some text"
            rows={1} defaultValue=""/>
          </div>
        );
}


const defaultStyle = {
    display: "block",
    overflow: "hidden",
    resize: "none",
    width: "100%",
    backgroundColor: "mediumSpringGreen"
};

const AutoHeightTextarea = ({ style = defaultStyle, ...etc }) => {
    const textareaRef = useRef(null);
    const [currentValue, setCurrentValue ] = useState("");// you can manage data with it

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [currentValue]);

    return (
        <textarea
            ref={textareaRef}
            style={style}
            {...etc}
            value={currentValue}

            onChange={e=>{
            setCurrentValue(e.target.value);
            //to do something with value, maybe callback?
            }}
        />
    );
};

export {AutoHeightTextarea};


// You don't need a ref to do that. With only the event it will work.
export default function TextAreaAuto(){
    const textRef = useRef();
   
    const onChangeHandler = function(e) {
        const target = e.target;
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${target.scrollHeight}px`;
    };
   
    return (
      <div>
       <textarea
         ref={textRef}
         onChange={onChangeHandler}
         className="text-area"
        />
       </div>
     );
   };