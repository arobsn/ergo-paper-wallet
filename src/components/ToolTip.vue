<template>
  <span class="group inline-flex justify-center relative">
    <span :class="{ 'underline underline-dashed underline-offset-4 underline-lenght-0': dashed }">
      <slot />
    </span>
    <span
      class="
        ease-linear
        transition-all
        duration-150
        opacity-0
        bg-dark-100
        shadow-lg
        text-light-300 text-center text-xs
        rounded
        p-2
        mb-1
        absolute
        z-10
        bottom-full
        w-auto
        font-sans font-normal
        pointer-events-none
        group-hover:opacity-100
      "
    >
      <slot name="label" v-if="$slots.label" />
      <span v-else>{{ label }}</span>
      <svg
        class="absolute text-dark-100 h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToolTip",
  props: {
    label: { type: String, required: false },
    dashed: { type: Boolean, default: false },
  },
});
</script>
