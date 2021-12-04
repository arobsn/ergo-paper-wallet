<template>
  <a @click="onClick()" class="cursor-pointer">
    <span class="pr-1">{{ displayValue }}</span>
    <mdicon
      :static-class="'inline-block print:hidden' + (copied ? ' text-green-800' : '')"
      :name="icon"
      size="12"
    />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClickToCopy",
  props: {
    value: { type: String, required: true },
    maxDisplayLength: { type: Number, required: false },
  },
  watch: {
    value() {
      this.setCopied(false);
    },
  },
  data: () => {
    return {
      copied: false,
    };
  },
  computed: {
    icon() {
      if (!this.copied) {
        return "checkbox-multiple-blank-outline";
      }

      return "checkbox-multiple-marked-outline";
    },
    displayValue() {
      if (this.maxDisplayLength && this.maxDisplayLength > 0) {
        const fragmentSize = Math.trunc(this.maxDisplayLength / 2);
        return `${this.value.substr(0, fragmentSize)}...${this.value.substr(
          this.value.length - fragmentSize
        )}`;
      }

      return this.value;
    },
  },
  methods: {
    compactString(val: string, maxSize: number) {
      const fragmentSize = Math.trunc(maxSize);
      return `${val.substr(0, fragmentSize)}...${val.substr(val.length - fragmentSize)}`;
    },
    onClick() {
      navigator.clipboard.writeText(this.value);
      this.setCopied();

      setTimeout(() => {
        this.setCopied(false);
      }, 1000);
    },
    setCopied(value = true) {
      this.copied = value;
    },
  },
});
</script>
