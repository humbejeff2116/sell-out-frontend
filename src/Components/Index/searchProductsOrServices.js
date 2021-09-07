



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
                    <p>
                         Filter search to alter default behaviour
                    </p>
                </div>
            </div>
            <div className="index-search-select">

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
                        <input type="search" placeholder="search for products or services"   name="searchproduct" />
                            <button type="submit" >
                            {/* {this.state.Searching ? 'Searching...' : 'Search'} */}
                            search
                            </button>
                        {/* error reporting div */}
                   
               </form>
               <div className="index-search-form-error">
                        <span className="index-search-error">this is search error</span>
                    </div>
            </div>
        </div>
    )
}