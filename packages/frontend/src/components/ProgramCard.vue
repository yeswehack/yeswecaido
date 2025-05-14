<template>
  <div
    class="relative bg-surface-800 cursor-pointer col-span-1 p-4 border border-surface-700 rounded-xl bg-cover bg-center bg-no-repeat bg-[url('https://yeswehack.com/program-card-shape.05f57ba326c583a9.svg')] transition duration-300 hover:scale-105 program-card"
  >
    <ProgramInfo :program="program">
      <Button
        :disabled="!program._isFull"
        type="button"
        icon="fas fa-eye"
        label="View details"
        class="w-48 self-center"
      />
    </ProgramInfo>
  </div>
</template>

<script setup lang="ts">
import { YWH } from "@yeswecaido/common";
import ProgramInfo from "./ProgramInfo.vue";
import Button from "primevue/button";
import { useCurrentElement, useIntersectionObserver } from "@vueuse/core";
import { useYwhPrograms } from "@/composables/useYwhPrograms";
import { onMounted, ref } from "vue";

const props = defineProps<{
  program: YWH.AnyProgram;
}>();

const { loadFullProgram } = useYwhPrograms();

const el = useCurrentElement();

let loading = false;

const root = ref<HTMLElement | null>(null);

onMounted(() => {
  root.value = document.querySelector<HTMLElement>("#scroll-container");
})

useIntersectionObserver(
  el,
  ([entry]) => {
    if (props.program._isFull || entry!.intersectionRatio < 0.1) return;
    if (loading) return;
    loading = true;
    loadFullProgram(props.program.slug);
  },
  {
    rootMargin: "500px",
    threshold: 0.1,
    root: root,
  }
);
</script>
