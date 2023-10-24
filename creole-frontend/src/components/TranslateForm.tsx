import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import {
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Textarea } from "@/components/ui/textarea"
import SubmitError from "@/components/SubmitError";
import formSchema from "./Translate/schema";
import getEntry from "../lib/getEntry";
import AdvancedOptions from "./Translate/AdvancedOptions";

import { URL } from "@/Models/url";
import React, { SetStateAction, useState, useEffect } from "react";
import translate from "./Translate/translateRequest";

async function getRandomPair() {
    return await getEntry('entries/random/') as { text: string, translation: string }
}

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
const TranslateForm = (props: { setOpen: React.Dispatch<SetStateAction<boolean>>, setFormSubmitted: React.Dispatch<SetStateAction<boolean>> }) => {
    const [isError, setIsError] = useState(false)
    const [translating, setTranslating] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            english: "",
            creole: "",
            context_text: "They are already burnt",
            prompt: "Translate the following english text and provide the resulting Guyanese Creole translation. Please ensure that the translation is clear and accurate. Guyanese Creole is spoken in Guyana and is characterized by its unique vocabulary and grammar. Try to maintain the cultural nuances and colloquialisms if applicable."
        }
    })


    function onSave(values: z.infer<typeof formSchema>) {
        submitEntry(values).then((success: boolean) => {
            if (success) {
                props.setFormSubmitted(true)
                props.setOpen(false)
            }
            else
                setIsError(true)
        })
    }

    const onClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        event.preventDefault()

        const value = form.getValues('english')
        const prompt = form.getValues('prompt')
        const context_text = form.getValues('context_text')

        if (value.length > 2) {
            setTranslating(true)
            const english: { text: string, prompt: string, context_text: string } = {
                text: value,
                prompt: prompt,
                context_text: context_text,
            }

            translate(english).then((data: { translatedText: string }) => {
                setTranslating(false)
                form.setValue('creole', data.translatedText)
            })
        }
    }

    useEffect(() => {
        getRandomPair().then((data: { text: string, translation: string }) => {
            const context_text = `Text: ${data.text}\nTranslation: ${data.translation}`
            form.setValue('context_text', context_text)
        })
    }, [])


    let placeholder = translating ? "translating..." : "Creole Translation goes here"

    const onCancel = () => props.setOpen(false)


    return (

        <Form {...form}>
            {isError && <SubmitError></SubmitError>}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
                <div className="grid grid-cols-11 gap-4">
                    <div className="col-span-5">
                        <FormField
                            control={form.control}
                            name="english"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>English</FormLabel>
                                    <FormControl>
                                        <Textarea className="bg-white" rows={8} placeholder="Type English sentence here." {...field}>
                                        </Textarea>
                                    </FormControl>
                                </FormItem>
                            )} />

                        <AdvancedOptions form={form}></AdvancedOptions>

                    </div>
                    <div className="m-auto">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" onClick={(e) => onClick(e)} type="button">
                                        <DoubleArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Translate</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="my-auto col-span-5">
                        <FormField
                            control={form.control}
                            name="creole"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Creole</FormLabel>
                                    <FormControl>
                                        <Textarea rows={10} placeholder={placeholder} {...field} >
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

export default TranslateForm