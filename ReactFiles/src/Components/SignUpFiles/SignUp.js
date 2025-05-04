// React
import React, { Fragment, useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'

// Axios
import axios from "axios"

// i18Next
import { useTranslation } from 'react-i18next'

// Components
import PageTitle from '../PageTitleFiles/PageTitle'
import PageDescription from '../PageDescriptionFiles/PageDescription'

// Style Sheets
import '../StyleSheets/mainStyles.css'
import '../StyleSheets/bootstrapstyles.css'
import signupStyles from './signup.module.css'

const SignUp = () => {

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

        getUserData()
    },[])
    var allAccounts = JSON.parse(window.localStorage.getItem("allUsersLocal"))

    const {t} = useTranslation();
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [signedUp, setSignedUp] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        userName: username,
        email: email,
        password: password,
        passwordConfirm:passwordConfirmation
    }

    const handleSignUp = () =>{
        setError("")
        setSignedUp(true)
        
        if(firstName != "" && lastName != "" && username != "" && email != "" && password != "" && passwordConfirmation != ""){
            if(password == passwordConfirmation){
                allAccounts.map((user,index)=>{
                    if(username == user.userName){
                        setError(t('usernameistaken'))
                    }
                    else if(email == user.email){
                        setError(t('emailalreadyexists'))
                    }
                    else if(error == ""){
                        axios
                        .post("http://localhost:4000/api/v1/accounts/signup",newUser)
                        .then(()=>{
                            axios
                            .post("http://localhost:4000/api/v1/accounts/login",newUser)
                            .then((resp)=>{
                                window.localStorage.setItem("userFoundLocal", JSON.stringify(resp.data.account))
                                navigate("/home")
                            })
                            .catch((err)=>{
                                console.log(err.response.data.message)
                            })
                        })
                        .catch((err)=>{
                            console.log(err.response.data.message)
                        })
                    }
                })
            }
            else{
                setError(t('enterthesamepassword'))
            }
        }
        else if(firstName == "" || lastName == "" || username == "" || email == "" || password == "" || passwordConfirmation == ""){
            setError(t('checkenteringallfields'))
        }
        else{
            setSignedUp(false)
        }

        
    }

    return(
        <Fragment>

            {/* Page title */}
            <PageTitle title={t('signup')}/>
            <PageDescription
                styles={{marginTop:"25px", fontSize:"16px"}} 
                description={t('hellowelcometoourrestauranthereyouwillhavetheopportunitytobookyourtablechoosenumberofseatsandpresentallyourfavoritemeals')}
            />

            {/* Signup section container */}
            <div className={signupStyles.signupContainer}>

                <div className={signupStyles.sectionContent}>
                    
                    {/* Name and Username */}
                    <div className={`${signupStyles.sectionInnerContent}`}>
                        
                        {/* First Name */}
                        <div className={`${signupStyles.sectionInnerContentInputsContainer}`}>
                            <label>
                                <span>{t('firstname')}</span>
                                <input 
                                    value={firstName}
                                    className={" inputContainer "}
                                    type="text" 
                                    placeholder={t('firstname')}
                                    onChange={(event)=>{setFirstName(event.target.value)}}
                                />
                            </label>
                        </div>

                        {/* Last Name */}
                        <div className={`${signupStyles.sectionInnerContentInputsContainer}`}>
                            <label>
                                <span>{t('lastname')}</span>
                                <input 
                                    value={lastName}
                                    className={" inputContainer "}
                                    type="text" 
                                    placeholder={t('lastname')}
                                    onChange={(event)=>{setLastName(event.target.value)}}
                                />
                            </label>
                        </div>

                        {/* Username */}
                        <div className={`${signupStyles.sectionInnerContentInputsContainer}`}>
                            <label>
                                <span>{t('username')}</span>
                                <input 
                                    value={username}
                                    className={" inputContainer "}
                                    type="text" 
                                    placeholder={t('username')}
                                    onChange={(event)=>{setUsername(event.target.value)}}
                                />
                            </label>
                        </div>

                        {/* Email */}
                        <div className={`${signupStyles.sectionInnerContentInputsContainer}`}>
                            <label>
                                <span>{t('email')}</span>
                                <input 
                                    value={email}
                                    className={" inputContainer "}
                                    type="text" 
                                    placeholder={t('email')}
                                    onChange={(event)=>{setEmail(event.target.value)}}
                                />
                            </label>
                        </div>

                        {/* Password */}
                        <div className={`${signupStyles.sectionInnerContentInputsContainer}`}>
                            <label>
                                <span>{t('password')}</span>
                                <input 
                                    value={password}
                                    className={" inputContainer "}
                                    type="text" 
                                    placeholder={t('password')}
                                    onChange={(event)=>{setPassword(event.target.value)}}
                                />
                            </label>
                        </div>

                        {/* Password Confirm */}
                        <div className={`${signupStyles.sectionInnerContentInputsContainer}`}>
                            <label>
                                <span>{t('passwordconfirm')}</span>
                                <input 
                                    value={passwordConfirmation || ""}
                                    className={" inputContainer "}
                                    type="text" 
                                    placeholder={t('passwordconfirm')}
                                    onChange={(event)=>{setPasswordConfirmation(event.target.value)}}
                                />
                            </label>
                        </div>

                    </div>
                    
                    {/* Errors */}
                    <div>
                        <p className="errorMessage">
                            {error}
                        </p>

                        {!signedUp &&
                            <Fragment>
                                <p className="errorMessage">
                                {t('checkthefollowing')}
                                </p>
                                <p className="errorMessage">
                                    {t('correctemailformat')}
                                </p>
                                <p className="errorMessage">
                                    {t('passwordisatleast8charachters')}
                                </p>
                            </Fragment>
                        }
                    </div>

                    {/* signup button */}
                    <div className={"button centeredSecondaryButton"}
                        onClick={()=>{
                            handleSignUp()
                        }}
                    >
                        {t('signup')}
                    </div>

                    {/* Login Button */}
                    <Link className={`${signupStyles.loginStatement}`} to={"/login"}>
                        {t("alreadyhaveanaccount")} ?
                    </Link>

                </div>

            </div>
        </Fragment>
    )
}

export default SignUp