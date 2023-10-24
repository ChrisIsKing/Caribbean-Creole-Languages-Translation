import {URL} from '../Models/url'

async function postEntry(endpoint: string, data : {}): Promise<any>{
    const response = await fetch(URL + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response
}

export default postEntry