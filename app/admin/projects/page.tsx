"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "../../components/lib/supabase";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("projects").update({ published: !current }).eq("id", id);
    fetchProjects();
  };

  const deleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-2 border-[#2d3748] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748" }}>Projects</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", marginTop: "4px" }}>{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/projects/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 16px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textDecoration: "none" }}>
          <Plus size={14} /> Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "60px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", marginBottom: "16px" }}>No projects yet. Add your first property listing.</p>
          <Link href="/admin/projects/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textDecoration: "none" }}>
            <Plus size={14} /> Add Project
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", overflow: "hidden" }}>
          {/* Table Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 100px 140px", padding: "12px 20px", borderBottom: "1px solid #f0f0f0", fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a0aec0", fontFamily: '"DM Sans", sans-serif' }}
            className="hidden md:grid">
            <span>Project</span><span>Category</span><span>Status</span><span>Published</span><span>Actions</span>
          </div>

          {/* Rows */}
          {projects.map((p) => (
            <div key={p.id} style={{ display: "flex", flexDirection: "column", padding: "16px 20px", borderBottom: "1px solid #f5f7fa" }}
              className="md:!grid md:!grid-cols-[1fr_120px_100px_100px_140px] md:items-center">
              {/* Title + Location */}
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                {p.image && (
                  <div style={{ width: "48px", height: "36px", backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
                )}
                <div>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: 600, color: "#2d3748", margin: 0 }}>{p.title}</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", margin: 0 }}>{p.location}</p>
                </div>
              </div>

              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", textTransform: "capitalize" }}>{p.category}</span>

              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", fontWeight: 600, color: p.status === "Selling" ? "#38a169" : p.status === "Sold Out" ? "#e53e3e" : "#a0aec0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {p.status}
              </span>

              <button onClick={() => togglePublish(p.id, p.published)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: p.published ? "#38a169" : "#a0aec0" }}>
                {p.published ? <><Eye size={14} /> Live</> : <><EyeOff size={14} /> Draft</>}
              </button>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Link href={`/admin/projects/edit?id=${p.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", border: "1px solid #e2e8f0", color: "#a0aec0", textDecoration: "none" }}>
                  <Pencil size={14} />
                </Link>
                <button onClick={() => deleteProject(p.id, p.title)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", border: "1px solid #e2e8f0", color: "#e53e3e", background: "none", cursor: "pointer" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}