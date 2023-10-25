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

const PromptForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            english2creole: "",
            creole2english: "",
        }
    })

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name="english2creole"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>English to Creole Prompt
                                <FormControl>
                                    <Textarea rows={6} {...field}></Textarea>
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
                                    <Textarea rows={6} {...field}></Textarea>
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