import { defineConfig } from "vitepress"; // @ts-ignore
import vpressdemo from "../src/vpressdemo";
// import vpressdemo from "../dist";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vpressdemo",
  title: "VPressDemo",
  description: "Support demo import and preview for vitepress",
  markdown: {
    config: (md) => {
      md.use(vpressdemo);
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
