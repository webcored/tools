"use client"

import * as React from "react"
import { Clock, Home, Calculator, Code, Link, Github } from "lucide-react"

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
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  tools: [
    {
      name: "All Tools",
      url: "/",
      icon: Home,
    },
    {
      name: "Count Down Timer",
      url: "/countdown-timer",
      icon: Clock,
    },
    {
      name: "Percentage Calculator",
      url: "/percentage-calculator",
      icon: Calculator,
    },
    {
      name: "JSON Viewer / parser",
      url: "/json-viewer",
      icon: Code,
    },
    {
      name: "URL Encoder / Decoder",
      url: "/url-decoder",
      icon: Link,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            WC
          </div>
          <span className="font-semibold">WebCored Tools</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tools.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WebCored Tools
          </div>
          <a
            href="https://github.com/webcored/tools"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-sidebar-accent transition-colors"
            title="View on GitHub"
          >
            <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </a>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}