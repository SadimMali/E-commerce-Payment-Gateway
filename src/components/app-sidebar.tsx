import { Computer, Home, Logs, Settings, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const { role } = session?.user;

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
      visible: ["ADMIN", "USER"],
    },

    // Admin-specific items
    {
      title: "Products",
      url: "/admin/products",
      icon: Computer,
      visible: ["ADMIN"],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: Logs,
      visible: ["ADMIN"],
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      visible: ["ADMIN"],
    },
    // User-specific items
    {
      title: "My Orders",
      url: "/user/orders",
      icon: Logs,
      visible: ["USER"],
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: Users,
      visible: ["USER"],
    },
    {
      title: "Settings",
      url: `/${role.toLowerCase()}/setting`,
      icon: Settings,
      visible: ["ADMIN", "USER"],
    },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>E commerce</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.visible.includes(role)) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
