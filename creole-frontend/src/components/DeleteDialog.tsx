import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {URL} from "@/Models/url"
import React, {SetStateAction} from "react";

async function deleteEntry(id: Number) {
    return await fetch(URL + "entries/delete/" + id, {
        method: 'DELETE'
    })
}


const DeleteDialog = (props : {id: number, setEntryDeleted: React.Dispatch<SetStateAction<boolean>>}) => {
    const deleteAction = () => {
        props.setEntryDeleted(false)
        deleteEntry(props.id).then((response) => {
                if(response.status === 200){
                    props.setEntryDeleted(true)
                }
                else{
                    //show an error
                }
            }
        )
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="link">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the entry from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAction}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog