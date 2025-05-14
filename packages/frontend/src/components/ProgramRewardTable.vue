<template>
  <div class="w-full h-full" v-if="grids.length">
    <h2 class="py-4 text-white font-bold uppercase">Rewards - Asset value</h2>
    <DataTable :value="grids" tableStyle="min-width: 50rem">
      <Column field="asset_value" header="ASSET VALUE">
        <template #body="{ data }">
          <TagAssetValue :severity="data.level" />
        </template>
      </Column>

      <Column field="bounty_low" header="CVSS (0 - 3.9)" />
      <Column field="bounty_medium" header="CVSS (4.0 - 6.9)" />
      <Column field="bounty_high" header="CVSS (7.0 - 8.9)" />
      <Column field="bounty_critical" header="CVSS (9.0 - 10.0)" />
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TagAssetValue from "./TagAssetValue.vue";
import { YWH } from "@yeswecaido/common";

const props = defineProps<{
  program: YWH.Program;
}>();

const grids = computed(() => {
  const grids = [];

  const isEmpty = (grid: YWH.RewardGrid) => {
    return grid.bounty_critical === 0 && grid.bounty_high === 0 && grid.bounty_medium === 0 && grid.bounty_low === 0;
  };

  if (!isEmpty(props.program.reward_grid_critical)) {
    grids.push({ ...props.program.reward_grid_critical, level: "critical" });
  }
  if (!isEmpty(props.program.reward_grid_high)) {
    grids.push({ ...props.program.reward_grid_high, level: "high" });
  }

  if (!isEmpty(props.program.reward_grid_medium)) {
    grids.push({ ...props.program.reward_grid_medium, level: "medium" });
  }

  if (!isEmpty(props.program.reward_grid_low)) {
    grids.push({ ...props.program.reward_grid_low, level: "low" });
  }

  return grids;
});
</script>
