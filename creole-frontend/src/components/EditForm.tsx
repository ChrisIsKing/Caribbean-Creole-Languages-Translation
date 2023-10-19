import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form";

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {Entry} from "@/Models/Entry.tsx";
import React, {SetStateAction, useState} from "react";
import SubmitError from "@/components/SubmitError.tsx";
import {URL} from "@/Models/url";

const formSchema = z.object({
    english: z.string().min(2, {
        message: "English must be at least 2 characters"
    }),
    creole: z.string().min(1, {
        message: "Creole must have at least one character"
    }),
})

async function update(data: Entry){
    return await fetch(URL + 'entries/edit/', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

const EditForm = (props: {entry: Entry, setOpen : React.Dispatch<SetStateAction<boolean>>, setFormUpdated: React.Dispatch<SetStateAction<boolean>>}) => {
    const [isError, setIsError] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            english: props.entry.english,
            creole: props.entry.creole,
        }
    })

    function onUpdate(values: z.infer<typeof formSchema>){
        const data: Entry = {
            id: props.entry.id,
            english: values.english,
            creole: values.creole,
            created_at: props.entry.created_at
        }

        update(data).then(response =>{
            if(response.status === 200){
                props.setFormUpdated(true)
                props.setOpen(false)
            }else{
                setIsError(true)
            }
        })
    }

    const onCancel = () => props.setOpen(false)

    return (
        <Form {...form}>
            {isError && <SubmitError></SubmitError>}
            <form  onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
                <FormField
                    control={form.control}
                    name = "english"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>English</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type English sentence here." {...field}>
                                </Textarea>
                            </FormControl>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name = "creole"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Creole</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Creole Translation goes here" {...field} >
                                </Textarea>
                            </FormControl>
                        </FormItem>
                    )}/>
                <Button variant="outline" name="cancel" onClick={onCancel} type="button">Cancel</Button><Button type="submit">Update</Button>
            </form>
        </Form>
    )
}

export default EditForm