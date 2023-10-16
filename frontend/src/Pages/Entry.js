import EntryEditForm from "../Components/EntryEditForm";
import EntryError from "../Components/EntryError";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

async function fetchEntry(id) {
    
    const response = await fetch(`https://translation-backend.csclarke.com/api/entries/${id}`);

    if(response.status === 200) {
        const entry = await response.json();
        return entry;
    } else{
        throw Error('Entry not found');
    }




}

const Entry = () => {
    const [entry, setEntry] = useState({});
    const [validEntry, setValidEntry] = useState(false);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetchEntry(id).then(entry => {
            setEntry(entry);
            setValidEntry(true);})
            .catch(error => {
                setValidEntry(false);
            });
    }, []);



    const Form = validEntry ? EntryEditForm  : EntryError;

    return(
        <div className="container">
            {validEntry ? <Form entry={entry} /> : <Form />}
        </div>
    )
}

export default Entry;