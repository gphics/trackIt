
class AuthStorage {
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }
    getItem(key: string): boolean {
        const data = localStorage.getItem(key)

        return data === "true" ? true : false
    }
    removeItem(key: string): void {
        localStorage.removeItem(key)
    }
}

export default new AuthStorage()