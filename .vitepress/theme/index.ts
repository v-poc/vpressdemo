import DefaultTheme from "vitepress/theme"; // @ts-ignore
import demo from "../../src/vpressdemo/demo.vue";
// import demo from "../../dist/demo.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("demo", demo);
  },
};
