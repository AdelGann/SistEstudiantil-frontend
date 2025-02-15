import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import useAuthStore from "@/store/useAuthStore";
import { ChevronUp, User2 } from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  width?: string;
  description?: string;
  children?: NavItem[];
}
interface SideBarProps {
  data: NavItem[];
}

export function SideBar({ data }: SideBarProps) {
  const { logout } = useAuthStore();
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="p-5">
        <h2>U.E. Colegio Aplicación</h2>
        <p className="text-sm">Perfil Administrador</p>
        <hr />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((data, key) =>
                !data.children ? (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton asChild>
                      <a href={data.href}>
                        <span>{data.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenu>
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton key={key}>
                            <span>{data.title}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {data.children.map((subcontent, key) => (
                            <SidebarMenuSub key={key}>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton href={subcontent.href}>
                                  <span>{subcontent.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          ))}
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenu>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <SidebarMenuButton>Perfil</SidebarMenuButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SidebarMenuButton onClick={() => logout()}>
                    Cerrar Sesión
                  </SidebarMenuButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
