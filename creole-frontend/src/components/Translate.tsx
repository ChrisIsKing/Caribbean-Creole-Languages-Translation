
import TranslateForm from "@/components/TranslateForm.tsx";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, {useState} from "react";
const Translate = (props : {setFormSubmitted : React.Dispatch<React.SetStateAction<boolean>>}) => {
    let [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">New Translation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>New Translate Entry</DialogTitle>
                    <DialogDescription>
                        Add new translation here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <TranslateForm setOpen={setOpen} setFormSubmitted={props.setFormSubmitted}></TranslateForm>
            </DialogContent>
        </Dialog>
    )
}

export default Translate