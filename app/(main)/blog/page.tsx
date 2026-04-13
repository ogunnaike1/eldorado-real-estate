
import BlogHero from "../../components/blog/BlogHero";
import FeaturedPost from "../../components/blog/FeaturedPost";
import BlogGrid from "../../components/blog/BlogGrid";
import { getBlogPosts } from "../../sanity/lib/queries";

export const metadata = {
  title: "Blog | Eldorado Real Estate",
  description: "Insights, market analysis, and stories from the world of luxury real estate.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <>
      <BlogHero />
      <FeaturedPost post={featuredPost} />
      <BlogGrid posts={otherPosts} />
    </>
  );
}