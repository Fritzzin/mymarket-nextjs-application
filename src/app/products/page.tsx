import AppSidebar from "@/components/AppSidebar";
import { DataTable } from "@/components/GenericTable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Product } from "@/types/product";
import { columns } from "./columns";
import ProductRepository from "@/repositories/productRepository";


export default async function Products() {
    const repository = new ProductRepository();
    const products = await repository.listAll();

    let data: Product[] = [];

    if (products.length > 0) {
        data = products;
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <div className="flex flex-col grow items-center p-4 gap-10">
                <h1 className="text-center text-4xl font-bold">List of Products</h1>

                <div className="w-full rounded border">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
            {/* content */}

        </SidebarProvider>
    )
}