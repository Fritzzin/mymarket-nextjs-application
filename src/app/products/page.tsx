// "use client"

import AppSidebar from "@/components/AppSidebar";
import { DataTable } from "@/components/GenericTable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { columns } from "./columns";
import ProductRepository from "@/repositories/productRepository";
import { Product } from "@/types/product";
// import { useEffect, useState } from "react";



export default async function Products() {

    const repository = new ProductRepository();
    const products: Product[] = await repository.list();

    // const [products, setProducts] = useState<Product[]>([]);



    // useEffect(() => {
    //     async function loadProducts() {
    //         const data = await repository.list();
    //         setProducts(data);
    //     }
    //     loadProducts();
    // })


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <div className="flex flex-col grow items-center p-4 gap-10">
                <h1 className="text-center text-4xl font-bold">List of Products</h1>

                <div className="w-full rounded border">
                    <DataTable columns={columns} data={products} />
                </div>
            </div>
        </SidebarProvider>
    )
}