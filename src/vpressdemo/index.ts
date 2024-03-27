import { fileURLToPath } from "url";
import { getHighlighterCore } from "shiki/core";
import { dirname, resolve } from "path";
import fs from "fs";

const defaultTheme = "material-theme-palenight";
const defaultLang = "vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let codeToHtml: any = null;
(async () => {
  let res = await getHighlighterCore({
    themes: [import("shiki/themes/material-theme-palenight.mjs")],
    langs: [import("shiki/langs/vue.mjs")],
  });
  codeToHtml = res.codeToHtml;
})();

// demo component path
const demoComponentsPath = resolve(__dirname, "demo.vue");

/**
 * Get relative path
 */
const getRelativePath = (path1 = "", path2 = "") => {
  const path1Arr = path1.split(/\\|\//g);
  const path2Arr = path2.split(/\\|\//g);
  const path1ArrLen = path1Arr.length;
  let relativePath = "";
  for (let i = 0; i < path1ArrLen; i++) {
    if (path2Arr[i] != path1Arr[i]) {
      if (path1ArrLen - i > 1) {
        relativePath += new Array(path1ArrLen - i).join("../");
      } else {
        relativePath = "./";
      }
      relativePath += path2Arr.splice(i).join("/");
      break;
    }
  }
  return relativePath;
};

/**
 * Get content from demo label
 */
const getDemoLabel = (demo = "", attr?: any) => {
  let reg = attr
    ? new RegExp(`<demo[^>]+${attr}=['"]([^'"]+)['"]`)
    : /<demo[\s\S]*?>([\s\S]*?)(<\/demo>|\/>)$/;
  let match = demo.match(reg);
  if (match && match.length >= 1) {
    return match[1] || "";
  }
  return "";
};

export default (md: any) => {
  const render = md.render;

  md.render = (...args: any[]) => {
    let docPath = args[1].path;
    let result = render.call(md, ...args);
    const demoReg = /<demo([\s\S]*?)(<\/demo>|\/>)/;
    const demoReg_g = new RegExp(demoReg, "g");
    const demoLabels = result.match(demoReg_g);

    demoLabels?.forEach(async (demo: any) => {
      let codeStr = "";
      let htmlStr = "";
      let descStr = "";
      const slot = getDemoLabel(demo);
      const demoSrc = getDemoLabel(demo, "src"); // demo src
      const demoDesc = getDemoLabel(demo, "desc"); // demo desc
      const demoLang = getDemoLabel(demo, "lang") || defaultLang; // demo lang
      const demoPath = resolve(docPath, "../", demoSrc);
      let demoRelativePath = "";
      const existSrc = demoSrc && fs.existsSync(demoPath);

      if (slot?.trim()) {
        codeStr = slot;
      } else if (existSrc) {
        codeStr = fs.readFileSync(demoPath).toString();
        demoRelativePath = getRelativePath(demoComponentsPath, demoPath);
      } else {
        codeStr = "failed to find src file";
      }

      htmlStr = codeToHtml(codeStr, {
        lang: demoLang,
        theme: defaultTheme,
      });
      descStr = md.renderInline(demoDesc) || "";
      let demoStr = demo.replace(
        ">",
        ` codeStr="${encodeURIComponent(
          codeStr
        )}" htmlStr="${encodeURIComponent(
          htmlStr
        )}" description="${encodeURIComponent(
          descStr
        )}" codePath="${demoRelativePath}">`
      );

      result = result.replace(demo, demoStr);
    });

    return result;
  };
};
