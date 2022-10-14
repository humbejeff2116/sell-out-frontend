import React, { useState, useRef, forwardRef } from 'react';
import { RiFilterLine, RiSettingsLine } from 'react-icons/ri';
import { DisplayedProduct } from '../Product/product';
import { ModalBox } from '../ModalReviews/modalReviews';
import { FilterButtonComponent }  from './filter';
import { PopupMenu, PopupMenuButton } from '../UserDashboard/Store/Collections/collections';

 export function SearchResultModalBar({
    searchResults,
    removeSearchItem, 
    query,
    closeModal 
}) {
    const [showSearchFilterMenu, setShowSearchFilterMenu] = useState(false);
    const _searchFilter = useRef();

    const onClickOutsideFilter = (e) => { 
        const { current } = _searchFilter;

        if (showSearchFilterMenu && current && !current.contains(e.target)) {      
            setShowSearchFilterMenu(false);    
        }  
    }

    const toggleSearchFilterMenu = () => {
        setShowSearchFilterMenu(prevState => !prevState);
    }

    return (
        <ModalBox 
        dontUseDefaultModalChildContainer
        handleModal = { closeModal }
        >
            <SearchResultModalBarChild
            ref = { _searchFilter }
            query = { query }
            searchResults = { searchResults }
            removeSearchItem = { removeSearchItem }
            showSearchFilterMenu = { showSearchFilterMenu }
            onClickOutsideFilterMenu = { onClickOutsideFilter }
            toggleFilter = { toggleSearchFilterMenu }
            />  
        </ModalBox>
    )
}

export const SearchResultModalBarChild = forwardRef(({ 
    removeSearchItem, 
    searchResults,
    showSearchFilterMenu,
    onClickOutsideFilterMenu,
    toggleFilter,
    query 
}, ref)  => {

    return (
        <div className ="index-search-results-modal-child">
            <div className="index-search-results-header-wrapper">
            <div className="index-search-results-header">
                <div className="index-search-results-filter">
                    Search results for <span className="index-search-query">"{ query ?? "" }"</span>
                </div>
                <div className="index-search-results-filter">
                   <FilterButtonComponent
                    toggleFilter = { toggleFilter }
                    active = { showSearchFilterMenu }
                   />
                </div>
            </div>
            <div className="index-search-results-filter-popup-wrapper">
                 <PopupMenu 
                ref = { ref } 
                showMenu = { showSearchFilterMenu }
                onClickOutside = { onClickOutsideFilterMenu }
                >
                    <>
                    <PopupMenuButton
                    name="Current Location"
                    // handleClick
                    icon = {
                        <RiFilterLine className="store-products-popup-icon"/>
                    }
                    />
                    <PopupMenuButton
                    name="Most Sold"
                    // handleClick
                    icon = {
                        <RiFilterLine className="store-products-popup-icon"/>
                    }
                    />
                    <PopupMenuButton
                    name="Least Sold"
                    // handleClick
                    icon = {
                        <RiSettingsLine className="store-products-popup-icon"/>
                    }        
                    />

                    <PopupMenuButton
                    name="Most Expensive"
                    // handleClick
                    icon = {
                        <RiSettingsLine className="store-products-popup-icon"/>
                    }        
                    />

                    <PopupMenuButton
                    name="Most Affordable"
                    // handleClick
                    icon = {
                        <RiSettingsLine className="store-products-popup-icon"/>
                    }        
                    />
                    </>
                </PopupMenu>
            </div>
            </div>
            <div className="index-search-results-body">
            {searchResults?.length > 0  && (
                searchResults.map((item, i) =>
                    <DisplayedProduct 
                    key = { i } 
                    {...item} 
                    product = { item } 
                    />
                )
            )}
            </div>
        </div>
    )
})