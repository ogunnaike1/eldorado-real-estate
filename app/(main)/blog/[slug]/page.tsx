import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogSlugs, blogPosts } from "../../../components/lib/blogData";
import BlogPostContent from "../../../components/blog-post/BlogPostContent";
import RelatedPosts from "../../../components/blog-post/RelatedPosts";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} | Eldorado Blog`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <BlogPostContent post={post} />
      <RelatedPosts posts={related} />
    </>
  );
}