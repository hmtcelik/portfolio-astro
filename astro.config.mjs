import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";

import { remarkReadingTime } from "./src/utils/frontmatter";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    prefetch(),
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
