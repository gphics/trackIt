

class AuthStorage {
    setItem(key: string, value: string): void {
        sessionStorage.setItem(key, value)
    }
    getItem(key: string): boolean {
        const data = sessionStorage.getItem(key)

        return data === "true" ? true : false
    }
    removeItem(key: string): void {
        sessionStorage.removeItem(key)
    }
}

export default new AuthStorage()