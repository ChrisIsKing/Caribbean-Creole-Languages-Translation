import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import SubmitError from "@/components/SubmitError";

import React, { SetStateAction, useState } from "react";

const formSchema = z.object({
    english: z.string().min(2, {
        message: "English must be at least 2 characters"
    }),
    creole: z.string().min(1, {
        message: "Creole must have at least one character"
    }),
})

import { URL } from "@/Models/url";

async function submitEntry(data: { english: string, creole: string }) {
    const response = await fetch(URL + 'entries/add/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return response.status === 200;
}


const TranslateFormAlt = (props: { setOpen: React.Dispatch<SetStateAction<boolean>>, setFormSubmitted: React.Dispatch<SetStateAction<boolean>> }) => {
    const [isError, setIsError] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            english: "",
            creole: "",
        }
    })

    const onSave = async (values: z.infer<typeof formSchema>) => {
        submitEntry(values).then((success: boolean) => {
            if (success) {
                props.setFormSubmitted(true)
                props.setOpen(false)
            }
            else
                setIsError(true)
        })
    }

    const onCancel = () => props.setOpen(false)

    return (
        <Form {...form}>
            {isError && <SubmitError></SubmitError>}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="creole"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Creole</FormLabel>
                                    <FormControl>
                                        <Textarea className="bg-white" rows={8} placeholder="Type Creole sentence here." {...field}>
                                        </Textarea>
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>
                    
                    <div>
                        <FormField
                            control={form.control}
                            name="english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English</FormLabel>
                                    <FormControl>
                                        <Textarea rows={8} placeholder="Type English Sentence here" {...field} >
                                        </Textarea>
                                    </FormControl>
                                </FormItem>
                            )} />
                            <div className="my-2">
                            <Button variant="outline" name="cancel" onClick={onCancel} type="button" className="mr-1">Cancel</Button>
                            <Button type="submit">Save</Button>
                            </div>
                        </div>
                    </div>
            </form>
        </Form>
    )
}

export default TranslateFormAlt