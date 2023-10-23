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


import SubmitError from "@/components/SubmitError";
import AdvancedOptions from "./Translate/AdvancedOptions";

import React, { SetStateAction, useState, useEffect } from "react";
import getEntry from "../lib/getEntry";
import formSchema from "./Translate/schema";
import translate from "./Translate/translateRequest";
import TranslateButton from "./Translate/TranslateButton";
import SubmitButton from "./Translate/SubmitButton";

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

async function getRandomPair() {
    return await getEntry('entries/random/') as { text: string, translation: string }
}

const TranslateFormAlt = (props: { setOpen: React.Dispatch<SetStateAction<boolean>>, setFormSubmitted: React.Dispatch<SetStateAction<boolean>> }) => {
    const [isError, setIsError] = useState(false)
    const [translating, setTranslating] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            english: "",
            creole: "",
            context_text: "",
            prompt: "Translate the following Guyanese creole text and provide the resulting English translation. Please ensure that the translation is clear and accurate. Guyanese Creole is spoken in Guyana and may include unique vocabulary and grammar. Try to capture the original meaning while making it comprehensible in English."
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

    useEffect(() => {
        getRandomPair().then((data: { text: string, translation: string }) => {
            const context_text = `Text: ${data.translation}\nTranslation: ${data.text}`
            form.setValue('context_text', context_text)
        })
    }, [])

    const onClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        event.preventDefault()

        const value = form.getValues('creole')
        const prompt = form.getValues('prompt')
        const context_text = form.getValues('context_text')

        if (value.length > 2) {
            setTranslating(true)
            const data: { text: string, prompt: string, context_text: string } = {
                text: value,
                prompt: prompt,
                context_text: context_text,
            }

            translate(data).then((data: { translatedText: string }) => {
                setTranslating(false)
                form.setValue('english', data.translatedText)
            })
        }
    }

    let placeholder = translating ? "translating..." : "English Translation goes here"

    return (
        <Form {...form}>
            {isError && <SubmitError></SubmitError>}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                <div className="grid grid-cols-11 gap-4">
                    <div className="col-span-5">
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

                        <AdvancedOptions form={form}></AdvancedOptions>
                    </div>
                    
                    <div className="m-auto">
                        <TranslateButton onClick={onClick} />
                    </div>


                    <div className="my-auto col-span-5">
                        <FormField
                            control={form.control}
                            name="english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English</FormLabel>
                                    <FormControl>
                                        <Textarea rows={8} placeholder={placeholder} {...field} >
                                        </Textarea>
                                    </FormControl>
                                </FormItem>
                            )} />
                            <SubmitButton setOpen={props.setOpen}></SubmitButton>
                        </div>
                    </div>
            </form>
        </Form>
    )
}

export default TranslateFormAlt