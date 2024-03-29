
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import {  RiFilterLine, RiSettingsLine } from 'react-icons/ri';
import { Loader } from '../Loader/loader';
import SearchOmniBox from './searchOmnibox';
import { FilterButtonComponent }  from './filter';
import { PopupMenuWrapper } from '../UserDashboard/Store/Collections/collections';
import { SearchResultModalBar } from './searchResultsModal';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';

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

export function SearchProducts({ 
    toggleFilterComponent, 
    ...props 
}) {
    const [searchedProducts, setSearchedProducts] = useState(null);
    const [searchingProducts, setSearchingProducts] = useState(false);
    const [searchProductsError, setSearchProductsError] = useState(false);
    const [showOmnibar, setShowOmnibar] = useState(false);
    const [searchQuery, setSearchQuery] = useState({});
    const [showSearchProductsResultModal, setShowSearchProductsResultModal] = useState(false);
    const [showSearchProductsResultModalChild, setShowSearchProductsResultModalChild] = useState(false);
    const [returnedEmptySearch, setReturnedEmptySearch] = useState(false);
    const [numberOfEmptySearch, setNumberOfEmptySearch] = useState(0);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [popupMenuFilter, setPopupMenuFilter] = useState({});
    const { user } = useAuth();
    const _searchOmnibar = useRef();
    const _searchFilter = useRef();
    let timer = null;

    useEffect(()=> {
         const closeSearchProductsOmnibar = (e) => {
            if (_searchOmnibar.current)  closeSearchOmnibar();
            function closeSearchOmnibar() {
                if (showOmnibar && !_searchOmnibar.current.contains(e.target)) {
                    setShowOmnibar(false);
                    setReturnedEmptySearch(false);
                    setSearchProductsError(false) ;          
                }
            }
        }
        window.addEventListener('click', closeSearchProductsOmnibar);

        return ()=> {
            window.removeEventListener('click', closeSearchProductsOmnibar);
        }
    }, [_searchOmnibar, showOmnibar]);

    useEffect(()=> {
        let timer = null;

        socket.on("searchProductsSuccess", function (response) {
            if (response.data.length < 1) {
                timer = setTimeout(() => {                   
                    setSearchingProducts(false);
                    setSearchProductsError(false);
                    setReturnedEmptySearch(true);       
                    // setSearchProductsMssg(response.message)
                    setShowOmnibar(true);                   
                }, 1000)
                return;
            }

            timer = setTimeout(() => {     
                setSearchProductsError(false);
                setSearchingProducts(false);
                setShowOmnibar(false);
                // setSearchProductsMssg(response.message)
                setSearchedProducts(response.data);
            }, 1000);
   
            timer = setTimeout(() => {
                setShowSearchProductsResultModal(true);   
            }, 1500);

            timer = setTimeout(() => {
                setShowSearchProductsResultModalChild(true);   
            }, 2000);
         
        })

        socket.on("searchProductsError", function (response) {
            timer = setTimeout(() => {
                setSearchingProducts(false);
               setSearchProductsError(true);
            //    setSearchProductsMssg(response.message)
               setShowOmnibar(true);  
            }, 1000)
           return;   
        })

        return ()=> {
            if (timer) clearTimeout(timer);
        }
    }, []);

    useEffect(()=> {
        return ()=> {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);

    
    const handleInputChange = (e) => {
        setSearchQuery({[e.target.name] : e.target.value});
        setNumberOfEmptySearch(0);
    }

    const handleInputFocusChange  = (e) => {
        setReturnedEmptySearch(false);
        setSearchProductsError(false);
        setShowOmnibar(true);
        setNumberOfEmptySearch(0);
    }

    const getSearchProducts = async function(e) {
        e.preventDefault();
        if (!searchQuery.query) {
            setNumberOfEmptySearch(prevstate => prevstate + 1);
            return;
        }
        if (user && searchQuery.query) {
            setSearchingProducts(true);
            setShowOmnibar(false);
            const data = { user, query: searchQuery?.query };

            try{
                socket.emit("searchProducts", data);
            } catch(err) {
                timer = setTimeout(() => {
                    setSearchingProducts(false);
                    setSearchProductsError(true);
                    setShowOmnibar(true); 
                }, 1000)
            } 
        }  
        e.stopPropagation();
    }

    const getSearchProductsOmnibar = async (searchQuery) => {
        if (!searchQuery.query) {
            setNumberOfEmptySearch(prevstate => prevstate + 1);
            return;
        }
      
        if (user && searchQuery.query) {
            setSearchQuery({query: searchQuery.query});
            setSearchingProducts(true);
            setShowOmnibar(false);
            const data = { user, query: searchQuery?.query };

            try{
                socket.emit("searchProducts", data);
            } catch(err) {
                timer = setTimeout(() => {
                    setSearchingProducts(false);
                    setSearchProductsError(true);  
                    // setSearchProductsMssg("")
                    setShowOmnibar(true);   
                }, 1000)
            }
        }
    }

    const closeSearchProductsBar = () => {
        setShowSearchProductsResultModalChild(false);
        timer = setTimeout(() => {
            setShowSearchProductsResultModal(false);
        }, 800);
    }

    const removeSearchItem = (e, item ) => {
        const newsearchedProducts = searchedProducts.filter(searchItem => searchItem._id !== item._id);
        setSearchedProducts(newsearchedProducts);
        e.stopPropagation();
    }

    const onClickOutsideFilterMenu = (e) => { 
        const { current } = _searchFilter;   
        if (showFilterMenu && current && !current.contains(e.target)) {      
            setShowFilterMenu(false);    
        }  
    }

    const toggleFilterMenu = () => {
        setShowFilterMenu(prevState => !prevState);
    }

    const setPopupFilter = (filter) => {
        setPopupMenuFilter({filter: filter});
    }

    const omnibarClassName = numberOfEmptySearch > 0 ? "index-search-form error" : "index-search-form";

    return (
        <div className="index-search-container">
            <div className="index-search-header-panel">
                <h4>
                    Search for Products
                </h4>
            </div>
            <div className="index-search-input-wrapper">
                <div className="index-search-filter-container-wrapper">
                    <div className="index-search-filter-container">
                        <FilterButtonComponent
                        toggleFilter = { toggleFilterMenu }
                        filter = "search"
                        title = "Filter Search"
                        />
                    </div>
                    <div className="index-search-filter-popup-wrapper">
                        <PopupMenuWrapper 
                        menus = { popupMenu.search }
                        ref = { _searchFilter } 
                        showMenu = { showFilterMenu }
                        onClickOutsideMenu = { onClickOutsideFilterMenu }
                        setMenuFilter = { setPopupFilter }
                        filter = { popupMenuFilter?.filter }
                        />
                    </div>
                </div>
                <div className="index-search-form-wrapper">
                    <div className = { omnibarClassName } ref = { _searchOmnibar }>
                        <form onSubmit = { getSearchProducts }>
                            <input 
                            type="search" 
                            placeholder = "Search for Products" 
                            onFocus =  { handleInputFocusChange } 
                            onChange = { handleInputChange } 
                            name="query" 
                            />
                            <button type="submit" disabled = { searchingProducts ? true : false }>
                            {searchingProducts ? (
                                <Loader loader = "index-search-button-loader"/>
                            ) : ( 
                                <FiSearch className = "index-search-button-icon"/> 
                            )}
                            </button>   
                        </form>
                        {showOmnibar && (
                            <SearchOmniBox 
                            returnedEmptySearch = { returnedEmptySearch }
                            searchError = { searchProductsError }
                            searchProducts = { getSearchProductsOmnibar }
                            />
                        )}
                        {showSearchProductsResultModal && (
                            <SearchResultModalBar
                            query = { searchQuery.query }
                            searchResults = { searchedProducts }
                            closeModal = { closeSearchProductsBar }
                            removeSearchItem = { removeSearchItem }
                            searchFilter = { popupMenuFilter }
                            showModalChild = { showSearchProductsResultModalChild }
                            /> 
                        )}
                    </div>
                </div>
            </div>  
        </div>
    )
}