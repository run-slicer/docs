import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.katana-project.org",
  integrations: [
    starlight({
      title: "katana-project",
      description: "The official documentation site for the katana-project organization.",
      favicon: "/favicon.ico",
      logo: {
        src: "/public/favicon-192x192.png",
        alt: "katana-project logo",
      },
      social: [{ label: "GitHub", href: "https://github.com/run-slicer", icon: "github" }],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/run-slicer/docs/edit/main/",
      },
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
      plugins: [
        starlightSidebarTopics(
          [
            {
              id: "slicer",
              label: "slicer",
              link: "/slicer/",
              icon: "slicer",
              items: [
                {
                  label: "Reference",
                  autogenerate: {
                    directory: "slicer/reference",
                  },
                },
                {
                  label: "Scripting API",
                  autogenerate: {
                    directory: "slicer/script",
                  },
                },
                {
                  label: "Resources",
                  autogenerate: {
                    directory: "slicer/resources",
                  },
                },
              ],
            },
          ],
          {
            topics: {
              slicer: ["/slicer/reference", "/slicer/script"],
            },
          }
        ),
        starlightLinksValidator(),
      ],
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
});
