<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
    <div class="text-block">
      <h1 class="text-xl font-semibold">{{ $t("start.keys.title") }}</h1>
      <p class="font-light">
        {{ $t("start.keys.content") }}
      </p>
    </div>
    <div class="text-block">
      <h1 class="text-xl font-semibold">{{ $t("start.offline.title") }}</h1>
      <p
        class="font-light"
        v-html="
          $t('start.offline.content', {
            downloadUrl:
              '<a class=\'hover:underline\' href=\'standalone.html\' download><span class=\'font-mono\'>standalone.html</span></a>',
          })
        "
      ></p>
    </div>
    <div class="text-block">
      <h1 class="text-xl font-semibold">{{ $t("start.verify.title") }}</h1>
      <p class="font-light" v-html="$t('start.verify.content')"></p>
    </div>
    <div class="text-block">
      <h1 class="text-xl font-semibold">{{ $t("start.donate.title") }}</h1>
      <p class="font-light">
        {{ $t("start.donate.content") }}
        <tool-tip dashed>
          <template v-slot:label>
            <canvas class="inline" id="donate-canvas"></canvas>
            <span class="block pt-1" v-html="$t('start.donate.tooltip')"></span>
          </template>
          <span class="font-mono text-sm break-all">
            <click-to-copy :value="donateAddr" max-display-length="15" />
          </span>
        </tool-tip>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QRCode from "qrcode";

export default defineComponent({
  name: "StartWallet",
  data: () => {
    return {
      donateAddr: "9i5DyKxVmchSej8Xd5DAZ3zz8p6fe7VsAQa2BD7E4PumM2VmGhR",
    };
  },
  mounted() {
    QRCode.toCanvas(document.getElementById("donate-canvas"), this.donateAddr, {
      scale: 4,
      margin: 1,
    });
  },
});
</script>
