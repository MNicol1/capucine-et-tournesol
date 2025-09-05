// @ts-check
import { defineConfig } from "astro/config";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  site: isProd
    ? "https://mnicol1.github.io/capucine-et-tournesol"
    : "http://localhost:4321",
  base: isProd ? "/capucine-et-tournesol/" : "/",

    server: {
    host: true,   // allow access from your local network

  },
});

