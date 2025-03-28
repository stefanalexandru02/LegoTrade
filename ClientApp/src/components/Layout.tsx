import React from "react";
import { NavMenu } from "./NavMenu";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { SectionCards } from "./section-cards";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" /> {/* <NavMenu /> */}
      <SidebarInset>
        <SiteHeader />
        <div className="p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
