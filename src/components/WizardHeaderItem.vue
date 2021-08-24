<template>
  <div class="item" :class="stateClass">
    <div class="icon">
      <mdicon :name="icon" />
    </div>
    <div class="label">{{ label }}</div>
  </div>
  <div class="separator" :class="stateClass" v-if="canShowSeparator"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WizardHeaderItem",
  props: {
    label: { type: String, required: true },
    icon: { type: String, required: true },
    stepNumber: { type: Number, required: true },
    currentStep: { type: Number, required: true },
    position: {
      type: String,
      required: false,
      default: "middle",
      validator: (value: string) => {
        return ["begin", "middle", "end"].includes(value);
      },
    },
  },
  computed: {
    canShowSeparator(): boolean {
      return this.position !== "end";
    },
    stateClass(): string {
      if (this.currentStep > this.stepNumber) {
        return "prev";
      } else if (this.currentStep < this.stepNumber) {
        return "next";
      }

      return "current";
    },
  },
});
</script>
