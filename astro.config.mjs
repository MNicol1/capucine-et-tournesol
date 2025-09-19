// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  site: isProd ? "https://capucine-et-tournesol.com" : "http://localhost:4321",

  base: "/", // root domain, no subpath anymore

  integrations: [sitemap()], // generates sitemap.xml at build

  server: {
    host: true, // allow access from your local network
  },
});
