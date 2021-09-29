
import {BiHome, BiUser, BiFolder, BiCart,BiCartAlt, BiLogOut,BiHelpCircle, BiTrash,BiDislike,BiLike,
     BiEdit, BiStore, BiStar,
    BiBell, BiCog, BiCoinStack, BiMap, BiSearch} from "react-icons/bi";
import {RiBookOpenLine, RiContactsBookLine, RiShoppingCartLine,
    RiUserSettingsFill,RiSettings4Fill,RiLogoutBoxFill, RiShoppingCart2Line, RiLogoutBoxLine, RiLogoutCircleLine} from "react-icons/ri";
import { FaTwitter,FaFacebookSquare,FaLinkedinIn,FaGithubSquare, FaRegStar, FaRegThumbsUp, 
    FaRegThumbsDown, FaRegMoneyBillAlt, FaRegHeart,FaHeart } from 'react-icons/fa';
import { FiHelpCircle, FiLogOut, FiBell, FiBellOff, FiSettings } from 'react-icons/fi';
import { GiHelp } from 'react-icons/gi';
import { MdHelpOutline, MdHelp } from 'react-icons/md';
import { GoKebabHorizontal, GoKebabVertical, GoDashboard } from 'react-icons/go';
import { AiOutlineDashboard, AiFillHome, AiOutlineStar, AiFillStar, AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {CgShoppingCart, CgLogOut, CgArrowLeft} from 'react-icons/cg';
import {GrMoney} from 'react-icons/gr';
import {BsWrench} from 'react-icons/bs';
import {IoMdTimer} from 'react-icons/io';








export function setUnicode(unicode) {
    let dummy;
    let decoded;
    if(!unicode){
        return decoded ="";
    }
    dummy = document.createElement('textarea');
    dummy.innerHTML = unicode;
    decoded = dummy.value;
    return decoded;
}
export const open = setUnicode('&#9776;')
export const close = setUnicode('&times;')
const LinksData = {
    landingMainLinks : [
        { name: "Home", href: "/", icon: <BiHome className="nav-icon" /> },
        { name: "About", href: "/about", icon: <BiUser className="nav-icon"/> },
        { name: "Community", href: "/community", icon: <RiBookOpenLine className="nav-icon"/> },
        { name: "Support", href: "/support", icon: <BiFolder className="nav-icon"/> },
        { name: "Contact", href: "/contact", icon: <BiCart className="nav-icon"/> }
    ],
    mainLinks : [
        { name: "Home", href: "/home", icon: <BiHome className="nav-icon" /> },
        { name: "Store", href: "/home/dashboard/store/products", icon: <BiStore className="nav-icon"/> },
        { name: "Orders", href: "/community", icon: <IoMdTimer className="nav-icon"/> },
        { name: "Cart", href: "/home/cart", icon: <BiCartAlt className="nav-icon"/> },
    ],
    indexSideNavLinks : [
        // {
        //     accordion: true,
        //     name:"Orders", 
        //     links: [
        //         {href:"/home/orders/recieved-orders", name:"Recieved orders", icon:""},
        //         {href:"/home/orders/placed-orders", name:"Placed orders", icon:""},
        //         {href:"/home/orders/confirm-delivery", name:"Confirm delivery", icon:""},
        //         {href:"/home/orders/delivered-products", name:"Delivered products", icon:""},
        //     ]
        // },
        { name: "Home", href: "/home", icon: <BiHome className="index-side-nav-icon" /> },
        { name: "Dashboard", href: "/Dashboard", icon: <GoDashboard  className="index-side-nav-icon"/> },
        { name: "Store", href: "/store", icon: <BiStore className="index-side-nav-icon"/> },
        { name: "Orders", href: "/home/dashboard/activity", icon: <IoMdTimer className="index-side-nav-icon"/> },
        { name: "Payments", href: "/support", icon: <BiCoinStack className="index-side-nav-icon"/> },
        { name: "Cart", href: "/home/cart", icon: <BiCartAlt className="index-side-nav-icon"/>},
    ],
    indexSideNavFooterLinks : [
        { name: "Support", href: "/support", icon: <BiHelpCircle className="index-side-nav-icon" /> },
        { name: "Settings", href: "/home/settings", icon: <BiCog className="index-side-nav-icon"/> },
        { name: "Logout", href: "/logout", icon: <BiLogOut className="index-side-nav-icon"/> }
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
        { name: "Logout", href: "/logout", icon: <RiBookOpenLine className="index-side-nav-icon"/> }
    ],
    gettingStartedSideNavLinks : [
        { name: "Getting Started", href: "/getting-started", icon: <BiHome className="index-side-nav-icon" /> },
        { name: "Contact details", href: "/getting-started/contact", icon: <BiUser className="index-side-nav-icon"/> },
        { name: "Location", href: "/getting-started/location", icon: <RiBookOpenLine className="index-side-nav-icon"/> },
        { name: "Profile Image", href: "/getting-started/profile-image", icon: <RiBookOpenLine className="index-side-nav-icon"/> },
    ],
    footerMainLinks: [],
    footerSocialLinks:[
        { name:"Li",title:"Linkedin", href:"linkedin.com/jeffrey123", icon:< FaLinkedinIn className="landing-footer-social-nav-icon"/> },
        { name:"Gi",title:"Github", href:"linkedin.com/jeffrey123", icon:< FaGithubSquare className="landing-footer-social-nav-icon"/> },
        { name:"Fa",title:"Facebook", href:"linkedin.com/jeffrey123", icon:< FaFacebookSquare className="landing-footer-social-nav-icon"/> },
        { name:"Tw",title:"Twitter", href:"linkedin.com/jeffrey123", icon:< FaTwitter className="landing-footer-social-nav-icon"/> }
    ],

}

 function Links() { }
Links.prototype.data = LinksData;

Links.prototype.getLandingMainLinks = function() {
    return this.data.landingMainLinks;
}
Links.prototype.getMainLinks = function() {
    return this.data.mainLinks;
}
Links.prototype.getIndexSidenavLinks = function() {
    return this.data.indexSideNavLinks;
}

Links.prototype.getIndexSideNavFooterLinks = function() {
    return this.data.indexSideNavFooterLinks;
}
Links.prototype.getSettingsSideNavLinks = function() {
    return this.data.settingsSideNavLinks;
}
Links.prototype.getSettingsSideNavFooterLinks = function() {
    return this.data.settingsSideNavFooterLinks;
}
Links.prototype.getGettingStartedSideNavLinks = function() {
    return this.data.gettingStartedSideNavLinks;
}
Links.prototype.getFooterMainLinks = function() {
    return this.data.footerMainLinks;
}
Links.prototype.getFooterSocialLinks = function() {
    return this.data.footerSocialLinks;
}

export default new Links();