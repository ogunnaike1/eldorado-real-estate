"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, ArrowLeft, Loader2, Upload, Link as LinkIcon, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "../../../components/lib/supabase";

const tags = ["Market Insight", "Investment", "Architecture", "Sustainability", "Design", "Guide", "News"];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BlogFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = !!editId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [avatarMode, setAvatarMode] = useState<"url" | "upload">("url");

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", tag: "News", image: "",
    author_name: "", author_role: "", author_avatar: "", read_time: "", published: false,
  });

  useEffect(() => {
    if (editId) {
      setLoading(true);
      supabase.from("blog_posts").select("*").eq("id", editId).single().then(({ data }) => {
        if (data) setForm({
          title: data.title || "", slug: data.slug || "", excerpt: data.excerpt || "",
          content: data.content || "", tag: data.tag || "News", image: data.image || "",
          author_name: data.author_name || "", author_role: data.author_role || "",
          author_avatar: data.author_avatar || "", read_time: data.read_time || "",
          published: data.published ?? false,
        });
        setLoading(false);
      });
    }
  }, [editId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      ...(name === "title" && !isEdit ? { slug: slugify(value) } : {}),
    }));
  };

  const uploadFile = async (file: File, bucket: string, field: "image" | "author_avatar") => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const path = `${bucket}/${fileName}`;

    const { error } = await supabase.storage.from("uploads").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(path);
    setForm((prev) => ({ ...prev, [field]: urlData.publicUrl }));
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "author_avatar") => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }
    uploadFile(file, field === "image" ? "blog-covers" : "avatars", field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, published_at: new Date().toISOString() };
    if (isEdit) {
      await supabase.from("blog_posts").update(payload).eq("id", editId);
    } else {
      await supabase.from("blog_posts").insert(payload);
    }
    setSaving(false);
    router.push("/admin/blog");
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-2 border-[#2d3748] border-t-transparent rounded-full" /></div>;

  const inputStyle = { width: "100%", backgroundColor: "#f5f7fa", border: "1px solid #e2e8f0", padding: "10px 14px", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#2d3748", outline: "none" } as const;
  const labelStyle = { display: "block", fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#a0aec0", marginBottom: "6px" };
  const tabStyle = (active: boolean) => ({
    padding: "6px 12px", fontSize: "11px", fontWeight: 600, fontFamily: '"DM Sans", sans-serif',
    backgroundColor: active ? "#2d3748" : "#f5f7fa", color: active ? "#fff" : "#a0aec0",
    border: "none", cursor: "pointer",
  });

  return (
    <div>
      <button onClick={() => router.back()} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", background: "none", border: "none", cursor: "pointer", marginBottom: "16px" }}>
        <ArrowLeft size={14} /> Back to Blog
      </button>

      <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748", marginBottom: "24px" }}>
        {isEdit ? "Edit Post" : "New Blog Post"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Post Title</label>
              <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} placeholder="e.g. The Future of Luxury Real Estate" />
            </div>
            <div>
              <label style={labelStyle}>URL Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select name="tag" value={form.tag} onChange={handleChange} style={inputStyle}>
                {tags.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Cover Image — URL or Upload */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Cover Image</label>
              <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                <button type="button" onClick={() => setImageMode("url")} style={tabStyle(imageMode === "url")}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><LinkIcon size={12} /> URL</span>
                </button>
                <button type="button" onClick={() => setImageMode("upload")} style={tabStyle(imageMode === "upload")}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Upload size={12} /> Upload</span>
                </button>
              </div>

              {imageMode === "url" ? (
                <input name="image" value={form.image} onChange={handleChange} style={inputStyle} placeholder="https://example.com/image.jpg" />
              ) : (
                <div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e, "image")} style={{ display: "none" }} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                    style={{ ...inputStyle, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#a0aec0", backgroundColor: "#f5f7fa", border: "2px dashed #e2e8f0", padding: "20px" }}>
                    {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading...</> : <><Upload size={16} /> Click to upload image (max 5MB)</>}
                  </button>
                </div>
              )}

              {/* Image Preview */}
              {form.image && (
                <div style={{ marginTop: "8px", position: "relative", display: "inline-block" }}>
                  <img src={form.image} alt="Preview" style={{ height: "80px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                  <button type="button" onClick={() => setForm((p) => ({ ...p, image: "" }))}
                    style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#e53e3e", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>Read Time</label>
              <input name="read_time" value={form.read_time} onChange={handleChange} style={inputStyle} placeholder="5 min" />
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={labelStyle}>Excerpt (short summary)</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="A brief summary for the blog card..." />
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={labelStyle}>Full Content</label>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: "11px", color: "#cbd5e0", marginBottom: "6px" }}>
              Use ## for headings. Separate paragraphs with blank lines.
            </p>
            <textarea name="content" value={form.content} onChange={handleChange} rows={16} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "13px", lineHeight: "1.7" }} placeholder={"## Introduction\n\nWrite your article here...\n\n## Second Heading\n\nMore content..."} />
          </div>
        </div>

        {/* Author Info */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "16px" }}>
          <p style={{ ...labelStyle, marginBottom: "16px", fontSize: "12px" }}>Author Details</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>Author Name</label><input name="author_name" value={form.author_name} onChange={handleChange} style={inputStyle} placeholder="John Doe" /></div>
            <div><label style={labelStyle}>Author Role</label><input name="author_role" value={form.author_role} onChange={handleChange} style={inputStyle} placeholder="CEO, Eldorado" /></div>

            {/* Author Avatar — URL or Upload */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Author Avatar</label>
              <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                <button type="button" onClick={() => setAvatarMode("url")} style={tabStyle(avatarMode === "url")}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><LinkIcon size={12} /> URL</span>
                </button>
                <button type="button" onClick={() => setAvatarMode("upload")} style={tabStyle(avatarMode === "upload")}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Upload size={12} /> Upload</span>
                </button>
              </div>

              {avatarMode === "url" ? (
                <input name="author_avatar" value={form.author_avatar} onChange={handleChange} style={inputStyle} placeholder="https://example.com/avatar.jpg" />
              ) : (
                <div>
                  <input ref={avatarInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e, "author_avatar")} style={{ display: "none" }} />
                  <button type="button" onClick={() => avatarInputRef.current?.click()} disabled={uploading}
                    style={{ ...inputStyle, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#a0aec0", border: "2px dashed #e2e8f0", padding: "16px" }}>
                    {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload avatar</>}
                  </button>
                </div>
              )}

              {form.author_avatar && (
                <div style={{ marginTop: "8px", position: "relative", display: "inline-block" }}>
                  <img src={form.author_avatar} alt="Avatar" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                  <button type="button" onClick={() => setForm((p) => ({ ...p, author_avatar: "" }))}
                    style={{ position: "absolute", top: "-4px", right: "-4px", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#e53e3e", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <X size={10} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Publish + Save */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#2d3748", cursor: "pointer" }}>
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: "16px", height: "16px" }} />
            Publish immediately
          </label>
          <button type="submit" disabled={saving || uploading} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> {isEdit ? "Update Post" : "Publish Post"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}