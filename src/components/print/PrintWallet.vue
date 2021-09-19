<template>
  <div class="sheet-wrap">
    <div class="sheet">
      <div class="quarter even-top">
        <div class="col">
          <printable-ergo-header id="odd" :plate="plate" />
          <div class="row">
            <h1 class="title">Public Key</h1>
          </div>
          <div class="row text-center flex-grow">
            <p>
              <canvas class="inline" id="pk-canvas"></canvas>
            </p>
            <p class="key mt-4 mx-8">
              <tool-tip label="Click to copy">
                <click-to-copy :value="publicKey" />
              </tool-tip>
            </p>
          </div>
          <div class="row">
            <p class="tip-text">
              Use this public key to securely check your balance or get more addresses on a
              read-only wallet.
            </p>
          </div>
        </div>
      </div>
      <div class="quarter odd-top">
        <div class="col">
          <printable-ergo-header id="even" :plate="plate" />
          <div class="row">
            <h1 class="title">Addresses</h1>
          </div>
          <div class="row flex-grow">
            <div
              class="flex flex-row w-full bordered mb-3 p-1"
              v-for="(address, i) in addresses"
              :key="address"
            >
              <div class="flex-grow h-auto">
                <div class="col">
                  <p class="text-gray-600 flex-grow text-sm">Address /{{ i }}</p>
                  <p class="key">
                    <tool-tip label="Click to copy">
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
            <p class="tip-text">You can send your funds to any of the above addresses.</p>
          </div>
        </div>
      </div>
      <div class="quarter even-bottom">
        <div class="col">
          <div class="row">
            <h1 class="title">Mnemonic</h1>
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
            <p class="mx-5">
              <strong>DO NOT REVEAL or SHARE THIS MNEMONIC PHRASE</strong> with anyone. This words
              gives complete access to funds stored on this wallet.
            </p>
          </div>
        </div>
      </div>
      <div class="quarter">
        <div class="col">
          <div class="row">
            <h1 class="title">Instructions</h1>
          </div>
          <div class="row flex-grow">
            <div class="mx-3 p-2 bordered">
              <p class="text-justify text-lg select-none transform rotate-y-180">
                {{ shuffledMnemonic }}
              </p>
              <p class="text-xs tracking-normal leading-tight tip-text mt-2">
                Please, ignore this. Just some noise to help obfuscating mnemonic, just in case
                someone try to see through the wallet by using a flashlight.
              </p>
            </div>
          </div>
          <div class="row leading-normal">
            <ul class="list-disc px-4">
              <li>
                Fold this sheet in four, using the dashed line as a guide, so that the mnemonic
                phrase stay on the inside part and seal it with tape or glue; and
              </li>
              <li>
                Keep it safe and away from humidity. Treat a paper wallet like cash. If you lose it
                or it becomes illegible, your funds are gone forever.
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
