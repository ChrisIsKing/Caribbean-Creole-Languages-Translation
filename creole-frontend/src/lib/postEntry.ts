import {URL} from '../Models/url'

async function postEntry(data : {english: string, creole: string}){
    const response = await fetch(URL + 'entries/add/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response
}

export default postEntry