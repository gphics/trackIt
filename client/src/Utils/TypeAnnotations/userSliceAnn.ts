export default interface stateType {
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
    user: object,
    basicUserUpdate: { fullname: string, gender: string, contact: number | string, location: string, },
    passwordUpdate: { newPassword: string, oldPassword: string },
    emailUpdate: { email: string },
}



