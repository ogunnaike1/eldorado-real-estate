"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { supabase } from "../../../components/lib/supabase";

const categories = ["residential", "commercial", "hospitality", "mixed-use"];
const statuses = ["Selling", "Coming Soon", "Sold Out", "Leasing", "Under Construction"];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProjectFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = !!editId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");

  const [form, setForm] = useState({
    title: "", slug: "", location: "", category: "residential", status: "Coming Soon",
    price: "", image: "", beds: "", baths: "", sqft: "", description: "", long_description: "",
    amenities: [] as string[], lat: "", lng: "", completion_date: "", architect: "", published: true,
  });

  useEffect(() => {
    if (editId) {
      setLoading(true);
      supabase.from("projects").select("*").eq("id", editId).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title || "", slug: data.slug || "", location: data.location || "",
            category: data.category || "residential", status: data.status || "Coming Soon",
            price: data.price || "", image: data.image || "",
            beds: data.beds?.toString() || "", baths: data.baths?.toString() || "",
            sqft: data.sqft || "", description: data.description || "",
            long_description: data.long_description || "", amenities: data.amenities || [],
            lat: data.lat?.toString() || "", lng: data.lng?.toString() || "",
            completion_date: data.completion_date || "", architect: data.architect || "",
            published: data.published ?? true,
          });
        }
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

  const addAmenity = () => {
    if (amenityInput.trim() && !form.amenities.includes(amenityInput.trim())) {
      setForm((prev) => ({ ...prev, amenities: [...prev.amenities, amenityInput.trim()] }));
      setAmenityInput("");
    }
  };

  const removeAmenity = (a: string) => {
    setForm((prev) => ({ ...prev, amenities: prev.amenities.filter((x) => x !== a) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title, slug: form.slug, location: form.location,
      category: form.category, status: form.status, price: form.price,
      image: form.image, beds: form.beds ? parseInt(form.beds) : null,
      baths: form.baths ? parseInt(form.baths) : null, sqft: form.sqft,
      description: form.description, long_description: form.long_description,
      amenities: form.amenities,
      lat: form.lat ? parseFloat(form.lat) : null,
      lng: form.lng ? parseFloat(form.lng) : null,
      completion_date: form.completion_date, architect: form.architect,
      published: form.published,
    };

    if (isEdit) {
      await supabase.from("projects").update(payload).eq("id", editId);
    } else {
      await supabase.from("projects").insert(payload);
    }

    setSaving(false);
    router.push("/admin/projects");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-2 border-[#2d3748] border-t-transparent rounded-full" /></div>;
  }

  const inputStyle = { width: "100%", backgroundColor: "#f5f7fa", border: "1px solid #e2e8f0", padding: "10px 14px", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#2d3748", outline: "none" } as const;
  const labelStyle = { display: "block", fontFamily: '"DM Sans", sans-serif', fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#a0aec0", marginBottom: "6px" };

  return (
    <div>
      <button onClick={() => router.back()} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: '"DM Sans", sans-serif', fontSize: "12px", color: "#a0aec0", background: "none", border: "none", cursor: "pointer", marginBottom: "16px" }}>
        <ArrowLeft size={14} /> Back to Projects
      </button>

      <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "28px", color: "#2d3748", marginBottom: "24px" }}>
        {isEdit ? "Edit Project" : "New Project"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Project Title</label>
              <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} placeholder="e.g. The Meridian Tower" />
            </div>
            <div>
              <label style={labelStyle}>URL Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} placeholder="the-meridian-tower" />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input name="location" value={form.location} onChange={handleChange} required style={inputStyle} placeholder="Banana Island, Lagos" />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Price Display</label>
              <input name="price" value={form.price} onChange={handleChange} style={inputStyle} placeholder="From ₦850M" />
            </div>
            <div>
              <label style={labelStyle}>Cover Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} style={inputStyle} placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>Bedrooms</label>
              <input name="beds" type="number" value={form.beds} onChange={handleChange} style={inputStyle} placeholder="4" />
            </div>
            <div>
              <label style={labelStyle}>Bathrooms</label>
              <input name="baths" type="number" value={form.baths} onChange={handleChange} style={inputStyle} placeholder="5" />
            </div>
            <div>
              <label style={labelStyle}>Size (sqft)</label>
              <input name="sqft" value={form.sqft} onChange={handleChange} style={inputStyle} placeholder="4,200" />
            </div>
            <div>
              <label style={labelStyle}>Completion Date</label>
              <input name="completion_date" value={form.completion_date} onChange={handleChange} style={inputStyle} placeholder="Q4 2026" />
            </div>
            <div>
              <label style={labelStyle}>Architect</label>
              <input name="architect" value={form.architect} onChange={handleChange} style={inputStyle} placeholder="HKS Architects" />
            </div>
            <div>
              <label style={labelStyle}>Latitude</label>
              <input name="lat" value={form.lat} onChange={handleChange} style={inputStyle} placeholder="6.4541" />
            </div>
            <div>
              <label style={labelStyle}>Longitude</label>
              <input name="lng" value={form.lng} onChange={handleChange} style={inputStyle} placeholder="3.4218" />
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={labelStyle}>Short Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="A brief overview for the project card..." />
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={labelStyle}>Full Description</label>
            <textarea name="long_description" value={form.long_description} onChange={handleChange} rows={8} style={{ ...inputStyle, resize: "vertical" }} placeholder="Detailed project description. Separate paragraphs with blank lines..." />
          </div>
        </div>

        {/* Amenities */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "16px" }}>
          <label style={labelStyle}>Amenities</label>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAmenity(); } }}
              style={{ ...inputStyle, flex: 1 }} placeholder="Type an amenity and press Enter" />
            <button type="button" onClick={addAmenity} style={{ padding: "10px 14px", backgroundColor: "#2d3748", color: "#fff", border: "none", cursor: "pointer" }}>
              <Plus size={16} />
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {form.amenities.map((a) => (
              <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "#f5f7fa", padding: "6px 10px", fontSize: "12px", fontFamily: '"DM Sans", sans-serif', color: "#2d3748" }}>
                {a}
                <button type="button" onClick={() => removeAmenity(a)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a0aec0", display: "flex" }}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Publish + Save */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #f0f0f0", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: '"DM Sans", sans-serif', fontSize: "14px", color: "#2d3748", cursor: "pointer" }}>
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} style={{ width: "16px", height: "16px" }} />
            Publish immediately
          </label>
          <button type="submit" disabled={saving} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", backgroundColor: "#2d3748", color: "#fff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif', border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : <><Save size={14} /> {isEdit ? "Update Project" : "Create Project"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}