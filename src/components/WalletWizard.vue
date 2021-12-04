<template>
  <div class="wiz-content">
    <div class="mx-4 p-4 print:hidden">
      <div class="wiz-header">
        <wizard-header-item
          :label="$t('start.title')"
          icon="bookmark-outline"
          :step-number="1"
          :current-step="currentStep"
          position="begin"
        />
        <wizard-header-item
          :label="$t('print.title')"
          icon="printer"
          :step-number="2"
          :current-step="currentStep"
          position="end"
        />
      </div>
    </div>

    <div class="w-full h-full screen:p-10 screen:mb-20">
      <transition mode="out-in" name="fade">
        <keep-alive>
          <start-wallet v-if="at('start')" />
          <print-wallet v-else-if="at('print')" :strength="strength" ref="printWallet" />
        </keep-alive>
      </transition>
    </div>
  </div>
  <div
    class="
      w-full
      p-4
      print:hidden
      fixed
      inset-x-0
      bottom-0
      bg-white
      flex
      justify-center
      shadow shadow-dark-900
    "
  >
    <div class="flex p-2 w-full lg:w-10/12 md:w-11/12">
      <label class="select-control mr-1" v-if="at('print')">
        <span class="pl-1">{{ $t("print.strengthSelect.title") }}</span>
        <select v-model="strength" class="block form-select">
          <option :value="128">12 {{ $t("print.strengthSelect.words") }} (128 bits)</option>
          <option :value="160">15 {{ $t("print.strengthSelect.words") }} (160 bits)</option>
          <option :value="256">24 {{ $t("print.strengthSelect.words") }} (256 bits)</option>
        </select>
      </label>
      <button class="btn mr-1" type="button" v-if="at('print')" @click="newWallet()">
        {{ $t("print.newWalletButton") }}
      </button>
      <div class="flex-auto flex flex-row-reverse">
        <button @click="nextStep()" class="btn primary" type="button">{{ nextBtnlabel }}</button>
        <button class="btn mr-4" type="button" v-if="at('print')" @click="print()">
          {{ $t("print.printButton") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WizardHeaderItem from "@/components/WizardHeaderItem.vue";
import StartWallet from "@/components/StartWallet.vue";
import PrintWallet from "@/components/print/PrintWallet.vue";
import * as consts from "@/utils/constants";

export default defineComponent({
  name: "WalletWizard",
  components: {
    WizardHeaderItem,
    StartWallet,
    PrintWallet,
  },
  data: () => {
    return {
      currentStep: 1,
      steps: ["start", "print"],
      strength: consts.defaultStrength,
    };
  },
  computed: {
    nextBtnlabel() {
      if (this.at("start")) {
        return this.$t("start.nextButton");
      }

      return this.$t("print.nextButton");
    },
  },
  methods: {
    at(step: string) {
      return this.steps[this.currentStep - 1] == step;
    },
    print() {
      window.print();
    },
    nextStep() {
      if (this.currentStep >= this.steps.length) {
        this.currentStep = 1;
        return;
      }

      this.currentStep++;
    },
    prevStep() {
      if (this.currentStep <= 1) {
        return;
      }

      this.currentStep--;
    },
    newWallet() {
      (this.$refs.printWallet as any).newWallet();
    },
  },
});
</script>
