import { client } from "./client";

export interface SanityAuthor {
  name?: string;
  role?: string;
  avatar?: string;
}

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  tag?: string;
  date: string;
  readTime?: string;
  image?: string;
  author?: SanityAuthor;
}

// ─── PROJECTS ───
export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(orderRank asc) {
      _id,
      title,
      slug,
      location,
      category,
      status,
      price,
      "image": mainImage.asset->url,
      beds,
      baths,
      sqft,
      description
    }
  `);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      location,
      category,
      status,
      price,
      "image": mainImage.asset->url,
      "gallery": gallery[].asset->url,
      beds,
      baths,
      sqft,
      description,
      longDescription,
      amenities,
      floorPlans[] {
        name,
        size,
        "image": image.asset->url
      },
      coordinates,
      completionDate,
      architect
    }
  `,
    { slug }
  );
}

// ─── BLOG ───
export async function getBlogPosts() {
  return client.fetch<SanityBlogPost[]>(`
    *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      tag,
      "date": publishedAt,
      readTime,
      "image": mainImage.asset->url,
      author-> {
        name,
        role,
        "avatar": avatar.asset->url
      }
    }
  `);
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch<SanityBlogPost | null>(
    `
    *[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      tag,
      "date": publishedAt,
      readTime,
      "image": mainImage.asset->url,
      author-> {
        name,
        role,
        "avatar": avatar.asset->url
      }
    }
  `,
    { slug }
  );
}

// ─── TEAM ───
export async function getTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] | order(orderRank asc) {
      _id,
      name,
      role,
      bio,
      "image": photo.asset->url
    }
  `);
}

// ─── CSR INITIATIVES ───
export async function getCSRInitiatives() {
  return client.fetch(`
    *[_type == "csrInitiative"] | order(orderRank asc) {
      _id,
      title,
      description,
      icon,
      "image": image.asset->url
    }
  `);
}

// ─── JOB LISTINGS ───
export async function getJobListings() {
  return client.fetch(`
    *[_type == "jobListing" && active == true] | order(publishedAt desc) {
      _id,
      title,
      department,
      location,
      type,
      "posted": publishedAt,
      description
    }
  `);
}