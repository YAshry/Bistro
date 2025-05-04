// React
import React, { Fragment, useState } from 'react'
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
import loginStyles from './login.module.css'

const Login = () => {

    const {t} = useTranslation();
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorStatement, setErrorStatement] = useState("")

    const login = () => {
        if(username != "" && password != ""){
            const user = {
                userName: username,
                password: password
            }
        
            axios
            .post("http://localhost:4000/api/v1/accounts/login",user)
            .then((resp)=>{
                window.localStorage.setItem("isLoggedIn", true)
                window.localStorage.setItem("userFoundLocal", JSON.stringify(resp.data.account))
                navigate("/home")
            })
            .catch((err)=>{
                console.log(err.response.data.message)
                setErrorStatement(err.response.data.message)
            })
        }
        else{
            setErrorStatement("Please provide both userName and password!")
        }
    }

    return(
        <Fragment>

            {/* Page title and description */}
            <PageTitle title={t('login')}/>
            <PageDescription styles={{marginTop:"25px", fontSize:"16px"}} description={t('welcometherewearehappytoseeyoutodayfeelfreetobookatableanytimelookingforwardtomeetyou')}/>

            {/* Login section container */}
            <div className='mainSectionContainer'>
                
                <div className={loginStyles.loginContainer}>

                    <div className={loginStyles.sectionContent}>
                        
                        {/* Username */}
                        <label>
                            <span>{t('username')}</span>
                            <input
                                value={username || ""}
                                className={" inputContainer "}
                                type="text" 
                                placeholder={t('username')}
                                onChange={(event)=>{
                                    setUsername(event.target.value)
                                }}
                            />
                        </label>

                        {/* Password */}
                        <label>
                            <span>{t('password')}</span>
                            <input 
                                value={password || ""}
                                className={" inputContainer "}
                                type="password" 
                                placeholder={t('password')}
                                onChange={(event)=>{
                                    setPassword(event.target.value)
                                }}
                            />
                        </label>
                        
                        {/* error message */}
                        <p className="errorMessage">
                            {errorStatement}
                        </p>
                        
                        {/* Login button */}
                        <div className={"button centeredSecondaryButton"} 
                            onClick={()=>login()}
                        >
                            {t('login')}
                        </div>

                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {/* Sign Up Button */}
                            <Link className={`${loginStyles.signupStatement}` + " mb-2 "} to={"/signup"}>
                                {t("donthaveanaccountyet")} ?
                            </Link>
                            {/* Reset Password */}
                            <Link className={`${loginStyles.signupStatement}`} to={"/resetPassword"}>
                                {"Forgot password"} ?
                            </Link>
                        </div>

                    </div>

                </div>
            
            </div>
        </Fragment>
    )
}

export default Login