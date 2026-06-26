import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server",
  adapter: netlify(),
  site: "https://astro-woo.netlify.app",
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: false,
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("graphql-request") || id.includes("graphql")) return "vendor-graphql";
              return "vendor";
            }
            if (id.includes("src/lib")) return "lib";
            if (id.includes("src/components")) return "components";
          },
        },
      },
    },
  },
});
