<template>
  <a @click="onClick()" class="cursor-pointer">
    <span class="pr-1">{{ value }}</span>
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
  },
  methods: {
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