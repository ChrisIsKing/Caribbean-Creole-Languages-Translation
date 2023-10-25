import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import PromptForm from "@/components/Prompt/PromptForm";

const EditPrompt = () => {
    return (
        <div className="container">
            <Card className="w-96 mx-auto mt-2">
                <CardHeader>
                    <CardTitle className="mx-auto">Edit Default ChatGPT Prompt</CardTitle>    
                </CardHeader>
                <CardContent>
                    <PromptForm></PromptForm>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditPrompt;