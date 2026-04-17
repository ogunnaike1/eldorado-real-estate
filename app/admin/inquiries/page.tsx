"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Building2, Clock, CheckCircle } from "lucide-react";
import { supabase } from "../../components/lib/supabase";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const markAsRead = async (id: string) => {
    await supabase.from("inquiries").update({ read: true }).eq("id", id);
    fetchInquiries();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-2 border-[#2d3748] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748", marginBottom: "4px" }}>Inquiries</h1>
      <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", marginBottom: "24px" }}>
        {inquiries.filter(i => !i.read).length} unread · {inquiries.length} total
      </p>

      {inquiries.length === 0 ? (
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "60px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0" }}>No inquiries yet. They&apos;ll appear here when someone submits a form.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} style={{ backgroundColor: inq.read ? "#fff" : "#fffff5", border: `1px solid ${inq.read ? "#f0f0f0" : "#fef3c7"}`, padding: "20px 24px" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "16px", fontWeight: 600, color: "#2d3748", margin: 0 }}>{inq.full_name}</p>
                    {!inq.read && <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#e53e3e", display: "inline-block" }} />}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="flex items-center gap-1" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0" }}>
                      <Mail size={12} /> {inq.email}
                    </span>
                    {inq.phone && <span className="flex items-center gap-1" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0" }}>
                      <Phone size={12} /> {inq.phone}
                    </span>}
                    {inq.project && <span className="flex items-center gap-1" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0" }}>
                      <Building2 size={12} /> {inq.project}
                    </span>}
                  </div>
                </div>
                <span className="flex items-center gap-1 flex-shrink-0" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#cbd5e0" }}>
                  <Clock size={11} /> {new Date(inq.created_at).toLocaleString()}
                </span>
              </div>

              {inq.message && (
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#4a5568", lineHeight: 1.6, margin: "12px 0", padding: "12px", backgroundColor: "#f5f7fa" }}>
                  {inq.message}
                </p>
              )}

              <div className="flex items-center gap-3 mt-3">
                <a href={`mailto:${inq.email}`} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", fontWeight: 600, color: "#2d3748", textDecoration: "none", padding: "6px 12px", border: "1px solid #e2e8f0" }}>
                  Reply via Email
                </a>
                {inq.phone && <a href={`tel:${inq.phone}`} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", fontWeight: 600, color: "#2d3748", textDecoration: "none", padding: "6px 12px", border: "1px solid #e2e8f0" }}>
                  Call
                </a>}
                {!inq.read && <button onClick={() => markAsRead(inq.id)} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#38a169", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle size={13} /> Mark as read
                </button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}