import React, {useState, useEffect, SetStateAction} from "react";
import type {Entry} from "../Models/Entry";
import { DataTable } from "./DataTable";
import {columns} from "./columns"
import getEntry from "../lib/getEntry";

async function fetchEntries(): Promise<Entry[]> {
    return await getEntry('entries/') as Entry[]
}

const List = (props: {
    formSubmitted: boolean,
    formUpdated: boolean,
    setFormUpdated: React.Dispatch<SetStateAction<boolean>>,
    entryDeleted: boolean,
    setEntryDeleted: React.Dispatch<SetStateAction<boolean>>}) => {

    const [entries, setEntries] = useState<Entry[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    
    useEffect(() => {
        console.log("fetching entries")
        fetchEntries().then(entries => setEntries(entries))
        console.log("fetched entries")
    }, [props.formSubmitted, props.formUpdated, props.entryDeleted])

    return (
        <>
            <div>
                <DataTable columns={columns} data={entries} setFormUpdated={props.setFormUpdated} setEntryDeleted={props.setEntryDeleted}/>
            </div>
        </>

    );
}

export default List