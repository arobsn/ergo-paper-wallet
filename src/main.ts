import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import mdiVue from "mdi-vue/v3";
import {
  mdiBookmarkOutline,
  mdiPrinter,
  mdiOpenInNew,
  mdiAlertOutline,
  mdiCheckboxMultipleMarkedOutline,
  mdiCheckboxMultipleBlankOutline,
} from "@mdi/js";
import ClickToCopy from "@/components/ClickToCopy.vue";
import ToolTip from "@/components/ToolTip.vue";
import ErgoLogo from "@/components/ErgoLogo.vue";
import "windi.css";
import "@/assets/styles";

const navLang = navigator.language.split("-")[0];
const messages = {
  el: require("@/locales/el.json"),
  en: require("@/locales/en.json"),
  es: require("@/locales/es.json"),
  id: require("@/locales/id.json"),
  nl: require("@/locales/nl.json"),
  pt: require("@/locales/pt.json"),
  sk: require("@/locales/sk.json"),
  vn: require("@/locales/vn.json"),
  zh: require("@/locales/zh.json"),
};

const i18n = createI18n({
  locale: Object.keys(messages).includes(navLang) ? navLang : "en",
  fallbackLocale: "en",
  messages,
});

createApp(App)
  .use(i18n)
  .use(mdiVue, {
    icons: {
      mdiBookmarkOutline,
      mdiPrinter,
      mdiOpenInNew,
      mdiAlertOutline,
      mdiCheckboxMultipleBlankOutline,
      mdiCheckboxMultipleMarkedOutline,
    },
  })
  .component("ClickToCopy", ClickToCopy)
  .component("ToolTip", ToolTip)
  .component("ErgoLogo", ErgoLogo)
  .mount("#app");
