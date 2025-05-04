import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {
        profileBackgroundImg:"defaultProfileBgImage.jpg",
        profileImg: "defaultUserProfileImage.png"
    },
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        setCurrentUser : (state,action) => {
            state.user = action.payload
        },
        setBGImage : (state,action) => {
            state.user.profileBackgroundImg = action.payload
        },
        setProfileImage : (state,action) => {
            state.user.profileImg = action.payload
        }
    }
})