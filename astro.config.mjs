import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";

import { remarkReadingTime } from "./src/utils/frontmatter";

// https://astro.build/config
export default defineConfig({
  legacy: {
    collections: true,
  },
  prefetch: true,
  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  site: "https://abdulhamitcelik.com",

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
