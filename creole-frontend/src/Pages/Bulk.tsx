import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Bulk = () => {
    const fileReader = new FileReader()

    const handleChosenFile = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0]
        fileReader.readAsText(file)
        fileReader.onloadend = () =>{
            console.log(fileReader.result)
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