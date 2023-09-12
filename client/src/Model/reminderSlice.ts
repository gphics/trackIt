import { createSlice } from "@reduxjs/toolkit"
import reminderSliceAnn from "../Utils/TypeAnnotations/reminderSliceAnn"

const initialState: reminderSliceAnn = {
    singleReminder: {},
    allReminders: [],
    reminderCreate: { title: "", dueDate: "", repeat: false, repetitionInterval: "none", note: "" }
}

const reminderSlice = createSlice({
    name: "reminderSlice",
    initialState,
    reducers: {
        updateReminderCreate: (state: any, action: any) => {
            const { name, value } = action.payload
            state.reminderCreate[name] = value
        },
        clearReminderCreate: (state: any) => {
            state.reminderCreate = { title: "", dueDate: "", repeat: false, repetitionInterval: "", note: "" }
        },
        fullReminderClear: (state: any) => {
            return {
                ...state, singleReminder: {},
                allReminder: [],
                reminderCreate: { title: "", dueDate: "", repeat: false, repetitionInterval: "", note: "" }
            }
        },
        fillAllReminders: (state: any, action: any) => {
            state.allReminders = action.payload
        },
        fillSingleReminder: (state: any, action: any) => {
            state.singleReminder = action.payload
        },
        fillReminderCreate: (state: any, action: any) => {
            state.reminderCreate = action.payload
        }
    }
})
export const reminderSliceActions = reminderSlice.actions
export default reminderSlice.reducer