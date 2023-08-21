import { createSlice } from "@reduxjs/toolkit"
import AuthStorage from "../Utils/AuthStorage"

interface stateType {
    isAuthenticated: boolean,
    registerDetail: {
        fullname: string,
        email: string,
        password: string,
        gender: string
    }
}
const initialState: stateType = {
    isAuthenticated: AuthStorage.getItem("isAuthenticated"),
    registerDetail: {
        fullname: "",
        email: "",
        password: "",
        gender: "male"
    }
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
        }
    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer