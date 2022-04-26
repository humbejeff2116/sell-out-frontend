
import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { RiListSettingsFill } from 'react-icons/ri'

export default function FilterComponent({ filterType, showFilter, ...props }) {

    const [loading, setLoading] = useState(false);

    useEffect(()=> {


    }, [])


    let indexFilterClassName = showFilter ? "index-filter show" : "index-filter hide";

    let filterComponentChild;

    if (filterType && filterType.toLowerCase() === ("searchFilter").toLowerCase()) {

        filterComponentChild = (

            <div></div>

        )

    } else if (filterType && filterType.toLowerCase() === ("productsFilter").toLowerCase()) {

        filterComponentChild = (

            <div></div>

        )

    }

    return (

        <div className= { indexFilterClassName }>
            <div 
            className= "index-filter-close-button-wrapper"
            onClick = { props.closeFilter }>
                <FiArrowRight className="index-search-filter-icon"/>
            </div>
            {filterComponentChild}
        </div>

    )

}


export function FilterButtonComponent({ filterButtonClassName, filterIconClassName, ...props }) {

    return (
        
        <div className={filterButtonClassName ||"index-search-select-filter"} { ...props } >               
            <RiListSettingsFill className={filterIconClassName || "index-search-filter-icon"}/>
        </div>
            
    )

}