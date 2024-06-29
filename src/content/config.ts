import { Categories } from "@/utils/enums";
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    published: z.boolean(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    tags: z
      .enum([
        "Python",
        "Django",
        "Docker",
        "Next",
        "Typescript",
        "React",
        "Tailwind",
        "Javascript",
        "Supabase",
      ])
      .array(),
    order: z.number(),
  }),
});

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    publishDate: z.date(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),

    category: z.enum(Categories).optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  posts: postCollection,
};
