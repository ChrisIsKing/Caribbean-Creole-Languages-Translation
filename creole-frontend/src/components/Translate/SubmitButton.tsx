import React, { SetStateAction } from "react";
import { Button } from "@/components/ui/button"

const SubmitButton = (props: {setOpen: React.Dispatch<SetStateAction<boolean>>}) => {
    const onCancel = () => props.setOpen(false)
    
    return (
        <div className="my-2">
            <Button variant="outline" name="cancel" onClick={onCancel} type="button" className="mr-1">Cancel</Button>
            <Button type="submit">Save</Button>
        </div>
    )
}

export default SubmitButton