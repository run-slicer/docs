import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightHeadingBadges from "starlight-heading-badges";

// https://astro.build/config
export default defineConfig({
    site: "https://docs.slicer.run",
    integrations: [
        starlight({
            title: "slicer docs",
            description:
                "The official documentation site for slicer, a modern Java reverse engineering tool for the web.",
            social: {
                github: "https://github.com/run-slicer",
            },
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
            customCss: ["@fontsource/geist-sans", "@fontsource/geist-mono", "./src/styles/custom.css"],
            plugins: [starlightHeadingBadges()],
            components: {
                Head: "./src/components/Head.astro",
            },
        }),
    ],
});
