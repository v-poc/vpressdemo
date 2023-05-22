import { defineConfig } from "vitepress"; // @ts-ignore
import vpdemo from "../src/vpdemo/vpindex";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vpdemo",
  title: "VPDemo",
  description: "Support demo import and preview for vitepress",
  markdown: {
    config: (md) => {
      md.use(vpdemo);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Playground", link: "/src/docs/basic/helloworld" },
    ],

    sidebar: [
      {
        text: "Experimental",
        collapsed: true,
        items: [
          { text: "Markdown Demo", link: "/src/docs/basic/helloworld" },
          { text: "MD built-in", link: "/src/docs/basic/others" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/v-poc/vpdemo" }],
  },
});
