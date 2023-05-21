declare module "*.vue" {
  const component: import("vue").DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vpdemo" {
  const vpdemo: (md: any) => void;
  export default vpdemo;
}
