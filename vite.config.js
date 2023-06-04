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
        { src: "./src/vpressdemo/demo.vue", dest: "." },
        { src: "./src/vpressdemo/index.d.ts", dest: "." },
        { src: "./src/vpressdemo/index.ts", dest: "." },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/vpressdemo/index.ts"
      ),
      name: "VPressDemo",
      formats: ["es"],
      fileName: () => "vpindex.js",
    },
  },
});
