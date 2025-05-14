<template>
  <div class="grid grid-cols-[1fr_auto] gap-y-2 gap-x-4" v-if="program._isFull">
    <b>Reports</b>
    <div class="text-end">{{ program.stats.total_reports ?? 0 }}</div>
    <b>Response time</b>
    <div class="text-end">
      {{ program.stats.average_first_time_response ? "< " + program.stats.average_first_time_response + " days" : "-" }}
    </div>
    <b>Rewards</b>
    <div class="text-bold text-red-400 text-end">{{ rewardStr }}</div>
  </div>
  <Skeleton v-else width="100%" height="5em"></Skeleton>
</template>

<script setup lang="ts">
import { YWH } from "@yeswecaido/common";
import Skeleton from "primevue/skeleton";
import { computed } from "vue";

const props = defineProps<{
  program: YWH.AnyProgram;
}>();

const rewardStr = computed(() => {
  if ( !props.program._isFull) {
    return "";
  }

  if (!props.program.bounty) {
    return "(no rewards)";
  }

  const minReward = props.program.bounty_reward_min ?? 0;
  const maxReward = props.program.bounty_reward_max ?? 0;

  switch (props.program.business_unit.currency) {
    case "EUR":
      return `${minReward}€ - ${maxReward}€`;
    case "USD":
      return `$${minReward} - $${maxReward}`;
    default:
      return `${minReward} - ${maxReward}`;
  }
});
</script>
