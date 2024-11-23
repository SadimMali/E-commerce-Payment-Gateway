import { AppSidebar } from "@/components/app-sidebar";
import TopBar from "@/components/nav/Topbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full container">
        <div className="flex gap-5 w-full py-4  ">
          <SidebarTrigger />
          <TopBar />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
