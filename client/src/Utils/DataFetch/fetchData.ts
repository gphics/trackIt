import cookieOps from "../AuthStorage/cookieStore"


export default async function fetchData(url: string, method = "GET", body?: any, file = false) {
    const baseUrl = import.meta.env.VITE_API_URL
    const _at_: string | undefined = cookieOps.get("_at_")
    let api: string = baseUrl + url
    if (_at_) {
        api = `${api}?auth_token=${_at_}`
    }
    try {
        let first: any = {}
        if (method === "GET" || method === "DELETE") {
            first = await fetch(api, { method, headers: { "Content-Type": "application/json" } })
        } else if (method !== "GET" && file) {
            first = await fetch(api, { method, body })

        } else {

            first = await fetch(api, { method, body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
        }
        type sec = { err: string, data: { data: object | string, auth_token?: string } }
        const second: sec = await first.json()

        if (second.err) {
            if (second.err === "you are not authenticated") {
                cookieOps.remove("_at_")
            }
            // @ts-ignore
            return { data: null, err: second.err?.message }
        }
        const { auth_token, data } = second.data
        if (auth_token) {
            cookieOps.set("_at_", auth_token)
        }
        return { data, err: null }

    } catch (error: any) {
        return { data: null, err: error.message }
    }
}

