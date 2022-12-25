import {
    BiHome, 
    BiUser, 
    BiFolder, 
    // BiCart, 
    BiCartAlt, 
    BiLogOut, 
    BiStore, 
    BiCog, 
    BiMessageDetail, 
    BiCoinStack, 
    BiBuildings, 
    BiHelpCircle, 
    // BiWallet,
} from "react-icons/bi";

import {
    RiBookOpenLine, 
    RiContactsBookLine, 
    RiMapPinAddLine, 
    RiListSettingsLine, 
    RiCompassFill, 
    // RiPhoneFill, 
    RiBookFill, 
    RiTableFill, 
    RiTvFill, 
    RiGlobalFill, 
    RiFireFill, 
    RiDrizzleFill, 
    RiArchiveFill, 
    RiHistoryFill, 
    RiWomenFill, 
    RiMenFill, 
    RiShirtFill, 
    RiPantoneFill, 
    RiHandbagFill
} from "react-icons/ri";

import { 
    FaTwitter,
    FaInstagramSquare,
    FaFacebookSquare,
    // FaLinkedinIn,
    // FaGithubSquare, 
    FaUtensils, 
    FaShoePrints 
} from 'react-icons/fa';

import {
    FiTruck 
} from 'react-icons/fi';

import { 
    MdLaunch
} from 'react-icons/md';

import { 
    GoDashboard 
} from 'react-icons/go';

import { 
    CgProfile
} from 'react-icons/cg';

import {
    IoMdTimer
} from 'react-icons/io';

