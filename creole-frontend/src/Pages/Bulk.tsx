import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { Progress } from "@/components/ui/progress"

import { Input } from "@/components/ui/input"
import parseFile from "@/lib/parseFile"

import { useState } from "react"
import postEntry from "../lib/postEntry"





const Bulk = () => {
    const [progress, setProgress] = useState<number>(0)
    const [data, setData] = useState<{ english: string, creole: string }[]>([])
    const [disabled, setDisabled] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>(false)

    const fileReader = new FileReader()

    const handleChosenFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.log("Something went wrong")
            return
        }

        const file = e.target.files[0]

        fileReader.readAsText(file)
        fileReader.onloadend = () => {
            let pairs = parseFile(fileReader.result)
            if (pairs.length > 0) {
                setData(pairs)
                setDisabled(false)
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (data.length === 0) {
            return
        }

        for (let i = 0; i < data.length; i++) {
            let response = postEntry('entries/add/', data[i])
            response.then((res) => {
                if (res.status === 200) {
                    setProgress((i + 1) / data.length * 100)
                }
            })
            setSuccess(true)
        }
    }


    return (
        <>
            <div className="container">
                {success && (
                    <Alert className="my-4">
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle>Good Job</AlertTitle>
                        <AlertDescription>
                            Database updated successfully
                        </AlertDescription>
                    </Alert>
                )}

                <Card className="w-96 p-4 mt-2">



                    <CardTitle>
                        Bulk Translate
                    </CardTitle>
                    <CardDescription className="p-2">
                        Upload a text file with one entry per line.
                    </CardDescription>
                    <CardContent>

                        <div>
                            <form onSubmit={handleSubmit}>
                                <Input id="picture" type="file" onChange={handleChosenFile} className="my-2" />
                                <Button disabled={disabled}>Upload</Button>
                            </form>

                        </div>
                    </CardContent>

                    <CardContent>
                        <Progress value={progress} max={100}></Progress>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Bulk