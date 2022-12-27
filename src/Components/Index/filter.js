/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { RiListSettingsFill } from 'react-icons/ri';
import useProductsContext from '../../Context/Products/context';
import Links from '../../Data/links';
import styles from './Filter.module.css';

const clothingTabs = Links.getClothingTabs();
const productUsageLinks = Links.getProductsUsage();
const productsCategoryLinks = Links.getProductsCategory();

export const ProductsFilterMenu = React.forwardRef(({
    onClickOutside, 
    showFilter,
    usedOutsideLogin,
    closeFilter  
}, ref) => {
    const [queryValueChange, setQueryValueChange] = useState(false);
    const [showClothingLinks, setShowClothingLinks] = useState(false);
    const [queryValues, setQueryValue] = useState({});

    const indexFilterClassName = `${styles.container} ${usedOutsideLogin ? styles.usedOutsideLogin : ""} ${showFilter ? styles.show : ""}`;

    useEffect(()=> {
        window.addEventListener('click', onClickOutside);
        return () => window.removeEventListener('click', onClickOutside);
    }, [onClickOutside]);

    useEffect(()=> {
        if (queryValues?.category === "clothes") {
            setQueryValue(prevValues => (prevValues.gender ? {...prevValues, gender:"female" } : {...prevValues, gender:"female"}))
            setShowClothingLinks(true);
        } else {
            setShowClothingLinks(false);
        } 
    }, [queryValues?.category, setShowClothingLinks]);

    const handleInputChange = function(e) {
        setQueryValue(prevValues => ({ ...prevValues, [e.target.name] : e.target.value }));
        setQueryValueChange(true);
    }

    return (
        <div className = { indexFilterClassName }>
            <div className = { styles.filterWrapper } ref = { ref }>
                <FilterLinks
                links = { productsCategoryLinks }
                title = "Category"
                />
                <FilterLinks
                links = { productUsageLinks }
                title = "Usage"
                />
                <FilterTabs
                title = "Clothing"
                tabs = { clothingTabs }
                />
            </div>
        </div>
    )
})


function FilterLinks({ 
    links, 
    title, 
    dontShowTitle,
    tag 
}) {
    return (
        <div className = { styles.linksContainer }>
            <div className = { styles.linksTitle }>
            { dontShowTitle ? '' : title }
            </div>
            <div className = { styles.categoryLinks }>
            {links?.map((link, i) =>
                <FilterLink
                {...link}
                title = { title }
                key = { i }
                tag = { tag }
                />  
            )}
            </div>
        </div>
    )
}

function FilterLink({ 
    title, 
    name,
    type, 
    icon,
    tag 
}) {
    const { productsFilter, setProductsFilter } = useProductsContext(); // productsFilter -> ({type, filter})

    const isActiveLink = (productsFilter, name, type) => {
        return productsFilter?.val === name && productsFilter?.type.toLowerCase() === type.toLowerCase()
    }

    const linkClassName = `${styles.categoryLinksItem} ${isActiveLink(productsFilter, name, type) ? styles.categoryLinksItemActive : ""}`
    return (
        <div 
        className = { linkClassName }
        onClick = { ()=> setProductsFilter(title, name, tag) }
        >
            { icon }<span>{ name }</span> 
        </div> 
    )
}

function FilterTabs({ 
    title, 
    tabs
}) {
    const [viewedTabId, setViewedTabId] = useState("");
    const [viewedTabData, setViewedTabData] = useState({});

    useEffect(() => {
        const tabId = tabs[0].id;
        setTabLinksData(tabId, tabs, setViewedTabId, setViewedTabData);
    }, [tabs]);
  

    const toggleTabs = (id) => {
        setTabLinksData(id, tabs, setViewedTabId, setViewedTabData);   
    }

    const setTabLinksData = (id, clothingTabs, setViewedTabId, setViewedTabData) => {
        setViewedTabId(id);
        const { links, name } = clothingTabs.filter(links => links.id === id)[0];
        setViewedTabData({links, name});
    }

    return (
        <div className = { styles.filterTabsContainer }>
            <div className = { styles.filterTabsTop }>
                <div className = { styles.linksTitle }>
                { title }
                </div>
               <div className = { styles.filterTabs }>
                {tabs.map((vals, i)=> 
                    <Tab 
                    key = { i } 
                    { ...vals } 
                    viewedTabId = { viewedTabId }
                    toggleTabs = { toggleTabs }
                    />
                )}
               </div>  
            </div>
            <FilterLinks
            links = { viewedTabData?.links }
            title = { title }
            tag = { viewedTabData.name }
            dontShowTitle
            />
        </div>
    )
}

function Tab({ 
    title, 
    id, 
    icon, 
    name, 
    viewedTabId,
    toggleTabs 
}) {

    const isViewedTab = (viewedTabId, id) => {
        return viewedTabId === id;
    }

    const tabClassName = `${styles.categoryLinksItem} ${styles.categoryTab} ${ isViewedTab(viewedTabId, id) ? styles.categoryTabActive : ""}`
    
    return (
        <div 
        className = { tabClassName }
        onClick = { ()=> toggleTabs(id) }
        >
            { icon }<span>{ name }</span> 
        </div>
    )
}

export function FilterButtonComponent({ 
    filterButtonClassName, 
    filterIconClassName,
    filter,
    active,
    toggleFilter = f => f,
    ...props 
}) {
    const filterContainerClass = filterButtonClassName ?  (
        `${filterButtonClassName} ${active ? styles.filterButtonActive : ""}` 
    ) : (
        `${styles.filterButtonWrapper} ${active ? styles.filterButtonActive : ""}`
    )

    return (
        <div 
        className = { filterContainerClass } 
        { ...props } 
        onClick = { ()=> toggleFilter(filter) }
        >               
            <RiListSettingsFill className = { filterIconClassName || styles.filterButtonIcon }/>
        </div>      
    )
}