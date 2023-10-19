import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import SubmitError from "@/components/SubmitError";

import {URL} from "@/Models/url";
import React, {SetStateAction, useState} from "react";

const formSchema = z.object({
    english: z.string().min(2, {
        message: "English must be at least 2 characters"
    }),
    creole: z.string().min(1, {
        message: "Creole must have at least one character"
    }),
})

async function translate(value: {text: string}){
    const response = await fetch(URL + 'infer/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
    })

    return response.json()
}

async function submitEntry(data : {english: string, creole: string}){
    const response = await fetch(URL + 'entries/add/', {
        method: 'POST',
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data)
    })
    console.log(response)
    return response.status === 200;
}
const TranslateForm = (props: {setOpen : React.Dispatch<SetStateAction<boolean>>, setFormSubmitted : React.Dispatch<SetStateAction<boolean>>}) =>{
    const [isError, setIsError] = useState(false)
    const [translating, setTranslating] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            english: "",
            creole: "",
        }
    })


    function onSave(values: z.infer<typeof formSchema>){

        submitEntry(values).then((success:boolean) => {

            if(success){
                props.setFormSubmitted(true)
                props.setOpen(false)
            }
            else
                setIsError(true)
        })

    }

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setTranslating(true)
        const value:string = event.target.value

        if(value.length > 2){

            const english: {text: string}  = {
                text: value
            }

            translate(english).then((data : {translatedText: string}) => {
                setTranslating(false)
                form.setValue('creole', data.translatedText)
            })
        }
    }


    let placeholder = translating ? "translating..." : "Creole Translation goes here"

    const onCancel = () => props.setOpen(false)


    return (

        <Form {...form}>
            {isError && <SubmitError></SubmitError>}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                <FormField
                    control={form.control}
                    name = "english"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>English</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type English sentence here." {...field} onBlur={(e) => handleBlur(e)}>
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
                                <Textarea placeholder={placeholder} {...field} >
                                </Textarea>
                            </FormControl>
                        </FormItem>
                    )}/>
                <Button variant="outline" name="cancel" onClick={onCancel} type="button">Cancel</Button><Button type="submit">Save</Button>
            </form>
        </Form>
    )
}

export default TranslateForm