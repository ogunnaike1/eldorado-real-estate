
import BlogHero from "../../components/blog/BlogHero";
import BlogGrid from "../../components/blog/BlogGrid";
import { getBlogPosts } from "../../components/lib/blogData";

export const metadata = {
  title: "Blog | Eldorado Real Estate",
  description: "Insights, market analysis, and stories from the world of luxury real estate.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
    </>
  );
}