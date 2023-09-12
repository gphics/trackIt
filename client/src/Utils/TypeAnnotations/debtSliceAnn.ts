export default interface debtSliceAnn {
    sort: string,
    debts: [],
    singleDebt: object,
    sortedDebts: [],
    debtCreate: {
        title: string, amount: number, incuredDate: string, deadline: string, paid: boolean, debtInfo: string, category: "to_be_collected", debtorInfo: { name: string, location: string, contact: number }, creditorInfo: { name: string, location: string, contact: number }
    }
}