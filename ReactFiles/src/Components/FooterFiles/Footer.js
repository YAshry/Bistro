// React
import React, {Fragment, useEffect} from "react";
import {Link, NavLink, useParams} from "react-router-dom";

// Axios
import axios from "axios"

// Redux
import { useDispatch} from 'react-redux'
import { navigationSlice } from '../ReduxFiles/navigationSlice'

// i18Next
import { useTranslation } from 'react-i18next'

// Styles
import footerStyles from "./footer.module.css"

// Icons
import {FaTwitter, FaGithub} from 'react-icons/fa'
import {BiLogoFacebook} from 'react-icons/bi'
import {TiSocialInstagram} from 'react-icons/ti'

const Footer = () => {

    const imageURL = "http://localhost:4000/"
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const params = useParams();
    
    useEffect(()=>{
        const getMenuItems = () =>{
            axios
            .get("http://localhost:4000/api/v1/menu")
            .then((resp)=>{
                resp.status == 200 && window.localStorage.setItem("allMenuItems", JSON.stringify(resp?.data?.data?.menu))
            })
            .catch((err)=>{
                console.log(err)
            })
        } 

        getMenuItems()
    },[])
    var menuItems = JSON.parse(window.localStorage.getItem("allMenuItems"))

    const categories = []
    {menuItems?.map((item)=>{
        !categories.includes(item.category) && categories.push(item.category)
    })}
    const footerSocial = [
        {
            link: "https://twitter.com/BistrooIO",
            icon: FaTwitter,
        },
        {
            link: "https://web.facebook.com/Bistro.Egypt/?_rdc=1&_rdr",
            icon: BiLogoFacebook,
        },
        {
            link: "https://www.instagram.com/bistro.egypt/?hl=en",
            icon: TiSocialInstagram,
        },
        {
            link: "https://github.com/facebookarchive/bistro",
            icon: FaGithub,
        },
    ]
    const pagesArray = [
        {
            component: "home",
            name: "home",
        },
        {
            component: "about",
            name: "aboutUs",
        },
        {
            component: "menu/All",
            name: "menu",
        },
        {
            component: "contact",
            name: "contactUs",
        },
        {
            component: "booking",
            name: "bookatable",
        },
    ]
    const footerInstagramPosts = [
        {
            image: imageURL+"post1.png"
        },
        {
            image: imageURL+"post2.png"
        },
        {
            image: imageURL+"post3.png"
        },
        {
            image: imageURL+"post4.png"
        },
    ]

    return(
        <Fragment>

            {/* Footer */}
            <div className={`${footerStyles.footerContainer}` }>
                
                {/* General Information */}
                <div className={`${footerStyles.innerContainer}`}>

                    {/* Logo, Desription, Social Icons */}
                    <div className={`${footerStyles.innerSubContainer}`}>
                        
                        {/* Logo */}
                        <div className={`${footerStyles.footerLogo}` + " row m-0 w-100 mb-4 "}>
                            <img src={imageURL+"footerLogo.png"}/>
                        </div>

                        {/* Description */}
                        <div className={" row m-0 w-100 mb-4 justify-content-md-center "}>
                            <p style={{color:"#ADB29E"}}>
                                {t("intheneweraoftechnologywelookainthefuturewithcertaintyandpridetoforourcompany")}
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className={`${footerStyles.footerSocialIconsContainer}` + " row m-0 w-100 "}>

                            {/* Icons Map */}
                            {footerSocial.map((data, index)=>{
                                return(
                                    <Link key={index} to={data.link} target={"_blank"} className={{}}>
                                        <data.icon className={`${footerStyles.socialIcons}`}/>
                                    </Link>        
                                );
                            })}

                        </div>

                    </div>

                    {/* Pages */}
                    <div className={`${footerStyles.pagesInnerSubContainer}`}>

                        {/* Normal Pages */}
                        <div className={`${footerStyles.innerSubContainer}`}>
                            
                            {/* Title */}
                            <div className={`${footerStyles.footerTitle}` + " mb-4 "}>
                                Pages
                            </div>

                            {/* Pages */}
                            <div className={`${footerStyles.pageNameList}`}>
                                
                                {/* Incode Components */}
                                {pagesArray.map((data, index)=>{
                                    return(
                                        <NavLink to={data.component} key={index} className={`${footerStyles.footerComponent}` + " footerNav "}>
                                            {t(data.name)}
                                        </NavLink>
                                    )
                                })}
                            
                            </div>

                        </div>

                        {/* Fetched Pages */}
                        <div className={`${footerStyles.innerSubContainer}`}>

                            {/* Title */}
                            <div className={`${footerStyles.footerTitle}` + " mb-4 "}>
                                Utility Pages
                            </div>

                            {/* Pages */}
                            <div className={`${footerStyles.pageNameList}`}>

                                {/* Components from Backend */}
                                {categories.map((data, index)=>{
                                    params.categories = data
                                    return(
                                        <NavLink key={index} to={"/menu/"+params.categories} className={`${footerStyles.footerComponent}` + " footerNav "}
                                            onClick={()=>{
                                                dispatch(navigationSlice.actions.setCategory(data))
                                            }}
                                            style={{textTransform:"capitalize"}}
                                        >
                                            {data}
                                        </NavLink>
                                    )
                                })}

                                <NavLink to={"notFound"} className={`${footerStyles.footerComponent}` + " footerNav "}>
                                    {t("404notfound")}
                                </NavLink>

                            </div>

                        </div>

                    </div>

                    {/* Instagram Posts */}
                    <div className={`${footerStyles.innerSubContainer}`}>

                        {/* Title */}
                        <div className={`${footerStyles.footerTitle}` + " mb-4 "}>
                            Follow Us On Instagram
                        </div>

                        {/* Posts */}
                        <div className={`${footerStyles.instagramPostsContainer}`}>
                            
                            {footerInstagramPosts.map((data, index)=>{
                                return(
                                    <div key={index} className={`${footerStyles.instagramPostsInnerContainer}`}>
                                        <img src={data.image}/>
                                    </div>
                                )
                            })}

                        </div>

                    </div>
                    
                </div>

                {/* Copy Rights */}
                <div className={`${footerStyles.copyRightContainer}`}>
                    Copyright © 2023 Hashtag Developer. All Rights Reserved
                </div>

            </div>
        
        </Fragment>
    )
}

export default Footer;