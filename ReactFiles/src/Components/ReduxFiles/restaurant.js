import { userSlice } from "./userSlice"
import { navigationSlice } from "./navigationSlice"
import { itemSlice } from "./itemSlice"
import { configureStore } from "@reduxjs/toolkit"

export const restaurant = configureStore({
    reducer: {
        user : userSlice.reducer,
        navigation : navigationSlice.reducer,
        item : itemSlice.reducer,
    }
})