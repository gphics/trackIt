import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./Model/userSlice"
import debtSlice from "./Model/debtSlice"
import reminderSlice from "./Model/reminderSlice"

export const store = configureStore({
    reducer: {userSlice, debtSlice, reminderSlice}
})