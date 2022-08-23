import React from 'react';
import SearchResult from './searchResultProduct';
import { ModalBox } from '../ModalReviews/modalReviews';

 export function SearchResultModalBar({
    searchResults,
    removeSearchItem, 
    query,
    closeModal, 
}) {
    return (
        <ModalBox 
        dontUseDefaultModalChildContainer
        handleModal = { closeModal }
        >
            <SearchResultModalBarChild
            query = { query }
            searchResults = { searchResults }
            removeSearchItem = { removeSearchItem }
            />  
        </ModalBox>
    )
}

export function SearchResultModalBarChild({ 
    removeSearchItem, 
    searchResults,
    query 
}) {
    return (
        <div className ="index-search-results-modal-child">
            <div className="index-search-results-header">
                Search results for <span className="index-search-query"> { query ?? "" }</span>
            </div>
            <div className="index-search-results-body">
            {searchResults?.length > 0  ? (
                searchResults.map((item, i) =>
                    <SearchResult
                    key = { i }
                    { ...item } 
                    removeSearchItem = { removeSearchItem }
                    searchItem = { item }
                    />
                )
            ) : (
                <EmptySearchResult/>
            )}
            </div>
        </div>
    )
}

function EmptySearchResult({ ...props }) {
    return (
        <div>

        </div>
    )
}