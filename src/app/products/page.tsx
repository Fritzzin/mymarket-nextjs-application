
import AppSidebar from "@/components/AppSidebar";
import { DataTable } from "@/components/GenericTable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { columns } from "./columns";
import { Product } from "@/types/product";
import ProductService from "@/services/productService";
import ProductRepository from "@/repositories/productRepository";


export default async function Products() {

    const repository = new ProductRepository();
    const service = new ProductService(repository);
    const products: Product[] = await service.list();

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