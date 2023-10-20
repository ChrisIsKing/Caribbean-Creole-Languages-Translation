import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import parseFile from "@/lib/parseFile"

const Bulk = () => {
    const fileReader = new FileReader()

    const handleChosenFile = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.log("Something went wrong")
            return
        }

        const file = e.target.files[0]

        fileReader.readAsText(file)
        fileReader.onloadend = () => {
            let data = parseFile(fileReader.result)
            console.log(data)
        }

    }

    return (
        <>
            <div className="container">
                <Card className="w-96 p-4 mt-2">
                    <CardTitle>
                        Bulk Translate
                    </CardTitle>
                    <CardDescription>
                        Upload a text file with one entry per line.
                    </CardDescription>
                    <CardContent>
                    <div>
                        <Input id="picture" type="file" onChange={handleChosenFile} />
                        <Button>Upload</Button>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Bulk