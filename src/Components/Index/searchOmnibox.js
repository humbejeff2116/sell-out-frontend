


import React, { useState, useEffect } from  'react';
import useAuth from '../../Context/context';
import { Loader } from '../Loader/loader';
import image from '../../Images/avatar2.png';
import { CgCalendarDates } from 'react-icons/cg'
// stick man sad
import notfoundImage from '../../Images/notfound8.jpg';
import errorImage from '../../Images/error2.png';
import searchImage from '../../Images/search3.jpg';
import socket from '../Socket/socket';


 const SearchOmniBox = React.forwardRef(({prevSearches, loading, error, ...props}, ref) => {

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

                setLoadingUserPrevSearch(false)
    
                setUserPrevSearchError(false);

                timer = setTimeout(() => {

                    setUserPrevSearches(response.data)
                    
                }, 1000)

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

            if (timer) {

                clearTimeout(timer)
            }
            socket.off("getUserPreviousSearches")

        }

    }, [ user ]);

    useEffect(() => {

        let mounted = true

        socket.on('userDataChange', function(response) {

            if (mounted && user) {

                const data = { user }

                socket.emit("getUserPreviousSearches", data)

            }

        })

        return ()=> {

            mounted = false

            socket.off("getUserPreviousSearches")
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

        e.stopPropagation()
          
    }

    if ((!userPrevSearches || loadingUserPrevSearch) && !(props?.searchError || props?.returnedEmptySearch)) {

        return (

             <div ref= { ref } className="index-search-omnibar-container">
                <div className="index-search-omnibar-wrapper">

               <Loader
               loaderContainer={"index-search-omnibar-loader-container"}
                loader = {"index-search-omnibar-loader"}
                />

                </div>
            
            </div>
        )

    } else if (userPrevSearchError && !(props?.searchError || props?.returnedEmptySearch)) {

        return (
            
            <div ref= { ref } className="index-search-omnibar-container">

            <div className="index-search-omnibar-wrapper">
                <div className="index-search-omnibar-error-container">

                    <div className="index-search-omnibar-error-wrapper">
                        {/* <div>
                            <span>Error</span>
                        </div> */}
                        <div className="index-search-omnibar-error-image">
                            <div className="index-search-omnibar-error-image-wrapper">
                            <img src={image} alt="" />
                            </div>
                        </div>
                        <div className="index-search-omnibar-error-details">

                            <p>We are so sorry, looks like an error occured while getting your previous searches
                            </p>

                        </div>
                        <div className="index-search-omnibar-error-button-container">
                            <div className="index-search-omnibar-error-button-wrapper">
                                <button>Retry</button>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>

            </div>

        )

    } else if (userPrevSearches?.length < 1 && !(props?.searchError || props?.returnedEmptySearch)) {

        return (
           
            <div ref= { ref } className="index-search-omnibar-container">

            <div className="index-search-omnibar-wrapper">
           
                <div className="index-search-omnibar-error-container">
                    <div className="index-search-omnibar-header">
                    Recent searches
                    </div>
                    <div className="index-search-omnibar-error-wrapper">
                        
                        <div className="index-search-omnibar-error-image">
                            <div className="index-search-omnibar-error-image-wrapper">
                            <img src={ notfoundImage } alt="" />
                            </div>
                        </div>
                        <div className="index-search-omnibar-error-details">

                            {/* <p>
                            Wow! it looks like you are about to make your first search on this platform. Lets make it happen 
                            </p> */}
                            <p>
                            It looks like we could not find any recent search made by you. 
                            </p>

                        </div>
                        
                    </div>
                </div>
            </div>
            </div>

        )

    } else if (props.searchError && !props.returnedEmptySearch) {

        return (

            <div ref= { ref } className="index-search-omnibar-container">

            <div className="index-search-omnibar-wrapper">
                <div className="index-search-omnibar-error-container">

                    <div className="index-search-omnibar-error-wrapper">
                        <div className="index-search-omnibar-header">
                        Error
                        </div>
                        <div className="index-search-omnibar-error-image">
                            <div className="index-search-omnibar-error-image-wrapper">
                            <img src={ errorImage } alt="" />
                            </div>
                        </div>
                        <div className="index-search-omnibar-error-details">

                            <p> 
                                We are sorry, looks like an error occured while making search.
                            </p>

                        </div>
                        <div className="index-search-omnibar-error-button-container">
                            <div className="index-search-omnibar-error-button-wrapper">
                                <button>Retry</button>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>

            </div>

        )

    } else if (props.returnedEmptySearch && !props.searchError) {

        return (

            <div ref= { ref } className="index-search-omnibar-container">

            <div className="index-search-omnibar-wrapper">
                <div className="index-search-omnibar-error-container">

                    <div className="index-search-omnibar-error-wrapper">
                        {/* <div>
                            <span>Error</span>
                        </div> */}
                        <div className="index-search-omnibar-error-image">
                            <div className="index-search-omnibar-error-image-wrapper">
                            <img src={notfoundImage} alt="" />
                            </div>
                        </div>
                        <div className="index-search-omnibar-error-details">

                            <p>
                                It kinda looks like we did not find 
                                any product which match your search 
                            </p>

                        </div>
                    </div>

                </div>
            </div>

            </div>
        )

    }

    return (

        <div ref= { ref } className="index-search-omnibar-container">
           

            <div className="index-search-omnibar-wrapper">
            <div className="index-search-omnibar-header">
                Recent searches
            </div>

            {
                userPrevSearches.map( (search, i) =>

                    <UserSearchedItem
                    key = { i }
                    {...search}
                    removeSearch = { removeSearch }
                    search = { search }
                    searchProducts= { props.searchProducts }
                    />

                )
            }

            </div>

        </div>

    )

})

function UserSearchedItem(props)  {

    // TODO... return appropriate images src
    const searchItemImage = props?.foundProducts ? (

        <img src={ searchImage } alt="" />

    ) : (

        <img src={ searchImage } alt="" />
    )

    const searchTime = ( new Date(Number(props?.time)) ).toUTCString()

    return (

        <div className="index-search-omnibar-search-item-container" onClick={()=> props.searchProducts(props.search)}>

            <div className="index-search-omnibar-search-item-details-container"> 

                <div className="index-search-omnibar-search-item-image">
                   { searchItemImage }
                </div>

                <div className="index-search-omnibar-search-item-details">

                    <div className="index-search-omnibar-search-item-title">
                        { props.query }
                    </div>

                    <div className="index-search-omnibar-search-item-tags">
                        <CgCalendarDates className="index-search-omnibar-search-item-icon"/>
                        <span>{ searchTime }</span>
                    </div>

                </div>

               

            </div>

            <div className="index-search-omnibar-search-item-close" onClick={(e)=>props.removeSearch(e, props.search)}>
                <span>
                X
                {/* <RiCloseFill className="index-search-close-icon"/> */}
                </span>
            </div>

        </div>

    )

}

export default SearchOmniBox