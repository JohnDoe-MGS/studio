"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Table, 
  ListChecks, 
  ClipboardCheck, 
  BrainCircuit, 
  BookOpen 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";

interface NavItem {
  href: string;
  title: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
  { href: "/risk-matrix", title: "Matriz de Riscos", icon: Table },
  { href: "/action-plan", title: "Plano de Ação", icon: ListChecks },
  { href: "/self-assessment", title: "Autoavaliação", icon: ClipboardCheck },
  { href: "/ai-risk-identification", title: "Identificação IA", icon: BrainCircuit },
  { href: "/knowledge-center", title: "Centro de Conhecimento", icon: BookOpen },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <nav className="flex flex-col gap-2 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant={isActive ? "secondary" : "ghost"}
                size="lg"
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className={cn(
                    "truncate transition-opacity duration-200", 
                    isCollapsed ? "opacity-0 w-0" : "opacity-100"
                    )}>
                    {item.title}
                  </span>
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                {item.title}
              </TooltipContent>
            )}
          </Tooltip>
        );
      })}
    </nav>
  );
}
