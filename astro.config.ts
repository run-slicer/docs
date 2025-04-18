import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightHeadingBadges from "starlight-heading-badges";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.slicer.run",
  integrations: [
    starlight({
      title: "slicer docs",
      description: "The official documentation site for slicer, a modern Java reverse engineering tool for the web.",
      social: [{ label: "GitHub", href: "https://github.com/run-slicer", icon: "github" }],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/run-slicer/docs/edit/main/",
      },
      sidebar: [
        {
          label: "Reference",
          autogenerate: {
            directory: "reference",
          },
        },
        {
          label: "Scripting API",
          autogenerate: {
            directory: "script",
          },
        },
        {
          label: "Resources",
          autogenerate: {
            directory: "resources",
          },
        },
      ],
      customCss: [
        "@fontsource/geist-sans/400.css",
        "@fontsource/geist-mono/400.css",
        "@fontsource/geist-mono/600.css",
        "./src/styles/custom.css",
      ],
      plugins: [starlightHeadingBadges()],
      components: {
        Head: "./src/components/Head.astro",
        Footer: "./src/components/Footer.astro",
      },
      expressiveCode: {
        emitExternalStylesheet: false,
      },
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
});
