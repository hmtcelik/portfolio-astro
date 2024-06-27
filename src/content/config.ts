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

export const collections = {
  projects: projectsCollection,
};
