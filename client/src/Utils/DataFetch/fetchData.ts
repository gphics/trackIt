export default async function fetchData(url: string, method = "GET", body?: any, file = false) {
    const baseUrl = import.meta.env.VITE_API_URL
    console.log(baseUrl)
    try {
        let first = {}
        if (method === "GET" || method === "DELETE") {
            first = await fetch(baseUrl + url, { credentials: "include", method, headers: { "Content-Type": "application/json" } })
        } else if (method !== "GET" && file) {
            first = await fetch(baseUrl + url, { credentials: "include", method, body})

        } else {
    
            first = await fetch(baseUrl + url, { credentials: "include", method, body: JSON.stringify(body), headers: { "Content-Type":"application/json" } })
        }
        // @ts-ignore
        const second = await first.json()
        if (second.status) {
            throw new Error(second.message)

        }
        return second
    } catch (error: any) {
        return error.message
    }
}

