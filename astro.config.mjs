// @ts-check
import { defineConfig } from "astro/config";

// User site (jmrplens.github.io) → served from the domain root, base "/".
export default defineConfig({
  site: "https://jmrplens.github.io",
  base: "/",
  trailingSlash: "ignore",
  build: { assets: "assets" },
  devToolbar: { enabled: false },
});
