import BlogHero from "../../components/blog/BlogHero";
import FeaturedPost from "../../components/blog/FeaturedPost";
import BlogGrid from "../../components/blog/BlogGrid";

export const metadata = {
  title: "Blog | Eldorado Real Estate",
  description: "Insights, market analysis, and stories from the world of luxury real estate.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <FeaturedPost />
      <BlogGrid />
    </>
  );
}