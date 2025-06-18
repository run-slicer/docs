import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";

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
      customCss: ["./src/styles/custom.css"],
      components: {
        Head: "./src/components/Head.astro",
        Footer: "./src/components/Footer.astro",
      },
      expressiveCode: {
        frames: {
          extractFileNameFromCode: false,
        },
        emitExternalStylesheet: false,
      },
      plugins: [starlightLinksValidator()],
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
});
