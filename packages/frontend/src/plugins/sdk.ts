import { type InjectionKey, type Plugin, inject } from "vue";

import { YWH } from "@yeswecaido/common";

const KEY: InjectionKey<YWH.FrontendSDK> = Symbol("SDK");

// This is the plugin that will provide the SDK to VueJS
// To access the frontend SDK from within a component, use the `useSDK` function.
export const SDKPlugin: Plugin = (app, sdk: YWH.FrontendSDK) => {
  app.provide(KEY, sdk);
};

// This is the function that will be used to access the SDK from within a component.
export const useSDK = () => {
  return inject(KEY) as YWH.FrontendSDK;
};
