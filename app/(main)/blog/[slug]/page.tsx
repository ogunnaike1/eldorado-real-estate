import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "../../../sanity/lib/queries";
import BlogPostContent from "../../../components/blog-post/BlogPostContent";
import RelatedPosts from "../../../components/blog-post/RelatedPosts";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} | Eldorado Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = (await getBlogPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <BlogPostContent post={post} />
      <RelatedPosts posts={related} />
    </>
  );
}