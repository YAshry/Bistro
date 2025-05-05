// React
import React, {Fragment, useState} from "react";

// Axios
import axios from "axios"

// Redux
import {useSelector} from 'react-redux'

// i18Next
import { useTranslation } from 'react-i18next'

// Components
import PageTitle from '../PageTitleFiles/PageTitle'
import PageDescription from '../PageDescriptionFiles/PageDescription'

// Styles
import "../StyleSheets/mainStyles.css"
import bookStyles from "./book.module.css"

// React DropDown
import Dropdown from 'react-dropdown';

const Book = () =>{

    const userFoundLocal = JSON.parse(window.localStorage.getItem("userFoundLocal"))
    const imageURL = "http://localhost:4000/"
    const {t} = useTranslation();
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [totalPerson, setTotalPerson] = useState("")
    const [bookedSuccessfully, setBookedSuccessfully] = useState(false)
    const [error, setError] = useState("")

    const bookInfo = {
        date:date,
        time:time,
        name:name,
        phone:phone,
        username:username,
        totalPerson:totalPerson
    }

    const timeOptions = [
        {
            value:"05:00 pm",
            label:"05:00 " + t("pm")
        },
        {
            value:"06:30 pm",
            label:"06:30 " + t("pm")
        }
    ]
    const visitorsNumberOptions = [
        {
            value:1,
            label:1,
        },
        {
            value:2,
            label:2,
        },
        {
            value:3,
            label:3,
        },
        {
            value:4,
            label:4,
        },
        {
            value:5,
            label:5,
        },
        {
            value:6,
            label:6,
        },
        {
            value:7,
            label:7,
        },
        {
            value:8,
            label:8,
        },
        {
            value:9,
            label:9,
        },
        {
            value:10,
            label:10,
        },
    ]

    const handleBooking = () => {
        if(userFoundLocal?.userName == undefined){
            setError(t('pleaseloginfirst'))
        }
        else{
            setError("")

            if(username == userFoundLocal?.userName){
                if( date != "" && time != "" && name != "" && phone != "" && username != "" && totalPerson != ""){
                    axios
                    .post("http://localhost:4000/api/v1/bookings",bookInfo)
                    .then(()=>{
                        setBookedSuccessfully(true)
                    })
                    .catch((err)=>{
                        setBookedSuccessfully(false)
                        console.log(err.response.data.message)
                    })
                }
                else if(date == "" || time == "" || name == "" || phone == "" || username == "" || totalPerson == ""){
                    setError(t('checkenteringallfields'))
                }
                else{
                    setError(t('pleaseloginfirst'))
                }
            }
            else{
                setError(t('enteryourusername'))
            }
        }
    }

    return(
        <Fragment>

            {/* Page Container */}
            <div className={`${bookStyles.pageContainer}` + " mt-3 "}>

                {bookedSuccessfully? 
                    <Fragment>
                        <div className={`${bookStyles.absoluteSection}`}>
                            {t("successfullybooked")}

                            {/* Button */}
                            <div className={" button centeredSecondaryButton w-100 "}
                                onClick={()=>{
                                    setBookedSuccessfully(false)
                                }}
                            >
                                {t("makeanotherbooking")}
                            </div>

                        </div>
                    </Fragment>

                    :

                    <Fragment>
                        {/* Section Absolute */}
                        <div className={`${bookStyles.absoluteSection}`}>

                            {/* Date and time */}
                            <div className={`${bookStyles.sectionInnerContent}`}>

                                {/* Date */}
                                <div className={`${bookStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('date')}</span>
                                        <input
                                            type="date" 
                                            className={" inputContainer "}
                                            placeholder={t('date')}
                                            onChange={(e)=>setDate(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Time */}
                                <div className={`${bookStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('time')}</span>
                                        <Dropdown
                                            arrowClassName='text-white'
                                            options={timeOptions}
                                            placeholder={t("select")}
                                            onChange={(e)=>setTime(e.value)}
                                        />
                                    </label>
                                </div>

                            </div>

                            {/* Name and phone */}
                            <div className={`${bookStyles.sectionInnerContent}`}>

                                {/* Name */}
                                <div className={`${bookStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('bookername')}</span>
                                        <input 
                                            type="text" 
                                            className={" inputContainer "}
                                            placeholder={t('enterbookername')}
                                            onChange={(e)=>setName(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* phone */}
                                <div className={`${bookStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('bookerphone')}</span>
                                        <input
                                            type="number"
                                            className={" inputContainer "}
                                            placeholder={t('enterbookerphonestartingwith1')}
                                            onChange={(e)=>{
                                                if(e.target.value.charAt(0) <= 0){
                                                    setError(t("enterbookerphonestartingwith1"))
                                                }
                                                else if(e.target.value.charAt(0) > 0){
                                                    setError(t(""))
                                                    setPhone(e.target.value)
                                                }
                                            }}
                                        >   
                                        </input>
                                    </label>
                                </div>

                            </div>

                            {/* Username and Total Visitors */}
                            <div className={`${bookStyles.sectionInnerContent}`}>

                                {/* Username */}
                                <div className={`${bookStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('yourusername')}</span>
                                        <input
                                            type="text"
                                            className={" inputContainer "}
                                            placeholder={userFoundLocal.userName || t('loginfirst')}
                                            onChange={(e)=>setUsername(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* total */}
                                <div className={`${bookStyles.sectionAbsoluteHalfInputContainer}`}>
                                    <label>
                                        <span>{t('totalperson')}</span>
                                        <Dropdown
                                            arrowClassName='text-white'
                                            options={visitorsNumberOptions}
                                            placeholder={t("select")}
                                            onChange={(e)=>setTotalPerson(e.value)}
                                        />
                                    </label>
                                </div>

                            </div>

                            {/* Errors */}
                            <p className="errorMessage">
                                {error}
                            </p>

                            {/* Button */}
                            <div className={" button centeredSecondaryButton w-100 "}
                                onClick={()=>{handleBooking()}}
                            >
                                {t("bookatable")}
                            </div>

                        </div>
                    </Fragment>
                }

                {/* Section One */}
                <div className={`${bookStyles.sectionOneContainer}`}>

                    {/* Page title and description */}
                    <PageTitle title={t('bookatable')}/>
                    <PageDescription 
                        styles={{marginTop:"20px", fontSize:"15px"}} 
                        description={t('weconsiderallthedriversofchangegivesyouthecomponentsyouneedtochangetocreateatrulyhappens')}
                    />

                </div>
                
                {/* Section Two */}
                <div className={`${bookStyles.sectionTwoContainer}`}>
                    <img src={imageURL+"map.png"}/>
                </div>

            </div>

        </Fragment>
    )
}

export default Book
