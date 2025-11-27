import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/components/GenericTable";
import { columns } from "./columns";
import UserService from "@/services/userService";

export default async function Users() {
    const service = new UserService();
    const users = await service.list();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <div className="flex flex-col grow items-center p-4 gap-10">
                <h1 className="text-center text-4xl font-bold">List of Users</h1>
                <div className="w-full rounded border">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
            {/* content */}

        </SidebarProvider>
    )
}