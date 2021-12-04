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

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: require("@/locales/en.json"),
  },
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
