import { supabase } from "./supabase";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  author: { name: string; role: string; avatar: string };
}

// Fetch all published blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error || !data) return [];

  return data.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    content: p.content || "",
    tag: p.tag || "",
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: p.read_time || "5 min",
    image: p.image || "",
    author: {
      name: p.author_name || "Eldorado Team",
      role: p.author_role || "",
      avatar: p.author_avatar || "",
    },
  }));
}

// Fetch a single blog post by slug
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt || "",
    content: data.content || "",
    tag: data.tag || "",
    date: data.published_at
      ? new Date(data.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    readTime: data.read_time || "5 min",
    image: data.image || "",
    author: {
      name: data.author_name || "Eldorado Team",
      role: data.author_role || "",
      avatar: data.author_avatar || "",
    },
  };
}

// Get all published slugs (for static generation)
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  return data?.map((p) => p.slug) || [];
}