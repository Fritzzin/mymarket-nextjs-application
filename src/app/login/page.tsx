import AppSidebar from "@/components/AppSidebar";
import { LoginForm } from "@/components/LoginForm";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Login() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            {/* content */}
            <LoginForm />
        </SidebarProvider>
    )
}