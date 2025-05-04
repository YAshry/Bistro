// React
import React, {Fragment, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

//Components
import Mailto from '../MailTo'

// i18Next
import { useTranslation } from 'react-i18next'

// Style Sheets
import '../StyleSheets/mainStyles.css'
import '../StyleSheets/bootstrapstyles.css'
import headerStyles from './header.module.css'

// Icons
import {FiPhone} from 'react-icons/fi'
import {CgMenuBoxed} from 'react-icons/cg'
import {BiLogoFacebook} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import {MdOutlineEmail} from 'react-icons/md'
import {TiSocialInstagram} from 'react-icons/ti'
import {IoIosRestaurant} from "react-icons/io";
import {FaTwitter, FaGithub} from 'react-icons/fa'

const Header = () => {

    const imageURL = "http://localhost:4000/"
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [profileDropDown,setProfileDropDown] = useState(false)
    const [navigationMenu,setNavigationMenu] = useState(false)

    if(JSON.stringify(window.localStorage.getItem("userFoundLocal")) != "{}")
        var userFoundLocal = JSON.parse(window.localStorage.getItem("userFoundLocal"))

    const socialIcons = [
        {
            link:"https://twitter.com/BistrooIO",
            icon:FaTwitter,
        },
        {
            link:"https://web.facebook.com/Bistro.Egypt/?_rdc=1&_rdr",
            icon:BiLogoFacebook,
        },
        {
            link:"https://www.instagram.com/bistro.egypt/?hl=en",
            icon:TiSocialInstagram,
        },
        {
            link:"https://github.com/facebookarchive/bistro",
            icon:FaGithub,
        },
    ]
    const navigationLinks = [
        {
            component:'home',
            title:'home',
        },
        {
            component:'about',
            title:'aboutUs',
        },
        {
            component:'menu/All',
            title:'menu',
        },
        {
            component:'contact',
            title:'contactUs',
        },
    ]
    const responsiveNavigation = [
        {
            component:'home',
            title:"home",
        },
        {
            component:'about',
            title:'aboutUs',
        },
        {
            component:'menu/All',
            title:'menu',
        },
        {
            component:'contact',
            title:'contactUs',
        },
        {
            component: "login",
            title: userFoundLocal == null ?  null : "logout",
        }
    ]
    
    return(
        <Fragment>
            
            {/* Header */}
            <div className={' col-lg-12 col-md-12 col-sm-12 p-0 '}>

                {/* Upper Header */}
                <div className={`${headerStyles.upperHeaderContainer}`}>
                    
                    {/* Upper Left Section */}
                    <div className={`${headerStyles.innerSectionContainer} ${headerStyles.contactInfoXXSmallScreen}`}>

                        {/* Phone Section */}
                        <div className={`${headerStyles.headerDataWithIcons}`}>
                            <FiPhone/>
                            {`(20) 106-668-207`}
                        </div>

                        {/* Email Section */}
                        <Mailto 
                            label="yaelashry98@gmail.com"
                            icon={<MdOutlineEmail/>}
                            mailto="mailto:yaelashry98@gmail.com"
                            className={`${headerStyles.headerMailTo} ${headerStyles.headerDataWithIcons}`}
                        />

                    </div>

                    {/* Upper Right Section */}
                    <div className={`${headerStyles.innerSectionContainer}`}>

                        {/* Social Media Icons */}
                        {socialIcons.map((data,index)=>{
                            return(
                                <Link key={index} to={data.link} target={"_blank"} className={`${headerStyles.headerDataWithIcons}`}>
                                    <data.icon className={`${headerStyles.iconWithBorder}`}/>
                                </Link> 
                            )
                        })}

                    </div>
                    
                </div>

                {/* Lower Header */}
                <div className={`${headerStyles.lowerHeaderContainer}`}>

                    {/* Lower Left Section */}
                    <div className={`${headerStyles.innerSectionContainer}`}>
                    
                        {/* Logo */}
                        <div className={`${headerStyles.headerlogoContainer}`}>
                            <img src={imageURL+"headerLogo.png"}/>
                        </div>

                    </div>

                    {/* Lower Middle Section */}
                    <div className={`${headerStyles.innerSectionContainer}`}>
                    
                        {/* Navigation Links */}
                        <div className={`${headerStyles.navigationContainer}`}>
                            {navigationLinks.map((data,index)=>{
                                    return(
                                        <NavLink key={index} to={data.component} className={`${headerStyles.headerNavItem}` + " navItem "}>
                                            {t(data.title)}
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                    
                    </div>
                    
                    {/* Lower Right Section */}
                    <div className={`${headerStyles.innerSectionContainer}`}>

                        {/* Booking Button */}
                        <NavLink 
                            to={"booking"} 
                            className={({isActive})=>
                                isActive?
                                ' d-sm-none navItemButton navItemButtonActive '
                                :
                                ' d-sm-none navItemButton '
                            }
                            onClick={()=>{
                                navigate("/booking")
                            }}
                        >
                            {t("bookatable")}
                        </NavLink>

                        {/* Login Button */}
                        {userFoundLocal !== null ?
                            
                            <Fragment>
                                {/* Logged In User */}
                                <div 
                                    className={`${headerStyles.loggedInProfileDropdown}`}
                                    onMouseEnter={()=>setProfileDropDown(true)}
                                >   

                                    {userFoundLocal?.userType == "user" ?

                                        <img src={imageURL+userFoundLocal.profileImg} onClick={()=>navigate("/profilePage/myreviews")}/>
                                        
                                        :
                                        
                                        userFoundLocal?.userType == "admin" &&
                                            <img src={imageURL+userFoundLocal.profileImg}/>
                                    }

                                    {profileDropDown ?
                                        <Fragment>
                                            <div 
                                                className={`${headerStyles.profileDropdownContainer}`}
                                                onMouseLeave={()=>setProfileDropDown(false)}
                                            >

                                                {userFoundLocal.userType == "user" ?

                                                    <Link to={"settings"} className={`${headerStyles.profileDropdownItem}` + " border-top-right-10 "}>
                                                        Settings
                                                    </Link>

                                                    :

                                                    userFoundLocal.userType == "admin" &&
                                                        <Link to={"adminDashBoard/general"} className={`${headerStyles.profileDropdownItem}`}>
                                                            Manage Panel
                                                        </Link>
                                                
                                                }

                                                <Link to={"login"} className={`${headerStyles.profileDropdownItem}` + " border-bottom-left-10 "}
                                                    onClick={()=>{
                                                        window.localStorage.removeItem("isLoggedIn")
                                                        window.localStorage.removeItem("userFoundLocal")
                                                    }}
                                                >
                                                    Logout
                                                </Link>
                                            </div>
                                        </Fragment>
                                        :
                                        <Fragment/>
                                    }

                                </div>
                            </Fragment>

                            :
                             
                            <Fragment>
                                {/* Normal User */}
                                <NavLink 
                                    to={"login"}
                                    className={({isActive})=>
                                        isActive?
                                        ' d-sm-none navItemButton navItemButtonActive '
                                        :
                                        ' d-sm-none navItemButton '
                                    } 
                                    onClick={()=>{
                                        navigate("/login")
                                    }}
                                >
                                    {t("login")}
                                </NavLink>
                            </Fragment>
                        }

                        {/* Navigation Responsive */}
                        <div className={`${headerStyles.navMenuResponsiveButton}` + ' button primaryButton '}
                            onClick={()=>{
                                setNavigationMenu(true)
                            }}
                        >
                            <CgMenuBoxed/>
                        </div>

                    </div>
                </div>

            </div>

            {/* Responsive Navigation List */}
            {navigationMenu?
                                
                // if navigation menu is opened return the following
                <div className={`${headerStyles.responsiveNavigationMenuContainer}`}>
                    <div 
                        className={`${headerStyles.responsiveNavigationMenuInnerContainer}`}
                        style={
                            userFoundLocal !== null ?
                            {paddingTop:"80px"}
                            :
                            {justifyContent:"center"}
                        }
                    >

                        {/* Close navigation menu button */}
                        <div className={headerStyles.closeRespNavigationButton} 
                            onClick={()=>setNavigationMenu(false)}
                        >
                            <AiOutlineClose/>
                        </div>

                        {/* Profile Picture */}
                        {userFoundLocal !== null ?
                            <div className={`${headerStyles.sideMenuProfileImageContainer}`}>
                                {/* Image */}
                                {userFoundLocal.userType == "user" ?
                                    <img src={imageURL+userFoundLocal.profileImg} onClick={()=>navigate("/profilePage/myreviews")}/>
                                    :
                                    userFoundLocal.userType == "admin" &&
                                        <img src={imageURL+userFoundLocal.profileImg}/>
                                }


                                {/* Profile Settings Button */}
                                <Link 
                                    to={userFoundLocal.userType == "admin" ? "adminDashBoard/general" : "settings"} 
                                    onClick={()=>setNavigationMenu(false)}
                                    className={`${headerStyles.sideMenuProfileSettingsButton}`}
                                >
                                        <IoIosRestaurant size={25}/>
                                </Link>
                            </div>   
                            :
                            <Fragment/>
                        }

                        {/* Navigation Items */}
                        {responsiveNavigation.map((data,index)=>{
                            return(
                                <NavLink
                                    key={index} 
                                    to={data.component} 
                                    onClick={()=>{
                                        if(data.component == "login"){
                                            window.localStorage.removeItem("isLoggedIn")
                                            window.localStorage.removeItem("userFoundLocal")
                                        }  
                                        setNavigationMenu(false)
                                    }}
                                    className={data.title == null ? "  " : `${headerStyles.headerNavItem}` + " navItem "} 
                                >
                                    {t(data.title)} 
                                </NavLink>
                            )
                        })}

                        <NavLink
                            to={"booking"} 
                            onClick={()=>setNavigationMenu(false)}
                            className={`${headerStyles.headerNavItem}` + " navItem d-md-none d-sm-flex "} 
                        >
                            {"Booking A Table"}
                        </NavLink>

                        <NavLink
                            to={"login"} 
                            onClick={()=>setNavigationMenu(false)}
                            className={`${headerStyles.headerNavItem}` + " navItem d-md-none d-sm-flex "} 
                        >
                            {"Login"}
                        </NavLink>

                    </div>
                    
                </div>
                
                :    
                
                // if navigation menu is closed return nothing
                <Fragment></Fragment>
            }

        </Fragment>
    )
}

export default Header;