<template>
  <div class="sheet-wrap">
    <div class="sheet">
      <div class="quarter even-top">
        <div class="col">
          <printable-ergo-header id="odd" :plate="plate" />
          <div class="row">
            <h1 class="title">{{ $t("print.publicKey.title") }}</h1>
          </div>
          <div class="row text-center flex-grow">
            <p>
              <canvas class="inline" id="pk-canvas"></canvas>
            </p>
            <p class="key mt-4 mx-8">
              <tool-tip :label="$t('global.clickToCopy')">
                <click-to-copy :value="publicKey" />
              </tool-tip>
            </p>
          </div>
          <div class="row">
            <p class="tip-text">
              {{ $t("print.publicKey.tip") }}
            </p>
          </div>
        </div>
      </div>
      <div class="quarter odd-top">
        <div class="col">
          <printable-ergo-header id="even" :plate="plate" />
          <div class="row">
            <h1 class="title">{{ $t("print.addresses.title") }}</h1>
          </div>
          <div class="row flex-grow">
            <div
              class="flex flex-row w-full bordered mb-3 p-1"
              v-for="(address, i) in addresses"
              :key="address"
            >
              <div class="flex-grow h-auto">
                <div class="col">
                  <p class="text-gray-600 flex-grow text-sm">
                    {{ $t("print.addresses.address") }} /{{ i }}
                  </p>
                  <p class="key">
                    <tool-tip :label="$t('global.clickToCopy')">
                      <click-to-copy :value="address" />
                    </tool-tip>
                  </p>
                </div>
              </div>
              <div class="w-min h-min">
                <canvas :id="`addr-${i}-canvas`" class="m-1 inline"></canvas>
              </div>
            </div>
          </div>
          <div class="row">
            <p class="tip-text">{{ $t("print.addresses.tip") }}</p>
          </div>
        </div>
      </div>
      <div class="quarter even-bottom">
        <div class="col">
          <div class="row">
            <h1 class="title">{{ $t("print.mnemonic.title") }}</h1>
          </div>
          <div class="row flex-grow">
            <div class="mx-3 p-2 bordered">
              <p class="text-justify text-lg select-none">
                {{ mnemonic }}
              </p>
            </div>
          </div>
          <div class="row text-center">
            <p class="pt-5 mt-5 inline-block">
              <mdicon name="alert-outline" :size="64" />
            </p>
            <p class="mx-5 pb-10" v-html="$t('print.mnemonic.tip')"></p>
          </div>
          <div class="row" v-if="$te('global.translationCredits')">
            <p class="tip-text">
              {{ $t("global.translationCredits") }}
            </p>
          </div>
        </div>
      </div>
      <div class="quarter">
        <div class="col">
          <div class="row">
            <h1 class="title">{{ $t("print.instructions.title") }}</h1>
          </div>
          <div class="row flex-grow">
            <div class="mx-3 p-2 bordered">
              <p class="text-justify text-lg select-none transform rotate-y-180">
                {{ shuffledMnemonic }}
              </p>
              <p class="text-xs tracking-normal leading-tight tip-text mt-2">
                {{ $t("print.instructions.obfuscatingMsg") }}
              </p>
            </div>
          </div>
          <div class="row leading-normal">
            <ul class="list-disc px-4">
              <li>
                {{ $t("print.instructions.bulletOne") }}
              </li>
              <li>
                {{ $t("print.instructions.bulleTwo") }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { shufflePhrase } from "@/utils/stringHelper";
import PrintableErgoHeader from "./PrintableErgoHeader.vue";
import QRCode from "qrcode";
import Mnemonic from "@/utils/ergo/mnemonic";
import { WalletChecksum } from "@emurgo/cip4-js";

export default defineComponent({
  name: "PrintWallet",
  components: {
    PrintableErgoHeader,
  },
  props: {
    strength: { type: Number, required: true },
  },
  data: () => {
    return {
      mnemonic: "",
      publicKey: "",
      plate: {} as WalletChecksum,
      addresses: [] as string[],
      maxAddresses: Object.freeze(3),
    };
  },
  activated() {
    this.newWallet();
  },
  computed: {
    shuffledMnemonic() {
      return shufflePhrase(this.mnemonic);
    },
  },
  watch: {
    strength() {
      this.newWallet();
    },
  },
  methods: {
    newWallet() {
      var mnemonic = new Mnemonic(this.strength);
      this.mnemonic = mnemonic.toString();

      mnemonic.toSeed().then((seed) => {
        this.publicKey = seed.extendedPublicKey;
        this.plate = seed.checksum;

        QRCode.toCanvas(document.getElementById("pk-canvas"), seed.extendedPublicKey, {
          errorCorrectionLevel: "H",
          margin: 0,
          scale: 2.6,
        });

        this.addresses = [];
        for (let i = 0; i < this.maxAddresses; i++) {
          this.addresses.push(seed.derive(i).address);
        }

        this.$nextTick(() => {
          for (let i = 0; i < this.addresses.length; i++) {
            QRCode.toCanvas(document.getElementById(`addr-${i}-canvas`), this.addresses[i], {
              margin: 0,
              scale: 2,
            });
          }
        });
      });
    },
  },
});
</script>
