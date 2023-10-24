import * as z from "zod"

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
    prompt: z.string().min(10, {
        message: "Prompt must have at least two characters"
    }),
})

export default formSchema