import { createSlice } from "@reduxjs/toolkit";
import debtSliceAnn from "../Utils/TypeAnnotations/debtSliceAnn";

const initialState: debtSliceAnn = {
    sort: "all",
    debts: [],
    singleDebt: {},
    sortedDebts: [],
    debtCreate: {
        title: "", amount: +"", incuredDate: "", deadline: "", paid: false, debtInfo: "", category: "to_be_collected", debtorInfo: { name: "", location: "", contact: +"" }, creditorInfo: { name: "", location: "", contact: +"" }
    }
}


const debtSlice = createSlice({
    name: "debtSlice",
    initialState, reducers: {
        setDebtsFromUser: (state: any, action: any) => {
            state.debts = action.payload
            state.sortedDebts = action.payload
        },
        updateSort: (state: any, action: any) => {
            const newSort = action.payload.value
            if (newSort === "all") {
                state.sortedDebts = state.debts
            }
            if (newSort === "to_be_paid") {
                state.sortedDebts = state.debts.filter((elem: any) => elem.category === newSort)
            }
            if (newSort === "to_be_collected") {
                state.sortedDebts = state.debts.filter((elem: any) => elem.category === newSort)

            }
            if (newSort === "paid") {
                state.sortedDebts = state.debts.filter((elem: any) => elem.paid)

            }
            if (newSort === "not_paid") {
                state.sortedDebts = state.debts.filter((elem: any) => !elem.paid)

            }
            action.payload = newSort

        },
        updateDebtCreate: (state: any, action: any) => {
            const { name, value, nameContainer } = action.payload
            if (nameContainer) {
                state.debtCreate[nameContainer][name] = value
            } else {
                state.debtCreate[name] = value
            }

        },
        clearDebtCreate: (state: any) => {
            state.debtCreate = {
                title: "", amount: +"", incuredDate: "", deadline: "", paid: false, debtInfo: "", category: "to_be_collected", debtorInfo: { name: "", location: "", contact: +"" }, creditorInfo: { name: "", location: "", contact: +"" }
            }
        },
        fillSingleDebt: (state: any, action: any) => {
            state.singleDebt = action.payload
        }, clearSingleDebt: (state: any) => {
            state.singleDebt = {}
        },
        fillDebtCreate: (state: any, action: any) => {
            state.debtCreate = action.payload
        },
        fullDebtClear: (state: any) => {
            return {
                ...state,
                sort: "all",
                debts: [],
                singleDebt: {},
                sortedDebts: [],
                debtCreate: {
                    title: "", amount: +"", incuredDate: "", deadline: "", paid: false, debtInfo: "", category: "to_be_collected", debtorInfo: { name: "", location: "", contact: +"" }, creditorInfo: { name: "", location: "", contact: +"" }

                }
            }
        }
    }
})
export const debtSliceActions = debtSlice.actions
export default debtSlice.reducer