<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
    <div class="">
      <h1 class="text-xl font-semibold">Your keys, your Ergo.</h1>
      <p class="font-light">
        By offline generating and printing out your own ergo wallet, you can minimize your exposure
        to hackers or computer viruses, this brings some peace of mind. Just transfer your funds
        into your new wallet, and keep it safe and away from humidity.
      </p>
    </div>
    <div class="">
      <h1 class="text-xl font-semibold">Go offline.</h1>
      <p class="font-light">
        For improved security, the whole process can be done offline. Just download the
        <a class="hover:underline" href="https://github.com/anon-br/ergo-paper-wallet/releases"
          ><span class="font-mono">standalone.html</span></a
        >
        file on GitHub, go offline and open it using your browser as a regular .html file!
      </p>
    </div>
    <div class="">
      <h1 class="text-xl font-semibold">Don’t Trust. Verify.</h1>
      <p class="font-light">
        This tool was built using trusted and well tested libraries, and no data is transmitted in
        any direction, all the process is executed in your browser. But we encourage all the users
        to go to our
        <a
          class="hover:underline inline-flex"
          href="https://github.com/anon-br/ergo-paper-wallet"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub repo
          <span class="pl-1 pt-2 text-gray-400">
            <mdicon name="open-in-new" size="12" />
          </span>
        </a>
        and verify the code by themselves.
      </p>
    </div>
    <div class="">
      <h1 class="text-xl font-semibold">Donate.</h1>
      <p class="font-light">
        If you like this tool and want to to encourage its developement, donations are warmly
        welcomed! Please send any amount to this address:
        <tool-tip dashed>
          <template v-slot:label>
            <canvas class="inline" id="donate-canvas"></canvas>
            <span class="block">
              Scan this QR code or <br />
              click to copy
            </span>
          </template>
          <span class="font-mono text-sm break-all">
            <click-to-copy :value="donateAddr" />
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
