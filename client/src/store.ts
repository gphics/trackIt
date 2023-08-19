import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./Model/userSlice"
export const store = configureStore({
    reducer: {userSlice}
})