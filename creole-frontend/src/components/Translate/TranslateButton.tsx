import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"

import {
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const TranslateButton = ({ onClick }: Props) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={(e) => onClick(e)} type="button">
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Translate</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default TranslateButton