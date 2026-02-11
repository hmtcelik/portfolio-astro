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
        "Astro",
        "Go",
        "Fastapi",
      ])
      .array(),
    order: z.number(),
  }),
});

const experienceCollection = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    summary: z.string(),
    bullets: z.array(z.string()).optional(),
    order: z.number(),
    url: z.string().optional(),
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
  experience: experienceCollection,
  posts: postCollection,
};
