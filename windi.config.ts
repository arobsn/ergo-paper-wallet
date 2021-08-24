import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
        screen: { raw: "screen" },
      },
      fontSize: {
        tiny: ".6rem",
      },
      plugins: [require("windicss/plugin/forms")],
    },
  },
});
