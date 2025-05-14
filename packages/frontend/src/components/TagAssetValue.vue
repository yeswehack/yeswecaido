<template>
  <Tag :value="severity" class="font-bold text-white uppercase" :class="tagColor" />
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import Tag from "primevue/tag";

const props = defineProps<{
  severity: string;
}>();

const tagColor = computed(() => {
  switch (props.severity.toLowerCase()) {
    case "low":
      return "bg-yellow-600";
    case "medium":
      return "bg-orange-500";
    case "high":
      return "bg-red-500";
    case "critical":
      return "bg-red-600";
    default:
      return "bg-slate-500";
  }
});
</script>
