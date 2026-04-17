"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "../components/admin/AdminSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  // Login page gets no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="lg:ml-64 pt-14 lg:pt-0">
        <div className="p-5 sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}