import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: "slicer",
            social: {
                github: "https://github.com/run-slicer",
            },
            sidebar: [
                {
                    label: "Reference",
                    autogenerate: {
                        directory: "reference",
                    },
                },
            ],
            customCss: ["@fontsource/geist-sans", "@fontsource/geist-mono", "./src/styles/custom.css"],
        }),
    ],
});
