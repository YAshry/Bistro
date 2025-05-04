// React
import React, {Fragment, useState, useRef} from "react";

// i18Next
import { useTranslation } from 'react-i18next'

// Components
import PageTitle from '../PageTitleFiles/PageTitle'
import PageDescription from '../PageDescriptionFiles/PageDescription'

// Styles
import "../StyleSheets/mainStyles.css"
import contactStyles from "./contact.module.css"

// Email
import emailjs from "@emailjs/browser"

const Contact = () =>{

    const {t} = useTranslation();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const form = useRef();

    const handleSendButton = async () => {
        setError("")

        if(name != "" && email != "" && subject != "" && message != ""){
            
            emailjs
                .sendForm('service_03jsm8d', 'template_v8pv6u9', form.current, {
                publicKey: 'JelNKg1A0qj35ZeHx',
                })
                .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
                );
        }
        else{
            setError(t("checkenteringallfields"))
        }
    }

    return(
        <Fragment>

            {/* Page Container */}
            <div className={`${contactStyles.pageContainer}` + " mt-3 "}>

                {emailSent == false ?
                
                    <div className={`${contactStyles.absoluteSection}`}>
                        <form 
                            ref={form}
                            style={{
                                gap:"20px",
                                width:"100%", 
                                display:"flex",
                                flexDirection:"column"
                            }}
                        >
                            {/* Name and email */}
                            <div className={`${contactStyles.sectionInnerContent}`}>
                            
                                {/* Name */}
                                <div className={`${contactStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('name')}</span>
                                        <input 
                                            name="name"
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('enteryourname')}
                                            onChange={(e)=>setName(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Email */}
                                <div className={`${contactStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('email')}</span>
                                        <input 
                                            name="email"
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('enteremailaddress')}
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </label>
                                </div>
                            
                            </div>

                            {/* Subject */}
                            <div className={`${contactStyles.sectionAbsoluteInputContainer}`}>
                                <label>
                                    <span>{t('subject')}</span>
                                    <input 
                                        name="subject"
                                        className={" inputContainer "}
                                        type="text" 
                                        placeholder={t('writeasubject')}
                                        onChange={(e)=>setSubject(e.target.value)}
                                    />
                                </label>
                            </div>

                            {/* Message Area */}
                            <div className={`${contactStyles.sectionAbsoluteInputContainer}`}>
                                <label>
                                    <span>{t('message')}</span>
                                    <textarea 
                                        name="message"
                                        type="text"
                                        style={{height:"100px",borderRadius:"10px", resize:"none"}}
                                        className={" inputContainer "}
                                        placeholder={t('writeyourmessage')}
                                        onChange={(e)=>setMessage(e.target.value)}
                                    />
                                </label>
                            </div>
                        </form>

                        {/* Errors */}
                        <p className="errorMessage">
                            {error}
                        </p>

                        {/* Button */}
                        <div className={" button centeredSecondaryButton w-100 "}
                            onClick={()=>{handleSendButton();setEmailSent(true)}}
                        >
                            {t("send")}
                        </div>

                    </div>

                    :

                    <div className={`${contactStyles.absoluteSection}`}>
                        
                        <p>Your Message has been successfully sent!</p>

                        {/* Button */}
                        <div className={" button centeredSecondaryButton w-100 "}
                            onClick={()=>{setEmailSent(false)}}
                        >
                            Send Another Email
                        </div>

                    </div>
                }

                {/* Section One */}
                <div className={`${contactStyles.sectionOneContainer}`}>

                    {/* Page title and description */}
                    <PageTitle title={t('contactUs')}/>
                    <PageDescription 
                        styles={{marginTop:"20px", fontSize:"15px"}} 
                        description={t('weconsiderallthedriversofchangegivesyouthecomponentsyouneedtochangetocreateatrulyhappens')}
                    />

                </div>
                
                {/* Section Two */}
                <div className={`${contactStyles.sectionTwoContainer}`}>
                    
                    {/* Phone */}
                    <div className={`${contactStyles.sectionTwoSubContentContainer}`}>

                        <div className={`${contactStyles.sectionTwoTitle}`}>
                            {t("callus")}:
                        </div>

                        <div className={`${contactStyles.sectionTwoInformation} ${contactStyles.sectionTwoPhoneNumber}`}>
                            +1-234-567-8900
                        </div>

                    </div>

                    {/* Hours */}
                    <div className={`${contactStyles.sectionTwoSubContentContainer}`}>
                        
                        <div className={`${contactStyles.sectionTwoTitle}`}>
                            {t("hours")}:
                        </div>

                        <div className={`${contactStyles.sectionTwoInformation} ${contactStyles.sectionTwoSchedule}`}>
                            
                            <span>{t("monFri")}: 11am - 8pm</span>
                            <span>{t("satSun")}: 9am - 10pm</span>

                        </div>

                    </div>

                    {/* Location */}
                    <div className={`${contactStyles.sectionTwoSubContentContainer}`}>

                        <div className={`${contactStyles.sectionTwoTitle}`}>
                            {t("ourlocation")}:
                        </div>

                        <div className={`${contactStyles.sectionTwoInformation} ${contactStyles.sectionTwoLocation}`}>
                            
                            123 Bridge Street Nowhere Land, LA 12345 United States
                        
                        </div>
                    
                    </div>

                </div>

            </div>

        </Fragment>
    )
}

export default Contact