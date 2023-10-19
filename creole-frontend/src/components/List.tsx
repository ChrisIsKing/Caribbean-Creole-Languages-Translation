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
import DeleteDialog from "@/components/DeleteDialog.tsx";


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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>English</TableHead>
                        <TableHead>Creole</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map(entry => (
                        <TableRow key={entry.id}>
                            <TableCell className="text-left">{entry.english}</TableCell>
                            <TableCell className="text-left">{entry.creole}</TableCell>
                            <TableCell className="text-left">
                                <Edit entry={entry} setFormUpdated={props.setFormUpdated}></Edit>
                                <DeleteDialog id = {entry.id} setEntryDeleted={props.setEntryDeleted}></DeleteDialog>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </>

    );
}

export default List