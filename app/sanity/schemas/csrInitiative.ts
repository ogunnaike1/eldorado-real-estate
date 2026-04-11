import { defineField, defineType } from "sanity";

export const csrInitiative = defineType({
  name: "csrInitiative",
  title: "CSR Initiatives",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "icon", title: "Icon Name", type: "string", description: "Lucide icon name: Heart, GraduationCap, Users, TreePine, Home, Utensils" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "orderRank", title: "Sort Order", type: "number" }),
  ],
  preview: { select: { title: "title", media: "image" } },
});