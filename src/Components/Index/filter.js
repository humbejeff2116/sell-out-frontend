import React, { useEffect, useState } from 'react';
import { RiListSettingsFill } from 'react-icons/ri';
import { MdArrowForwardIos } from 'react-icons/md';
import { BiFilter } from 'react-icons/bi';
import { Sort } from '../Reviews/reviews';
import useProductsContext from '../../Context/Products/context';
import Links from '../../Data/links';
import styles from './Filter.module.css';



const clothingTabs = Links.getClothingTabs();
const productUsageLinks = Links.getProductsUsage();
const productsCategoryLinks = Links.getProductsCategory();

export default function FilterComponent({ 
    filterType, 
    showFilter, 
    closeFilter, 
    ...props 
}) {
    const indexFilterClassName = showFilter ? `${styles.container} ${styles.show}` : `${styles.container}`;
    let filterComponentChild;

    if (filterType && filterType.toLowerCase() === ("searchFilter").toLowerCase()) {
        filterComponentChild = (
            <SearchFilterMenu/>
        )
    } else if (filterType && filterType.toLowerCase() === ("productsFilter").toLowerCase()) {
        filterComponentChild = (
            <ProductsFilterMenu/>
        )
    }

    return (
        <div className= { indexFilterClassName }>
            <div 
            className= { styles.headerContainer }
            onClick = { closeFilter }
            >
                <MdArrowForwardIos className={styles.closeIcon}/>
                <div className= {styles.headerText}>
                    <BiFilter className={styles.headerTextIcon}/>
                    FILTER
                </div>
            </div>
            { filterComponentChild }
        </div>
    )
}


function SearchFilterMenu({ showChild,...props }) {  
    const sortConatinerlassName = `${styles.sortContainer}`
    const sortConatinerOpenClassName = `${styles.sortContainer} ${styles.sortContainerOpen}`
    
    return (
        <div className={ styles.filterWrapper }>
            {/* country */}
            <div className={ styles.filterChildContainer }>
                <Sort
                sortContainerClass  = { sortConatinerlassName }
                sortContainerOpenClass ={ sortConatinerOpenClassName }
                >
                </Sort>
            </div>
            {/* state */}
            <div className={ styles.filterChildContainer }>
                <Sort
                sortContainerClass  = { sortConatinerlassName }
                sortContainerOpenClass ={ sortConatinerOpenClassName }
                >
                </Sort>
            </div>
            {/* category */}
            <div className={ styles.filterChildContainer }>
                <FilterLinks
                links = { productsCategoryLinks }
                title = "Category"
                />
            </div>
        </div>
    )
}

function ProductsFilterMenu({ ...props }) {
    const [queryValueChange, setQueryValueChange] = useState(false);
    const [showClothingLinks, setShowClothingLinks] = useState(false);
    const [queryValues, setQueryValue] = useState({});
    const sortConatinerlassName = `${styles.sortContainer}`
    const sortConatinerOpenClassName = `${styles.sortContainer} ${styles.sortContainerOpen}`

    useEffect(()=> {
        if (queryValues?.category === "clothes") {
            setQueryValue(prevValues => (prevValues.gender ? {...prevValues, gender:"female" } : {...prevValues, gender:"female"}))
            setShowClothingLinks(true)
        } else {
            setShowClothingLinks(false)
        } 
    }, [queryValues.category]);

    const handleInputChange = function(e) {
        setQueryValue(prevValues => ({ ...prevValues, [e.target.name] : e.target.value }))
        setQueryValueChange(true) 
    }

    return (
        <div className={ styles.filterWrapper }>
            <FilterLinks
            links = { productsCategoryLinks }
            title = "Category"
            />
            <FilterLinks
            links = { productUsageLinks }
            title = "Usage"
            />
            <FilterTabs
            title= "Clothing"
            tabs = { clothingTabs }
            />
        </div>
    )
}


function FilterLinks({ links, title, dontShowTitle }) {
    return (
        <div className={ styles.linksContainer }>
            { dontShowTitle ? '' : title  }
            <div className={ styles.categoryLinks }>
            {
                links.map((link, i) =>
                    <FilterLink
                    {...link}
                    title = { title }
                    key={i}
                    />  
                )
            }
            </div>
        </div>
    )
}

function FilterLink({ 
    title, 
    name,
    type, 
    icon, 
    ...props 
}) {
    const { productsFilter, setProductsFilter } = useProductsContext(); // productsFilter -> ({type, filter})

        const linkClassName = (
            productsFilter?.val === name && productsFilter?.type.toLowerCase() === type.toLowerCase()
        )  ? (
        `${styles.categoryLinksItem} ${styles.categoryLinksItemActive}`
    ) : (
        `${styles.categoryLinksItem}`
    )
    return (
        <div 
        className={ linkClassName }
        onClick={ ()=> setProductsFilter(title, name) }
        >
            { icon }<span>{ name }</span> 
        </div> 
    )
}

function FilterTabs({ title, tabs, ...props }) {
    const [tabLinks, setTabLinks] = useState([]);
    const [viewedTabId, setViewedTabId] = useState("");

    useEffect(() => {
        const tabId = tabs[0].id;
        setTabLinksData(tabId, tabs, setViewedTabId, setTabLinks);
    }, [tabs]);
  

    const toggleTabs = (id) => {
        setTabLinksData(id, tabs, setViewedTabId, setTabLinks);   
    }

    const setTabLinksData = (id, clothingTabs, setViewedTabId, setTabLinks) => {
        setViewedTabId(id);
        const { links } = clothingTabs.filter(links => links.id === id)[0];
        setTabLinks(links);
    }

    return (
        <div className={ styles.filterTabsContainer }>
            <div className={ styles.filterTabsTop }>
               { title }
               <div className={ styles.filterTabs }>
                {
                    tabs.map((vals, i)=> 
                        <Tab 
                        key ={ i } 
                        { ...vals } 
                        viewedTabId ={ viewedTabId }
                        toggleTabs = { toggleTabs }
                        />
                    )
                }
               </div>  
            </div>
            <FilterLinks
            links = { tabLinks }
            title= { title }
            dontShowTitle
            />
        </div>
    )
}

function Tab({ title, id, icon, name, viewedTabId, ...props }) {
    const tabClassName = viewedTabId === id ? (
        `${styles.categoryLinksItem} ${styles.categoryTab} ${styles.categoryTabActive}`
    ) : (
        `${styles.categoryLinksItem} ${styles.categoryTab}`
    )
    return (
        <div 
        className= { tabClassName }
        onClick = {()=> props.toggleTabs(id) }
        >
            { icon }<span>{ name }</span> 
        </div>
    )
}


export function FilterButtonComponent({ filterButtonClassName, filterIconClassName, ...props }) {
    return (
        <div 
        className={ filterButtonClassName || styles.filterButtonWrapper } 
        { ...props } 
        onClick = { props.toggleFilterComponent }
        >               
            <RiListSettingsFill className={ filterIconClassName || styles.filterButtonIcon }/>
        </div>      
    )
}