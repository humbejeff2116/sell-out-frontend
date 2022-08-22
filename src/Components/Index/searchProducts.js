
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import useAuth from '../../Context/context';
import { Loader } from '../Loader/loader';
import socket from '../Socket/socket';
import SearchOmniBox from './searchOmnibox';
import { FilterButtonComponent }  from './filter';
import { SearchResultModalBar, SearchResultModalBarChild } from './searchResultsModal';


export function SearchProducts({ toggleFilterComponent, ...props }) {
    const [searchedProducts, setSearchedProducts] = useState(null);
    const [searchingProducts, setSearchingProducts] = useState(false);
    const [searchProductsError, setSearchProductsError] = useState(false);
    // const [searchProductsMssg,  setSearchProductsMssg] = useState('');
    const [showOmnibar, setShowOmnibar] = useState(false)
    const [searchQuery, setSearchQuery] = useState({});
    const [showSearchProductsResultModal, setShowSearchProductsResultModal] = useState(false)
    const [returnedEmptySearch, setReturnedEmptySearch] = useState(false)
    const [numberOfEmptySearch, setNumberOfEmptySearch] = useState(0)
    const { user } = useAuth();
    const _searchOmnibar = React.createRef();
    let arr = [1,2,3,4,5,6,7,8,8,8,9,8,7,6,6,76,7,7]
    let timer = null;

     useEffect(()=> {
         const closeSearchProductsOmnibar = (e) => {
            if (_searchOmnibar.current)  closeSearchOmnibar()
            function closeSearchOmnibar() {
                if (showOmnibar && !_searchOmnibar.current.contains(e.target)) {
                    setShowOmnibar(false);
                    setReturnedEmptySearch(false)
                    setSearchProductsError(false)           
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

        socket.on("searchProductsSuccess", function(response) {
            if (response.data.length < 1) {
                timer = setTimeout(() => {                   
                    setSearchingProducts(false)
                    setSearchProductsError(false)
                    setReturnedEmptySearch(true)       
                    // setSearchProductsMssg(response.message)
                    setShowOmnibar(true)                   
                }, 1000)

                return;
            }

            timer = setTimeout(() => {     
                setSearchProductsError(false)
                setSearchingProducts(false)
                setShowOmnibar(false)
                // setSearchProductsMssg(response.message)
                setSearchedProducts(response.data)
            }, 1000)
   
            timer = setTimeout(() => {
                setShowSearchProductsResultModal(true)   
            }, 1500)
        })

        socket.on("searchProductsError", function(response) {
            timer = setTimeout(() => {
                setSearchingProducts(false)
               setSearchProductsError(true)
            //    setSearchProductsMssg(response.message)
               setShowOmnibar(true)  
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
    }, [timer])

    
    const handleInputChange = (e) => {
        setSearchQuery(prevState => ({ ...prevState, [e.target.name] : e.target.value }));
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
        if (!searchQuery.searchQuery) {
            setNumberOfEmptySearch( prevstate => prevstate + 1 );
            return
        }
        try{
            if (user && searchQuery.searchQuery) {
                setSearchingProducts(true);
                setShowOmnibar(false);
                const data = { user, query: searchQuery?.searchQuery };
                socket.emit("searchProducts", data);
            }  
        } catch(err) {
            timer = setTimeout(() => {
                setSearchingProducts(false)
                setSearchProductsError(true)
                // TODO... set error mssg
                // setSearchProductsMssg("")
                setShowOmnibar(true) 
            }, 1000)
        }
        e.stopPropagation();
    }

    const getSearchProductsOmnibar = async (searchQuery) => {
        if (!searchQuery.query) {
            setNumberOfEmptySearch(prevstate => prevstate + 1)
            return
        }
        try{
            if (user && searchQuery.query) {
                setSearchQuery({});
                setSearchingProducts(true);
                setShowOmnibar(false);
                const data = { user, query: searchQuery?.query };
                socket.emit("searchProducts", data);
            }
        } catch(err) {
            timer = setTimeout(() => {
                setSearchingProducts(false);
                setSearchProductsError(true);  
                // setSearchProductsMssg("")
                setShowOmnibar(true);   
            }, 1000)
        }
    }

    const closeSearchProductsBar = () => {
        setShowSearchProductsResultModal(false);
    }

    const removeSearchItem = (e, item )=> {
        const newsearchedProducts = searchedProducts.filter(searchItem => searchItem._id !== item._id);
        setSearchedProducts(newsearchedProducts);
        e.stopPropagation();
    }
    const omnibarClassName = numberOfEmptySearch > 0 ? "index-search-form error" : "index-search-form"
    const SearchResultModalBarChildComp = (
        <SearchResultModalBarChild
        searchResults={ searchedProducts || arr }
        removeSearchItem={ removeSearchItem }
        />
    )

    return (
        <div className="index-search-container">
            <div className="index-search-header-panel">
                <h4>
                    Search for Products or Brands
                </h4>
                <div className="index-search-header-writeup">   
                    Have an asset in mind you would like to buy
                    or just want to find out about a brand ?
                    Use the search and and let's see what you find
                </div>
            </div>
            <div className="index-search-input-wrapper">
                <div className="index-search-filter-container">
                    <FilterButtonComponent
                    toggleFilter = {toggleFilterComponent}
                    filter ="search"
                    title="Filter Search"
                    />
                </div>
                <div className="index-search-form-wrapper">
                    <div className={ omnibarClassName } ref={_searchOmnibar}>
                        <form onSubmit= { getSearchProducts }>
                            <input 
                            type="search" 
                            placeholder="Search for Products" 
                            // value={ null } 
                            onFocus=  { handleInputFocusChange } 
                            onChange = { handleInputChange } 
                            name="searchQuery" 
                            />
                            <button type="submit" disabled = { searchingProducts ? true: false } >
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
                            searchError={ searchProductsError }
                            searchProducts={ getSearchProductsOmnibar }
                            />
                        )}
                        {showSearchProductsResultModal && (
                            <SearchResultModalBar
                            searchResults ={ searchedProducts || arr }
                            closeModal = { closeSearchProductsBar }
                            searchResultModalBarChild= { SearchResultModalBarChildComp }
                            /> 
                        )}
                    </div>
                </div>
            </div>  
        </div>
    )
}