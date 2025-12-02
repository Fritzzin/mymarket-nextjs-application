"use client"

import { ProductCategory } from "@/enums/productCategory";
import { Formatter } from "@/lib/formatter";
import { Product } from "@/types/product"
import { ColumnDef, Row } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductRepository from "@/repositories/productRepository";
import ProductService from "@/services/productService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const repository = new ProductRepository();
const service = new ProductService(repository);

function Actions({ row }: { row: Row<Product> }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const product = row.original;

    const deleteProduct = async () => {
        const isDeleted = service.deleteOne(product.id || "");
        toast.promise(isDeleted, {
            loading: "Sending product's information...",
            success: (response) => {
                console.log(response);
                if (response) {
                    router.refresh();
                    return `${product.name} has been deleted!`
                } else {
                    throw Error;
                }
            },
            error: `Error while deleting ${product.name}.`
        })
    }

    const copyToClipboard = async () => {
        navigator.clipboard.writeText(product.sku)
    }

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
                <DropdownMenuItem onClick={copyToClipboard}>
                    <Copy /> Copy SKU
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Edit />  Edit
                </DropdownMenuItem>

                <DropdownMenuItem variant="destructive" className="bg-red" onClick={deleteProduct}>
                    <Trash /> Delete
                </DropdownMenuItem >
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Product",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "productCategory",
        header: "Category",
        cell: ({ row }) => {
            const category = parseInt(row.getValue('productCategory'));
            return <div className="">{ProductCategory[category]}</div>
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price")); // buscar valor da linha
            const formatted = Formatter.formatCurrency(price); // formatar
            return <div className="text-right">{formatted}</div> // devolver valor formatado
        }
    },
    {
        accessorKey: "stock",
        header: () => <div className="text-right">Stock</div>,
        cell: ({ row }) => <div className="text-right">{row.getValue("stock")}</div>
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        id: "actions",
        cell: (info) => <Actions row={info.row} />,
    }
]