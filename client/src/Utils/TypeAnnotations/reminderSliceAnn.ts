export default interface reminderSliceAnn {
    reminderCreate: {
        title: string, note: string, dueDate: "",
        repeat: boolean,
        repetitionInterval: string
    },
    singleReminder: object,
    allReminders:[]
}