import List from "../components/List"
import Translate from "../components/Translate";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import {useState} from "react";
import SubmitSuccess from "@/components/SubmitSuccess";
const Main = () => {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formUpdated, setFormUpdated] = useState(false)
    const [entryDeleted, setEntryDeleted] = useState(false)

    return (
        <div className="container mt-5">

            <Card className="w-[800px]">
                <CardHeader>
                    <CardTitle>List of Entries</CardTitle>
                    <CardContent>
                        {formSubmitted && <SubmitSuccess status={"Submitted"}></SubmitSuccess>}
                        {formUpdated && <SubmitSuccess status={"Updated"}></SubmitSuccess>}
                    </CardContent>
                    <CardContent className="flex content-normal">
                        <Translate setFormSubmitted={setFormSubmitted}></Translate>
                    </CardContent>
                </CardHeader>
                <CardContent>
                    <List formSubmitted={formSubmitted} formUpdated={formUpdated} setFormUpdated={setFormUpdated}
                          entryDeleted={entryDeleted} setEntryDeleted={setEntryDeleted}></List>
                </CardContent>
            </Card>
        </div>
    )
}

export default Main