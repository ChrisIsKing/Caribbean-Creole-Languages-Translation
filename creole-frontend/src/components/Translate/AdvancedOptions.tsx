import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import type { UseFormReturn } from "react-hook-form"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"

const AdvancedOptions = (props: {
    form: UseFormReturn<{
        prompt: string;
        context_text: string;
        english: string;
        creole: string;
    }, any, undefined>
}) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Advanced Options</AccordionTrigger>
                <AccordionContent>
                    <FormField
                        control={props.form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chat GPT Prompt</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} className="my-2 text-sm"  {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <div className="rounded-lg mt-3">
                        <FormField
                            control={props.form.control}
                            name="context_text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Context Text</FormLabel>
                                    <FormControl>
                                        <Textarea rows={6} className="my-2 text-sm"  {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default AdvancedOptions;
