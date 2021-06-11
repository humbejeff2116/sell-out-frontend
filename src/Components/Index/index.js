






import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';


const products = [
    {
        name:"first product",
        price:"23",
        number:"04934384",
        category:"phone"
    },
    {
        name:"first product",
        price:"23",
        number:"04934384",
        category:"phone"
    }
] 

export default function Index() {
    return (
        <div className="index-container">
           <PostProduct/>
           <SearchProducts/>
           <DisplayProducts/>

        </div>
    )
}

function PostProduct(props) {
    return (
        <div className="index-post-container">
            <div className="index-post-writeup-container">
                <div className="index-post-writeup">
                    <h4>
                        Got a Product to sell or a service to offer?
                        someone might just be needing it.
                    </h4>
                    

                </div>
            </div>
            <div className="index-post-upload">
            <Link to="/upload-product"><button>Upload Details</button></Link>
            </div>
        </div>
    )
}


const states =[
    {name:'State'},
    {name:'Abia'},
    {name:'Adamawa'},
    {name:'Akwaibom'},
    {name:'Anambra'}
]
function SearchProducts(props) {
    return (
        <div className="index-search-container">
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



function DisplayProducts(props) {
    return (
        <div className="index-products-container">
            {
                products.map((prod,i) =>
                <DisplayedProduct key={i}  {...prod} />
                )
            }

        </div>
    )
}

function DisplayedProduct(props) {
    return (
        <div className="index-product-panel">
            {/* <span>{props.name}</span>
            <span>{props.price}</span>
            <span>{props.number}</span> */}
            <div className="index-product-profile-panel">
                <div className="index-product-profile">profile info</div>
                <div className="index-product-profile-star">star seller</div>
            </div>

            <div className="index-product-image-panel">
                <div className="index-product-image">product images</div>
                <div className="index-product-image-details">product details</div>
            </div>

            <div className="index-product-reaction-panel">
                <div className="index-product-reaction-star">star product</div>

                <div className="index-product-reaction-comments">comments</div>
            </div>

        </div>
    )
}