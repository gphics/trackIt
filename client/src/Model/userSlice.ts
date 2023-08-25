import { createSlice } from "@reduxjs/toolkit"
import AuthStorage from "../Utils/AuthStorage"

interface stateType {
    isAuthenticated: boolean,
    isLoading: boolean,
    registerDetails: {
        fullname: string,
        email: string,
        password: string,
        gender: string
    },
    loginDetails: {
        email: string,
        password: string
    }
    user: object
}
const initialState: stateType = {
    isAuthenticated: AuthStorage.getItem("isAuthenticated"),
    isLoading: false,
    registerDetails: {
        fullname: "",
        email: "",
        password: "",
        gender: "male"
    },
    loginDetails:{email:"", password:""},
    user: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerStateUpdate: (state, action) => {
            const { name, value }: { name: string, value: string } = action.payload

            // @ts-ignore
            state.registerDetails[name] = value
        },
        clearRegisterState: (state: any) => {
            state.registerDetail = {
                fullname: "",
                email: "",
                password: "",
                gender: "male"
            }
        },
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        loginStateUpdate: (state, action) => {
            const { name, value }:{name:string, value:string} = action.payload
            // @ts-ignore
            state.loginDetails[name] = value
        },
        clearLoginState: (state) => {
            state.loginDetails = { email: "", password: "" }
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