// React
import React, { Fragment, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

// i18Next
import { useTranslation } from 'react-i18next'

// Axios
import axios from 'axios'

// Components
import PageTitle from '../PageTitleFiles/PageTitle'

// Style Sheets
import '../StyleSheets/mainStyles.css'
import '../StyleSheets/bootstrapstyles.css'
import resetPasswordStyles from './resetPassword.module.css'

const ResetPassword = () => {

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
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")

    const handleResetPassword = () => {
        setError("")
        const newInfo = {}
    
        if(username == "" || password == "" || passwordConfirm == ""){
            setError(t("checkenteringallfields"))
        }
        else if(username !== "" && password !== "" && passwordConfirm !== ""){
            newInfo.userName = username
            newInfo.password = password
            newInfo.passwordConfirm = passwordConfirm
            
            allAccounts.map((data, index)=>{

                if(data.userName == username){

                    if(password == passwordConfirm){

                        axios
                            .post(`http://localhost:4000/api/v1/accounts//update-password/${data._id}`,newInfo)
                            .then((resp)=>{
                                if(resp.status == 201) {
                                    console.log(resp)
                                    navigate("/login")
                                }
                            })
                            .catch((err)=>{
                                setError(err.response.data.message)
                                console.log(err.response.data.message)
                            })
                    }
                    else{
                        setError(t("enterthesamepassword"))
                    }
                }
                else{
                    setError("Username not found")
                }

            })
        }
        
    }
    
    return(
        <Fragment>

            {/* Page title and description */}
            <PageTitle title={t('resetpassword')} className={"mt-4"}/>

            {/* Login section container */}
            <div className='mainSectionContainer'>
                
                <div className={resetPasswordStyles.loginContainer}>

                    <div className={resetPasswordStyles.sectionContent}>
                        
                        {/* Username */}
                        <label>
                            <span>{t('username')}</span>
                            <input 
                                className={" inputContainer "}
                                type="text" 
                                placeholder={t('username')}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                        </label>

                        {/* New Password */}
                        <label>
                            <span>{t('newpassword')}</span>
                            <input 
                                className={" inputContainer "}
                                type="password" 
                                placeholder={t('enternewpassowrd')}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </label>

                        {/* Confirm Password */}
                        <label>
                            <span>{t('passwordconfirm')}</span>
                            <input 
                                className={" inputContainer "}
                                type="password" 
                                placeholder={t('passwordconfirm')}
                                onChange={(e)=>setPasswordConfirm(e.target.value)}
                            />
                        </label>

                        <p className="errorMessage">
                            {error}
                        </p>
                        
                        {/* Login button */}
                        <div className={"button centeredSecondaryButton"}
                            onClick={()=>{
                               handleResetPassword()
                            }}
                        >
                            {t('changepassword')}
                        </div>

                    </div>

                </div>
            
            </div>
        </Fragment>
    )
}

export default ResetPassword