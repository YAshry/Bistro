// React
import React, { Fragment, useEffect } from 'react'

// Axios
import axios from "axios"

// i18Next
import { useTranslation } from 'react-i18next'

// Components
import Mailto from '../MailTo'

// Styles
import aboutStyles from "./about.module.css"

// Icons
import { FiPhone } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

// Video
import ReactPlayer from 'react-player'

// Counter Up
import CountUp from 'react-countup'

const About = () =>{

    // Data Fetched
    useEffect(()=>{
        const getComments = () =>{
            axios
            .get("http://localhost:4000/api/v1/comment")
            .then((resp)=>{
                resp.status == 200 && window.localStorage.setItem("allComments", JSON.stringify(resp?.data?.data?.comments))
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
        }
        const getAccounts = () => {
            axios
            .get("http://localhost:4000/api/v1/accounts")
            .then((resp)=>{
                resp.status == 200 && window.localStorage.setItem("allUsersLocal", JSON.stringify(resp?.data?.data?.users))
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
        }

        getComments()
        getAccounts()
    },[])
    var allAccounts = JSON.parse(window.localStorage.getItem("allUsersLocal"))
    var allComments = JSON.parse(window.localStorage.getItem("allComments"))

    const imageURL = "http://localhost:4000/"
    const {t} = useTranslation();

    const sectionTwoCardArray = [
        {
            icon:imageURL+"cuisine.png",
            title:"multicuisine",
            description:"intheneweraoftechnologywelookinthefuturewithcertaintylife",
        },
        {
            icon:imageURL+"order.png",
            title:"easytoorder",
            description:"intheneweraoftechnologywelookinthefuturewithcertaintylife",
        },
        {
            icon:imageURL+"delivery.png",
            title:"fastdelivery",
            description:"intheneweraoftechnologywelookinthefuturewithcertaintylife",
        },
    ]
    const sectionThreeCardArray = [
        {
            number:3,
            text:"",
            title:"locations",
        },
        {
            number:1999,
            text:"",
            title:"founded",
        },
        {
            number:65,
            text:"+",
            title:"staffmembers",
        },
        {
            number:100,
            text:"%",
            title:"satisfiedCustomers",
        },
    ]

    return(
        <Fragment>
            
            {/* Section 1 */}
            <div className={`${aboutStyles.sectionOneContainer}`}>
                
                {/* Right Section */}
                <div className={`${aboutStyles.sectionOneRightContainer}`}>

                    <div className={`${aboutStyles.soRightOverlayContentContainer}`}>
                        
                        {/* Overlay Title */}
                        <div className={`${aboutStyles.sectionOneOverlayTitle}`}>
                            {t('comeandvisitus')}
                        </div>

                        {/* Overlay Contact Information */}
                        <div className={`${aboutStyles.sectionOneOverlayContactInformationContainer}`}>
                            <div className={`${aboutStyles.sectionOneOverlayContactInformationSubContainer}`}>
                                <div className={`${aboutStyles.contactIconContainer}`}>
                                    <FiPhone/>
                                </div>
                                <div className={`${aboutStyles.contactInformationContainer}`}>
                                    {"(414) 857 - 0107"}
                                </div>
                            </div>

                            <div className={`${aboutStyles.sectionOneOverlayContactInformationSubContainer}`}>
                                <div className={`${aboutStyles.contactIconContainer}`}>
                                    <HiOutlineMail/>
                                </div>
                                <Mailto 
                                    label="happytummy@restaurant.com" 
                                    mailto="mailto:happytummy@restaurant.com"
                                    className={`${aboutStyles.contactInformationContainer} ${aboutStyles.sectionOneMail}`}
                                />
                            </div>

                            <div className={`${aboutStyles.sectionOneOverlayContactInformationSubContainer}`}>
                                <div className={`${aboutStyles.contactIconContainer}`}>
                                    <HiOutlineLocationMarker/>
                                </div>
                                <div className={`${aboutStyles.contactInformationContainer}`}>
                                    837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <div className={`${aboutStyles.soRightImageContainer}`}>
                        <img src={imageURL+"aboutSection1RightImage.png"}/>
                    </div>
                
                </div>

                {/* Left Section */}
                <div className={`${aboutStyles.sectionOneLeftContainer}`}>
                    
                    {/* Title */}
                    <div className={`${aboutStyles.soLeftTitleContainer}`}>
                        {t('weprovidehealthyfoodforyourfamily')}
                    </div>

                    {/* Description 1 */}
                    <div className={`${aboutStyles.soLeftDescriptionOneContainer}`}>
                        {t('ourstorybeganwithavisiontocreateauniqediningexperiencethatmergesfinediningexceptionalserviceandavibrantambianceRootedincitysrichculinarycultureweaimtohonorourlocalrootswhileinfusingaglobalpalate')}
                    </div>

                    {/* Description 2 */}
                    <div className={`${aboutStyles.soLeftDescriptionTwoContainer}`}>
                        {t('AtplacewebelievethatdiningisnotjustaboutfoodbutalsoabouttheoverallexperienceOurstaffrenownedfortheirwarmthanddedicationstrivestomakeeveryvisitanunforgettableevent')}
                    </div>

                </div>
            
            </div>
            
            {/* Section 2 */}
            <div className={`${aboutStyles.sectionTwoContainer}`}>

                {/* Video */}
                <ReactPlayer 
                    url={t("bistroVideolink")}
                    pip={true}
                    width={"100%"}
                    height={
                        `@media screen and (max-width: 1440px)` ? 600
                        : `@media screen and (max-width: 1024px)` ? 400
                        : `@media screen and (max-width: 768px)` ? 400
                        : `@media screen and (max-width: 425px)` ? 250
                        : "600px"
                    }
                    controls={true} //show controls
                    light={
                        <img src={imageURL+"aboutVideoBackground.png"} alt={"Restaurant"} className={`${aboutStyles.sectionTwoVideoBGImage}`}/>
                    }
                    playIcon={
                        <Fragment>
                            <div className={`${aboutStyles.sectionTwoVideoContentContainer}`}>

                                {/* Icon */}
                                <div className={`${aboutStyles.sectionTwoVideoIconContainer}`}>
                                    <IoPlay/>
                                </div>

                                {/* Text */}
                                <div className={`${aboutStyles.sectionTwoVideoTextContainer}`}>
                                    {t("feeltheauthenticoriginaltastefromus")}
                                </div>

                            </div>
                        </Fragment>
                    }
                />

                {/* Cards */}
                <div className={`${aboutStyles.sectionTwoCardsContainer}`}>

                    {sectionTwoCardArray.map((data,index)=>{
                        return(
                            <div key={index} className={`${aboutStyles.sectionTwoCardContainer}`}>
                                {/* Icon */}
                                <div className={`${aboutStyles.sectionTwoCardIcon}`}>
                                    <img src={data.icon}/>
                                </div>

                                <div className={`${aboutStyles.sectionTwoCardContent}`}>    
                                    {/* Title */}
                                    <div className={`${aboutStyles.sectionTwoCardTitle}`}>
                                        {t(data.title)}
                                    </div>

                                    {/* Description */}
                                    <div className={`${aboutStyles.sectionTwoCardDescription}`}>
                                        {t(data.description)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>

            {/* Section 3 */}
            <div className={`${aboutStyles.sectionThreeContainer}`}>
                
                {/* Content */}
                <div className={`${aboutStyles.sectionThreeContentContainer}`}>

                    {/* Title */}
                    <div className={`${aboutStyles.sectionThreeTitle}`}>
                        {t("alittleinformationforourvaluableguest")}
                    </div>

                    {/* Description */}
                    <div className={`${aboutStyles.sectionThreeDescription}`}>
                        {t("AtplacewebelievethatdiningisnotjustaboutfoodbutalsoabouttheoverallexperienceOurstaffrenownedfortheirwarmthanddedicationstrivestomakeeveryvisitanunforgettableevent")}
                    </div>

                    {/* Card */}
                    <div className={`${aboutStyles.sectionThreeCards}`}>

                        {sectionThreeCardArray.map((data,index)=>{
                            return(
                                <Fragment key={index}>
                                    <div className={`${aboutStyles.sectionThreeCardContainer}`}>
                        
                                        {/* Counter */}
                                        <div className={`${aboutStyles.sectionThreeCardCounterContainer}`}>
                                            <CountUp 
                                                start={0} 
                                                delay={0}
                                                duration={8} 
                                                end={data.number}
                                                redraw={true}
                                                className={`${aboutStyles.sectionThreeCardCounterContainer}`} 
                                            />
                                        </div>
                                        
                                        <div className={`${aboutStyles.sectionThreeCardTitleContainer}`}>
                                            {t(data.title)}
                                        </div>
                                        
                                    </div>
                                </Fragment>
                            )
                        })}

                    </div>

                </div>

                {/* Image */}
                <div className={`${aboutStyles.sectionThreeImageContainer}`}>
                    <img src={imageURL+"aboutSection3Image.png"}/>
                </div>

            </div>

            {/* Section 4 */}
            <div className={`${aboutStyles.sectionFourContainer}`}>

                {/* Title */}
                <div className={`${aboutStyles.sectionFourTitle}`}>
                    {t("whatourcustomerssay")}
                </div>

                {/* Cards */}
                <div className={`${aboutStyles.sectionFourOverflowContainer}`}>

                    <div className={`${aboutStyles.sectionFourCardsContainer}`}>

                        {allComments?.map((comment,index)=>{
                                return(
                                    <Fragment key={index}>
                                        <div className={`${aboutStyles.sectionFourCard}`}>
        
                                            {/* Title */}
                                            <div className={`${aboutStyles.sectionFourCardTitle}`}>
                                                “{comment.commentTitle}”
                                            </div>
        
                                            {/* Description */}
                                            <div className={`${aboutStyles.sectionFourCardDescription}`}>
                                                {comment.comment}
                                            </div>
        
                                            {/* Horizontal Line */}
                                            <div className={`${aboutStyles.sectionFourCardHorizontal}`}>
                                                <hr/>
                                            </div>
        
                                            {/* Contact */}
                                            <div className={`${aboutStyles.sectionFourCardContactContainer}`}>
                                                
                                                {/* Image */}
                                                <div className={`${aboutStyles.sectionFourCardContactImage}`}>
                                                    {allAccounts.map((data, index)=>{
                                                        if(comment.username == data.userName){
                                                            return(
                                                                <img key={index} src={imageURL+data.profileImg}/>
                                                            )
                                                        }
                                                    })}
                                                </div>
        
                                                {/* Content */}
                                                <div className={`${aboutStyles.sectionFourCardContactContent}`}>
        
                                                    {/* Name */}
                                                    <div className={`${aboutStyles.sectionFourCardContactName}`}>
                                                        {allAccounts.map((data, index)=>{
                                                            if(comment.username == data.userName){
                                                                return(
                                                                    <Fragment key={index}>
                                                                        {data.firstName} {data.lastName}
                                                                    </Fragment>
                                                                )
                                                            }
                                                        })}
                                                    </div>
        
                                                    {/* UserName */}
                                                    <div className={`${aboutStyles.sectionFourCardContactAddress}`}>
                                                        {allAccounts.map((data, index)=>{
                                                            if(comment.username == data.userName){
                                                                return(
                                                                    <Fragment key={index}>
                                                                        @{data.userName}
                                                                    </Fragment>
                                                                )
                                                            }
                                                        })}
                                                    </div>
        
                                                </div>
        
                                            </div>
        
                                        </div>
                                    </Fragment>
                                )
                        })}

                    </div>

                </div>

            </div>
        
        </Fragment>
    )
}

export default About
