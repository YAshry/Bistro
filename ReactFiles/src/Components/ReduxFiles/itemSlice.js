import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image : " "
}

export const itemSlice = createSlice({
    name : "item",
    initialState,
    reducers:{
        setItemImage : (state,action) => {
            state.image = action.payload
        },
    }
})