import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="flex flex-col grow items-center justify-center p-4">
        Home Page
      </div>
    </SidebarProvider>
  );
}
