<template>
  <header class="h-14 bg-dark-900 items-center flex w-full justify-start select-none px-2">
    <ergo-logo class="h-9 fill-white inline" />
    <span class="pl-2 pb-0.5 text-xl tracking-wide text-white font-light">Paper Wallet</span>

    <div class="flex-auto flex flex-row-reverse">
      <div
        class="
          text-center
          relative
          top-4.5
          h-18.5
          w-18
          bg-white
          border-solid border-1 border-dark-900
          py-0.7
        "
      >
        <canvas class="h-12 w-12 inline-block pt-0.5" :id="canvasId"></canvas>
        <span class="text-xs">{{ plate.TextPart }}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WalletChecksum } from "@emurgo/cip4-js";
import { renderIcon } from "@download/blockies";

export default defineComponent({
  name: "PrintableErgoHeader",
  props: {
    id: { type: String, required: true },
    plate: { type: Object as () => WalletChecksum, required: true },
  },
  computed: {
    canvasId() {
      return `checksum-${this.id}`;
    },
  },
  watch: {
    plate() {
      renderIcon(
        {
          seed: this.plate.ImagePart,
          size: 7,
          scale: 4,
          color: "#aaa",
          bgcolor: "#fff",
          spotcolor: "#000",
        },
        document.getElementById(this.canvasId)
      );
    },
  },
});
</script>
