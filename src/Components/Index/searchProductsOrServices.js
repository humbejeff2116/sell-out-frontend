



import React from 'react';


const states = [
    {name:'State'},
    {name:'Abia'},
    {name:'Adamawa'},
    {name:'Akwaibom'},
    {name:'Anambra'}
]

export function SearchProducts(props) {
    return (
        <div className="index-search-container">
            <div className="index-search-header-panel">
                <div className="index-search-header">
                    {/* <p>
                        Filter search to alter default behaviour
                    </p> */}
                    <p>
                        Search for products
                    </p>
                </div>
            </div>
            <div className="index-search-select">

                {/* <div className="index-search-select-filter">
                    
                    <span>Filter search</span>
                </div> */}

                <div className="index-search-select-btn">
                   
                    <select>
                    <option>
                        Country
                    </option>
                        <option>
                            Nigeria
                        </option>
                    </select>
                </div>

                <div className="index-search-select-btn">
                   
                    <select>
                    {
                        states.map((state,i)=>
                        <option key={i} value="state.name">
                            {state.name}
                        </option>
                        )
                    }
                    </select>
                </div>


                <div className="index-search-select-btn">
                   
                   <select>
                   <option>
                       Category
                   </option>
                       <option>
                           All
                       </option>
                       <option>
                           Electronics
                       </option>
                       <option>
                           Furniture
                       </option>
                   </select>
               </div>
            </div>
            <div className="index-search-form">
               <form>
               <input type="search" placeholder="search for products"   name="searchproduct" />

                <button type="submit" >
                {/* {this.state.Searching ? 'Searching...' : 'Search'} */}
                Search
                </button>   
               </form>
               <div className="index-search-form-error">
                            <div className="index-search-form-error-text">
                            <span className="index-search-error">No products match your search</span>
                            </div>
                            <div className="index-search-form-error-close">
                                <div className="index-search-form-error-close-icon"><i>x</i></div>
                            </div>      
                        </div>
              
            </div>
        </div>
    )
}