import { Home, List, LogIn, ShoppingCart, TestTube, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { ThemeModeToggle } from "../ThemeModeToggle"

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home
    },
    {
        title: "Users",
        url: "/users",
        icon: User
    },
    {
        title: "Products",
        url: "/products",
        icon: List
    },
    {
        title: "TEST PRODUCT FORM",
        url: "/testProductAdd",
        icon: TestTube
    },
    {
        title: "Login",
        url: "/login",
        icon: LogIn
    }
]

export default function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-2!"
                        >
                            <Link href="/" className="">
                                <ShoppingCart />
                                <span className="text-base font-semibold">My Market</span>
                            </Link>

                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Users
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex flex-row-reverse">
                    <ThemeModeToggle />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}