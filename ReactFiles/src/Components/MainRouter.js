// React
import React, {Fragment} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Redux
import {useSelector} from 'react-redux'

// Components
import Home from "./HomeFiles/Home"
import Menu from "./MenuFiles/Menu"
import UserTypeError from "./UserTypeError"
import About from "./AboutFiles/About"
import Login from "./LoginFiles/Login"
import SignUp from "./SignUpFiles/SignUp"
import Header from "./HeaderFiles/Header"
import Footer from "./FooterFiles/Footer"
import Contact from "./ContactFiles/Contact"
import Booking from "./BookingFiles/Book"
import AdminDashBoard from "./AdminDashboardFiles/AdminDashboard"
import UserProfile from "./UserFiles/UserProfile"
import UserSettings from "./UserFiles/UserSettings"
import ResetPassword from "./ResetPasswordFiles/ResetPassword"
import NotFound from "./NotFoundFiles/NotFound"

// Style Sheets
import './StyleSheets/mainStyles.css'
import './StyleSheets/bootstrapstyles.css'

const MainRouter = () => {

  const location = useLocation();

  return (
    <Fragment>

      {
        location.pathname == "/adminDashBoard" 
          || location.pathname == "/adminDashBoard/general" 
          || location.pathname == "/adminDashBoard/users"
          || location.pathname == "/adminDashBoard/menucategories"
          || location.pathname == "/adminDashBoard/menuitems"
          || location.pathname == "/adminDashBoard/bookings"
          || location.pathname == "/profilePage" 
          || location.pathname == "/settings"
          || location.pathname == "/profilePage/myreviews" 
          || location.pathname == "/profilePage/mybookings"
          || location.pathname == "/resetPassword" 
        ? 
          <Fragment/>
          : 
          <Fragment>
            {/* Header */}
            <div className="row m-0 w-100 p-0">
              <Header/>
            </div>
          </Fragment>
      }

      {/* Body */}
      <div className='main-router-body'>

        {/* Routes */}
        <div className=' main-router-routes '>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/error" element={<UserTypeError/>}/>
            <Route path="/menu/:categories/*" element={<Menu/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/booking" element={<Booking/>}/>
            <Route path="/notFound" element={<NotFound/>}/>
            <Route path="/adminDashBoard" element={<AdminDashBoard/>}/>
            <Route path="/adminDashBoard/*" element={<AdminDashBoard/>}/>
            <Route path="/profilePage" element={<UserProfile/>}/>
            <Route path="/profilePage/*" element={<UserProfile/>}/>
            <Route path="/settings/" element={<UserSettings/>}/>
          </Routes>
        </div>
      
        {
          location.pathname == "/adminDashBoard" 
            || location.pathname == "/adminDashBoard/general" 
            || location.pathname == "/adminDashBoard/users"
            || location.pathname == "/adminDashBoard/menucategories"
            || location.pathname == "/adminDashBoard/menuitems"
            || location.pathname == "/adminDashBoard/bookings"
            || location.pathname == "/profilePage"  
            || location.pathname == "/settings" 
            || location.pathname == "/profilePage/myreviews" 
            || location.pathname == "/profilePage/mybookings" 
            || location.pathname == "/resetPassword" 
          ?  
            <Fragment/>
            : 
            <Fragment>
              {/* Footer */}
              <div className="row m-0 w-100 p-0">
                <Footer/>
              </div>
            </Fragment>
        }
      </div>

    </Fragment>
  );
}

export default MainRouter;
