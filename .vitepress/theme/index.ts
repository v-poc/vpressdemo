import DefaultTheme from "vitepress/theme"; // @ts-ignore
import demo from "../../src/vpdemo/demo.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("demo", demo);
  },
};
