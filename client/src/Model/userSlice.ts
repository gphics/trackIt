import { createSlice } from "@reduxjs/toolkit"
import AuthStorage from "../Utils/AuthStorage"
import { ObjectExpression } from "mongoose"

interface stateType {
    isAuthenticated: boolean,
    isLoading: boolean,
    registerDetail: {
        fullname: string,
        email: string,
        password: string,
        gender: string
    },
    user: object
}
const initialState: stateType = {
    isAuthenticated: AuthStorage.getItem("isAuthenticated"),
    isLoading: false,
    registerDetail: {
        fullname: "",
        email: "",
        password: "",
        gender: "male"
    },
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerStateUpdate: (state, action) => {
            const { name, value }: { name: string, value: string } = action.payload
            console.log(name, value);
            // @ts-ignore
            state.registerDetail[name] = value
        },
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        fillUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            AuthStorage.setItem("isAuthenticated", "true")
        },
        logout: (state) => {
            state.user = {}
            state.isAuthenticated = false
            AuthStorage.removeItem("isAuthenticated")
        }
    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer