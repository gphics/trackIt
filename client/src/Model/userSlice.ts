import { createSlice } from "@reduxjs/toolkit"
import userSliceAnn from "../Utils/TypeAnnotations/userSliceAnn"
const initialState: userSliceAnn = {
    isLoading: false,
    registerDetails: {
        fullname: "",
        email: "",
        password: "",
        gender: "male"
    },
    loginDetails: { email: "", password: "" },
    user: {},
    basicUserUpdate: { fullname: "", gender: "", contact: +"", location: "", },
    passwordUpdate: { newPassword: "", oldPassword: "" },
    emailUpdate: { email: "" },
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
            state.registerDetails = {
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
            const { name, value }: { name: string, value: string } = action.payload
            // @ts-ignore
            state.loginDetails[name] = value
        },
        clearLoginState: (state) => {
            state.loginDetails = { email: "", password: "" }
        },
        fillUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state: any) => {
            return {
                ...state, isAuthenticated: false,
                isLoading: false,
                registerDetails: {
                    fullname: "",
                    email: "",
                    password: "",
                    gender: "male"
                },
                loginDetails: { email: "", password: "" },
                user: {},
                basicUserUpdate: { fullname: "", gender: "", contact: +"", location: "", },
                passwordUpdate: { newPassword: "", oldPassword: "" },
                emailUpdate: { email: "" }
            }
        },
        basicUserUpdate: (state, action) => {
            const { name, value } = action.payload
            // @ts-ignore
            state.basicUserUpdate[name] = value
        },
        emailUserUpdate: (state, action) => {
            const { value } = action.payload
            state.emailUpdate.email = value
        },
        passwordUserUpdate: (state, action) => {
            const { name, value } = action.payload
            // @ts-ignore
            state.passwordUpdate[name] = value
        }
        , clearAllUserUpdate: (state) => {
            state.basicUserUpdate = { fullname: "", gender: "", contact: "", location: "", }
            state.passwordUpdate = { newPassword: "", oldPassword: "" }
            state.emailUpdate = { email: "" }
        },
        preparingForUserUpdate: (state: any, action: any) => {
            const { gender, contact, fullname, location } = action.payload
            state.user = action.payload
            state.basicUserUpdate = { gender, contact, fullname, location }
        },

    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer