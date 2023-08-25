
export default async function fetchData(url: string, body?: any, method = "GET") {
    try {
        // const baseURL = "https://trackit-api.onrender.com"
        const baseURL = "http://localhost:9000/"
        // @ts-ignore

        let first: any = {}
        if (method === 'GET') {
            first = await fetch(baseURL + url, {
                credentials: "include",
                method,
                headers: { "Content-Type": "application/json" }
            })
        } else {
            first = await fetch(baseURL + url, {
                credentials: "include",
                method,
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
        }
        console.log("I am the first");
        const second = await first.json()
        console.log("I am the seccond", second);
        return second

    } catch (error) {
        return error
    }

}

