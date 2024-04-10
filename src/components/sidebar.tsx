'use client'
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Tornado, Home, Server, DatabaseZap, Users2, LineChart, Settings } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (href: string) => {
    return `flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`;
  };

  return (
    <aside className="fixed w-14 h-screen flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Tornado className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/"
            className={linkClass('/')}
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Dashboard</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/register"
            className={linkClass('/register')}
          >
            <Server className="h-5 w-5" />
            <span className="sr-only">register</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">register</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/customers"
            className={linkClass('/customers')}
          >
            <Users2 className="h-5 w-5" />
            <span className="sr-only">Customers</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Customers</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/analytics"
            className={linkClass('/analytics')}
          >
            <LineChart className="h-5 w-5" />
            <span className="sr-only">Analytics</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Analytics</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/database"
            className={linkClass('/database')}
          >
            <DatabaseZap className="h-5 w-5" />
            <span className="sr-only">Database</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Database</TooltipContent>
      </Tooltip>
    </nav>
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/settings"
            className={linkClass('/settings')}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Settings</TooltipContent>
      </Tooltip>
    </nav>
  </aside>
  );
}