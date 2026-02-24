<template>
  <Chip class="!bg-black/50" :label="program.disabled ? 'Disabled' : 'Active'" />
</template>

<script setup lang="ts">
import { YWH } from "@yeswecaido/common";
import Chip from "primevue/chip";

const props = defineProps<{ program: YWH.AnyProgram }>();

</script>
