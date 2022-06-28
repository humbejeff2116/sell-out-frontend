import React, { useEffect, useState } from 'react';
import { RiListSettingsFill } from 'react-icons/ri';
import { MdArrowForwardIos } from 'react-icons/md';
import { BiFilter } from 'react-icons/bi';
import { Sort } from '../Reviews/reviews';
import Links from '../../Data/links';
import styles from './Filter.module.css';


    const filterButtons = {
        usageOptions : [
            {name:'Usage', value: 'all'},
            {value: 'New'},
            { value: 'Fairly used'},
            { value: '1 year+'},
            { value: '2 years+'},
            { value: 'Others'},
        ],
        genderOptions : [
            {name:'Gender', value: 'all'},
            {value: 'Female'},
            { value: 'Male'},
        ],
        categoryOptions : [
            {name:'Category', value: 'all'},
            {value: 'Electronics '},
            { value: 'Clothes'},
            { value: 'Accessories'},
            { value: '2 years+'},
            { value: 'Others'},
        ],
    }

    const clothingLinks = Links.getClothingLinks();
    const maleClothingLinks = Links.getMaleClothingLinks();
    const clothingTabs = Links.getClothingTabs();

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
                links = { clothingLinks }
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
            links = { clothingLinks }
            title = "Category"
            />
            <FilterLinks
            links = { clothingLinks }
            title = "Usage"
            />
            <FilterTabs
            title= "Clothings"
            tabs = { clothingTabs }
            />
        </div>
    )
}

function FilterLinks({ links, title }) {
    return (
        <div className={ styles.linksContainer }>
            { title || '' }
            <div className={ styles.categoryLinks }>
            {
                links.map(({href, name, icon, ...rest}, i) =>
                    <div className={ styles.categoryLinksItem }>
                        { icon }<span>{ name }</span> 
                    </div>  
                )
            }
            </div>
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
            />
        </div>
    )
}

function Tab({ id, icon, name, viewedTabId, ...props }) {
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