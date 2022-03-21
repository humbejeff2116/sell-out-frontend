
import React from 'react';
import SearchResult from './searchResultProduct';
import { ModalBox } from '../ModalComments/modalComments';

 export function SearchResultModalBar(props) {
  
    return (

        <ModalBox 
        handleModal = { props.closeModal }
        modalContainerWrapperName ={"index-search-results-modal-container"} 
        modalContainer={"index-search-results-modal-wrapper"}
        >

        { props.searchResultModalBarChild }
           
        </ModalBox>

    )

}

export function SearchResultModalBarChild(props) {

    return (

        <div className ="index-search-results-modal-child">
            <div className="index-search-results-header">
            <h2>Search results for</h2>
            </div>
            {
                props.searchResults.map((item, i) =>

                    <SearchResult
                    key = { i }
                    { ...item }
                    
                    removeSearchItem = { props.removeSearchItem }
                    searchItem = { item }
                    />

                )
            }
        </div>
    )

}