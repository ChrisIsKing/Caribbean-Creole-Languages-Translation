import { ColumnDef } from "@tanstack/react-table"
import type {Entry} from "../Models/Entry";

export const columns: ColumnDef<Entry>[] = [
    {
        accessorKey: 'english',
        header: 'English',
    },
    {
        accessorKey: 'creole',
        header: 'Creole',
    },
]