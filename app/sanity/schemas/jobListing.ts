import { defineField, defineType } from "sanity";

export const jobListing = defineType({
  name: "jobListing",
  title: "Job Listings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Job Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", title: "Department", type: "string", options: { list: ["Engineering", "Design", "Sales", "Operations", "Marketing"] } }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "type", title: "Employment Type", type: "string", options: { list: ["Full-time", "Part-time", "Contract", "Internship"] } }),
    defineField({ name: "description", title: "Job Description", type: "text", rows: 8 }),
    defineField({ name: "publishedAt", title: "Posted Date", type: "date" }),
    defineField({ name: "active", title: "Active Listing", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "department" } },
});