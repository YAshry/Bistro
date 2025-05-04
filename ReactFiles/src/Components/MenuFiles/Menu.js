// React
import React, { Fragment, useEffect, useState } from 'react'
import {NavLink, useParams} from 'react-router-dom'

// Axios
import axios from "axios"

// Redux
import { useSelector, useDispatch} from 'react-redux'
import { navigationSlice } from '../ReduxFiles/navigationSlice'

// i18Next
import { useTranslation } from 'react-i18next'

// Components
import PageTitle from '../PageTitleFiles/PageTitle'
import PageDescription from '../PageDescriptionFiles/PageDescription'

//Styles
import "../StyleSheets/mainStyles.css"
import menuStyles from "./menu.module.css"

const Menu = () =>{

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

    const imageURL = "http://localhost:4000/"
    const {t} = useTranslation();
    const[currentCategory, setCurrentCategory] = useState("all");
    
    var categories = []
    {menuItems?.map((item)=>{
        !categories.includes(item.category) && categories.push(item.category)
    })}
    
    const applications = [
        {
            image:imageURL+"uber.png"
        },
        {
            image:imageURL+"grubhub.png"
        },
        {
            image:imageURL+"postmates.png"
        },
        {
            image:imageURL+"doordash.png"
        },
        {
            image:imageURL+"foodpanda.png"
        },
        {
            image:imageURL+"deliveroo.png"
        },
        {
            image:imageURL+"instacart.png"
        },
        {
            image:imageURL+"justeat.png"
        },
        {
            image:imageURL+"didi.png"
        }
    ]

    var params = useParams();
    params.categories = "all"
    const dispatch = useDispatch()
    var reduxCategory = useSelector((state)=>state?.navigation?.category)

    return(
        <Fragment>
            
            {/* Section 1 */}
            <div className={`${menuStyles.sectionOneContainer}`}>
            
                {/* Page title and description */}
                <PageTitle title={t('ourmenu')}/>
                <PageDescription 
                    styles={{marginTop:"20px", fontSize:"15px"}} 
                    description={t('weconsiderallthedriversofchangegivesyouthecomponentsyouneedtochangetocreateatrulyhappens')}
                />

                {/* Menu */}
                <div className={`${menuStyles.menuContainer}`}>

                    {/* Menu Categories */}
                    <div className={`${menuStyles.menuCategories}`}>
                        <NavLink
                            to={"/menu/"+params.categories}
                            onClick={()=>{
                                dispatch(navigationSlice.actions.setCategory(""));
                                setCurrentCategory("all");
                            }}
                            className={`${menuStyles.categoryTitle}` + " menuNav "}
                        >
                            {"all"}
                        </NavLink>
                        
                        {categories.map((data, index)=>{
                            params.categories = data
                            return(
                                <NavLink
                                    key={index}
                                    to={"/menu/" + params.categories}
                                    onClick={()=>{
                                        dispatch(navigationSlice.actions.setCategory(""));
                                        setCurrentCategory(data);
                                    }}
                                    style={{textTransform:"capitalize"}}
                                    className={`${menuStyles.categoryTitle}` + " menuNav "}
                                >
                                    {data}
                                </NavLink>
                            )
                        })}
                    </div>

                    {/* Menu Categories */}
                    <div className={`${menuStyles.menuCategoryItemsContainter}`}>

                        {menuItems?.map((data, index)=>{
                            return(
                                reduxCategory != "" ?
                                
                                    (data.category == reduxCategory || data.defaultCategory == reduxCategory) &&
                                        <Fragment key={index}>
                                            
                                            {/* Content */}
                                            <div className={`${menuStyles.menuCategoryItem}`}>
                                                
                                                {/* Image */}
                                                <div className={`${menuStyles.menuCategoryItemImage}`}>
                                                    <img src={imageURL+data.image}/>
                                                </div>

                                                {/* Content */}
                                                <div className={`${menuStyles.menuCategoryItemContent}`}>
                                                    
                                                    {/* Price */}
                                                    <div className={`${menuStyles.menuCategoryItemPrice}`}>
                                                        $ {data.price}
                                                    </div>

                                                    {/* Name */}
                                                    <div className={`${menuStyles.menuCategoryItemName}`}>
                                                        {data.name}
                                                    </div>

                                                    {/* Ingredients */}
                                                    <div className={`${menuStyles.menuCategoryItemIngrdients}`}>
                                                        {data.description}
                                                    </div>

                                                </div>

                                            </div>

                                        </Fragment>
                                    :

                                    (data.category == currentCategory || data.defaultCategory == currentCategory) &&
                                        <Fragment key={index}>
                                        
                                            {/* Content */}
                                            <div className={`${menuStyles.menuCategoryItem}`}>
                                                
                                                {/* Image */}
                                                <div className={`${menuStyles.menuCategoryItemImage}`}>
                                                    <img src={imageURL+data.image}/>
                                                </div>

                                                {/* Content */}
                                                <div className={`${menuStyles.menuCategoryItemContent}`}>
                                                    
                                                    {/* Price */}
                                                    <div className={`${menuStyles.menuCategoryItemPrice}`}>
                                                        $ {data.price}
                                                    </div>

                                                    {/* Name */}
                                                    <div className={`${menuStyles.menuCategoryItemName}`}>
                                                        {data.name}
                                                    </div>

                                                    {/* Ingredients */}
                                                    <div className={`${menuStyles.menuCategoryItemIngrdients}`}>
                                                        {data.description}
                                                    </div>

                                                </div>

                                            </div>

                                        </Fragment>
                                
                            )    
                        })}


                    </div>

                </div>

            </div>

            {/* Section 2 */}
            <div className={`${menuStyles.sectionTwoContainer}`}>

                {/* Section Content */}
                <div className={`${menuStyles.sectionTwoContent}`}>
                    {/* Title */}
                    <div className={`${menuStyles.sectionTwoTitle}`}>
                        {t("youcanorderthroughapps")}
                    </div>

                    {/* Description */}
                    <div className={`${menuStyles.sectionTwoDescription}` + " mt-3 "}>
                        {t("loremipsumdolorsitametconsecteturadipiscingelitenimbibendumsedetaliquetaliquetrisustemporsemper")}
                    </div>
                </div>

                {/* Applications */}
                <div className={`${menuStyles.sectionTwoApps}`}>
                    
                    {applications.map((data,index)=>{
                        if(index < 3 || index > 5 )
                        {
                            return(
                                <div key={index} className={`${menuStyles.sectionTwoApplication}`}>
                                    <img src={data.image}/>
                                </div>
                            )
                        }
                        else {
                            return(
                                <div key={index} className={`${menuStyles.sectionTwoApplicationBig}`}>
                                    <img src={data.image}/>
                                </div>
                            )
                        }
                    })}

                </div>

            </div>

        </Fragment>
    )
}

export default Menu