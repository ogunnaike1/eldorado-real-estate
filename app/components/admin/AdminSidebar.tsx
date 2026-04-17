"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Briefcase,
  Heart,
  MessageSquare,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: Building2 },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "CSR", href: "/admin/csr", icon: Heart },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Subscribers", href: "/admin/subscribers", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a202c] border-b border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-white/60">
            <Menu size={22} />
          </button>
          <span className="font-body text-sm font-semibold text-white tracking-wider">ADMIN</span>
        </div>
        <button onClick={handleLogout} className="text-white/40 hover:text-white/70">
          <LogOut size={18} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 h-full bg-[#1a202c]" onClick={(e) => e.stopPropagation()}>
            <SidebarContent pathname={pathname} onLogout={handleLogout} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-[#1a202c] border-r border-white/[0.06] z-40">
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </div>
    </>
  );
}

function SidebarContent({
  pathname,
  onLogout,
  onClose,
}: {
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-6 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <p className="font-body text-xs font-semibold tracking-ultrawide uppercase text-white/30">
            Eldorado
          </p>
          <p className="font-display text-lg text-white">Admin Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/40 lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-5 py-3 mx-2 mb-0.5 font-body text-sm transition-all duration-300 rounded-sm ${
                isActive
                  ? "bg-white/[0.08] text-white font-semibold"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto text-white/30" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06]">
        <Link
          href="/"
          target="_blank"
          className="block text-center font-body text-xs text-white/25 hover:text-white/50 transition-colors mb-3"
        >
          View Live Website →
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 font-body text-xs font-semibold tracking-wider uppercase text-white/30 hover:text-white/60 border border-white/[0.06] hover:border-white/10 transition-all"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
}