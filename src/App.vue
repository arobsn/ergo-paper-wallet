<template>
  <nav class="print:hidden">
    <div class="mx-auto px-6 py-2 flex items-center justify-between">
      <p
        class="
          font-light
          select-none
          w-full
          text-2xl text-center
          md:w-auto md:text-3xl md:text-left
        "
      >
        <ergo-logo class="inline h-10 md:h-12 fill-current" />
        Paper Wallet
      </p>

      <div class="hidden md:block print:hidden">
        <ul class="inline-flex">
          <li>
            <a
              class="px-4 hover:text-gray-800 inline-flex items-center"
              href="https://ergoplatform.org"
              target="_blank"
              rel="noopener noreferrer"
              >Ergo Platform
              <span class="pl-1 pt-1 text-gray-400">
                <mdicon name="open-in-new" size="12" />
              </span>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 hover:text-gray-800 inline-flex items-center"
              href="https://github.com/anon-br/ergo-paper-wallet"
              >GitHub
              <span class="pl-1 pt-1 text-gray-400"> <mdicon name="open-in-new" size="12" /> </span
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="wiz-container print:m-0 print:p-0">
    <wallet-wizard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WalletWizard from "@/components/WalletWizard.vue";

export default defineComponent({
  name: "App",
  components: {
    WalletWizard,
  },
  data: () => {
    return {
      currentStep: 0,
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
  },
});
</script>
