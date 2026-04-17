"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, FileText, Users, Briefcase, Heart, MessageSquare, Mail, Plus, ArrowUpRight } from "lucide-react";
import { supabase } from "../../components/lib/supabase";

interface Stats {
  projects: number;
  posts: number;
  team: number;
  jobs: number;
  csr: number;
  inquiries: number;
  unreadInquiries: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0, posts: 0, team: 0, jobs: 0, csr: 0, inquiries: 0, unreadInquiries: 0, subscribers: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [projects, posts, team, jobs, csr, inquiries, unread, subs, recent] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("job_listings").select("id", { count: "exact", head: true }),
        supabase.from("csr_initiatives").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("read", false),
        supabase.from("subscribers").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        projects: projects.count || 0,
        posts: posts.count || 0,
        team: team.count || 0,
        jobs: jobs.count || 0,
        csr: csr.count || 0,
        inquiries: inquiries.count || 0,
        unreadInquiries: unread.count || 0,
        subscribers: subs.count || 0,
      });
      setRecentInquiries(recent.data || []);
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: "Projects", value: stats.projects, icon: Building2, href: "/admin/projects", color: "#2d3748" },
    { label: "Blog Posts", value: stats.posts, icon: FileText, href: "/admin/blog", color: "#2d3748" },
    { label: "Team Members", value: stats.team, icon: Users, href: "/admin/team", color: "#2d3748" },
    { label: "Job Listings", value: stats.jobs, icon: Briefcase, href: "/admin/careers", color: "#2d3748" },
    { label: "CSR Initiatives", value: stats.csr, icon: Heart, href: "/admin/csr", color: "#2d3748" },
    { label: "Inquiries", value: stats.inquiries, icon: MessageSquare, href: "/admin/inquiries", color: stats.unreadInquiries > 0 ? "#e53e3e" : "#2d3748", badge: stats.unreadInquiries || undefined },
    { label: "Subscribers", value: stats.subscribers, icon: Mail, href: "/admin/subscribers", color: "#2d3748" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-2 border-[#2d3748] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748" }}>
            Dashboard
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", marginTop: "4px" }}>
            Welcome back. Here&apos;s an overview of your website.
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Link href="/admin/projects/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 16px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textDecoration: "none" }}>
            <Plus size={14} /> New Project
          </Link>
          <Link href="/admin/blog/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 16px", backgroundColor: "#fff", color: "#2d3748", border: "1px solid #e2e8f0", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textDecoration: "none" }}>
            <Plus size={14} /> New Post
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} style={{ display: "block", backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "20px", textDecoration: "none", position: "relative" }}>
              {card.badge && (
                <span style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#e53e3e", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "10px", fontFamily: '"DM Sans", sans-serif' }}>
                  {card.badge} new
                </span>
              )}
              <Icon size={20} style={{ color: card.color, marginBottom: "12px" }} strokeWidth={1.5} />
              <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748", margin: 0 }}>
                {card.value}
              </p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", letterSpacing: "0.05em", marginTop: "2px" }}>
                {card.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries */}
      <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "24px" }}>
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "18px", color: "#2d3748", margin: 0 }}>
            Recent Inquiries
          </h2>
          <Link href="/admin/inquiries" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            View all <ArrowUpRight size={12} />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", textAlign: "center", padding: "40px 0" }}>
            No inquiries yet. They&apos;ll appear here when someone fills out a form on your website.
          </p>
        ) : (
          <div>
            {recentInquiries.map((inq) => (
              <div key={inq.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f5f7fa" }}>
                <div>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: inq.read ? 400 : 600, color: "#2d3748", margin: 0 }}>
                    {inq.full_name}
                    {!inq.read && <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e53e3e", marginLeft: "8px" }} />}
                  </p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", margin: "2px 0 0" }}>
                    {inq.project || "General enquiry"} · {inq.email}
                  </p>
                </div>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#cbd5e0" }}>
                  {new Date(inq.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}