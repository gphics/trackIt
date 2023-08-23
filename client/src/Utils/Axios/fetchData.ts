
export default async function fetchData(url: string, body?: any, method = "GET") {
    try {
        // const baseURL = "https://trackit-api.onrender.com"
        const baseURL = "http://localhost:9000/"
        // @ts-ignore
        const first: any = method === "get" ? await fetch(baseURL + url) : await fetch(baseURL + url, {
            credentials: "include",
            method,
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json"}
        })
        const second = await first.json()
        return second

    } catch (error) {
        return error
    }

}

