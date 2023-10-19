import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
function submitSuccess(props: {status: string}){
    return (
        <Alert>
            <AlertDescription>
                Entry was {props.status}
            </AlertDescription>
        </Alert>
    )
}

export default submitSuccess