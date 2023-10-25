import * as z from "zod";

const formSchema = z.object({
    english2creole: z.string().min(2, {
        message: "English must be at least 2 characters"
    }),
    creole2english: z.string().min(2, {
        message: "Creole must have at least 2 character"
    }),
});

export default formSchema;