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

// Menu items.
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
    title: "Wishlist",
    url: "/wishlist",
    icon: Computer,
    visible: ["USER"],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    visible: ["ADMIN", "USER"],
  },
];

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const { role } = session?.user;
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
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
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
