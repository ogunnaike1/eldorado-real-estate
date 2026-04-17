"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (isLoginPage) return;

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!mounted) {
    return null;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="lg:ml-64 pt-14 lg:pt-0">
        <div className="p-5 sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
