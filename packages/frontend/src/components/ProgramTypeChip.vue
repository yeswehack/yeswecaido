<template>
  <Chip :label="label" :icon="icon" />
</template>

<script setup lang="ts">
import { YWH } from "@yeswecaido/common";
import Chip from "primevue/chip";
import { computed } from "vue";

const props = defineProps<{ program: YWH.AnyProgram }>();

const label = computed(() => {
  if (props.program.slug === "dojo") {
    return "CTF";
  }

  if (props.program.type === "bug-bounty") {
    return "Bug Bounty";
  } else {
    return "VDP";
  }
});

const icon = computed(() => {
  if (props.program.slug === "dojo") {
    return "fas fa-flag";
  }

  if (props.program.type === "bug-bounty") {
    return "fas fa-coins";
  } else {
    return "fas fa-hand-holding-medical";
  }
});
</script>
