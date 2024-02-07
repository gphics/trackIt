import Cookie from "js-cookie"

class Main {
    get(key: string): string | undefined {
        const res: string | undefined = Cookie.get(key)
        return res
    }
    set(key: string, value: string): void {
        if (Cookie.get(key)) {
            Cookie.remove(key)
        }
        Cookie.set(key, value, { expires: 1 })
    }
    remove(key: string) {
        Cookie.remove(key)
    }
    isAuth(): boolean {
        const auth = this.get("_at_")
        return auth ? true : false
    }
}

const cookieOps = new Main()
export default cookieOps