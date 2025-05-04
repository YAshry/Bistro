import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "",
}

export const navigationSlice = createSlice({
    name : "navigation",
    initialState,
    reducers:{
        setCategory: (state,action) => {
            state.category = action.payload
        },
    }

})