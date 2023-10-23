
import TranslateForm from "@/components/TranslateForm";
import TranslateFormAlt from "./TranslateFormAlt";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import React, { useState } from "react";
const Translate = (props: { setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>> }) => {
    let [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">New Translation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle className="text-center">New Translate Entry</DialogTitle>
                    <DialogDescription className="text-center">
                        Add new translation here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="translate" >
                    <TabsList className = "w-full">
                        <TabsTrigger value="translate">English to Creole</TabsTrigger>
                        <TabsTrigger value="translateAlt">Creole to English</TabsTrigger>
                    </TabsList>
                    <TabsContent value="translate">
                        <TranslateForm setOpen={setOpen} setFormSubmitted={props.setFormSubmitted}></TranslateForm>
                    </TabsContent>
                    <TabsContent value="translateAlt">
                        <TranslateFormAlt setOpen={setOpen} setFormSubmitted={props.setFormSubmitted}></TranslateFormAlt>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default Translate