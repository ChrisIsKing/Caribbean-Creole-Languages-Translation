import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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

import { URL } from "@/Models/url";
import React, { SetStateAction, useState } from "react";

const formSchema = z.object({
    english: z.string().min(2, {
        message: "English must be at least 2 characters"
    }),
    creole: z.string().min(1, {
        message: "Creole must have at least one character"
    }),
    context_text: z.string().min(2, {
        message: "Context Text must have at least two characters"
    }),
    context_translation: z.string().min(2, {
        message: "Context Translation must have at least two characters"
    }),
    prompt: z.string().min(10, {
        message: "Prompt must have at least two characters"
    }),
})

async function translate(value: { text: string }) {
    const response = await fetch(URL + 'infer/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
    })

    return response.json()
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
            context_translation: "Dem bon aredii",
            prompt: "Translate the text and provide the resulting Guyanese Creole translation. Please ensure that the translation is clear and accurate. Guyanese Creole is spoken in Guyana and is characterized by its unique vocabulary and grammar. Try to maintain the cultural nuances and colloquialisms if applicable."
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
        const context_translation = form.getValues('context_translation')

        if (value.length > 2) {
            setTranslating(true)
            const english: { text: string, prompt: string, context_text: string, context_translation: string } = {
                text: value,
                prompt: prompt,
                context_text: context_text,
                context_translation: context_translation
            }

            translate(english).then((data: { translatedText: string }) => {
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

                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Advanced Options</AccordionTrigger>
                                <AccordionContent>
                                    <FormField
                                        control = {form.control}
                                        name="prompt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Chat GPT Prompt</FormLabel>
                                                <FormControl>
                                                    <Textarea rows={6} className="my-2 text-sm"  {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )} />
                                    <div className="border border-gray-200 rounded-lg p-4 my-2">
                                        <h1 className="text-center">Context</h1>
                                        <FormField
                                            control={form.control}
                                            name="context_text"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Text</FormLabel>
                                                    <FormControl>
                                                        <Input className="my-2 text-xs" placeholder="They are already burnt" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                        <FormField
                                            control={form.control}
                                            name="context_translation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Translation</FormLabel>
                                                    <FormControl>
                                                        <Input className="my-2 text-xs" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>

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