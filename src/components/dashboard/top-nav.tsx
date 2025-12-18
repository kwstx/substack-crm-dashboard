"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/dashboard" },
  { name: "Payments", href: "/dashboard/payments" },
  { name: "Balances", href: "/dashboard/balances" },
  { name: "Customers", href: "/dashboard/subscribers" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Reports", href: "/dashboard/analytics" },
  { name: "Connect", href: "/dashboard/outreach" },
  { name: "Personas", href: "/dashboard/personas" },
  { name: "Settings", href: "/dashboard/settings" },
];

export function DashboardTopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9FAFB]/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Stackly</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 rounded-full px-1 py-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium transition-all rounded-full",
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100/80 border border-gray-200/50">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Search...</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
          </Button>
          <div className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
            <Avatar className="w-8 h-8 ring-2 ring-white">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-gray-400 mr-1" />
          </div>
        </div>
      </div>
    </header>
  );
}
