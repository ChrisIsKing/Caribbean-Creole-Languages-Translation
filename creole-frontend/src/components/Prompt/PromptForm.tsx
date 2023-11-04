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

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import formSchema from "./schema";
import getEntry from "@/lib/getEntry";

import {useState, useEffect} from "react";
import { URL } from "@/Models/url";

interface Prompt {
    id: number,
    english2creole: string,
    creole2english: string,
    updated_at: Date,   
}

async function fetchPrompt(): Promise<Prompt>{
    return await getEntry('prompts/') as Prompt
}

async function submitPrompt(data: Prompt){
    const response = await fetch(URL + 'prompts/update/', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })


    return response.status === 200;
}



const PromptForm = () => {
    const [id, setId] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            english2creole: "",
            creole2english: "",
        }
    })

    useEffect(() => {
        fetchPrompt().then(prompt => {
            setId(prompt.id)
            form.setValue("english2creole", prompt.english2creole)
            form.setValue("creole2english", prompt.creole2english)
        })
        }, [])

    function onSave(values: z.infer<typeof formSchema>) {
        const prompt: Prompt = {
            id: id,
            english2creole: values.english2creole,
            creole2english: values.creole2english,
            updated_at: new Date()
        }



        submitPrompt(prompt).then((success: boolean) => {
            if (success) {
                setIsSubmitted(true)
            }
            else
                console.log("error")
        })
    }


    return (
        <Form {...form}>
            {isSubmitted && (
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <span className="font-medium">Info!</span> Prompts Updated
            </div>
            )}

            <form onSubmit={form.handleSubmit(onSave)}>
                <FormField
                    control={form.control}
                    name="english2creole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>English to Creole Prompt
                                <FormControl>
                                    <Textarea rows={8} {...field}></Textarea>
                                </FormControl>
                            </FormLabel>
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="creole2english"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Creole to English Prompt
                                <FormControl>
                                    <Textarea rows={8} {...field}></Textarea>
                                </FormControl>
                            </FormLabel>
                        </FormItem>
                    )} />
                <div className="my-2">
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Form>
    )
}

export default PromptForm;