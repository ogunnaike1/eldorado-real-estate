import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Name",
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
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Hospitality", value: "hospitality" },
          { title: "Mixed Use", value: "mixed-use" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Selling", value: "Selling" },
          { title: "Coming Soon", value: "Coming Soon" },
          { title: "Sold Out", value: "Sold Out" },
          { title: "Leasing", value: "Leasing" },
          { title: "Under Construction", value: "Under Construction" },
        ],
      },
    }),
    defineField({ name: "price", title: "Price Display", type: "string" }),
    defineField({ name: "beds", title: "Bedrooms", type: "number" }),
    defineField({ name: "baths", title: "Bathrooms", type: "number" }),
    defineField({ name: "sqft", title: "Size (sqft)", type: "string" }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Full Description",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "floorPlans",
      title: "Floor Plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "size", title: "Size", type: "string" },
            { name: "image", title: "Image", type: "image" },
          ],
        },
      ],
    }),
    defineField({
      name: "coordinates",
      title: "Map Coordinates",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    }),
    defineField({ name: "completionDate", title: "Completion Date", type: "string" }),
    defineField({ name: "architect", title: "Architect", type: "string" }),
    defineField({ name: "orderRank", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "mainImage" },
  },
});