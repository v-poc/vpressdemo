import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        { src: "./src/vpdemo/demo.vue", dest: "." },
        { src: "./src/vpdemo/index.d.ts", dest: "." },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/vpdemo/index.ts"
      ),
      name: "VPDemo",
      fileName: (format) => `vpdemo.${format}.js`,
    },
  },
});
