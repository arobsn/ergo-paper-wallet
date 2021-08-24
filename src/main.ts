import { createApp } from "vue";
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
import App from "./App.vue";
import "windi.css";
import "@/assets/styles";

createApp(App)
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
