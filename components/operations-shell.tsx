"use client";

import {
  HomeIcon,
  MessageSquareTextIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { operationTools } from "@/lib/operation-tools";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar";

type RecentTask = {
  id: string;
  title: string;
  href: string;
  preview: string;
};

export function OperationsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);

  useEffect(() => {
    function loadRecentTasks() {
      try {
        const stored = window.localStorage.getItem("operations-recent-tasks");
        setRecentTasks(stored ? JSON.parse(stored).slice(0, 8) : []);
      } catch {
        setRecentTasks([]);
      }
    }

    loadRecentTasks();
    window.addEventListener("operations-recent-tasks-updated", loadRecentTasks);

    return () => {
      window.removeEventListener("operations-recent-tasks-updated", loadRecentTasks);
    };
  }, []);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader className="pb-1 pt-3">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-between">
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/">
                  <MessageSquareTextIcon className="size-4" />
                  <span className="font-semibold">Ianuzziello GPT</span>
                </Link>
              </SidebarMenuButton>
              <div className="group-data-[collapsible=icon]:hidden">
                <SidebarTrigger className="text-sidebar-foreground/60" />
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="border border-sidebar-border" tooltip="New task">
                <Link href="/">
                  <PlusIcon className="size-4" />
                  <span>New task</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Home">
                    <Link href="/">
                      <HomeIcon className="size-4" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {operationTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <SidebarMenuItem key={tool.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === tool.href}
                        tooltip={tool.title}
                      >
                        <Link href={tool.href}>
                          <Icon className="size-4" />
                          <span>{tool.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentTasks.length > 0 ? (
                  recentTasks.map((task) => (
                    <SidebarMenuItem key={task.id}>
                      <SidebarMenuButton asChild tooltip={task.title}>
                        <Link href={task.href}>
                          <MessageSquareTextIcon className="size-4" />
                          <span>{task.preview || task.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <li className="px-2 py-1.5 text-[12px] text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
                    Generated task chats will appear here.
                  </li>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="fixed left-3 top-3 z-30 md:hidden">
          <SidebarTrigger className="border border-border bg-background shadow-[var(--shadow-card)]" />
        </div>
        <div
          className={cn(
            "min-h-svh w-full bg-background",
            "bg-[radial-gradient(circle_at_top_left,oklch(0.92_0.03_200_/_0.55),transparent_32rem)] dark:bg-[radial-gradient(circle_at_top_left,oklch(0.34_0.04_200_/_0.35),transparent_32rem)]"
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
