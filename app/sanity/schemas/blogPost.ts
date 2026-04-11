import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Full Content",
      type: "text",
      rows: 30,
      description: "Use ## for headings. Separate paragraphs with blank lines.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tag",
      title: "Category Tag",
      type: "string",
      options: {
        list: [
          "Market Insight",
          "Investment",
          "Architecture",
          "Sustainability",
          "Design",
          "Guide",
          "News",
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. '5 min'",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tag", media: "mainImage" },
  },
});