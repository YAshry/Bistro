// React
import React, { Fragment, useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'

// Axios
import axios from "axios"

// Redux
import { useSelector, useDispatch} from 'react-redux'
import { userSlice } from '../ReduxFiles/userSlice'

// i18Next
import { useTranslation } from 'react-i18next'

// Styles
import "../StyleSheets/mainStyles.css"
import settingsStyles from "./userStyles.module.css"

// Icons
import { TbPhotoEdit } from "react-icons/tb";
import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";

const UserSettings = ()=>{

    var loggedIn = window.localStorage.getItem("isLoggedIn");
    const userFound = useSelector((state)=>state?.user?.user)
    const dispatch = useDispatch();
    var userFoundLocal = JSON.parse(window.localStorage.getItem("userFoundLocal"))

    {loggedIn &&
        userFoundLocal.userType == "user" ?
            useEffect(()=>{
                const getAccountsData = ()=>{
                    axios
                    .get("http://localhost:4000/api/v1/accounts")
                    .then((resp)=>{
                        resp.status == 200 && window.localStorage.setItem("allUsersLocal", JSON.stringify(resp?.data?.data?.users))
                    })
                    .catch((err)=>{
                        console.log(err.response.data.message)
                    })
                }
        
                getAccountsData()
                dispatch(userSlice?.actions?.setCurrentUser(userFoundLocal))
            },[])
        :
        loggedIn && 
            userFoundLocal.userType == "admin" && 
                useEffect(()=>{
                    const normalUser=()=>{
                        navigate("/error")
                    }
                    normalUser()
                },[])
    }
    var allAccounts = JSON.parse(window.localStorage.getItem("allUsersLocal"))
    
    const imageURL = "http://localhost:4000/"
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [newemail, setnewemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [passwordconfirm, setpasswordconfirm] = useState("")
    const [userProfileImageToBeChanged] = useState({})
    const [error, setError] = useState("")

    const newChanges = {}

    const handleChangeBackgroundImage = (imageName, userID) => {
        userProfileImageToBeChanged.profileBackgroundImg = imageName

        axios
            .patch(`http://localhost:4000/api/v1/accounts/${userID}`,userProfileImageToBeChanged)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)    
            })
    }
    const handleChangeProfileImage = (imageName, userID) => {
        userProfileImageToBeChanged.profileImg = imageName

        axios
            .patch(`http://localhost:4000/api/v1/accounts/${userID}`,userProfileImageToBeChanged)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)    
            })
    }
    const handleSaveButton = (id) => {
        setError("")

        if(firstname == "" && lastname == "" && newemail == "" && newpassword == "" && passwordconfirm == ""){
            setError(t('checkenteringatleastonefieled'))
        }
        if(firstname != ""){
            if(firstname == userFoundLocal.firstName){
                setError(t('nameusedbefore'))
            }
            else{
                newChanges.firstName = firstname
            }
        }
        if(lastname != ""){
            if(lastname == userFoundLocal.lastName){
                setError(t('lastnameusedbefore'))
            }
            else{
                newChanges.lastName = lastname
            }
        }
        if(newemail != ""){
            allAccounts.map((users,index)=>{
                if(newemail == users.email){
                    setError(t('emailusedbefore'))
                }
            })
            if(error == ""){
                newChanges.email = newemail
            } 
        }
        
        if((firstname == "" || lastname == "" || newemail == "") && error == ""){
            axios
            .patch(`http://localhost:4000/api/v1/accounts/${id}`,newChanges)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)    
            })
        }

        if(newpassword != ""){
            if(passwordconfirm !=""){
                if(newpassword == passwordconfirm){
                    const newInfo = {
                        userName: userFoundLocal.userName,
                        password:newpassword,
                        passwordConfirm: passwordconfirm
                    }

                    axios
                        .post(`http://localhost:4000/api/v1/accounts//update-password/${userFoundLocal._id}`,newInfo)
                        .then((resp)=>{
                            if(resp.status == 201) {
                                alert("Password Changed Successfully")
                            }
                        })
                        .catch((err)=>{
                            console.log(err.response.data.message)
                        })
                }
                else{
                    setError(t('enterthesamepassword'))
                }
            }
            else{
                setError(t('pleaseconfirmyourpassword'))
            }
        }
    }

    return(
        loggedIn?

            userFoundLocal.userType == "user" ?
            
            <Fragment>

                {/* Profile Background Image */}
                <div className={`${settingsStyles.profileBGImgContainer}`}>
                    
                    <div className={`${settingsStyles.profileBGImgContainerImage}`}>
                        <img 
                            title={userFoundLocal.profileBackgroundImg} 
                            src={imageURL+userFound.profileBackgroundImg}
                            id={""}
                        />
                    </div>
                    
                    <input
                        filename={userFoundLocal.profileBackgroundImg}
                        type="file"
                        id="bgImage"
                        accept="image/*"
                        style={{display:"none"}}
                        onChange={(e) =>{
                            handleChangeBackgroundImage(e.target.files[0].name, userFoundLocal._id)
                            dispatch(userSlice?.actions?.setBGImage(e.target.files[0].name))
                            userFoundLocal.profileBackgroundImg = e.target.files[0].name
                            window.localStorage.setItem("userFoundLocal", JSON.stringify(userFoundLocal))
                        }}
                    />

                    <button
                        className={`${settingsStyles.profileBGImgButton}` + " button centeredSecondaryButton "}
                        onClick={()=>{
                            document.getElementById("bgImage").click()
                        }} 
                    >
                        <TbPhotoEdit size={20}/>
                    </button>

                    <Link
                        className={`${settingsStyles.profileBGImgButton} ${settingsStyles.button2}` + " button centeredSecondaryButton "}
                        to={"/profilePage/myreviews"}
                    >
                        {i18n.language == "en" ?
                            <FaArrowLeftLong/>
                            :
                            <FaArrowRight/>   
                        }
                    </Link>

                    {/* Profile Image */}
                    <div className={`${settingsStyles.profileImgContainer}`}>
                        
                        <div className={`${settingsStyles.profileImgContainerImage}`}>
                            <img
                                title={userFoundLocal.profileImg}
                                src={imageURL+userFound.profileImg}
                                id="image"
                            />
                        </div>
                        
                        <input
                            filename={imageURL+userFoundLocal.profileImg}
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            style={{display:"none"}}
                            onChange={(e) =>{
                                handleChangeProfileImage(e.target.files[0].name, userFoundLocal._id)
                                dispatch(userSlice?.actions?.setProfileImage(e.target.files[0].name))
                            }}
                        />

                        <button
                            className={`${settingsStyles.profileImgButton}` + " button centeredSecondaryButton "}
                            onClick={()=>{
                                document.getElementById("profileImage").click()
                            }} 
                        >
                            <TbPhotoEdit size={20}/>
                        </button>

                    </div>

                </div>

                {/* Name and Email */}
                <div className={`${settingsStyles.textSection}`}>

                    <span className={`${settingsStyles.name}`}>{userFoundLocal.firstName} {userFoundLocal.lastName}</span>
                    <span className={`${settingsStyles.username}`}>@{userFoundLocal.userName}</span>
                    
                </div>

                {/* Section Three */}
                <div className={settingsStyles.signupContainer}>
                    <div className={settingsStyles.sectionContent}>
                                
                        {/* Name and Username */}
                        <div className={`${settingsStyles.sectionInnerContent}`}>
                            
                            {/* First Name */}
                            <div className={`${settingsStyles.sectionInnerContentInputsContainer}`}>
                                <label>
                                    <span>{t('firstname')}</span>
                                    <input 
                                        type="text" 
                                        className={" inputContainer "}
                                        placeholder={userFoundLocal.firstName}
                                        onChange={(e)=>setfirstname(e.target.value)}
                                    />
                                </label>
                            </div>

                            {/* Last Name */}
                            <div className={`${settingsStyles.sectionInnerContentInputsContainer}`}>
                                <label>
                                    <span>{t('lastname')}</span>
                                    <input 
                                        className={" inputContainer "}
                                        type="text" 
                                        placeholder={userFoundLocal.lastName}
                                        onChange={(e)=>setlastname(e.target.value)}
                                    />
                                </label>
                            </div>

                            {/* Username */}
                            <div className={`${settingsStyles.sectionInnerContentInputsContainer}`}>
                                <label>
                                    <span>{t('username')}</span>
                                    <input 
                                        disabled
                                        type="text" 
                                        placeholder={userFoundLocal.userName}
                                        className={" inputContainer "}
                                    />
                                </label>
                            </div>

                        </div>

                        {/* Email and New Email */}
                        <div className={`${settingsStyles.sectionInnerContent}`}>
                            
                            {/* Email */}
                            <div className={`${settingsStyles.halfInputContainer}`}>
                                <label>
                                    <span>{t('currentemail')}</span>
                                    <input 
                                        disabled
                                        type="text" 
                                        className={" inputContainer "}
                                        placeholder={userFoundLocal.email}
                                    />
                                </label>
                            </div>

                            {/* New Email */}
                            <div className={`${settingsStyles.halfInputContainer}`}>
                                <label>
                                    <span>{t('newemail')}</span>
                                    <input 
                                        className={" inputContainer "}
                                        type="text" 
                                        placeholder={t('writenewemail')}
                                        onChange={(e)=>setnewemail(e.target.value)}
                                    />
                                </label>
                            </div>

                        </div>

                        {/* Password Inputs */}
                        <div className={`${settingsStyles.sectionInnerContent}`}>
                            
                            {/* Current Password */}
                            <div className={`${settingsStyles.sectionInnerContentInputsContainer}`}>
                                <label>
                                    <span>{t('currentpassword')}</span>
                                    <input 
                                        disabled
                                        type="text" 
                                        placeholder={"******"}
                                        className={" inputContainer "}
                                    />
                                </label>
                            </div>

                            {/* New Password */}
                            <div className={`${settingsStyles.sectionInnerContentInputsContainer}`}>
                                <label>
                                    <span>{t('newpassword')}</span>
                                    <input 
                                        className={" inputContainer "}
                                        type="text" 
                                        placeholder={t('password')}
                                        onChange={(e)=>setnewpassword(e.target.value)}
                                    />
                                </label>
                            </div>

                            {/* Password Confirm */}
                            <div className={`${settingsStyles.sectionInnerContentInputsContainer}`}>
                                <label>
                                    <span>{t('passwordconfirm')}</span>
                                    <input 
                                        className={" inputContainer "}
                                        type="text" 
                                        placeholder={t('passwordconfirm')}
                                        onChange={(e)=>setpasswordconfirm(e.target.value)}
                                    />
                                </label>
                            </div>

                        </div>

                        {/* Errors */}
                        <p className="errorMessage">
                            {error}
                        </p>

                        {/* signup button */}
                        <div className={`${settingsStyles.saveButton}` + " button centeredSecondaryButton "} 
                            onClick={()=>handleSaveButton(userFoundLocal._id)}
                        >
                            {t('save')}
                        </div>

                    </div>
                </div>

            </Fragment>
            :

            userFoundLocal?.userType == "admin" && 
                <Fragment>
                    <div></div>
                </Fragment>

            :

            loggedIn == undefined &&
            <Fragment>
                <div className='d-flex justify-content-center w-100 p-4'>
                    <div className={`${adminDashStyles.loginAgainContainer}`}>
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

export default UserSettings