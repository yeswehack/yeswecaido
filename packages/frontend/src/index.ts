import { Classic } from "@caido/primevue";
import Tooltip from "primevue/tooltip";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

import { SDKPlugin } from "./plugins/sdk";

import "./styles/index.css";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

import App from "./views/App.vue";
import {  YWH } from "@yeswecaido/common";

export const init = (sdk: YWH.FrontendSDK) => {
  const app = createApp(App);

  app.use(PrimeVue, {
    unstyled: true,
    pt: Classic,
  });
  app.directive("tooltip", Tooltip);

  app.use(SDKPlugin, sdk);

  const root = document.createElement("div");
  Object.assign(root.style, {
    height: "100%",
    width: "100%",
  });

  app.mount(root);

  sdk.navigation.addPage("/yeswecaido", {
    body: root,
  });

  sdk.sidebar.registerItem("YesWeCaido", "/yeswecaido", {
    icon: "fas fa-y",
  });
};
