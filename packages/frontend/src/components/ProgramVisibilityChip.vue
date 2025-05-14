<template>
  <Chip :label="label" :icon="icon" />
</template>

<script setup lang="ts">
import { YWH } from "@yeswecaido/common";
import Chip from "primevue/chip";
import { computed } from "vue";

const props = defineProps<{ program: YWH.AnyProgram }>();

const label = computed(() => {
  return props.program.public ? "Public" : "Private";
});

const icon = computed(() => {
  return props.program.public ? "fas fa-globe" : "fas fa-lock";
});
</script>
