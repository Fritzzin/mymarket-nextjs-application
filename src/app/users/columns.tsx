"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Gender } from "@/lib/enums/gender";
import { Formatter } from "@/lib/formatter";
import { User } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original;
            return <div className="">{user.name} {user.lastName}</div>
        }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const gender = parseInt(row.getValue('gender'));
            return <div className="">{Gender[gender]}</div>
        }
    },
    {
        accessorKey: "birthDate",
        header: "Birth Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("birthDate"));
            const formatted = Formatter.formatDate(date)
            return <div className="">{formatted}</div>
        }
    },
    {
        accessorKey: "createdOn",
        header: "Created On",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdOn"));
            const formatted = Formatter.formatDate(date)
            return <div className="">{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.email)}
                        >
                            <Copy /> Copy SKU
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <Edit />  Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem variant="destructive" className="bg-red">
                            <Trash /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]