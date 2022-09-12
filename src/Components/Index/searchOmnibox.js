
import React, { useState, useEffect, forwardRef } from  'react';
import { FiSearch } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import { AiOutlineReload } from 'react-icons/ai';
import { CgCalendarDates } from 'react-icons/cg';
import { Loader } from '../Loader/loader';
import socket from '../Socket/socket';
import useAuth from '../../Context/context';
import image from '../../Images/avatar2.png';
import errorImage from '../../Images/error2.png';
import failureImage from '../../Images/failure9.jpg';


const SearchOmniBox = ({
    searchError,
    returnedEmptySearch,
    searchProducts, 
    ref
}) => {
    const [userPrevSearches, setUserPrevSearches] = useState(null);
    const [loadingUserPrevSearch, setLoadingUserPrevSearch] = useState(false);
    const [userPrevSearchError, setUserPrevSearchError] = useState(false);
    const { user } = useAuth();

    useEffect(()=> {
        let timer = null;
        let mounted = true;

        if (user) {
            const data = { user }
            socket.emit("getUserPreviousSearches", data)
        }

        socket.on("getUserPreviousSearchesSuccess", function(response) {
            if (mounted) {
                setLoadingUserPrevSearch(false);
                setUserPrevSearchError(false);
                timer = setTimeout(() => setUserPrevSearches(response.data), 1000)
            }
        })

        socket.on("getUserPreviousSearchesError", function(response) {
            if (mounted) {
                timer = setTimeout(() => {
                    setLoadingUserPrevSearch(false)
                    setUserPrevSearchError(true);    
                }, 1000)
            }
        })

        return ()=> {
            mounted = false;
            if (timer) clearTimeout(timer);
            socket.off("getUserPreviousSearches");
        }
    }, [ user ]);

    useEffect(() => {
        let mounted = true

        socket.on('userDataChange', function(response) {
            if (mounted && user) {
                const data = { user }
                socket.emit("getUserPreviousSearches", data)
            }
        });

        return ()=> {
            mounted = false
            socket.off("getUserPreviousSearches");
        }
    }, [ user ]);

    const removeSearch = (e, search) => {
        const data = {
            user,
            searchQuery: search
        }
        if (user) {
            const newuserSeacrh =  userPrevSearches.filter( searchItem => searchItem.query !== search.query)
            setUserPrevSearches(newuserSeacrh)
            socket.emit("removeUserSearch", data)
        }
        e.stopPropagation();     
    }

    if ((!userPrevSearches || loadingUserPrevSearch) && !(searchError || returnedEmptySearch)) {
        return (
            <SearchOmniBoxChildTemplate dontShowHeading ref= { ref }>
                <Loader
                loaderContainer= "index-search-omnibar-loader-container"
                loader = "index-search-omnibar-loader"
                />
            </SearchOmniBoxChildTemplate>
        )
    } else if (userPrevSearchError && !(searchError || returnedEmptySearch)) {
        return (  
            <SearchOmniBoxChildTemplate ref= { ref }>
                <SearchOmniBoxChild
                imageSrc = { image }
                imageAlt = ""
                writeUp = "We are so sorry, looks like an error occured while getting your previous searches"
                >
                    <div className="index-search-omnibar-error-button-wrapper">
                        <button>
                            <AiOutlineReload className="index-search-omnibar-button-icon"/>
                            Retry
                        </button>
                    </div> 
                </SearchOmniBoxChild>
            </SearchOmniBoxChildTemplate>
        )
    } else if (userPrevSearches?.length < 1 && !(searchError || returnedEmptySearch)) {
        return (
            <SearchOmniBoxChildTemplate ref= { ref }>
                <SearchOmniBoxChild
                imageSrc={ failureImage }
                imageAlt = ""
                writeUp = "It looks like we could not find any search made by you"
                />
            </SearchOmniBoxChildTemplate>
        )
    } else if (searchError && !returnedEmptySearch) {
        return (
            <SearchOmniBoxChildTemplate ref= { ref }>
                <SearchOmniBoxChild
                imageSrc={ errorImage  }
                imageAlt = ""
                writeUp = "We are sorry, looks like an error occured while making search"
                >
                    <div className="index-search-omnibar-error-button-wrapper">
                        <button>
                            <AiOutlineReload className="index-search-omnibar-button-icon"/>
                            Retry
                        </button>
                    </div> 
                </SearchOmniBoxChild>
            </SearchOmniBoxChildTemplate>
        )
    } else if (returnedEmptySearch && !searchError) {
        return (
            <SearchOmniBoxChildTemplate ref= { ref }>
                <SearchOmniBoxChild
                imageSrc={ failureImage }
                imageAlt = ""
                writeUp = "It looks like we did not find any product that matches your search"
                />
            </SearchOmniBoxChildTemplate>
        )
    }

    return (
        <SearchOmniBoxChildTemplate ref= { ref }>
            <div className="index-search-omnibar-content">
            {userPrevSearches.map((search, i) =>
                <UserSearchedItem
                key = { i }
                { ...search }
                removeSearch = { removeSearch }
                search = { search }
                searchProducts= { searchProducts }
                />
            )}
            </div> 
        </SearchOmniBoxChildTemplate>
    )
}

const SearchOmniBoxChildTemplate = forwardRef(({
    heading,
    dontShowHeading,
    children
}, ref) => {
    return (
        <div ref= { ref } className="index-search-omnibar-container">
            <div className="index-search-omnibar-wrapper">
            {dontShowHeading ? "" : (
                <div className="index-search-omnibar-header">
                { heading || "Search"}
                </div>  
            )}
            { children }
            </div>
        </div>
    )
})

const SearchOmniBoxChild = ({
    imageSrc,
    imageAlt,
    writeUp,
    children
}) => {
    return (
        <div className="index-search-omnibar-error-container">
            <div className="index-search-omnibar-error-wrapper">
                <div className="index-search-omnibar-error-image">
                    <div className="index-search-omnibar-error-image-wrapper">
                        <img src={ imageSrc } alt= { imageAlt }/>
                    </div>
                </div>
                <div className="index-search-omnibar-error-details">
                    { writeUp } 
                </div>
                { children }
            </div>
        </div>
    )
}

function UserSearchedItem({ 
    time, 
    search, 
    query, 
    removeSearch, 
    searchProducts
}) {
    const searchTime = (new Date(Number(time))).toDateString();

    return (
        <div className="index-search-omnibar-search-item-container" onClick={()=> searchProducts(search)}>
            <div className="index-search-omnibar-search-item-details-container"> 
                <div className="index-search-omnibar-search-item-image">
                    <FiSearch className="index-search-omnibar-search-icon"/>
                </div>
                <div className="index-search-omnibar-search-item-details">
                    <div className="index-search-omnibar-search-item-title">
                        { query }
                    </div>
                    <div className="index-search-omnibar-search-item-tags">
                        <CgCalendarDates className="index-search-omnibar-search-item-icon"/>
                        { searchTime }
                    </div>
                </div>
            </div>
            <div className="index-search-omnibar-search-item-close" onClick={(e)=> removeSearch(e, search)}>
                <RiCloseFill className="index-search-remove-icon"/>
            </div>
        </div>
    )
}

export default SearchOmniBox;