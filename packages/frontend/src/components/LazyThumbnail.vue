<template>
  <div>
    <div
      v-if="!url"
      class="rounded-full size-24 shadow-md bg-surface-900 flex items-center justify-center text-surface-100 text-2xl font-bold tracking-wider border border-surface-800"
    >
      {{ firstLetters }}
    </div>
    <Skeleton v-else-if="loading" shape="circle" size="6rem" />
    <img
      alt="thumbnail"
      class="size-24 rounded-full shadow-md object-cover"
      :class="loading && 'hidden'"
      :src="url"
      @load="loading = false"
    />
  </div>
</template>

<script setup lang="ts">
import { YWH } from "@yeswecaido/common";
import Skeleton from "primevue/skeleton";
import { computed, ref } from "vue";

const props = defineProps<{ program: YWH.AnyProgram }>();
const loading = ref(true);

const url = computed(() => {
  return props.program.thumbnail?.url ?? "";
});

const firstLetters = computed(() => {
  return props.program.slug.slice(0, 2).toUpperCase();
});
</script>
