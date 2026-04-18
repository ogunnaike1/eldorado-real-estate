"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Popup from "../../../components/shared/Popup";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPopup({ isOpen: true, type: "error", title: "Login Failed", message: data.error || "Invalid email or password. Please try again." });
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      setPopup({ isOpen: true, type: "success", title: "Welcome Back!", message: "Signing you in to the admin panel..." });
      setTimeout(() => router.push("/admin/dashboard"), 1500);
    } catch {
      setPopup({ isOpen: true, type: "error", title: "Something Went Wrong", message: "Unable to connect. Please check your connection and try again." });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#1a202c" }}>
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <Image src="/images/logo-white.png" alt="Eldorado" width={160} height={26} className="h-7 w-auto mx-auto mb-6 opacity-80" />
            <h1 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: "24px", color: "#ffffff", marginBottom: "4px" }}>Admin Panel</h1>
            <p style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>Sign in to manage your website</p>
          </div>

          <div style={{ backgroundColor: "#ffffff", padding: "32px" }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a0aec0", marginBottom: "6px" }}>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@eldorado.com"
                  style={{ width: "100%", backgroundColor: "#f5f7fa", border: "1px solid transparent", padding: "12px 14px", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#2d3748", outline: "none" }} />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a0aec0", marginBottom: "6px" }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password"
                    style={{ width: "100%", backgroundColor: "#f5f7fa", border: "1px solid transparent", padding: "12px 44px 12px 14px", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#2d3748", outline: "none" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#a0aec0" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                style={{ width: "100%", backgroundColor: "#2d3748", color: "#ffffff", padding: "13px", fontFamily: '"DM Sans", sans-serif', fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in...</> : "Sign In"}
              </button>
            </form>
          </div>

          <p style={{ textAlign: "center", fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "24px" }}>
            Eldorado Real Estate Admin Panel
          </p>
        </div>
      </div>

      <Popup
        type={popup.type}
        title={popup.title}
        message={popup.message}
        isOpen={popup.isOpen}
        onClose={() => setPopup((p) => ({ ...p, isOpen: false }))}
        autoClose={popup.type === "success" ? 1500 : 0}
      />
    </>
  );
}