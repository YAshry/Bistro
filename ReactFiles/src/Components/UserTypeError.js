import React, {Fragment} from "react"
import PageTitle from "./PageTitleFiles/PageTitle"

const UserTypeError = () => {

    var userFoundLocal = JSON.parse(window.localStorage.getItem("userFoundLocal"))
    var userType = userFoundLocal.userType
    
    return( 
        <Fragment>
            <PageTitle 
                title={
                    userType == "user" ? "Only admins can access this page!" 
                    :
                    userType == "admin" && "Only users can access this page!"
                }
                className={"mt-4 mb-4 fs-40"}
            />
        </Fragment>
    )
    
}

export default UserTypeError;