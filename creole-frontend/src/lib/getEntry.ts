import {URL} from '../Models/url'

async function getEntry (endpoint : string) : Promise<{}> {
    const response = await fetch(URL + endpoint)
    return await response.json()
}

export default getEntry