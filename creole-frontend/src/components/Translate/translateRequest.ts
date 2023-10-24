import postEntry from "../../lib/postEntry";

async function translate(value: { text: string }) {
    const response = await postEntry('infer/', value)
    return response.json()
}

export default translate