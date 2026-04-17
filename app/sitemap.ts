import { MetadataRoute } from "next";

import { getAllSlugs } from "./components/lib/projectData";
import { getAllBlogSlugs } from "./components/lib/blogData";

const BASE_URL = "https://eldoradolmtd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/csr",
    "/careers",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.8,
  }));

  // Dynamic project pages
  const projectPages = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic blog pages
  const blogPages = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}