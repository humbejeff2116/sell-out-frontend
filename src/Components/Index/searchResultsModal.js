import React, { useState, useEffect, useRef } from 'react';
import { RiFilterLine, RiSettingsLine } from 'react-icons/ri';
import { DisplayedProduct } from '../Product/product';
import { ModalBox } from '../ModalReviews/modalReviews';
import { LoaderSmall } from '../Loader/loader';
import { FilterButtonComponent }  from './filter';
import { PopupMenuWrapper } from '../UserDashboard/Store/Collections/collections';


const popupMenu = {
    search: [
        {
            name: "Current Location",
            icon: <RiFilterLine className="store-products-popup-icon"/>    
        },
        {
            name: "Most Sold",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        },
        {
            name: "Least Sold",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        },
        {
            name: "Most Expensive",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        },
        {
            name: "Most Affordable",
            icon: <RiSettingsLine className="store-products-popup-icon"/>    
        }
    ]
}

 export function SearchResultModalBar({
    query,
    searchResults,
    closeModal,
    removeSearchItem,
    searchFilter,
    showModalChild 
}) {
    const [filterResults, setFilterResults] = useState(false);
    const [showSearchFilterMenu, setShowSearchFilterMenu] = useState(false);
    const [popupMenuFilter, setPopupMenuFilter] = useState({});
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [filtering, setFiltering] = useState(false);
    const _searchFilter = useRef();

    const modalChildClassName = `index-search-results-modal-child 
    ${showModalChild ? "index-search-results-modal-child-show" : ""}`;

    useEffect(() => {
        if (searchFilter?.filter) {
            setPopupMenuFilter({filter: searchFilter.filter});
        }
    }, [searchFilter]);

    useEffect(() => {
        const filter = searchFilter?.filter || popupMenuFilter?.filter;

        if (filterResults) {
            if (!filter) {
                filterResult(searchResults, null, setFilteredProducts);
                return;
            }
            filterResult(searchResults, filter, setFilteredProducts);
        }
    }, [searchFilter?.filter, popupMenuFilter?.filter, searchResults, filterResults]);

    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => setFilterResults(true), 2000);
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, []);

    const onClickOutsideFilterMenu = (e) => { 
        const { current } = _searchFilter;

        if (showSearchFilterMenu && current && !current.contains(e.target)) {      
            setShowSearchFilterMenu(false);    
        }  
    }

    const toggleSearchFilterMenu = () => {
        setShowSearchFilterMenu(prevState => !prevState);
    }

    const setPopupFilter = (filter) => {
        setPopupMenuFilter({filter: filter});
    }

    const filterResult = (results, filter, callback) => {
        if (!filter) {
            callback(results);
            return;
        }
        
        setFiltering(true);
        // TODO... filter results 
        callback(results);
        setFiltering(false);
        // switch (filter) {
        //     case "":
        //         break;
        //     default:
        //         break;
        // }
    }

    const popUpMenu = (
        <PopupMenuWrapper 
        menus = { popupMenu.search }
        ref = { _searchFilter } 
        showMenu = { showSearchFilterMenu }
        onClickOutsideMenu = { onClickOutsideFilterMenu }
        setMenuFilter = { setPopupFilter }
        filter = { popupMenuFilter?.filter }
        />
    )

    return (
        <ModalBox 
        // placeCloseButtonLeft
        dontUseDefaultModalChildContainer
        handleModal = { closeModal }
        >
            <SearchResultModalBarChildTemplate
            resultBodyContainerClass = { (!filteredProducts || filtering) ? "index-search-results-loading-body" : "" }
            modalChildClassName = { modalChildClassName }
            query = { query }
            filterMenuIsActive = { showSearchFilterMenu }
            toggleFilter = { toggleSearchFilterMenu }
            filterPopUpMenu = { popUpMenu }
            >
            {!filterResults ? (
                ""
            ) : !filteredProducts || filtering ? (
                <LoaderSmall/>
            ) : filteredProducts?.map((item, i) =>
                <DisplayedProduct 
                key = { i } 
                { ...item } 
                product = { item } 
                />
            )}
            </SearchResultModalBarChildTemplate>  
        </ModalBox>
    )
}

function SearchResultModalBarChildTemplate({
    modalChildClassName, 
    query,
    filterMenuIsActive, 
    toggleFilter,
    filterPopUpMenu,
    resultBodyContainerClass,
    children
}) {
    return (
        <div className = { modalChildClassName }>
            <div className="index-search-results-header-wrapper">
                <div className="index-search-results-header">
                    <div className="index-search-results-filter">
                        Search results for <span className="index-search-query">"{ query ?? "" }"</span>
                    </div>
                    <div className="index-search-results-filter">
                    <FilterButtonComponent
                    toggleFilter = { toggleFilter }
                    active = { filterMenuIsActive }
                    />
                    </div>
                </div>
                <div className="index-search-results-filter-popup-wrapper">
                { filterPopUpMenu }
                </div>
            </div>
            <div className = { resultBodyContainerClass || "index-search-results-body" }>
            { children }
            </div>
        </div>
    )
}