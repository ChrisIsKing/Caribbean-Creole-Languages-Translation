import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React, {useState, useEffect, SetStateAction} from "react";
import type {Entry} from "../Models/Entry";
import {URL} from "../Models/url"
import Edit from "@/components/Edit";
import DeleteDialog from "@/components/DeleteDialog";
import { DataTable } from "./DataTable";
import {columns} from "./columns"


async function fetchEntries(): Promise<Entry[]> {
    const response = await fetch(URL + 'entries/')
    return await response.json()
}

const List = (props: {
    formSubmitted: boolean,
    formUpdated: boolean,
    setFormUpdated: React.Dispatch<SetStateAction<boolean>>,
    entryDeleted: boolean,
    setEntryDeleted: React.Dispatch<SetStateAction<boolean>>}) => {

    const [entries, setEntries] = useState<Entry[]>([])

    useEffect(() => {
        fetchEntries().then(entries => setEntries(entries))

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