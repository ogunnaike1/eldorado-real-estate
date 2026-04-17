"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "../../components/lib/supabase";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("blog_posts").update({ published: !current }).eq("id", id);
    fetchPosts();
  };

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-2 border-[#2d3748] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748" }}>Blog Posts</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", marginTop: "4px" }}>{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/blog/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 16px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textDecoration: "none" }}>
          <Plus size={14} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "60px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#a0aec0", marginBottom: "16px" }}>No blog posts yet.</p>
          <Link href="/admin/blog/new" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', textDecoration: "none" }}>
            <Plus size={14} /> Write First Post
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0" }}>
          {posts.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f5f7fa" }}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {p.image && <div style={{ width: "56px", height: "40px", backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />}
                <div className="min-w-0">
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "14px", fontWeight: 600, color: "#2d3748", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", margin: 0 }}>
                    {p.tag} · {new Date(p.published_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <button onClick={() => togglePublish(p.id, p.published)} style={{ background: "none", border: "none", cursor: "pointer", color: p.published ? "#38a169" : "#a0aec0", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontFamily: '"DM Sans", sans-serif' }}>
                  {p.published ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <Link href={`/admin/blog/edit?id=${p.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", border: "1px solid #e2e8f0", color: "#a0aec0", textDecoration: "none" }}>
                  <Pencil size={14} />
                </Link>
                <button onClick={() => deletePost(p.id, p.title)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", border: "1px solid #e2e8f0", color: "#e53e3e", background: "none", cursor: "pointer" }}>
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