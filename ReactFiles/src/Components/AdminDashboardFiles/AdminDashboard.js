// React
import React, {Fragment, useEffect, useState} from "react";
import {useNavigate, Link, NavLink} from "react-router-dom";

// Axios
import axios from "axios"

// Redux
import { useSelector, useDispatch} from 'react-redux'
import { userSlice } from '../ReduxFiles/userSlice'

// i18Next
import { useTranslation } from 'react-i18next'

// Styles
import "../StyleSheets/mainStyles.css"
import adminDashStyles from "./adminDashboard.module.css"

// Icons
import { FaTimes } from "react-icons/fa";
import { TbPhotoEdit } from "react-icons/tb";
import { AiOutlineClose } from 'react-icons/ai';
import { TiUserAddOutline } from "react-icons/ti";
import { FaArrowRight, FaArrowLeftLong, FaCheck } from "react-icons/fa6";
import {MdOutlineModeEdit, MdOutlineDeleteForever, MdFormatListBulletedAdd} from 'react-icons/md'

// Modal
import Modal from 'react-modal';

// React DropDown
import Dropdown from 'react-dropdown';

const AdminDashBoard = () => {

    var loggedIn = window.localStorage.getItem("isLoggedIn");
    const userFound = useSelector((state)=>state?.user?.user)
    const dispatch = useDispatch();
    var userFoundLocal = JSON.parse(window.localStorage.getItem("userFoundLocal"))
    
    {loggedIn &&
        userFoundLocal.userType == "admin" ?
            useEffect(()=>{
            
                const getUserData = async () =>{
                    axios
                    .get("http://localhost:4000/api/v1/accounts")
                    .then((resp)=>{
                        resp.status == 200 && window.localStorage.setItem("allUsersLocal", JSON.stringify(resp?.data?.data?.users))
                    })
                    .catch((err)=>{
                        console.log(err.response.data.message)
                    })
                }
                const getMenuData = async () => {
                    axios
                    .get("http://localhost:4000/api/v1/menu")
                    .then((resp)=>{
                        resp.status == 200 && window.localStorage.setItem("allMenuItems", JSON.stringify(resp?.data?.data?.menu))
                    })
                    .catch((err)=>{
                        console.log(err.response.data.message)
                    })
                }
                const getBookingsData = async () => {
                    axios
                    .get("http://localhost:4000/api/v1/bookings")
                    .then((resp)=>{
                        resp.status == 200 && window.localStorage.setItem("allBookings", JSON.stringify(resp?.data?.data?.bookings))
                    })
                    .catch((err)=>{
                        console.log(err.response.data.message)
                    })
                }
                const getCommentsData = async () => {
                    axios
                    .get("http://localhost:4000/api/v1/comment")
                    .then((resp)=>{
                        resp.status == 200 && window.localStorage.setItem("allComments", JSON.stringify(resp?.data?.data?.comments))
                    })
                    .catch((err)=>{
                        console.log(err.response.data.message)
                    })
                }
        
                getUserData()
                getMenuData()
                getBookingsData()
                getCommentsData()

                dispatch(userSlice?.actions?.setCurrentUser(userFoundLocal))
            },[])    

        :
        loggedIn && 
            userFoundLocal.userType == "user" && 
                useEffect(()=>{
                    const normalUser=()=>{
                        navigate("/error")
                    }
                    normalUser()
                },[])
    }
    var allAccounts = JSON.parse(window.localStorage.getItem("allUsersLocal"))
    var allItems = JSON.parse(window.localStorage.getItem("allMenuItems"))
    var allBookings = JSON.parse(window.localStorage.getItem("allBookings"))
    var allComments = JSON.parse(window.localStorage.getItem("allComments"))
    
    const categories = []
    {allItems?.map((item)=>{
        !categories.includes(item.category) && categories.push(item.category)
    })}

    const imageURL = "http://localhost:4000/"
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();
    
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [passwordConfirm, setpasswordConfirm] = useState("")
    const [userType, setUserType] = useState("")
    const [error, setError] = useState("")

    const [showUserModifyModal, setShowUserModifyModal] = useState(false)
    const [showUserAddModal, setShowUserAddModal] = useState(false)
    const [showItemModifyModal, setShowItemModifyModal] = useState(false)
    const [showItemAddModal, setShowItemAddModal] = useState(false)
    
    var [dataToBeEdited] = useState({})
    var [imageToBeChanged] = useState({})
    var [userProfileImageToBeChanged] = useState({})
    var [itemName, setItemName] = useState("")
    var [itemImage, setItemImage] = useState("")
    var [itemDescription, setItemDescription] = useState("")
    var [itemPrice, setItemPrice] = useState("")
    var [itemCategory, setItemCategory] = useState("")

    const newChanges = {}
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
            overflow: "auto",
            marginRight: '-50%',
            maxHeight:"500px",
            backgroundColor:"white",
            transform: 'translate(-50%, -50%)',
            boxShadow:"0px 0px 5px 0px #aaa",
        },
    };

    const dashboardOptions = [
        {
            title:"general"
        },
        {
            title:"users"
        },
        {
            title:"menuitems"
        },
        {
            title:"bookings"
        }
    ]
    const [currentList, setCurrentList] = useState(dashboardOptions[0].title)
    const userTypeOptions = [
        {
            value:"user",
            label:"User"
        },
        {
            value:"admin",
            label:"Admin"
        }
    ]

    // General
    const handleSaveButton = (id) => {
        if(firstname == "" && lastname == "" && username == "" && email == "" && password == "" && passwordConfirm == ""){
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
        if(username != ""){
            allAccounts.map((users,index)=>{
                if(username == users.userName){
                    setError(t('usernameistaken'))
                }
            })
            if(error == ""){
                newChanges.userName = username
            } 
        }
        if(email != ""){
            allAccounts.map((users,index)=>{
                if(email == users.email){
                    setError(t('emailusedbefore'))
                }
            })
            if(error == ""){
                newChanges.email = email
            } 
        }
        if(password != ""){
            if(password == userFoundLocal.password){
                setError(t('enterPasswordAgain'))
            }
            else{
                if(password == passwordConfirm){
                    const newInfo = {
                        userName: userFoundLocal.userName,
                        password:password,
                        passwordConfirm: passwordConfirm
                    }

                    axios
                        .post(`http://localhost:4000/api/v1/accounts//update-password/${id}`,newInfo)
                        .then((resp)=>{
                            resp.status == 201 && alert("Password Changed Successfully")
                        })
                        .catch((err)=>{
                            console.log(err)
                            setError("Password is at least 8 charachters or something went wrong!")
                        })
                }
                else{
                    setError(t('enterthesamepassword'))
                }
            }
        }

        if(error == ""){
            axios
            .patch(`http://localhost:4000/api/v1/accounts/${id}`,newChanges)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                setError(t('checkenteringatleastonefieled'))
                console.log(err)  
            })
        }
    }
    // User Edits
    const handleEditUser = () => {
        setError("")

        if(firstname == "" && lastname == "" && username == "" && email == "" && password == "" && userType != ""){
            setError(t('checkenteringatleastonefieled'))
        }

        if(firstname != ""){
            if(firstname == dataToBeEdited.firstName){
                setError(t('nameusedbefore'))
            }
            else{
                dataToBeEdited.firstName = firstname
            }
        }
        if(lastname != ""){
            if(lastname == dataToBeEdited.lastName){
                setError(t('lastnameusedbefore'))
            }
            else{
                dataToBeEdited.lastName = lastname
            }
        }
        if(username != ""){
            allAccounts.map((users,index)=>{
                if(username == users.userName){
                    setError(t('usernameistaken'))
                }
            })
            if(error == ""){
                dataToBeEdited.userName = username
            } 
        }
        if(email != ""){
            allAccounts.map((users,index)=>{
                if(email == users.email){
                    setError(t('emailalreadyexists'))
                }
            })
            if(error == ""){
                dataToBeEdited.email = email
            } 
        }
        if(userType != ""){
            dataToBeEdited.userType = userType
        }

        if((firstname == "" || lastname == "" || username == "" || email == "" || userType != "") && error == ""){
            axios
            .patch(`http://localhost:4000/api/v1/accounts/${dataToBeEdited.id}`,dataToBeEdited)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                setError(t('passwordisatleast8charachters'))
                console.log(err)
            })
        }
        else{
            console.log("Errorrrrr")
        }

        if(password != ""){
            if(password == passwordConfirm){
                const newInfo = {
                    userName: userFoundLocal.userName,
                    password:password,
                    passwordConfirm: passwordConfirm
                }

                axios
                    .post(`http://localhost:4000/api/v1/accounts//update-password/${userFoundLocal._id}`,newInfo)
                    .then((resp)=>{
                        if(resp.status == 201) {
                            alert("Password Changed Successfully")
                        }
                    })
                    .catch((err)=>{
                        setError("Password is at least 8 charachters or something went wrong!")
                        console.log(err)
                    })
            }
            else{
                setError(t('enterthesamepassword'))
            }
        }
    }
    const handleDeleteUserButton = (id) => {
        var someError = ""

        allAccounts.map((account)=>{
            if(account._id == id){
                allComments.map((comment)=>{
                    if(comment.username == account.userName){
                        axios
                            .delete(`http://localhost:4000/api/v1/comment/${comment._id}`)
                            .then((resp)=>{
                                resp.status == 201 ? alert(t("Comments Deleted")) : console.log(resp)
                            })
                            .catch((err)=>{
                                someError="Error"
                                console.log("Comment Errorrrrr")
                                console.log(err)
                            })
                    }
                })

                allBookings.map((book)=>{
                    if(book.username == account.userName){
                        axios
                            .delete(`http://localhost:4000/api/v1/bookings/${book._id}`)
                            .then((resp)=>{
                                resp.status == 201 ? alert(t("Bookings Deleted")) : console.log(resp)
                            })
                            .catch((err)=>{
                                someError="Error"
                                console.log("Bookings Errorrrrr")
                                console.log(err)
                            })
                    }
                })
            }
        })

        if(someError == ""){
            axios
            .delete(`http://localhost:4000/api/v1/accounts/${id}`)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log("Errorrrrr")
                console.log(err)
            })
        }
        else{
            console.log("Error kebeer awy")
        }
    }
    const handleAddUserButton = () => {
        if(firstname != "" && lastname != "" && username != "" && email != "" && password != "" && passwordConfirm != ""){
            if(password == passwordConfirm){
                allAccounts.map((user,index)=>{
                    if(username == user.userName){
                        setError(t('usernameistaken'))
                    }
                    else if(email == user.email){
                        setError(t('emailalreadyexists'))
                    }
                    else if(error == ""){
                        dataToBeEdited.firstName = firstname
                        dataToBeEdited.lastName = lastname
                        dataToBeEdited.userName = username
                        dataToBeEdited.email = email
                        dataToBeEdited.password = password
                        dataToBeEdited.passwordConfirm = passwordConfirm
            
                        axios
                        .post("http://localhost:4000/api/v1/accounts/signup",dataToBeEdited)
                        .then((resp)=>{
                            if(resp.status == 201){ 
                                alert("User Added Successfully")
                                setShowUserAddModal(false)
                            } 
                            else{
                                console.log(err.response.data.message)
                            }
                        })
                        .catch((err)=>{
                            setError(t('passwordisatleast8charachters'))
                            console.log(err.response.data.message)
                        })
                    }
                })
            }
            else{
                setError(t('enterthesamepassword'))
            }    
        }
        else if(firstname == "" || lastname == "" || username == "" || email == "" || password == "" || passwordConfirm == ""){
            setError(t('checkenteringallfields'))
        }
    }
    // Images
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
    const handleChangeItemImage = (imageName, imageID) => {
        imageToBeChanged.image = imageName
        
        axios
            .patch(`http://localhost:4000/api/v1/menu/${imageID}`,imageToBeChanged)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
    }
    // MenuItems
    const handleDeleteItem = (id) => {
        axios
            .delete(`http://localhost:4000/api/v1/menu/${id}`)
            .then((resp)=>{
                resp.status == 201 ? alert("Data Deleted Successfully") : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
    }
    const handleItemEdit = () => {
        if(itemName != "" || itemDescription != "" || itemPrice != "" || itemCategory != ""){
            if(itemName != ""){
                dataToBeEdited.name = itemName
            }
            if(itemDescription != ""){
                dataToBeEdited.description = itemDescription
            }
            if(itemPrice != ""){
                dataToBeEdited.price = itemPrice
            }
            if(itemCategory != ""){
                dataToBeEdited.category = itemCategory
            }

            axios
            .patch(`http://localhost:4000/api/v1/menu/${dataToBeEdited._id}`,dataToBeEdited)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)    
            })
        }
        else if(itemName != "" && itemDescription != "" && itemPrice != "" && itemCategory != ""){
            setError(t("checkenteringatleastonefieled"))
        }
    }
    const handleAddNewItem = () =>{
        if(itemImage != "" && itemName != "" && itemDescription != "" && itemPrice != "" && itemCategory){
            dataToBeEdited.image = itemImage
            dataToBeEdited.name = itemName
            dataToBeEdited.description = itemDescription
            dataToBeEdited.price = itemPrice
            dataToBeEdited.category = itemCategory

            axios
            .post("http://localhost:4000/api/v1/menu",dataToBeEdited)
            .then((resp)=>{
                if(resp.status == 201){ 
                    alert("Item Added Successfully")
                    setShowItemAddModal(false)
                } 
                else{
                    console.log(resp)
                }
            })
            .catch((err)=>{
                console.log(err.response.data.message)
            })
        }
        else if(itemImage == "" || itemName == "" || itemDescription == "" || itemPrice == "" || itemCategory){
            setError(t('checkenteringallfields'))
        }
    }
    // Booking
    const handleBookingStatus = (id, data) => {
        axios
            .patch(`http://localhost:4000/api/v1/bookings/${id}`,data)
            .then((resp)=>{
                resp.status == 201 ? alert(t("DataChangedSuccessfully")) : console.log(resp)
            })
            .catch((err)=>{
                console.log(err.response.data.message)    
            })
    }

    return(

        loggedIn?

            userFoundLocal.userType == "admin" ?
            <Fragment>
                
                {/* Profile Background Image */}
                <div className={`${adminDashStyles.profileBGImgContainer}`}>
                    
                    <div className={`${adminDashStyles.profileBGImgContainerImage}`}>
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
                        }}
                    />

                    <button
                        className={`${adminDashStyles.profileBGImgButton}` + " button centeredSecondaryButton "}
                        onClick={()=>{
                            document.getElementById("bgImage").click()
                        }} 
                    >
                        <TbPhotoEdit size={20}/>
                    </button>

                    <Link
                        className={`${adminDashStyles.profileBGImgButton} ${adminDashStyles.button2}` + " button centeredSecondaryButton "}
                        to={"/home"}
                    >
                        {i18n.language == "en" ?
                            <FaArrowLeftLong/>
                            :
                            <FaArrowRight/>   
                        }
                    </Link>

                    {/* Profile Image */}
                    <div className={`${adminDashStyles.profileImgContainer}`}>
                        
                        <div className={`${adminDashStyles.profileImgContainerImage}`}>
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
                            className={`${adminDashStyles.profileImgButton}` + " button centeredSecondaryButton "}
                            onClick={()=>{
                                document.getElementById("profileImage").click()
                            }} 
                        >
                            <TbPhotoEdit size={20}/>
                        </button>

                    </div>

                </div>

                {/* Name and Email */}
                <div className={`${adminDashStyles.textSection}`}>

                    <span className={`${adminDashStyles.name}`}>{userFoundLocal.firstName} {userFoundLocal.lastName}</span>
                    <span className={`${adminDashStyles.username}`}>@{userFoundLocal.userName}</span>
                    
                </div>

                {/* Admin Dashboard and General Settings */}
                <div className={`${adminDashStyles.dashboardContainer}`}>

                    {/* Left Side */}
                    <div className={`${adminDashStyles.dashboardTitleContainer}`}>
                        
                        {dashboardOptions.map((data,index)=>{
                            return(
                                <NavLink
                                    key={index}
                                    to={data.title}
                                    onClick={()=>{
                                        setCurrentList(data.title)  
                                    }}
                                    className={`${adminDashStyles.dashboardTitle}` + " settingsNav "}
                                >
                                    {t(data.title)}
                                </NavLink>
                            )
                        })}

                    </div>

                    {/* Right Side */}
                    <div className={`${adminDashStyles.dashboardContentContainer}`}>

                        {currentList == "general" ?

                            <Fragment>

                                {/* General Settings */}
                                <div className={`${adminDashStyles.generalSettingsContainer}`}>

                                    {/* First and Last Name */}
                                    <div className={`${adminDashStyles.inputContainer}`}>
                                    
                                        {/* First Name */}
                                        <div className={`${adminDashStyles.threeInputContainer}`}>
                                            <label>
                                                <span>{t('firstname')}</span>
                                                <input 
                                                    type="text" 
                                                    className={" inputContainer "}
                                                    placeholder={t('changefirstname')}
                                                    onChange={(e)=>setfirstname(e.target.value)}
                                                />
                                            </label>
                                        </div>

                                        {/* Last name */}
                                        <div className={`${adminDashStyles.threeInputContainer}`}>
                                            <label>
                                                <span>{t('lastname')}</span>
                                                <input 
                                                    type="text" 
                                                    className={" inputContainer "}
                                                    placeholder={t('changelastname')}
                                                    onChange={(e)=>setlastname(e.target.value)}
                                                />
                                            </label>
                                        </div>

                                        {/* Username */}
                                        <div className={`${adminDashStyles.threeInputContainer}`}>
                                            <label>
                                                <span>{t('username')}</span>
                                                <input 
                                                    type="text" 
                                                    placeholder={t('username')}
                                                    className={" inputContainer "}
                                                    onChange={(e)=>setusername(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    
                                    </div>

                                    {/* Email */}
                                    <div className={`${adminDashStyles.inputContainer}`}>
                                        
                                        {/* Email */}
                                        <div className={`${adminDashStyles.halfInputContainer}`}>
                                            <label>
                                                <span>{t('currentemail')}</span>
                                                <input 
                                                    disabled
                                                    type="text" 
                                                    placeholder={userFoundLocal.email}
                                                    className={" inputContainer "}
                                                />
                                            </label>
                                        </div>

                                        {/* New Email */}
                                        <div className={`${adminDashStyles.halfInputContainer}`}>
                                            <label>
                                                <span>{t('newemail')}</span>
                                                <input 
                                                    type="text" 
                                                    className={" inputContainer "}
                                                    placeholder={t('enternewemail')}
                                                    onChange={(e)=>setemail(e.target.value)}
                                                />
                                            </label>
                                        </div>

                                    </div>

                                    {/* Password */}
                                    <div className={`${adminDashStyles.inputContainer}`}>
                                        
                                        {/* Password */}
                                        <div className={`${adminDashStyles.halfInputContainer}`}>
                                            <label>
                                                <span>{t('currentpassword')}</span>
                                                <input 
                                                    disabled
                                                    type="text" 
                                                    className={" inputContainer "}
                                                    placeholder={"*******"}
                                                />
                                            </label>
                                        </div>

                                        {/* New Password */}
                                        <div className={`${adminDashStyles.halfInputContainer}`}>
                                            <label>
                                                <span>{t('newpassword')}</span>
                                                <input 
                                                    type="text" 
                                                    className={" inputContainer "}
                                                    placeholder={t('enternewpassword')}
                                                    onChange={(e)=>setpassword(e.target.value)}
                                                />
                                            </label>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className={`${adminDashStyles.halfInputContainer}`}>
                                            <label>
                                                <span>{t('passwordconfirm')}</span>
                                                <input 
                                                    type="text" 
                                                    className={" inputContainer "}
                                                    placeholder={t('passwordconfirm')}
                                                    onChange={(e)=>setpasswordConfirm(e.target.value)}
                                                />
                                            </label>
                                        </div>

                                    </div>

                                    <p className="errorMessage">
                                        {error}
                                    </p>

                                    {/* Button */}
                                    <div className={" button centeredSecondaryButton "}
                                        onClick={()=>{
                                            setError("")
                                            handleSaveButton(userFoundLocal._id)
                                        }}
                                    >
                                        {t("save")}
                                    </div>

                                </div>

                            </Fragment>
                            
                            :currentList == "users" ?

                                <Fragment>

                                    {/* User Settings */}
                                    <div className={`${adminDashStyles.settingsContainer}`}>
                                    
                                        <table className={`${adminDashStyles.tableContainer}`}>
                                            <tbody>

                                                <tr className={`${adminDashStyles.tableRow}`}>
                                                    <th>{t("firstname")}</th>
                                                    <th>{t("lastname")}</th>
                                                    <th>{t("username")}</th>
                                                    <th>{t("email")}</th>
                                                    <th>{t("password")}</th>
                                                    <th>{t("usertype")}</th>
                                                    <th>{t("modify")}</th>
                                                </tr>
                                                    
                                                {allAccounts.map((data,index)=>{
                                                    return(
                                                        <tr key={index} className={`${adminDashStyles.tableRow}`}>
                                                            <td>{data.firstName}</td>
                                                            <td>{data.lastName}</td>
                                                            <td>{data.userName}</td>
                                                            <td>{data.email}</td>
                                                            <td>{"********"}</td>
                                                            <td>{data.userType}</td>
                                                            <td>
                                                                <div className={`${adminDashStyles.modifictaions}`}>
                                                                    {/* Edit */}
                                                                    <div className={`${adminDashStyles.tableEditButton}` + " button centeredSecondaryButton "}
                                                                        onClick={()=>{
                                                                            dataToBeEdited.id = data._id
                                                                            dataToBeEdited.firstName = data.firstName
                                                                            dataToBeEdited.lastName = data.lastName
                                                                            dataToBeEdited.userName = data.userName
                                                                            dataToBeEdited.email = data.email
                                                                            dataToBeEdited.userType = data.userType
                                                                            setShowUserModifyModal(true)
                                                                        }}
                                                                    >
                                                                        <MdOutlineModeEdit/>
                                                                    </div>
                                                                    {/* delete */}
                                                                    <div className={`${adminDashStyles.tableEditButton}` + " button centeredPrimaryButton "}
                                                                        onClick={()=>{
                                                                            console.log(data._id)
                                                                            handleDeleteUserButton(data._id)
                                                                        }}
                                                                    >
                                                                        <MdOutlineDeleteForever/>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>                                                
                                        </table>

                                        {/* Button */}
                                        <div className={`${adminDashStyles.tableAddButton}` + " button centeredSecondaryButton "}
                                            onClick={()=>{
                                                setError("")
                                                setShowUserAddModal(true)
                                            }}
                                        >
                                            <TiUserAddOutline/>
                                            {t("adduser")}
                                        </div>
                                    </div>

                                </Fragment>

                            :currentList == "menuitems"?

                                <Fragment>

                                    {/* Menu Items Settings */}
                                    <div className={`${adminDashStyles.settingsContainer}`}>
                                    
                                        <table className={`${adminDashStyles.tableContainer}`}>
                                            <tbody>
                                                
                                                <tr className={`${adminDashStyles.tableRow}`}>
                                                    <th>{t("image")}</th>
                                                    <th>{t("name")}</th>
                                                    <th>{t("description")}</th>
                                                    <th>{t("price")}</th>
                                                    <th>{t("category")}</th>
                                                    <th>{t("modify")}</th>
                                                </tr>

                                                {allItems.map((data,index)=>{
                                                    return(

                                                        <tr key={index} className={`${adminDashStyles.tableRow}`}>
                                                            <td>
                                                                {/* Table Image */}
                                                                <div className={`${adminDashStyles.tableImgContainer}`}>
                                                                    
                                                                    <div className={`${adminDashStyles.tableImgContainerImage}`}>
                                                                        <img
                                                                            title={data.image}
                                                                            src={imageURL+data.image}
                                                                            id="image"
                                                                        />
                                                                    </div>
                                                                    
                                                                    <input
                                                                        filename={imageURL+data.image}
                                                                        type="file"
                                                                        id={`tableImage${index}`}
                                                                        accept="image/*"
                                                                        style={{display:"none"}}
                                                                        onChange={(e) =>{
                                                                            handleChangeItemImage(e.target.files[0].name,data._id)
                                                                        }}
                                                                    />

                                                                </div>
                                                            </td>
                                                            <td>{data.name}</td>
                                                            <td>{data.description}</td>
                                                            <td>$ {data.price}</td>
                                                            <td>{data.category}</td>
                                                            <td>
                                                                <div className={`${adminDashStyles.modifictaions}`}>
                                                                    
                                                                    {/* Edit */}
                                                                    <div className={`${adminDashStyles.tableEditButton}` + " button centeredSecondaryButton "}
                                                                        onClick={()=>{
                                                                            dataToBeEdited._id = data._id
                                                                            dataToBeEdited.image = data.image
                                                                            dataToBeEdited.name = data.name
                                                                            dataToBeEdited.description = data.description
                                                                            dataToBeEdited.price = data.price
                                                                            dataToBeEdited.category = data.category
                                                                            setShowItemModifyModal(true)
                                                                        }}
                                                                    >
                                                                        <MdOutlineModeEdit/>
                                                                    </div>
                                                                    
                                                                    {/* Edit Image */}
                                                                    <div
                                                                        className={`${adminDashStyles.tableEditButton}` + " button centeredSecondaryButton "}
                                                                        onClick={()=>{
                                                                            document.getElementById(`tableImage${index}`).click()
                                                                        }} 
                                                                    >
                                                                        <TbPhotoEdit/>
                                                                    </div>
                                                                    
                                                                    {/* Delete */}
                                                                    <div className={`${adminDashStyles.tableEditButton}` + " button centeredPrimaryButton "}
                                                                        onClick={()=>{
                                                                            handleDeleteItem(data._id)
                                                                        }}
                                                                    >
                                                                        <MdOutlineDeleteForever/>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                        </tr>

                                                    )
                                                })}

                                            </tbody>
                                        </table>

                                        {/* Button */}
                                        <div className={`${adminDashStyles.tableAddButton}` + " button centeredSecondaryButton "}
                                            onClick={()=>{
                                                setShowItemAddModal(true)
                                            }}
                                        >
                                            <MdFormatListBulletedAdd/>
                                            {t("additem")}
                                        </div>

                                    </div>

                                </Fragment>

                            :currentList == "bookings"?

                                <Fragment>

                                    {/* Bookings Settings */}
                                    <div className={`${adminDashStyles.settingsContainer}`}>
                                    
                                        <table className={`${adminDashStyles.tableContainer}`} style={{height:"400px"}}>
                                            <tbody>

                                                <tr className={`${adminDashStyles.tableRow}`}>
                                                    <th>{t("username")}</th>
                                                    <th>{t("name")}</th>
                                                    <th>{t("phone")}</th>
                                                    <th>{t("date")}</th>
                                                    <th>{t("time")}</th>
                                                    <th>{t("totalperson")}</th>
                                                    <th>{t("modify")}</th>
                                                </tr>

                                                {allBookings.map((data,index)=>{
                                                    return(

                                                        <tr key={index} className={`${adminDashStyles.tableRow}`}>
                                                            <td>{data.username}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.phone}</td>
                                                            <td>{data.date}</td>
                                                            <td>{data.time}</td>
                                                            <td>{data.totalPerson}</td>
                                                            <td>
                                                                {data.bookStatus == "pending" ?
                                                                    
                                                                    <div className={`${adminDashStyles.modifictaions}`}>
                                                                        {/* Accept */}
                                                                        <div className={`${adminDashStyles.tableEditButton} ${adminDashStyles.acceptButton}` + " button centeredSecondaryButton "}
                                                                            onClick={()=>{
                                                                                dataToBeEdited.bookStatus = "accepted"
                                                                                handleBookingStatus(data._id,dataToBeEdited)
                                                                            }}
                                                                        >
                                                                            <FaCheck/>
                                                                        </div>
                                                                        {/* Reject */}
                                                                        <div className={`${adminDashStyles.tableEditButton} ${adminDashStyles.rejectButton}` + " button centeredPrimaryButton "}
                                                                            onClick={()=>{
                                                                                console.log(data._id)
                                                                                dataToBeEdited.bookStatus = "rejected"
                                                                                handleBookingStatus(data._id,dataToBeEdited)
                                                                            }}
                                                                        >
                                                                            <FaTimes/>
                                                                        </div>
                                                                    </div>

                                                                    :

                                                                    <div className={`${adminDashStyles.modifictaions}`}>
                                                                        {data.bookStatus == "accepted" &&
                                                                            <div className={`${adminDashStyles.tableEditButton} ${adminDashStyles.acceptBadge}` + " button "}>
                                                                                {t("accepted")}
                                                                            </div>
                                                                        }
                                                                        {data.bookStatus == "rejected" &&
                                                                            <div className={`${adminDashStyles.tableEditButton} ${adminDashStyles.rejectBadge}` + " button "}>
                                                                                {t("rejected")}
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }
                                                            </td>
                                                        </tr>

                                                    )
                                                })}

                                                

                                            </tbody>
                                        </table>

                                    </div>

                                </Fragment>
                                
                            :

                            <Fragment/>

                        }

                    </div>

                </div>

                {/* Edit User Modal */}
                <Modal
                    isOpen={showUserModifyModal}
                    style={modalStyle}
                    ariaHideApp={false}
                >
                    <div>
                        {/* Modal Header */}
                        <div className={" modalHeaderContainer "}>
                            
                            {/* Modal Title */}
                            <div className={" modalTitle "}>
                                {t("editcurrentuser")}
                            </div>

                            {/* Modal close button */}
                            <div className={" modalCloseButton button secondaryButton "}
                                onClick={()=>
                                    setShowUserModifyModal(false)
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

                                {/* FirstName */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('firstname')}</span>
                                        <input 
                                            className={" inputContainer border-10 "}
                                            type="text" 
                                            placeholder={dataToBeEdited.firstName}
                                            onChange={(e)=>setfirstname(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Last Name */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('lastname')}</span>
                                        <input 
                                            className={" inputContainer border-10 "}
                                            type="text" 
                                            placeholder={dataToBeEdited.lastName}
                                            onChange={(e)=>setlastname(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* UserName */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('username')}</span>
                                        <input 
                                            className={" inputContainer border-10 "}
                                            type="text" 
                                            placeholder={dataToBeEdited.userName}
                                            onChange={(e)=>setusername(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Email */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('email')}</span>
                                        <input 
                                            className={" inputContainer border-10 "}
                                            type="text" 
                                            placeholder={dataToBeEdited.email}
                                            onChange={(e)=>setemail(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Password */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('password')}</span>
                                        <input 
                                            className={" inputContainer border-10 "}
                                            type="text" 
                                            placeholder={"********"}
                                            onChange={(e)=>setpassword(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Confirm Password */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('passwordconfirm')}</span>
                                        <input 
                                            className={" inputContainer border-10 "}
                                            type="text" 
                                            placeholder={"passwordConfirm"}
                                            onChange={(e)=>setpasswordConfirm(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* UserType */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('usertype')}</span>
                                        <Dropdown
                                            className={" inputContainer border-10 "}
                                            arrowClassName='text-white'
                                            options={userTypeOptions}
                                            placeholder={dataToBeEdited.userType}
                                            onChange={(e)=>setUserType(e.value)}
                                        />
                                    </label>
                                </div>

                            </div>

                        </div>

                        {/* Errors */}
                        <p className="errorMessage" style={{marginBottom:"10px"}}>
                            {error}
                        </p>

                        {/* Edit Button */}
                        <div className='modalAddButtonContainer'>
                            <div className='button centeredSecondaryButton' 
                                onClick={()=>{
                                    handleEditUser()
                                    setShowUserModifyModal(false)
                                }}>
                                {t("edit")}
                            </div>
                        </div>

                    </div>
                </Modal>

                {/* Add User Modal */}
                <Modal
                    isOpen={showUserAddModal}
                    style={modalStyle}
                    ariaHideApp={false}
                    animation={false}
                >
                    <div>
                        {/* Modal Header */}
                        <div className={" modalHeaderContainer "}>
                            
                            {/* Modal Title */}
                            <div className={" modalTitle "}>
                                {t("addnewuser")}
                            </div>

                            {/* Modal close button */}
                            <div className={" modalCloseButton button secondaryButton "}
                                onClick={()=>
                                    setShowUserAddModal(false)
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

                                {/* FirstName */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('firstname')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('firstname')}
                                            onChange={(e)=>setfirstname(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Last Name */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('lastname')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('lastname')}
                                            onChange={(e)=>setlastname(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* UserName */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('username')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('username')}
                                            onChange={(e)=>setusername(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Email */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('email')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={t('email')}
                                            onChange={(e)=>setemail(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Password */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('password')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={"********"}
                                            onChange={(e)=>setpassword(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Confirm Password */}
                                <div className={" threeInputContainer "}>
                                    <label>
                                        <span>{t('passwordconfirm')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={"passwordConfirm"}
                                            onChange={(e)=>setpasswordConfirm(e.target.value)}
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
                                    setError("")
                                    handleAddUserButton()
                                }}>
                                {t("add")}
                            </div>
                        </div>

                    </div>
                </Modal>

                {/* Edit Item Modal */}
                <Modal
                    isOpen={showItemModifyModal}
                    style={modalStyle}
                    ariaHideApp={false}
                >
                    <div>
                        {/* Modal Header */}
                        <div className={" modalHeaderContainer "}>
                            
                            {/* Modal Title */}
                            <div className={" modalTitle "}>
                                {t("editcurrentitem")}
                            </div>

                            {/* Modal close button */}
                            <div className={" modalCloseButton button secondaryButton "}
                                onClick={()=>
                                    setShowItemModifyModal(false)
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

                                {/* Name */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('name')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={dataToBeEdited.name}
                                            onChange={(e)=>setItemName(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Description */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('description')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={dataToBeEdited.description}
                                            onChange={(e)=>setItemDescription(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Price */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('price')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={dataToBeEdited.price}
                                            onChange={(e)=>setItemPrice(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Category */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('category')}</span>
                                        <Dropdown
                                            className={" inputContainer "}
                                            arrowClassName='text-white'
                                            options={categories}
                                            placeholder={dataToBeEdited.category}
                                            onChange={(e)=>setItemCategory(e.value)}
                                        />
                                    </label>
                                </div>

                            </div>

                        </div>

                        {/* Errors */}
                        <p className="errorMessage" style={{marginBottom:"10px"}}>
                            {error}
                        </p>

                        {/* Edit Button */}
                        <div className='modalAddButtonContainer'>
                            <div className='button centeredSecondaryButton' 
                                onClick={()=>{
                                    setError("")
                                    setShowItemModifyModal(false)
                                    handleItemEdit()
                                }}>
                                {t("edit")}
                            </div>
                        </div>

                    </div>
                </Modal>

                {/* Add User Modal */}
                <Modal
                    isOpen={showItemAddModal}
                    style={modalStyle}
                    ariaHideApp={false}
                    animation={false}
                >
                    <div>
                        {/* Modal Header */}
                        <div className={" modalHeaderContainer "}>
                            
                            {/* Modal Title */}
                            <div className={" modalTitle "}>
                                {t("addnewuser")}
                            </div>

                            {/* Modal close button */}
                            <div className={" modalCloseButton button secondaryButton "}
                                onClick={()=>
                                    setShowItemAddModal(false)
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

                            {/* Image */}
                            <div className={" modalItemImageContainer "}>

                                <div className={" modalItemImageInnerContainer "}>
                                    <img src={imageURL+dataToBeEdited.image}/>
                                </div>

                                <input
                                    filename={dataToBeEdited.image}
                                    type="file"
                                    id="modalImage"
                                    accept="image/*"
                                    style={{display:"none"}}
                                    onChange={(e) =>{
                                        setItemImage(e.target.files[0].name)
                                        dataToBeEdited.image = e.target.files[0].name
                                    }}
                                />

                                <button
                                    className={" modalItemImageButton button centeredSecondaryButton "}
                                    onClick={()=>{
                                        document.getElementById("modalImage").click()
                                    }} 
                                >
                                    <TbPhotoEdit size={20}/>
                                </button>

                            </div>
                            
                            <div className={"sectionInnerContent"}>

                                {/* Name */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('name')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={dataToBeEdited.name}
                                            onChange={(e)=>setItemName(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Description */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('description')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={dataToBeEdited.description}
                                            onChange={(e)=>setItemDescription(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Price */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('price')}</span>
                                        <input 
                                            className={" inputContainer "}
                                            type="text" 
                                            placeholder={dataToBeEdited.price}
                                            onChange={(e)=>setItemPrice(e.target.value)}
                                        />
                                    </label>
                                </div>

                                {/* Category */}
                                <div className={" halfInputContainer "}>
                                    <label>
                                        <span>{t('category')}</span>
                                        <Dropdown
                                            className={" inputContainer "}
                                            arrowClassName='text-white'
                                            options={categories}
                                            placeholder={dataToBeEdited.category}
                                            onChange={(e)=>setItemCategory(e.value)}
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
                                    setError("")
                                    handleAddNewItem()
                                }}>
                                {t("add")}
                            </div>
                        </div>

                    </div>
                </Modal>

            </Fragment>

            :

            userFoundLocal?.userType == "user" && 
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

export default AdminDashBoard