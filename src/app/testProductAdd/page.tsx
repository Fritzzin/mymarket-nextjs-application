
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProductAddForm from "@/components/ProductAddForm";
import { Button } from "@/components/ui/button";

export default function testProductAdd() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <div className="flex flex-col grow items-center p-4 gap-10">
                <ProductAddForm />
                <Button
                    className="cursor-pointer"
                    type="submit"
                    form="form-add-product"
                >
                    Submit
                </Button>
            </div>
        </SidebarProvider>
    )
}