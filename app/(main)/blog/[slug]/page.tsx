import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogPosts } from "../../../components/lib/blogData";
import BlogPostContent from "../../../components/blog-post/BlogPostContent";
import RelatedPosts from "../../../components/blog-post/RelatedPosts";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} | Eldorado Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <BlogPostContent post={post} />
      <RelatedPosts posts={related} />
    </>
  );
}