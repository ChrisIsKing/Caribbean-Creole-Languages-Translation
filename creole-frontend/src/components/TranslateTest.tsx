import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const translateTest = () =>{
    return (
        <div className="container">
            <Card className="my-4">
                <CardContent>
                    <form>
                        <div className="grid grid-cols-11">
                            <div className="mr-4 col-span-5">
                                <Label htmlFor="english">English</Label>
                                <Textarea rows={4} placeholder="Type your English sentence here." />
                                <Label htmlFor="prompt">Prompt</Label>
                                <Textarea rows={4}
                                placeholder="Translate the text and provide the resulting Guyanese Creole translation. Please ensure that the translation is clear and accurate. Guyanese Creole is spoken in Guyana and is characterized by its unique vocabulary and grammar. Try to maintain the cultural nuances and colloquialisms if applicable." />
                                <div className="border border-gray-200 rounded-lg p-4 my-2">
                                    <h1 className="text-center">Context</h1>
                                    <Label htmlFor="text" className="text-xs">Text</Label>
                                    <Input type="text" className="my-2 text-xs" placeholder="They are already burnt" />
                                    <Label htmlFor="translation" className="text-xs">Translation</Label>
                                    <Input type="text" className="my-2 text-xs" placeholder="Dem bon aredii" />
                                </div>
                            </div>
                            <div className="m-auto">
                                <h1>Translate</h1>
                                <Button variant="outline" size="icon">
                                    <DoubleArrowRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="ml-4 col-span-5 my-auto">
                                <Label htmlFor="creole">Creole</Label>
                                <Textarea rows={8} placeholder="Type your Creole sentence here." />
                                <Button variant="outline" name="cancel" type="button" className="mr-1">Cancel</Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>


            </Card>
        </div>
    )
}

export default translateTest