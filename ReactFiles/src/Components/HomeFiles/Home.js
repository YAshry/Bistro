// React
import React, { Fragment } from 'react'
import {Link, useParams} from 'react-router-dom'

// Redux
import { useDispatch} from 'react-redux'
import { navigationSlice } from '../ReduxFiles/navigationSlice'

// i18Next
import { useTranslation } from 'react-i18next'

// Components
import Mailto from '../MailTo'
import PageTitle from '../PageTitleFiles/PageTitle'
import PageDescription from '../PageDescriptionFiles/PageDescription'

// Style Sheets
import '../StyleSheets/mainStyles.css'
import '../StyleSheets/bootstrapstyles.css'
import homeStyles from './home.module.css'
import pageTitleStyles from '../PageTitleFiles/pagetitle.module.css'

// Icons
import { GiMeal } from "react-icons/gi";
import { FiPhone } from "react-icons/fi";
import { LuCakeSlice } from "react-icons/lu";
import { PiTeaBagBold } from "react-icons/pi";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { RiDrinks2Line } from "react-icons/ri";

const Home = () =>{
    
    const imageURL = "http://localhost:4000/"
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const params = useParams();

    const sectionTwoCardContent = [
        {
            icon: PiTeaBagBold,
            title: "breakfast",
            description: "intheneweraoftechnologywelookinthefuturewithcertaintyandprideforourlife",
            buttonName:"exploremenu",
        },
        {
            icon: GiMeal,
            title: "maindishes",
            description: "intheneweraoftechnologywelookinthefuturewithcertaintyandprideforourlife",
            buttonName:"exploremenu",
        },
        {
            icon: RiDrinks2Line,
            title: "drinks",
            description: "intheneweraoftechnologywelookinthefuturewithcertaintyandprideforourlife",
            buttonName:"exploremenu",
        },
        {
            icon: LuCakeSlice,
            title: "desserts",
            description: "intheneweraoftechnologywelookinthefuturewithcertaintyandprideforourlife",
            buttonName:"exploremenu",
        },
    ]
    
    return(
        <Fragment>
            
            {/* Section 1 */}
            <div className={`${homeStyles.sectionOneContainer}`}>
                <div className={`${homeStyles.sectionOneOverlayContentContainer}`}>
                    
                    {/* Section One title and description */}
                    <PageTitle 
                        title={t('bestfoodforyourtaste')} 
                        className={`${pageTitleStyles.pageTitleAnimation} ${homeStyles.sectionOneTitle}`}
                    />
                    
                    <PageDescription
                        styles={{
                            color:"#2C2F24",
                            fontWeight:"500",
                            padding:"0px 15%", 
                        }}
                        description={t('Discoverdelectablecuisineandunforgettablemomentsinourwelcomingculinaryhaven')}
                    />

                    <div className={`${homeStyles.sectionOneButtonsContainer}`}>

                        {/* Booking button */}
                        <Link to={"/booking"} className={`${homeStyles.button}` + " button secondaryButton "}>
                            {t('bookatable')}
                        </Link>

                        {/* Menu button */}
                        <Link to={"/menu"} className={`${homeStyles.button}` + " button primaryButton fw-600 "}>
                            {t('exploremenu')}
                        </Link>

                    </div>

                </div>
                
                <div className={`${homeStyles.sectionOneImageContainer}`}>
                    <img src={imageURL+"homeSection1BG.png"}/>
                </div>

            </div>

            {/* Section 2 */}
            <div className={`${homeStyles.sectionTwoContainer}`}>
                
                {/* Section two title */}
                <div className={`${homeStyles.sectionTwoTitleContainer}`}>
                    {t('browseourmenu')}
                </div>
                
                {/* Section two cards */}
                <div className={`${homeStyles.sectionTwoCardsContainer}`}>
                    
                    {sectionTwoCardContent.map((data,index)=>{
                        params.categories = data.title
                        return(
                            <Fragment key={index}>
                                {/* card */}
                                <div className={`${homeStyles.sectionTwoCard}`}>
                                    
                                    {/* Card Icon */}
                                    <div className={`${homeStyles.sectionTwoIconContainer}`}>
                                        <data.icon/>
                                    </div>
                                    
                                    {/* Card Title */}
                                    <div className={`${homeStyles.sectionTwoCardTitleContainer}`}>
                                        {t(data.title)}
                                    </div>

                                    {/* Card Description */}
                                    <div className={`${homeStyles.sectionTwoCardDescriptionContainer}`}>
                                        {t(data.description)}
                                    </div>

                                    {/* Card Button */}
                                    <Link to={"/menu/"+params.categories} className={`${homeStyles.sectionTwoCardButtonContainer}`}
                                        onClick={()=>{
                                            dispatch(navigationSlice.actions.setCategory(data.title))
                                        }}
                                    >
                                        {t(data.buttonName)}
                                    </Link>

                                </div>
                            </Fragment>
                        )
                    })}

                </div>

            </div>

            {/* Section 3 */}
            <div className={`${homeStyles.sectionThreeContainer}`}>
                
                {/* Right Section */}
                <div className={`${homeStyles.sectionThreeRightContainer}`}>

                    <div className={`${homeStyles.stRightOverlayContentContainer}`}>
                        
                        {/* Overlay Title */}
                        <div className={`${homeStyles.sectionThreeOverlayTitle}`}>
                            {t('comeandvisitus')}
                        </div>

                        {/* Overlay Contact Information */}
                        <div className={`${homeStyles.sectionThreeOverlayContactInformationContainer}`}>
                            <div className={`${homeStyles.sectionThreeOverlayContactInformationSubContainer}`}>
                                <div className={`${homeStyles.contactIconContainer}`}>
                                    <FiPhone/>
                                </div>
                                <div className={`${homeStyles.contactInformationContainer}`}>
                                    {"(414) 857 - 0107"}
                                </div>
                            </div>

                            <div className={`${homeStyles.sectionThreeOverlayContactInformationSubContainer}`}>
                                <div className={`${homeStyles.contactIconContainer}`}>
                                    <HiOutlineMail/>
                                </div>
                                <Mailto 
                                    label="happytummy@restaurant.com" 
                                    mailto="mailto:happytummy@restaurant.com"
                                    className={`${homeStyles.contactInformationContainer} ${homeStyles.sectionThreeMail}`}
                                />
                            </div>

                            <div className={`${homeStyles.sectionThreeOverlayContactInformationSubContainer}`}>
                                <div className={`${homeStyles.contactIconContainer}`}>
                                    <HiOutlineLocationMarker/>
                                </div>
                                <div className={`${homeStyles.contactInformationContainer}`}>
                                    837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <div className={`${homeStyles.stRightImageContainer}`}>
                        <img src={imageURL+"homeSection3RightImage.png"}/>
                    </div>
                
                </div>

                {/* Left Section */}
                <div className={`${homeStyles.sectionThreeLeftContainer}`}>
                    
                    {/* Title */}
                    <div className={`${homeStyles.stLeftTitleContainer}`}>
                        {t('weprovidehealthyfoodforyourfamily')}
                    </div>

                    {/* Description 1 */}
                    <div className={`${homeStyles.stLeftDescriptionOneContainer}`}>
                        {t('ourstorybeganwithavisiontocreateauniqediningexperiencethatmergesfinediningexceptionalserviceandavibrantambianceRootedincitysrichculinarycultureweaimtohonorourlocalrootswhileinfusingaglobalpalate')}
                    </div>

                    {/* Description 2 */}
                    <div className={`${homeStyles.stLeftDescriptionTwoContainer}`}>
                        {t('AtplacewebelievethatdiningisnotjustaboutfoodbutalsoabouttheoverallexperienceOurstaffrenownedfortheirwarmthanddedicationstrivestomakeeveryvisitanunforgettableevent')}
                    </div>
                    
                    {/* Button */}
                    <Link to={"/about"} className={`${homeStyles.stLeftButtonContainer}` + " button primaryButton "}>
                        {t('MoreAboutUs')}
                    </Link>

                </div>
            
            </div>

        </Fragment>
    )
}

export default Home