const LinksData = {
    landingMainLinks : [
        { name: "Freefall", href: "/", icon: <BiHome className="nav-icon" /> },
        { name: "Buy", href: "/products", icon: <RiBookOpenLine className="nav-icon"/> },
        { name: "Sell", href: "/sell-products", icon: <BiFolder className="nav-icon"/> },
        { name: "About", href: "/about", icon: <BiUser className="nav-icon"/> },
        // { name: "Contact", href: "/contact", icon: <BiCart className="nav-icon"/> }
    ],
    landingMobileMainLinks: [
        { name: "Freefall", href: "/", icon: <BiHome className="nav-icon" /> },
        { name: "Buy", href: "/products", icon: <RiBookOpenLine className="nav-icon"/> },
        { name: "Sell", href: "/sell-products", icon: <BiFolder className="nav-icon"/> },
        { name: "About", href: "/about", icon: <BiUser className="nav-icon"/> },
        { name: "Cart", href: "/cart", icon: <BiUser className="nav-icon"/> },
        { name: "Sign Up", href: "/signup", icon: <BiUser className="nav-icon"/> },
    ],
    mainLinks: [
        { name: "Home", href: "/home", icon: <BiHome className="main-nav-icon" /> },
        { name: "Store", href: "/home/dashboard/store/products", icon: <BiStore className="main-nav-icon"/> },
        { name: "Orders", href: "/home/dashboard/orders/placed-orders", icon: <IoMdTimer className="main-nav-icon"/> },
        { name: "Cart", href: "/home/cart", icon: <BiCartAlt className="main-nav-icon"/> },
    ],

    indexSideNavLinks: [
        { 
            name: "Home", 
            href: "/home", 
            icon: <BiHome className="index-side-nav-icon" /> 
        },
        { 
            name: "Metrics", 
            href: "/home/dashboard", 
            icon: <GoDashboard  className="index-side-nav-icon"/> 
        },
        {
            accordion: true,
            name:"Store", 
            icon: <BiStore className="index-side-nav-icon"/>,
            links: [
                {href:"/home/dashboard/store/products", name:"Products", icon:""},
                {href:"/home/dashboard/store/sell-product", name:"Sell product", icon:""},
                {href:"/home/dashboard/store/edit-product", name:"Edit product", icon:""},
                {href:"/home/dashboard/store/settings", name:"Store settings", icon:""},
            ]
        },
        {
            accordion: true,
            name:"Orders", 
            icon: <IoMdTimer className="index-side-nav-icon"/>,
            links: [
                {href:"/home/dashboard/orders/placed-orders", name:"Placed orders", icon:""},
                {href:"/home/dashboard/orders/deliveries", name:"Deliveries", icon:""},
            ]
        },
        // {
        //     accordion: true,
        //     name:"Wallet", 
        //     icon: <BiWallet className="index-side-nav-icon"/>,
        //     links: [
        //         { name:"Payments", href:"/home/dashboard/wallet/payments", icon: <BiCoinStack className="index-side-nav-icon"/>},
        //     ]
        // },
        { 
            name:"Payments", 
            href:"/home/dashboard/payments", 
            icon: <BiCoinStack className="index-side-nav-icon"/>
        },
        { 
            name: "Messages", 
            href: "/home/messages", 
            icon: <BiMessageDetail className="index-side-nav-icon"/>
        },
        { 
            name: "Cart", 
            href: "/home/cart", 
            icon: <BiCartAlt className="index-side-nav-icon"/>
        },
    ],

    indexSideNavFooterLinks : [
        { name: "Support", href: "/support", icon: <BiHelpCircle className="index-side-nav-icon" /> },
        { name: "Settings", href: "/home/settings", icon: <BiCog className="index-side-nav-icon"/> },
        { name: "Logout", href: "/home/logout", icon: <BiLogOut className="index-side-nav-icon"/> }
    ],

    dashboardSideNavLinks : [
        { 
            name: "Dashboard", 
            href: "/home/dashboard", 
            icon: <BiHome className="index-side-nav-icon" /> 
        },
        {
            accordion: true,
            name: "Store",
            icon: <BiUser className="index-side-nav-icon"/>, 
            links: [
                {href:"/home/dashboard/store/products", name:"Products", icon:""},
                {href:"/home/dashboard/store/edit-product", name:"Edit product", icon:""},
                {href:"/home/dashboard/store/upload-product", name:"Upload Product", icon:""},
                {href:"/home/dashboard/store/settings", name:"Settings", icon:""},
            ]
        },
        {
            accordion: true,
            name: "Orders",
            icon: <BiUser className="index-side-nav-icon"/>, 
            links: [
                {href:"/home/dashboard/orders/pre-orders", name:"Pre orders", icon:""},
                {href:"/home/dashboard/orders/deliveries", name:"Deliveries", icon:""},
                {href:"/home/dashboard/orders/delivered-products", name:"Delivered Products", icon:""},
            ]
        },
        {
            accordion: true,
            name: "Payments",
            icon: <BiUser className="index-side-nav-icon"/>, 
            links: [
                {href:"/home/dashboard/payments/made-payments", name:"Made payments", icon:""},
                {href:"/home/dashboard/payments/recieved-payments", name:"Recieved payments", icon:""},      
            ]
        },

    ],

    settingsSideNavLinks : [
        { name: "Settings", href: "/home/settings", icon: <BiHome className="index-side-nav-icon" /> },
        { name: "Connections", href: "/account", icon: <BiUser className="index-side-nav-icon"/> },
        { name: "Community", href: "/community", icon: <RiBookOpenLine className="index-side-nav-icon"/> },
        { name: "Activity", href: "/support", icon: <BiFolder className="index-side-nav-icon"/> },
        { name: "Blog", href: "/support", icon: <BiFolder className="index-side-nav-icon"/> },
        { name: "Service", href: "/support", icon: <RiContactsBookLine className="index-side-nav-icon"/>},
    ],

    settingsSideNavFooterLinks : [
        { name: "Support", href: "/support", icon: <BiHome className="index-side-nav-icon" /> },
        { name: "Settings", href: "/home/settings", icon: <BiUser className="index-side-nav-icon"/> },
        { name: "Logout", href: "/home/logout", icon: <RiBookOpenLine className="index-side-nav-icon"/> }
    ],

    gettingStartedSideNavLinks : [
        { name: "Getting Started", href: "/getting-started", icon: <MdLaunch className="index-side-nav-icon" /> },
        { name: "Company/Business", href: "/getting-started/application/company-or-business", icon: <BiBuildings className="index-side-nav-icon"/> },
        { name: "Legal Address", href: "/getting-started/application/legal-address", icon: <RiMapPinAddLine className="index-side-nav-icon"/> },
        { name: "Operations", href: "/getting-started/application/shipping-and-operations", icon: <FiTruck className="index-side-nav-icon"/> },
        { name: "Profile Image", href: "/getting-started/application/profile-image", icon: <CgProfile className="index-side-nav-icon"/> },
        { name: "Confirmation", href: "/getting-started/application/confirmation", icon: <RiListSettingsLine className="index-side-nav-icon"/> },
    ],

    footerMainLinks: [],

    footerSocialLinks:[
        // { name:"Li",title:"Linkedin", href:"linkedin.com/jeffrey123", icon:<FaLinkedinIn className="landing-footer-social-nav-icon"/> },
        { name:"In",title:"Instagram", href:"instagram.com/Freefall", icon:<FaInstagramSquare className="landing-footer-social-nav-icon"/> },
        { name:"Fa",title:"Facebook", href:"facebook.com/Freefall", icon:<FaFacebookSquare className="landing-footer-social-nav-icon"/> },
        { name:"Tw",title:"Twitter", href:"twitter.com/Freefall", icon:<FaTwitter className="landing-footer-social-nav-icon"/> }
    ],

    clothingLinks: [
        { name: "All", href: "/", icon: <BiHome className="index-filter-icon"/> },
        { name: "Gowns", href: "/community", icon: <RiBookOpenLine className="index-filter-icon"/> },
        { name: "Tops", href: "/about", icon: <BiUser className="index-filter-icon"/> },
        { name: "Skirts", href: "/community", icon: <RiBookOpenLine className="index-filter-icon"/> },
        { name: "Trousers", href: "/community", icon: <RiBookOpenLine className="index-filter-icon"/> },
        { name: "Shoes", href: "/community", icon: <RiBookOpenLine className="index-filter-icon"/> },
        { name: "Accessories", href: "/support", icon: <BiFolder className="index-filter-icon"/> },
    ],

    productsUsage: [
        { name: "Default", type: "usage", href: "/", icon: <RiCompassFill className="index-filter-icon"/> },
        { name: "New", type: "usage", href: "/community", icon: <RiFireFill className="index-filter-icon"/> },
        { name: "Used", type: "usage", href: "/about", icon: <RiDrizzleFill className="index-filter-icon"/> },
        { name: "Vintage", type: "usage", href: "/community", icon: <RiArchiveFill className="index-filter-icon"/> },
        { name: "Junk", type: "usage", href: "/community", icon: <RiHistoryFill className="index-filter-icon"/> },
    ],

        productsCategory: [
        { name: "Default", type: "category", href: "/", icon: <RiCompassFill className="index-filter-icon"/> },
        { name: "Electronics", type: "category", href: "/community", icon: <RiTvFill className="index-filter-icon"/> },
        { name: "Books", type: "category", href: "/community", icon: <RiBookFill className="index-filter-icon"/> },
        { name: "Furniture", type: "category", href: "/about", icon: <RiTableFill className="index-filter-icon"/> },
        { name: "Kitchen", type: "category", href: "/community", icon: <FaUtensils className="index-filter-icon"/> },
        { name: "Others", type: "category", href: "/community", icon: <RiGlobalFill className="index-filter-icon"/> },
    ],

    clothingTabs: [
        { 
            id: "1",
            name: "Female", 
            links: [
                { name: "Default", type: "clothing", href: "/", icon: <RiCompassFill className="index-filter-icon" /> },
                { name: "Tops", type: "clothing", href: "/about", icon: <RiShirtFill className="index-filter-icon"/> },
                { name: "Trousers", type: "clothing", href: "/about", icon: <RiPantoneFill className="index-filter-icon"/> },
                { name: "Bags", type: "clothing", href: "/community", icon: <RiHandbagFill className="index-filter-icon"/> },
                { name: "Shoes", type: "clothing", href: "/about", icon: <FaShoePrints className="index-filter-icon"/> },
                { name: "Heels", type: "clothing", href: "/about", icon: <FaShoePrints className="index-filter-icon"/> },
                { name: "Gowns", type: "clothing", href: "/about", icon: <RiShirtFill className="index-filter-icon"/> },
                // { name: "Inners", type: "clothing", href: "/about", icon: <BiUser className="index-filter-icon"/> },
                // { name: "Jewelries", type: "clothing", href: "/about", icon: <BiUser className="index-filter-icon"/> },
                { name: "Others", type: "clothing", href: "/about", icon: <RiGlobalFill className="index-filter-icon"/> }
            ],
            icon: <RiWomenFill className="index-filter-icon"/> 
        },
        { 
            id: "2",
            name: "Male", 
            links: [
                { name: "Default", type: "clothing", href: "/", icon: <RiCompassFill className="index-filter-icon" /> },
                { name: "Shirts", type: "clothing", href: "/community", icon: <RiShirtFill className="index-filter-icon"/> },
                { name: "Pants", type: "clothing", href: "/about", icon: <RiPantoneFill className="index-filter-icon"/> },
                // { name: "Shorts", type: "clothing", href: "/community", icon: <Short className="index-filter-icon"/> },
                { name: "Shoes", type: "clothing", href: "/about", icon: <FaShoePrints className="index-filter-icon"/> },
                // { name: "Jewelries", type: "clothing", href: "/about", icon: <Ri className="index-filter-icon"/> },
                { name: "Others", type: "clothing", href: "/about", icon: <RiGlobalFill className="index-filter-icon"/> }
            ],
            icon: <RiMenFill className="index-filter-icon"/> 
        },
    ],

    maleClothingLinks: [
        { name: "All", href: "/", icon: <BiHome className="index-filter-icon" /> },
        { name: "Tops", href: "/community", icon: <RiBookOpenLine className="index-filter-icon"/> },
        { name: "Trousers", href: "/about", icon: <BiUser className="index-filter-icon"/> },
        { name: "Shoes", href: "/community", icon: <RiBookOpenLine className="index-filter-icon"/> },
        { name: "Accessories", href: "/support", icon: <BiFolder className="index-filter-icon"/> },
    ]
}

 function Links() { }

 Links.prototype = {
    data: LinksData,
    getLandingMainLinks() {
        return this.data.landingMainLinks;
    },
    getMainLinks() {
        return this.data.mainLinks;
    },
    getIndexSidenavLinks() {
        return this.data.indexSideNavLinks;
    },
    getIndexSideNavFooterLinks() {
        return this.data.indexSideNavFooterLinks;
    },
    getDashboardSideNavLinks() {
        return this.data.dashboardSideNavLinks;
    },
    getSettingsSideNavLinks() {
        return this.data.settingsSideNavLinks;
    },
    getSettingsSideNavFooterLinks() {
        return this.data.settingsSideNavFooterLinks;
    },
    getGettingStartedSideNavLinks() {
        return this.data.gettingStartedSideNavLinks;
    },
    getFooterMainLinks() {
        return this.data.footerMainLinks;
    },
    getFooterSocialLinks () {
        return this.data.footerSocialLinks;
    },
    getClothingLinks() {
        return this.data.clothingLinks;
    },
    getMaleClothingLinks() {
        return this.data.maleClothingLinks;
    },
    getClothingTabs () {
        return this.data.clothingTabs;
    },
    getProductsUsage() {
        return this.data.productsUsage;
    },
    getProductsCategory() {
        return this.data.productsCategory;
    },
    getLandingMobileMainLinks() {
        return this.data.landingMobileMainLinks;
    }
}

export default new Links();