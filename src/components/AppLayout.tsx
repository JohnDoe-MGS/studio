"use client";

import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/UserNav";
import { SidebarNav } from "@/components/SidebarNav";
import { Logo } from "@/components/Logo";
import { Separator } from './ui/separator';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background font-body">
        <Sidebar>
          <SidebarHeader className="p-4">
             <div className="flex items-center gap-3">
              <Logo />
              <h1 className="text-xl font-bold font-headline text-primary">VERITAS</h1>
            </div>
          </SidebarHeader>
          <Separator />
          <SidebarContent className="p-0">
            <SidebarNav />
          </SidebarContent>
          <Separator />
          <SidebarFooter className="p-4">
            <UserNav />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Header content can go here, like breadcrumbs or page title */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
