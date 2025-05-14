<template>
  <div class="flex flex-col h-full gap-4">
    <div class="program-banner h-32 p-2 rounded-xl flex items-center">
      <LazyThumbnail :program="program" />
    </div>
    <div class="flex flex-col gap-2">
      <b class="text-xl font-bold">{{ program.title }}</b>
      <b class="text-gray-400">{{ program.business_unit.name }}</b>
    </div>
    <div class="flex flex-wrap gap-2 mt-2 text-sm">
      <ProgramTypeChip :program="program" />
      <ProgramVisibilityChip :program="program" />
      <Chip :label="`${program.scopes_count ?? '?'} scopes`" />
    </div>
    <Divider />
    <ProgramStats :program="program" />
    <Divider class="mt-auto" />

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import Chip from "primevue/chip";
import Divider from "primevue/divider";
import { YWH } from "@yeswecaido/common";
import ProgramTypeChip from "./ProgramTypeChip.vue";
import ProgramVisibilityChip from "./ProgramVisibilityChip.vue";
import ProgramStats from "./ProgramStats.vue";
import LazyThumbnail from "./LazyThumbnail.vue";

const props = defineProps<{
  program: YWH.AnyProgram;
}>();

const bannerUrl = computed(() => {
  if ("banner" in props.program && props.program.banner) {
    return `url(${props.program.banner.url})`;
  }

  return "#";
});
</script>

<style scoped>
.program-banner {
  background-image: v-bind("bannerUrl");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgba(0 0 0 / 0.1);
}
</style>
