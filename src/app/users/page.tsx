import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DataTable } from "@/components/GenericTable";
import { User } from "@/types/user";
import { Suspense } from "react";
import { columns } from "./columns";
import UserRepository from "@/repositories/userRepository";

export default async function Users() {
    const repository = new UserRepository();
    const users = await repository.listAll();

    let data: User[] = [];

    if (users.length > 0) {
       data = users; 
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <div className="flex flex-col grow items-center p-4 gap-10">
                <Suspense fallback={<div className="my-auto">Loading...</div>} >
                    <h1 className="text-center text-4xl font-bold">List of Users</h1>
                    <div className="w-full rounded border">
                        <DataTable columns={columns} data={data} />
                    </div>
                </Suspense>
            </div>
            {/* content */}

        </SidebarProvider>
    )
}