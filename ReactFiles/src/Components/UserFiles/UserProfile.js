// React
import React, { Fragment, useEffect, useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'

// Axios
import axios from "axios"

// i18Next
import { useTranslation } from 'react-i18next'

// Styles
import "../StyleSheets/mainStyles.css"
import "../StyleSheets/modalstyles.css"
import profileStyles from "./userStyles.module.css"

// Icons
import {AiOutlineClose} from 'react-icons/ai'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";

// Modal
import Modal from 'react-modal';

const UserProfile = ()=>{

    const userFoundLocal = JSON.parse(window?.localStorage?.getItem("userFoundLocal"))

    useEffect(() => {
        const fetchComments = async () => {
            axios
            .get("http://localhost:4000/api/v1/comment")
            .then((resp)=>{
                resp.status == 200 && window.localStorage.setItem("allComments", JSON.stringify(resp?.data?.data?.comments?.filter(data => data.username === userFoundLocal.userName) || []))
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
        };
        const fetchBookings = async () => {
            axios
            .get("http://localhost:4000/api/v1/bookings")
            .then((resp)=>{
                resp.status == 200 && window.localStorage.setItem("allBookings", JSON.stringify(resp?.data?.data?.bookings?.filter(data => data.username === userFoundLocal.userName) || []))
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
        };

        fetchComments();
        fetchBookings();
    }, []);
    var allBookings = JSON.parse(window.localStorage.getItem("allBookings"))
    var allReviews = JSON.parse(window.localStorage.getItem("allComments"))

    const imageURL = "http://localhost:4000/"
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("")
    const [commentTitle, setCommentTitle] = useState("")
    const [comment, setComment] = useState("")
    const [error, setError] = useState("")

    const cats = [
        {   
            catTotal:allReviews.length,
            catTitle:"myreviews",
            category:"myreviews"
        },
        {
            catTotal:allBookings.length,
            catTitle:"mybookings",
            category:"mybookings"
        }
    ]
    const [currentCategory, setCurrentCategory] = useState(cats[0].category);

    const modalStyle = {
        overlay: {
            zIndex:"9999999",
            backgroundColor:"rgb(0,0,0,0.8)",
        },
        content: {
            top: '50%',
            left: '50%',
            width: '65%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            backgroundColor:"white",
            transform: 'translate(-50%, -50%)',
            boxShadow:"0px 0px 5px 0px #aaa",
        },
    };
    const newComment = {
        username: username,
        commentTitle: commentTitle,
        comment: comment,
    }

    const handleAddNewComment = () =>{
        setError("")

        if(username != "" && commentTitle != "" && comment != ""){
            if(username == userFoundLocal.userName){
                axios
                .post("http://localhost:4000/api/v1/comment",newComment)
                .then((resp)=>{
                    setShowModal(false)
                    navigate("/profilePage/myreviews")
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            else {
                setError(t("enteryourusername"))
            }
        }
        else{
            setError(t("checkenteringallfields"))
        }
    }
    const handleDeleteBooking = (id,username) => {
        if(username == userFoundLocal.userName){
            axios
            .delete(`http://localhost:4000/api/v1/bookings/${id}`)
            .then((resp)=>{
                resp.status == 201 && console.log("Deleted Successfully")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            console.log("username errorrr")
        }
    }

    return(
        userFoundLocal !== null ?
            
            <Fragment>

                {/* Profile Background Image */}
                <div className={`${profileStyles.profileBGImgContainer}`}>
                    
                    <div className={`${profileStyles.profileBGImgContainerImage}`}>
                        <img 
                            title={userFoundLocal.profileBackgroundImg} 
                            src={imageURL+userFoundLocal.profileBackgroundImg}
                            id={""}
                        />
                    </div>

                    <Link
                        className={`${profileStyles.profileBGImgButton} ${profileStyles.button2}` + " button centeredSecondaryButton "}
                        to={"/home"}
                    >
                        {i18n.language == "en" ?
                            <FaArrowLeftLong/>
                            :
                            <FaArrowRight/>   
                        }
                    </Link>

                    <Link
                        className={`${profileStyles.profileBGImgButton} ${profileStyles.button3}` + " button centeredSecondaryButton "}
                        to={"/settings"}
                    >
                        {t("gotosettings")}
                        {i18n.language == "en" ?
                            <FaArrowRight/>   
                            :
                            <FaArrowLeftLong/>
                        }
                    </Link>

                    {/* Profile Image */}
                    <div className={`${profileStyles.profileImgContainer}`}>
                        
                        <div className={`${profileStyles.profileImgContainerImage}`}>
                            <img
                                title={userFoundLocal.profileImg}
                                src={imageURL+userFoundLocal.profileImg}
                                id="image"
                            />
                        </div>
                        
                    </div>

                </div>

                {/* Name and Email */}
                <div className={`${profileStyles.textSection}`}>

                    <span className={`${profileStyles.name}`}>{userFoundLocal.firstName} {userFoundLocal.lastName}</span>
                    <span className={`${profileStyles.username}`}>@{userFoundLocal.userName}</span>
                    
                </div>

                {/* Section 3 */}
                <div className={`${profileStyles.sectionThreeContainer}`}>

                    {cats.map((data, index)=>{
                        return(
                            <div 
                                key={index}
                                className={`${profileStyles.sectionThreeCatContainer}`}
                            >
                                <span className={`${profileStyles.number}`}>{data.catTotal}</span>
                                <NavLink
                                    to={"/profilePage/" + data.category}
                                    className={`${profileStyles.catname}` + " profileNav "}
                                    onClick={()=>{
                                        setCurrentCategory(data.category)
                                    }}
                                >
                                    {t(data.catTitle)}
                                </NavLink>
                            </div>     
                        )
                    })}

                </div>

                {/* Section 4 */}
                <div className={`${profileStyles.sectionFourContainer}`}>
                    
                    {currentCategory == "myreviews" ?
                            
                        <div className={`${profileStyles.sectionFourInnerContainer}`}>
                            
                            {allReviews.map(( data, index)=>{
                                return(
                                    <div key={index} className={`${profileStyles.cardContainer}`}>
                            
                                        {/* Title */}
                                        <div className={`${profileStyles.cardTitleContainer}`}>
                                            {data.commentTitle}
                                        </div>
                                        
                                        <hr className={`${profileStyles.cardHRContainer}`}/>
                                        
                                        {/* Comment*/}
                                        <div className={`${profileStyles.cardCommentContainer}`}>
                                            {data.comment}
                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                        :currentCategory == "mybookings" &&

                        <div className={`${profileStyles.sectionFourInnerContainer}`}>
                            
                            {allBookings.map((data,index)=>{
                                return(
                                    <div key={index} className={`${profileStyles.cardContainer}`}>
                            
                                        {/* Booking Id and Status */}
                                        <div className={`${profileStyles.bookingInfo}`}>
                                            <span>
                                                {t("booking")}: # <span className={`${profileStyles.bookingID}`}>
                                                    {index+1}
                                                </span>
                                            </span>

                                            {/* Badges */}
                                            <div className={`${profileStyles.modifictaions}`}>
                                                {data.bookStatus == "pending" &&
                                                    <div className={`${profileStyles.badge} ${profileStyles.pendBadge}` + " button "}>
                                                        {t("pending")}
                                                    </div>
                                                }
                                                {data.bookStatus == "accepted" &&
                                                    <div className={`${profileStyles.badge} ${profileStyles.acceptBadge}` + " button "}>
                                                        {t("accepted")}
                                                    </div>    
                                                }
                                                {data.bookStatus == "rejected" &&
                                                    <div className={`${profileStyles.badge} ${profileStyles.rejectBadge}` + " button "}>
                                                        {t("rejected")}
                                                    </div>    
                                                }

                                                <div className={`${profileStyles.tableEditButton}` + " button centeredPrimaryButton "}
                                                    onClick={()=>{handleDeleteBooking(data._id,data.username)}}
                                                >
                                                    <MdOutlineDeleteForever/>
                                                </div>
                                            </div>

                                        </div>
                                        
                                        <hr className={`${profileStyles.cardHRContainer}`}/>
                                        
                                        {/* Name and Phone*/}
                                        <div className={`${profileStyles.bookerInfo}`}>
                                            
                                            <span className={`${profileStyles.bookerName}`}>
                                                <b>{t("name")}:</b> {data.name}
                                            </span>

                                            <span className={`${profileStyles.bookerPhone}`}>
                                                <b>{t("phone")}:</b> 0{data.phone}
                                            </span>

                                        </div>

                                        <hr className={`${profileStyles.cardHRContainer}`}/>
                                        
                                        {/* Date and Time*/}
                                        <div className={`${profileStyles.bookerInfo}`}>
                                            
                                            <span className={`${profileStyles.bookDate}`}>
                                                <b>{t("date")}:</b> {data.date}
                                            </span>

                                            <span className={`${profileStyles.bookTime}`}>
                                                <b>{t("time")}:</b> {data.time}
                                            </span>

                                            <span className={`${profileStyles.bookTotal}`}>
                                                <b>{t("totalperson")}:</b> {data.totalPerson}
                                            </span>

                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                    }

                </div>

                {currentCategory == "myreviews" ?

                    <Fragment>
                        {/* Add/Modal Button */}
                        <div className='d-flex align-items-center justify-content-center w-100 pb-3'>
                            <div className='button centeredSecondaryButton' onClick={()=>setShowModal(true)}>
                                {t("addnewreview")}
                            </div>
                        </div>
                    </Fragment>

                    :currentCategory == "mybookings" &&

                        <Fragment>
                            {/* Add/Modal Button */}
                            <div className='d-flex align-items-center justify-content-center w-100 pb-3'>
                                <div className='button centeredSecondaryButton' onClick={()=>navigate("/booking")}>
                                    {t("addnewbooking")}
                                </div>
                            </div>
                        </Fragment>

                }
                
                {/* Modal */}
                <Modal
                    isOpen={showModal}
                    style={modalStyle}
                    ariaHideApp={false}
                >
                    <div>
                        {/* Modal Header */}
                        <div className={" modalHeaderContainer "}>
                            
                            {/* Modal Title */}
                            <div className={" modalTitle "}>
                                {t("addnewreview")}
                            </div>

                            {/* Modal close button */}
                            <div className={" modalCloseButton button secondaryButton "}
                                onClick={()=>
                                    setShowModal(false)
                                }
                            >
                                <AiOutlineClose/>
                            </div>

                        </div>

                        {/* Separator */}
                        <div className={" cardHRContainer mt-2 mb-2 "}>
                            <hr/>
                        </div>

                        {/* Content */}
                        <div className={" modalContentContainer "}>
                            
                            <div className={"sectionInnerContent"}>

                                {/* Username */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('yourusername')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('enteryourusername')}
                                            onChange={(e)=>setUsername(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Comment Title */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('commenttitle')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('commenttitle')}
                                            onChange={(e)=>setCommentTitle(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Comment */}
                                <div className={" w-100 "}>
                                    <label>
                                        <span>{t('comment')}</span>
                                        <textarea 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('comment')}
                                            onChange={(e)=>setComment(e.target.value)}
                                        />
                                    </label>
                                </div>

                            </div>

                        </div>

                        {/* Errors */}
                        <p className="errorMessage" style={{marginBottom:"10px"}}>
                            {error}
                        </p>

                        {/* Add Button */}
                        <div className='modalAddButtonContainer'>
                            <div className='button centeredSecondaryButton' 
                                onClick={()=>{
                                    handleAddNewComment()
                                }}>
                                {t("add")}
                            </div>
                        </div>

                    </div>
                </Modal>

            </Fragment>

            :

            <Fragment>
                <div className='d-flex justify-content-center w-100 p-4'>
                    <div className={`${profileStyles.loginAgainContainer}`}>
                        {t("loginfirst")}
                        <div className={"button primaryButton"}
                            onClick={()=>navigate("/login")}
                        >
                            {t("loginfirst")}
                        </div>
                    </div>
                </div>
            </Fragment>

    )
}

export default UserProfile